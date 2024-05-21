import { Project, type ProjectOptions } from 'ts-morph';

export function createTsMorphProject(opts?: ProjectOptions) {
  return new Project({
    skipAddingFilesFromTsConfig: false,
    ...opts,
  });
}
