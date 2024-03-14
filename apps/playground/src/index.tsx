import { Hono } from 'hono';
import { html, raw } from 'hono/html';
import { serveStatic } from 'hono/bun';
import { createTsMorphProject, transformSourceFile } from 'katcn/macros';
import { defaultExample } from './fixtures/defaultExample';
import { dtsLibs } from './fixtures/dtsLibs';

const app = new Hono();

app.use(
  '/dist/*',
  serveStatic({
    root: '.',
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  }),
);

const initJS = await Bun.file('./dist/init.js').text();

const project = createTsMorphProject({
  skipAddingFilesFromTsConfig: false,
});

const transpiler = new Bun.Transpiler({
  loader: 'tsx',
  tsconfig: {
    compilerOptions: {
      jsx: 'react-jsx',
      jsxImportSource: 'katcn',
    },
  },
  autoImportJSX: false,
});

const defaultExampleSourceFile = project.createSourceFile(
  'defaultExample.tsx',
  transpiler.transformSync(defaultExample),
  { overwrite: true },
);

const data = await transformSourceFile({
  sourceFile: defaultExampleSourceFile,
  removeImports: true,
});

app.get('/dtsLibs', (c) => {
  return c.json(dtsLibs);
});

app.get('/playground', async (c) => {
  const props = {
    title: 'katcn Playground',
    description: 'katcn Playground',
    image: 'https://hono.dev/public/hono.png',
  };

  return c.html(
    html`
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${props.title}</title>
      <meta name="description" content="${props.description}">
      <head prefix="og: http://ogp.me/ns#">
      <meta property="og:type" content="article">
      <!-- More elements slow down JSX, but not template literals. -->
      <meta property="og:title" content="${props.title}">
      <meta property="og:image" content="${props.image}">
      <style>
        @font-face {
          font-family: "icons";
          src: url("dist/icons.woff2") format("woff2");
        }
        ${raw(data.css)}
      </style>
      <script type="module">
      import { createRoot } from 'https://esm.sh/react-dom/client';
      ${raw(initJS)}
      ${raw(data.js)}
      const root = createRoot(document.getElementById('app'));
      root.render(Example());
      </script>
    </head>
    <body>
      <div id="app"></div>
    </body>
    </html>
    `,
  );
});

console.log('Server is running on port 3001');

export default app;
