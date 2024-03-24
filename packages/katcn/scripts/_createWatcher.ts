import { watch } from 'node:fs';

const watchers = new Map<string, ReturnType<typeof watch>>();

export function createWatcher(dir: string, onChange: () => Promise<void>) {
  const watcher = watch(dir, { recursive: true }, async (_event, filename) => {
    console.info(`katcn update: ${filename}`);
    await onChange();
  });
  watchers.set(dir, watcher);
}

process.on('SIGINT', () => {
  // close watcher when Ctrl-C is pressed
  for (const [dir, watcher] of watchers) {
    console.info('Closing watcher...', dir);
    watcher.close();
  }

  process.exit(0);
});
