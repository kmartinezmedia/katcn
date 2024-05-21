type Swc = typeof import('@swc/wasm-web/wasm-web');
let swc: Swc | null = null;

export async function transformCode(codeString: string) {
  if (swc === null) {
    const module = await import('@swc/wasm-web');
    await module.default();
    swc = module;
  }
  return swc.transformSync(codeString, {
    filename: 'index.tsx',
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
      },
    },
    module: {
      type: 'commonjs',
      strictMode: false,
    },
  }).code;
}
