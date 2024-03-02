export function entries<T>(item: T) {
  return Object.entries(item as Record<string, unknown>) as [
    Extract<keyof T, string> extends never ? string : Extract<keyof T, string>,
    T[keyof T],
  ][];
}
