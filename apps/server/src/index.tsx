import { Hono } from 'hono';
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
          ws.send(JSON.stringify(code));
        }
      },
      onOpen(_event, ws) {
        console.log('Server WebSocket Connected');
        const code = database.get('default');
        ws.send(JSON.stringify(code));
      },
      onClose() {
        console.log('Server WebSocket Closed');
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
