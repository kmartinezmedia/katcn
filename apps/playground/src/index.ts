import { Hono } from 'hono';
import { html, raw } from 'hono/html';
import { serveStatic } from 'hono/bun';
import { createTsMorphProject, transformSourceFile } from 'katcn/macros';
// import { fallbackExampleCode } from './fixtures/data';
// import path from 'node:path';

const app = new Hono();
app.use(
  '/public/*',
  serveStatic({
    root: 'src',
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  }),
);

const project = createTsMorphProject({
  skipAddingFilesFromTsConfig: false,
});
const tsmorphOptions = {
  overwrite: true,
} as const;

// const transformMap = new Map<string, { css: string; js: string }>();

app.get('/playground', async (c) => {
  return c.html(
    html`<!DOCTYPE html>
<link href="/public/katcn.css" rel="stylesheet" />
<script type="module" src="/public/init.js" />
<script type="module">
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
const root = createRoot(document.getElementById('app'));
root.render(Example());
</script>
<h1>Playground</h1>
<div id="app"></div>
`,
  );
});

// app.get('/transform', async (c) => {
//   if (transformMap.size > 1000) {
//     transformMap.clear();
//   }
//   const body = await c.req.text();
//   const id = Bun.hash(body).toString();

//   console.log(id);
//   if (transformMap.has(id)) {
//     return c.json(transformMap.get(id));
//   }
//   const sourceFile = project.createSourceFile(
//     `playground-${id}-input.tsx`,
//     body,
//     tsmorphOptions,
//   );

//   const data = await transformSourceFile({
//     sourceFile,
//   });

//   sourceFile.deleteImmediately();
//   transformMap.set(id, data);
//   return c.json({ id });
// });

console.log('Server is running on port 3001');

export default app;
