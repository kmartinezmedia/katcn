import { buildIcons, buildJsxRuntime, buildPackage, buildTypes } from './tasks';

await buildIcons();
await buildJsxRuntime();
await buildPackage();
await buildTypes();
