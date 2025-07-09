import { Hono } from 'hono';
import { createBunWebSocket } from 'hono/bun';
import { logger } from 'hono/logger';
import database from './database';

const PORT = process.env.PORT ?? process.env.SERVER_PORT ?? 3001;

const { upgradeWebSocket, websocket } = createBunWebSocket();

await database.init();

const app = new Hono();

app.use(logger());

app.get('/', (c) => c.text('katcn API'));

app.get(
  '/ws/:id',
  upgradeWebSocket((c) => {
    const id = c.req.param('id') ?? 'default';
    return {
      async onMessage(ev, ws) {
        if (ev.type === 'message') {
          console.log(`WebSocket message: ${id}`);
          const code = await database.set(id, ev.data as string);
          ws.send(JSON.stringify(code));
        }
      },
      async onOpen(_event, ws) {
        console.log(`WebSocket connected: ${id}`);
        const code = await database.get('default');
        ws.send(JSON.stringify(code));
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
