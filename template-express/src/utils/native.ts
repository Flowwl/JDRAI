export const removeUndefinedValuesFromObject = (obj: any) => {
  const newObj = { ...obj }
  Object.keys(newObj).forEach(key => newObj[key] === undefined ? delete newObj[key] : {})

  return newObj
}

export function convertEntries<T, U>(obj: { [key: string]: T }, conversionFunc: ([key, value]: [string, T]) => [string, U]): { [key: string]: U } {
  return Object.fromEntries(Object.entries(obj).map(conversionFunc))
}

