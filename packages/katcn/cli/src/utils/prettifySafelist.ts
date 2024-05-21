import prettier from 'prettier';

export type Safelist = Set<string>;
export type SafelistMap = Map<string, Set<string>>;

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

export function prettifySafelist(safelistMap: SafelistMap) {
  const flattenedSafelist = flattenSafelistMap(safelistMap);
  const content = `export const safelist = ${JSON.stringify(
    flattenedSafelist,
  )};`;
  return prettier.format(content, {
    parser: 'babel',
  });
}
