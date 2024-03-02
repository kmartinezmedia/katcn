import { buildIcons, buildJsxRuntime, buildPackage } from './tasks';

await Promise.allSettled([
  buildIcons(true),
  buildJsxRuntime(true),
  buildPackage(true),
]);
