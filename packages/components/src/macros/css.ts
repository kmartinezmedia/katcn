import { flattenObj } from '../helpers';

export function css(
  literalSections: TemplateStringsArray,
  ...strings: unknown[]
) {
  // Use raw literal sections: we don’t want backslashes (\n etc.) to be interpreted
  const raw = literalSections.raw;
  let result = '';

  strings.forEach((item, index) => {
    // Retrieve the literal section preceding the current substitution
    let modifiedItem = item;

    switch (Object.getPrototypeOf(item)) {
      case Object.prototype: {
        modifiedItem = {
          [Symbol.toPrimitive](hint: string) {
            if (hint === 'string') {
              const keys = Object.keys(item as object);
              const isVar = keys.every((key) => key === 'color');

              const separator: string = isVar ? ':' : ' ';
              const prefix = isVar ? '--' : '.';
              const suffix = isVar ? ';' : '';
              return flattenObj(item as object, { prefix, suffix, separator });
            }
          },
        };
        break;
      }
    }
    const value = raw[index];
    result = `${result}${value}${modifiedItem}`;
  });
  // Take care of last literal section
  // (Never fails, because an empty template string
  // produces one literal section, an empty string)
  result += raw[raw.length - 1]; // (A)

  return result.trimEnd();
}
