export function flattenObj(
  obj: object,
  opts?: { prefix?: string; suffix?: string; separator?: string },
): string {
  let css = '';
  const { prefix = '', suffix = '', separator = '' } = opts || {};

  for (const propKey in obj) {
    const propVal = obj[propKey as keyof typeof obj];
    const isObject = Object.getPrototypeOf(propVal) === Object.prototype;

    if (isObject) {
      // recursively add object entries, making sure to key is appended to prefix
      css += flattenObj(propVal as object, {
        prefix: `${prefix}${propKey}-`,
        separator,
        suffix,
      });
    } else {
      css += `${prefix}${propKey}${separator} ${propVal}${suffix}\n`;
    }
  }
  return css;
}
