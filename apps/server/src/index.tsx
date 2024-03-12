import {
  transform,
  createTsMorphProject,
  OnProcessCallbackFnParams,
} from 'katcn/macros';
import { Hono } from 'hono';
import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer';

const app = new Hono();
const project = createTsMorphProject();

app.post('/transform', async (c) => {
  const body = await c.req.text();
  const sourceFile = project.createSourceFile('temp.tsx', body);
  let cssContent = '';

  await transform({
    watch: false,
    project,
    onProcess: (val: OnProcessCallbackFnParams) => {
      cssContent = val.cssContent;
    },
  });

  sourceFile.deleteImmediately();
  return c.text(cssContent);
});

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const port = parseInt(Bun.env.PORT!) || 3001;
console.log('Server is running on port 3001');

export default {
  port,
  fetch: app.fetch,
};
