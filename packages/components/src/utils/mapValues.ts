type AnyObject = Record<string, unknown>;

export function mapValues<
  T extends AnyObject,
  K extends (value: T[keyof T], key: keyof T, i: number) => unknown,
>(obj: T, callbackFn: K) {
  return Object.keys(obj).reduce(
    (acc, key: keyof T, i) => {
      acc[key] = callbackFn(obj[key], key, i) as ReturnType<typeof callbackFn>;
      return acc;
    },
    // eslint-disable-next-line
    {} as { [key in keyof T]: ReturnType<K> },
  );
}
