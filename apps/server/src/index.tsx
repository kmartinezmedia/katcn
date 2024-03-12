import { Hono } from 'hono';
import { html, raw } from 'hono/html';
import { createTsMorphProject, transformSourceFile } from 'katcn/macros';

const app = new Hono();
const project = createTsMorphProject({
  skipAddingFilesFromTsConfig: false,
});

const exampleCode = `
import { VStack, Text, Icon, getStyles } from 'katcn';

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

const tsmorphOptions = {
  overwrite: true,
} as const;

app.get('/playground/:hash', async (c) => {
  const katcn = await Bun.file(require.resolve('katcn/playground')).text();

  const { hash } = c.req.param();
  const data = await transformSourceFile({
    sourceFile: project.createSourceFile(
      `playground-${hash}-input.tsx`,
      exampleCode,
      tsmorphOptions,
    ),
  });
  const sourceFile1 = project.createSourceFile(
    `playground-${hash}-output.tsx`,
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
  const body = await c.req.text();
  const sourceFile = project.createSourceFile('temp.tsx', body, {
    overwrite: true,
  });

  const data = await transformSourceFile({
    sourceFile,
  });

  console.log(sourceFile.getFullText());
  sourceFile.deleteImmediately();
  return c.text(data.js);
});

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const port = Number.parseInt(Bun.env.PORT!) || 3001;
console.log('Server is running on port 3001');

export default {
  port,
  fetch: app.fetch,
};
