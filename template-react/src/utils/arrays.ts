export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.reduce((acc: T[], elt) => [...acc, ...((Array.isArray(elt) ? flatten(elt) : [elt]) as T[])], []);
}
