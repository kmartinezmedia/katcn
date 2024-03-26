import { describe, expect, it } from 'bun:test';
import database, { process, defaultSourceFile } from './database';

describe('database', () => {
  it('Should return correct css', async () => {
    const data = await process(defaultSourceFile);
    console.log(data);
    expect(data).toBeDefined();
  });
});
