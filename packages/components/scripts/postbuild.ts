import fs, { copyFile } from 'node:fs';
import { cp } from 'node:fs/promises';
import path from 'node:path';

const rootOfRepo = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootOfRepo, '../../apps/web-demo/public');
const katcnDist = path.resolve(rootOfRepo, 'dist');
const katcnOut = path.resolve(publicDir, 'katcn/dist');
const katcnPkgJson = path.resolve(rootOfRepo, 'package.json');
const katcnPkgJsonOut = path.resolve(katcnOut, '../package.json');

console.log(`Copying ${katcnDist} to`, katcnOut);
fs.mkdirSync(katcnOut, { recursive: true });
cp(katcnDist, katcnOut, { recursive: true, force: true });

console.log(`Copying ${katcnPkgJson} to`, katcnPkgJsonOut);
copyFile(katcnPkgJson, katcnPkgJsonOut, () => {});
