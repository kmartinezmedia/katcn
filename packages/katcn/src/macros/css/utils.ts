import { cssEscape, entries, flattenObj } from '../../helpers/';
import type { UniversalTokensConfig } from '../../types';
import { createUtilities } from './createUtilities';
import { propertyMap } from './propertyMap';

export function convertArbitraryDefinition(
  input: string,
): { [key: string]: string } | null {
  // Regular expression to extract the key and value
  const regex = /(\w+)-\[(\d+px)\]/;
  const match = input.match(regex);

  if (match) {
    // match[1] contains the key (e.g., "height")
    // match[2] contains the value (e.g., "200px")
    const key = match[1];
    const value = match[2];

    // Constructing the object dynamically
    const result = { [key]: value };
    return result;
  }

  return null; // Return null if no match was found
}

export function getArbitraryClassnames(classnames: Set<string>) {
  const filtered: string[] = [];

  for (const className of classnames) {
    if (className.includes('-[')) {
      filtered.push(className);
    }
  }
  return filtered;
}

export function getClassnameDeclarations(
  classnames: Set<string>,
  config: UniversalTokensConfig,
) {
  const declarations: string[] = [];
  const arbitraryClassnames = getArbitraryClassnames(classnames);
  const utilsObj = flattenObj(createUtilities(config));

  for (const classname of arbitraryClassnames) {
    const value = convertArbitraryDefinition(classname);
    if (value) {
      let valueString = '';
      for (const [key, val] of entries(value)) {
        if (key in propertyMap) {
          const cssProp = propertyMap[key as keyof typeof propertyMap];
          if (Array.isArray(cssProp)) {
            // TODO: figure this out. Some props in lib are compound css props
            // May want to use map where value is function and returns entire declaration string based on lib key + custom value
          } else {
            valueString += `${cssProp}: ${val};`;
          }
        }
      }
      utilsObj[classname] = `{ ${valueString} }`;
    }
  }

  for (const [classname, definition] of entries(utilsObj)) {
    const escapedClassname = cssEscape(classname);
    declarations.push(`.${escapedClassname} ${definition}`);
  }

  return declarations;
}
