import { $ } from 'bun';
import { Hono } from 'hono';
import { createBunWebSocket } from 'hono/bun';
import { logger } from 'hono/logger';
import database from './database';

const { PORT, GIT_WEBHOOK_SECRET } = process.env;

const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono();

app.use(logger());

app.get('/', (c) => c.text('katcn API'));

app.post('/github-webhook', async (c) => {
  const auth = c.req.header('authorization');
  const expected = `Bearer ${GIT_WEBHOOK_SECRET}`;

  if (auth !== expected) {
    console.log(`Unauthorized access attempt: ${auth}`);
    return c.text('Forbidden', 403);
  }

  console.log('✅ Valid signature received');
  await $`bun run server:restart`;
});

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

Bun.serve({
  port: PORT ?? '4001',
  fetch: app.fetch,
  websocket,
});
