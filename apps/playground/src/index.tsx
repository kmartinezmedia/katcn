import { Hono } from 'hono';
import { html, raw } from 'hono/html';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { createTsMorphProject, transformSourceFile } from 'katcn/macros';
import { defaultExample } from './fixtures/defaultExample';
import { dtsLibs } from '#dtsLibs';
import { decode } from 'base64-url';

const app = new Hono();

app.use(logger());
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

app.get('/dtsLibs', (c) => {
  return c.json(dtsLibs);
});

app.get('/playground/:id', (c) => {
  return c.html(html``);
});

app.get('/playground', async (c) => {
  const props = {
    title: 'katcn Playground',
    description: 'katcn Playground',
    image: 'https://hono.dev/public/hono.png',
  };

  let data = { css: '', js: '' };

  try {
    const codeQuery = c.req.query('code');
    let code = defaultExample;
    let filename = 'defaultExample.tsx';
    if (codeQuery) {
      code = decode(codeQuery);
      const hash = Bun.hash(codeQuery).toString();
      filename = `e-${hash}`;
    }
    const project = createTsMorphProject({
      skipAddingFilesFromTsConfig: false,
    });
    const sourceFile = project.createSourceFile(`${filename}.tsx`, code, {
      overwrite: true,
    });

    data = await transformSourceFile({
      sourceFile: sourceFile,
      removeImports: true,
    });

    sourceFile.deleteImmediately();
  } catch (e) {
    console.error(e);
  }

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

const PORT = process.env.PORT ?? 3000;
console.log(`Server is running on port ${PORT}`);

export default {
  port: PORT,
  fetch: app.fetch,
};
