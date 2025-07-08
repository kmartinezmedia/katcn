import type { Safelist } from '../types';

export function flattenSafelist(safelist: Safelist) {
  const list = new Set<string>();
  for (const className of safelist) {
    const splitClassName = className.trimStart().trimEnd().split(' ');
    for (const sClassName of splitClassName) {
      list.add(sClassName);
    }
  }
  return Array.from(list).filter(Boolean);
}
