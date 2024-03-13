import { Hono } from 'hono';
import { html, raw } from 'hono/html';
import { createTsMorphProject, transformSourceFile } from 'katcn/macros';
import { fallbackExampleCode } from './fixtures/data';

const app = new Hono();
const project = createTsMorphProject({
  skipAddingFilesFromTsConfig: false,
});

const transformMap = new Map<string, { css: string; js: string }>();

const tsmorphOptions = {
  overwrite: true,
} as const;

app.get('/playground/:id', async (c) => {
  if (transformMap.size > 1000) {
    transformMap.clear();
  }
  const katcn = await Bun.file(require.resolve('katcn/playground')).text();

  const { id } = c.req.param();
  const data = await (transformMap.get(id) ??
    transformSourceFile({
      sourceFile: project.createSourceFile(
        `playground-${id}-input.tsx`,
        fallbackExampleCode,
        tsmorphOptions,
      ),
    }));

  const sourceFile1 = project.createSourceFile(
    `playground-${id}-output.tsx`,
    data.js,
    tsmorphOptions,
  );

  for (const iDeclaration of sourceFile1.getImportDeclarations()) {
    iDeclaration.remove();
  }

  const jsCode = sourceFile1.getFullText();

  return c.html(
    html`<!DOCTYPE html>
      <style>
        ${raw(data.css)}
      </style>
<script type="module">
import { jsxDEV as jsxDevOriginal } from 'https://esm.sh/react@18.2.0/jsx-dev-runtime.js';
import { forwardRef } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
${raw(katcn)}
${raw(jsCode)}
const root = createRoot(document.getElementById('app'));
root.render(Example());
</script>
<div id="app"></div>
`,
  );
});

app.post('/transform', async (c) => {
  if (transformMap.size > 1000) {
    transformMap.clear();
  }
  const body = await c.req.text();
  const id = Bun.hash(body).toString();

  console.log(id);
  if (transformMap.has(id)) {
    return c.json(transformMap.get(id));
  }
  const sourceFile = project.createSourceFile(
    `playground-${id}-input.tsx`,
    body,
    tsmorphOptions,
  );

  const data = await transformSourceFile({
    sourceFile,
  });

  sourceFile.deleteImmediately();
  transformMap.set(id, data);
  return c.json(data);
});

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const port = Number.parseInt(Bun.env.PORT!) || 3001;
console.log('Server is running on port 3001');

export default {
  port,
  fetch: app.fetch,
};
