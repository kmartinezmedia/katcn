import { buildIcons, buildJsxRuntime, buildPackage } from './tasks';

await buildIcons();
await buildJsxRuntime();
await buildPackage();
