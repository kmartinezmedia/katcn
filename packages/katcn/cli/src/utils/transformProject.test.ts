import { afterEach, describe, expect, it, spyOn } from 'bun:test';
import path from 'node:path';
import { Project } from 'ts-morph';
import { flattenSafelistMap } from './prettifySafelist';
import { transformProject } from './transformProject';

const productDir = path.resolve(
  import.meta.dirname,
  '../../../../../apps/web-demo',
);
const webDemoTsConfig = `${productDir}/tsconfig.json`;

const project = new Project({
  skipAddingFilesFromTsConfig: false,
  tsConfigFilePath: webDemoTsConfig,
});

const opts = {
  project,
  watch: false,
  pwd: productDir,
};

describe('transformProject', () => {
  afterEach(() => {
    Bun.env.NODE_ENV = 'test';
  });

  it('Should handle web demo', async () => {
    const safelist = await transformProject(opts);
    expect(safelist).toBeDefined();
  });
  it('Should not throw console error', async () => {
    Bun.env.NODE_ENV = 'production';
    const spy = spyOn(console, 'error');
    await transformProject(opts);
    expect(spy).toHaveBeenCalledTimes(0);
  });
  it('Should not contain any undefined values', async () => {
    const safelist = await transformProject(opts);
    const flattenedSafelist = flattenSafelistMap(safelist);
    const hasUndefinedString = flattenedSafelist.some((value) =>
      value.includes('undefined'),
    );
    expect(hasUndefinedString).toBe(false);
  });
});
