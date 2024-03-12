import {
  transform,
  createTsMorphProject,
  OnProcessCallbackFnParams,
} from 'katcn/macros';
import { Hono } from 'hono';
import { html, raw } from 'hono/html';

const app = new Hono();
const project = createTsMorphProject({
  compilerOptions: {
    jsxImportSource: 'katcn',
  },
});

const exampleCode = `
import { VStack, Text, Icon } from 'katcn';
import { getStyles } from 'katcn/getStyles';

function Example() {
  const customStyles = getStyles({
    borderWidth: 'thick',
    borderColor: 'warning',
    backgroundColor: 'accent-wash',
    elevation: '1',
  });

  return (
    <VStack backgroundColor="alert">
      <VStack width="1/2" backgroundColor="accent">
        <Text color="on-color" variant="display1" className={customStyles}>
          something
        </Text>
        <Icon name="addFile" size="lg" />
      </VStack>
    </VStack>
  )
 }
`;

app.get('/playground/:username', async (c) => {
  const { username } = c.req.param();
  const sourceFile = project.createSourceFile('temp.tsx', exampleCode);
  let cssContent = '';
  let jsContent = '';

  await transform({
    watch: false,
    project,
    onProcess: (val: OnProcessCallbackFnParams) => {
      cssContent = val.cssContent;
      jsContent = val.jsContent;
    },
  });

  sourceFile.deleteImmediately();

  return c.html(
    html`<!DOCTYPE html>
      <style>
        ${raw(cssContent)}
      </style>
<script type="module">
import "https://esm.sh/react@18.2.0/jsx-dev-runtime.js";
import "https://katcn.vercel.app/katcn/dist/jsx-runtime.js";
import "https://katcn.vercel.app/katcn/dist/jsx-dev-runtime.js";

import React from "https://esm.sh/react@18.2.0";
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
${raw(
  jsContent
    .replace(`"katcn"`, `"https://katcn.vercel.app/katcn/dist/index.js"`)
    .replace(
      `"katcn/getStyles"`,
      `"https://katcn.vercel.app/katcn/dist/getStyles.js"`,
    ),
)}
const root = createRoot(document.getElementById('app'));
root.render(Example());
</script>
<div id="app"></div>
`,
  );
});

app.post('/transform', async (c) => {
  const body = await c.req.text();
  const sourceFile = project.createSourceFile('temp.tsx', body);
  let cssContent = '';
  let jsContent = '';

  await transform({
    watch: false,
    project,
    onProcess: (val: OnProcessCallbackFnParams) => {
      cssContent = val.cssContent;
      jsContent = val.jsContent;
    },
  });

  sourceFile.deleteImmediately();
  return c.text(jsContent);
});

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const port = parseInt(Bun.env.PORT!) || 3001;
console.log('Server is running on port 3001');

export default {
  port,
  fetch: app.fetch,
};
