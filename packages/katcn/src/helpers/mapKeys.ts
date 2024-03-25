type AnyObject = Record<string, unknown>;

export function mapKeys<
  T extends AnyObject,
  K extends (value: T[keyof T], key: keyof T, obj: T) => PropertyKey,
>(obj: T, callbackFn: K) {
  return Object.keys(obj).reduce(
    (acc, key: keyof T) => {
      const newKey = callbackFn(obj[key], key, obj) as ReturnType<
        typeof callbackFn
      >;
      acc[newKey] = obj[key];
      return acc;
    },
    {} as { [key in ReturnType<K>]: T[keyof T] },
  );
}
