export const transpiler = new Bun.Transpiler({
  loader: 'tsx',
  tsconfig: {
    compilerOptions: {
      jsx: 'react-jsx',
      jsxImportSource: 'katcn',
    },
  },
  autoImportJSX: true,
  trimUnusedImports: true,
});
