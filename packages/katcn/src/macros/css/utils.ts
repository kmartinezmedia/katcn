import { cssEscape, entries, flattenObj } from '../../helpers/';
import { createUtilities } from './createUtilities';

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

export function getClassnameDeclarations(classnames: Set<string>) {
  const declarations: string[] = [];
  const arbitraryClassnames = getArbitraryClassnames(classnames);
  const utilsObj = flattenObj(createUtilities());

  for (const classname of arbitraryClassnames) {
    const value = convertArbitraryDefinition(classname);
    if (value) {
      let valueString = '';
      for (const [key, val] of entries(value)) {
        valueString += `${key}: ${val};`;
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
