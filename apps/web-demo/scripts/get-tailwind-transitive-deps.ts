// apps/web-demo/scripts/get-transitive-deps.ts
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path, { dirname } from 'node:path';

// --- config ---
const packageToGetDepsFor = process.argv[2] || '@tailwindcss/postcss';

// Determine the app dir from this script's location: ../ (apps/web-demo)
const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const appDir = path.resolve(scriptDir, '..');

// Use a require() rooted at the *app* so resolution matches the app at runtime
const require_ = createRequire(path.join(appDir, 'package.json'));

const toPosix = (p: string) => p.split(path.sep).join('/');

// Try to resolve <pkg>/package.json from the app; return null if not installed
function safeResolvePackageJson(name: string): string | null {
  try {
    return require_.resolve(`${name}/package.json`);
  } catch {
    return null; // skip optional / platform-specific deps not installed
  }
}

function readDeps(name: string) {
  const pkgPath = safeResolvePackageJson(name);
  if (!pkgPath) return null;

  // Follow symlinks (important in monorepos)
  const realPkgPath = fs.realpathSync(pkgPath);
  const dir = dirname(realPkgPath);

  const json = JSON.parse(fs.readFileSync(realPkgPath, 'utf8'));
  const deps = [
    ...Object.keys(json.dependencies ?? {}),
    ...Object.keys(json.optionalDependencies ?? {}),
  ];

  const bins: { cmd: string; rel: string }[] = [];
  if (json.bin) {
    if (typeof json.bin === 'string') {
      bins.push({ cmd: json.name ?? name, rel: json.bin });
    } else {
      for (const [cmd, rel] of Object.entries(json.bin) as [string, string][]) {
        bins.push({ cmd, rel });
      }
    }
  }

  return {
    name: json.name ?? name,
    version: json.version ?? '',
    dir, // real, de-symlinked dir of the package
    deps,
    bins,
  };
}

// DFS over installed deps
// biome-ignore lint/suspicious/noExplicitAny: this is fine
function walk(root: string, seen = new Map<string, any>()) {
  if (seen.has(root)) return seen;
  const node = readDeps(root);
  if (!node) return seen;
  seen.set(node.name, node);
  for (const dep of node.deps) walk(dep, seen);
  return seen;
}

const graph = walk(packageToGetDepsFor)!;

// Normalize any absolute path to ./node_modules/... (no ../../)
function normalizeToAppNodeModules(absPath: string): string {
  const real = fs.realpathSync(absPath); // follow symlinks
  const idx = real.lastIndexOf('node_modules');
  const isDir = fs.existsSync(real) && fs.statSync(real).isDirectory();
  if (idx !== -1) {
    const tail = real.slice(idx + 'node_modules/'.length);
    return `./node_modules/${toPosix(tail)}${isDir ? '/**' : ''}`;
  }
  const rel = path.relative(appDir, real);
  return `./${toPosix(rel)}${isDir ? '/**' : ''}`;
}

const includes = new Set<string>();

// Collect only the .bin shims for bins that belong to visited deps
const neededBinCmds = new Set<string>();

for (const node of [...graph.values()].sort((a, b) =>
  a.name.localeCompare(b.name),
)) {
  if (fs.existsSync(node.dir)) {
    includes.add(normalizeToAppNodeModules(node.dir));
  }

  for (const { cmd, rel } of node.bins) {
    neededBinCmds.add(cmd);

    const binAbs = path.join(node.dir, rel);
    if (fs.existsSync(binAbs)) {
      includes.add(normalizeToAppNodeModules(binAbs));
    }
  }
}

// Add shims only for commands we actually saw in deps' "bin"
const shimDir = path.join(appDir, 'node_modules', '.bin');
if (fs.existsSync(shimDir)) {
  for (const cmd of neededBinCmds) {
    const shim = path.join(shimDir, cmd);
    if (fs.existsSync(shim)) {
      includes.add(normalizeToAppNodeModules(shim));
    }
  }
}

const list = [...includes].sort();
console.log(list.join('\n'));

await Bun.write(
  path.join(appDir, 'tailwind-transitive-deps.json'),
  JSON.stringify(list, null, 2),
);
