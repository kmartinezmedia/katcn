export function flattenObj<T>(obj: T, keyName?: string) {
  let result: Record<string, string> = {};

  for (const key in obj) {
    const newKey = keyName ? `${keyName}-${key}` : key;
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      result = { ...result, ...flattenObj(obj[key], newKey) };
    } else {
      result[newKey] = obj[key] as string;
    }
  }
  return result;
}
