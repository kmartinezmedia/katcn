import { transform, createTsMorphProject } from 'katcn/macros';
import { Hono } from 'hono';

const app = new Hono();

app.post('/transform', async (c) => {
  const body = await c.req.text();
  console.log('body');
  // const imports = transpiler.scanImports(code);
  const project = createTsMorphProject();
  project.createSourceFile('temp.tsx', body, { overwrite: true });

  const files = await transform({
    watch: false,
    project,
  });
  console.log(files);

  return c.json({});
});

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const port = parseInt(Bun.env.PORT!) || 3001;
console.log('Server is running on port 3001');

export default {
  port,
  fetch: app.fetch,
};
