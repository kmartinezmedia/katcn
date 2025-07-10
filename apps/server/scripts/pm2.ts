import path from 'node:path';
import { parseArgs } from 'node:util';
import { $ } from 'bun';

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    restart: {
      type: 'boolean',
    },
  },
  strict: true,
  allowPositionals: true,
});

const { PM2_APP_NAME } = Bun.env;
const BUN_PATH = Bun.which('bun');
const SERVER_DIRECTORY = path.resolve(__dirname, '../');
const PM2_CONFIG = `${SERVER_DIRECTORY}/pm2.config.cjs`;
const SERVER_ENTRYPOINT = `${SERVER_DIRECTORY}/src/index.ts`;

async function runCommand(command: 'start' | 'restart') {
  await $`pm2 ${command} --interpreter ${BUN_PATH} ${SERVER_ENTRYPOINT} --name ${PM2_APP_NAME} ${PM2_CONFIG} `;
}

if (values.restart) {
  console.log('restart server');
  await $`git pull`;
  await runCommand('restart');
} else {
  console.log('start server');
  await runCommand('start');
}
