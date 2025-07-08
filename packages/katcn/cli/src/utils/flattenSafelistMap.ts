import type { SafelistMap } from '../types';

export function flattenSafelistMap(safelistMap: SafelistMap) {
  const allClassNames = new Set<string>();
  for (const classNames of safelistMap.values()) {
    for (const className of classNames) {
      const splitClassName = className.trimStart().trimEnd().split(' ');
      for (const sClassName of splitClassName) {
        allClassNames.add(sClassName);
      }
    }
  }
  return Array.from(allClassNames);
}
