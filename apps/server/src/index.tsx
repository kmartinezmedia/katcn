import { Hono } from 'hono';
import { createBunWebSocket, serveStatic } from 'hono/bun';
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

app.get('/', (c) => c.text('katcn API'));

app.get(
  '/ws/:id',
  upgradeWebSocket((c) => {
    const id = c.req.param('id') ?? 'default';
    return {
      onMessage(ev, ws) {
        if (ev.type === 'message') {
          console.log(`WebSocket message: ${id}`);
          database.set(id, ev.data as string).then((data) => {
            ws.send(JSON.stringify(data));
          });
        }
      },
      onOpen(_event, ws) {
        console.log(`WebSocket connected: ${id}`);
        database.get('default').then((data) => {
          console.log('sending onOpen data');
          ws.send(JSON.stringify(data));
        });
      },
      onClose() {
        console.log(`WebSocket closed: ${id}`);
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
