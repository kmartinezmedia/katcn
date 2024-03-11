import { Transpiler } from 'bun';
import { Hono } from 'hono';

const transpiler = new Transpiler({
  loader: 'tsx',
  tsconfig: {
    compilerOptions: {
      jsx: 'react',
      jsxImportSource: 'katcn',
    },
  },
  macro: {
    katcn: {
      getStyles: 'katcn/getStyles',
    },
  },
});

const app = new Hono();

app.post('/transform', async (c) => {
  const body = await c.req.text();
  console.log('body');
  // const imports = transpiler.scanImports(code);
  const transformedCode = transpiler.transformSync(body);
  return c.text(transformedCode);
});

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const port = parseInt(Bun.env.PORT!) || 3001;
console.log('Server is running on port 3001');

export default {
  port,
  fetch: app.fetch,
};
