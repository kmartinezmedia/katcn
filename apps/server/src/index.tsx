import { Hono } from 'hono';
import { html, raw } from 'hono/html';
import { serveStatic } from 'hono/bun';
import { createBunWebSocket } from 'hono/bun';
import { logger } from 'hono/logger';
import { createTsMorphProject, transformSourceFile } from 'katcn/macros';
import dtsLibs from '#dtsLibs' with { type: 'json' };
import { decode } from 'base64-url';
import type { SourceFile } from 'ts-morph';
const { upgradeWebSocket, websocket } = createBunWebSocket();

const userCodeMap = new Map<string, UserCode>();
const PORT = process.env.PORT ?? process.env.SERVER_PORT ?? 3001;
const project = createTsMorphProject({ skipAddingFilesFromTsConfig: true });

const defaultExample = `
import { VStack, Text, Icon, getStyles } from 'katcn';

function Example() {
  const customStyles = getStyles({
    borderWidth: 'thick',
    borderColor: 'warning',
    backgroundColor: 'accent'
  });

  return (
    <VStack backgroundColor="alert">
      <VStack width="half" backgroundColor="accent">
        <Text color="on-color" variant="display1" className={customStyles}>
          something
        </Text>
        <Icon name="addFile" size="lg" />
      </VStack>
    </VStack>
  )
}
`;
class UserCode {
  sourceFile: SourceFile;
  transformedCode?: Awaited<ReturnType<typeof transformSourceFile>>;

  constructor(
    public id: string,
    public _code: string,
  ) {
    this.sourceFile = project.createSourceFile(`${id}.tsx`, _code);
  }

  get code() {
    return this._code;
  }

  async updateCode(code: string) {
    this._code = decode(code);
    this.sourceFile.replaceWithText(code);
    await this.transformCode();
  }

  async transformCode() {
    this.transformedCode = await transformSourceFile({
      sourceFile: this.sourceFile,
      removeImports: true,
    });
    return this.transformedCode;
  }
}

const defaultUserCode = new UserCode('default', defaultExample);
await defaultUserCode.transformCode();
userCodeMap.set('default', defaultUserCode);

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

app.get(
  '/ws/:id',
  upgradeWebSocket((c) => {
    const id = c.req.param('id') ?? 'default';
    const userCode = userCodeMap.get(id);
    let intervalId: Timer;
    return {
      async onMessage(ev, ws) {
        console.log(ev);
        if (ev.type === 'message') {
          if (ev.data?.type === 'client-update') {
            console.log('server updating based on client data');
            await userCode.updateCode(ev.data?.code);
            ws.send(userCode.transformedCode.js);
          }
        }
      },
      onOpen(_event, ws) {
        console.log('WebSocket Connected');
        // userCode.connections.add(ws);
        // intervalId = setInterval(() => {
        //   ws.send(new Date().toString());
        // }, 200);
      },
      onClose() {
        clearInterval(intervalId);
      },
    };
  }),
);

app.get('/preview/:id', async (c) => {
  const id = c.req.param('id');
  const defaultUserCode = userCodeMap.get('default');
  if (!userCodeMap.has(id)) {
    userCodeMap.set(id, new UserCode(id, defaultUserCode.code));
  }

  const websockClient = `
    const ws = new WebSocket('ws://localhost:${PORT}/ws/${id}')
    const $nowTime = document.getElementById('now-time')
    ws.onopen = () => {
      console.log('WebSocket Connected');
    };
    ws.onmessage = (ev) => {
      // $nowTime.textContent = ev.data
    }
  `;

  return c.html(
    html`
    <html>
    <head>
      <meta charset="UTF-8">
      <title>katcn</title>
      <meta name="description" content="playground">
      <head prefix="og: http://ogp.me/ns#">
      <meta property="og:type" content="article">
      <!-- More elements slow down JSX, but not template literals. -->
      <meta property="og:title" content="playground">
      <meta property="og:image" content="">
      <style>
        @font-face {
          font-family: "icons";
          src: url("/dist/icons.woff2") format("woff2");
        }
        ${raw(defaultUserCode.transformedCode.css)}
      </style>
      <script type="module">
      import { createRoot } from 'https://esm.sh/react-dom/client';
      ${raw(initJS)}
      ${raw(defaultUserCode.transformedCode.js)}
      ${raw(websockClient)}

      const root = createRoot(document.getElementById('app'));
      root.render(Example());
      </script>
    </head>
    <body>
      <div id='now-time'>replace with data</div>
      <div id="app"></div>
    </body>
    </html>
    `,
  );
});

console.log(`Server is running on port ${PORT}`);

export default {
  port: PORT,
  fetch: app.fetch,
  websocket,
};
