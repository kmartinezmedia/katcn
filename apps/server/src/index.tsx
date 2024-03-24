import { Hono } from 'hono';
import { html, raw } from 'hono/html';
import { serveStatic, createBunWebSocket } from 'hono/bun';
import { logger } from 'hono/logger';
import database from './database';

const PORT = process.env.PORT ?? process.env.SERVER_PORT ?? 3001;

const { upgradeWebSocket, websocket } = createBunWebSocket();

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

app.get(
  '/ws/:id',
  upgradeWebSocket((c) => {
    const id = c.req.param('id') ?? 'default';
    return {
      async onMessage(ev, ws) {
        if (ev.type === 'message') {
          console.log('Server WebSocket Message');
          const code = database.set(id, ev.data as string);
          console.log(code);
          ws.send(JSON.stringify(code));
        }
      },
      onOpen(_event, ws) {
        console.log('Server WebSocket Connected');
        // userCode.connections.add(ws);
        // intervalId = setInterval(() => {
        //   ws.send(new Date().toString());
        // }, 200);
      },
      onClose() {
        // clearInterval(intervalId);
      },
    };
  }),
);

console.log(`Server is running on port ${PORT}`);

export default {
  port: PORT,
  fetch: app.fetch,
  websocket,
};
