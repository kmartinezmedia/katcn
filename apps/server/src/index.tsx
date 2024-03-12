import { transformSourceFile, createTsMorphProject } from 'katcn/macros';
import { Hono } from 'hono';
import { html, raw } from 'hono/html';

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

app.get('/playground/:hash', async (c) => {
  const [katcnRuntime, katcnLib] = await Promise.all([
    Bun.file(require.resolve('katcn/jsx-dev-runtime')).text(),
    Bun.file(require.resolve('katcn')).text(),
  ]);

  const { hash } = c.req.param();
  const sourceFile = project.createSourceFile('temp.tsx', exampleCode);
  const data = await transformSourceFile({
    sourceFile,
  });

  sourceFile.deleteImmediately();

  return c.html(
    html`<!DOCTYPE html>
      <style>
        ${raw(data.css)}
      </style>
<script type="module">
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
${raw(
  katcnRuntime
    .replaceAll(
      'react/jsx-dev-runtime',
      'https://esm.sh/react@18.2.0/jsx-dev-runtime.js',
    )
    .replaceAll(`"react"`, `"https://esm.sh/react@18.2.0"`),
)}
${raw(katcnLib)}
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
