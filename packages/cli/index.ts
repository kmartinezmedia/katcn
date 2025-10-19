#!/usr/bin/env bun

import { run } from 'bluebun';

await run({
  name: 'cli',
  cliPath: `${__dirname}/src`,
});
