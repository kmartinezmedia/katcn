import { buildIcons, buildJsxRuntime, buildPackage, buildTypes } from './tasks';

await Promise.allSettled([
  buildIcons(true),
  buildJsxRuntime(true),
  buildPackage(true),
  buildTypes(true),
]);
