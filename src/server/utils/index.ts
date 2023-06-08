export { default as jwtSign } from './jwt-sign'
export { default as loginBodyShape } from './login-params'
export { default as getRegisterBodyErrorType } from './register-body-errors'
export { default as registerParams } from './register-params'
export { vacationCreationParams, vacationUpdateParams } from './vacation-params'

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export function objectOmit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Prettify<Omit<T, K>> {
  const newObj: any = {}

  for (const key in obj) if (!keys.includes(key)) newObj[key] = obj[key]

  return newObj
}
