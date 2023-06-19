export { default as VacationsComponent, formatDate } from './vacations'

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export const objectExclude = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Prettify<Omit<T, K>> => {
  const newObj: any = {}
  for (const key of keys) newObj[key] = obj[key]
  return newObj
}
