export function entries<T>(item: T) {
  return Object.entries(item as Record<string, unknown>) as [
    Extract<keyof T, string>,
    T[keyof T],
  ][];
}
