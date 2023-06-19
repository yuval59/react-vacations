import { VacationCreationParams, VacationUpdateParams } from '../'

export { default as VacationsComponent, formatDate } from './vacations'

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export const objectExclude = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Prettify<Omit<T, K>> => {
  const newObj: any = {}
  for (const key in obj) if (!keys.includes(key)) newObj[key] = obj[key]
  return newObj
}

export const removeNulls = (
  params: VacationUpdateParams | VacationCreationParams
) => {
  const res = {}
  for (const key in params) if (params[key] != null) res[key] = params[key]
  return res
}
