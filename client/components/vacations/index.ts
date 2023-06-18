import { VacationCreationParams, VacationUpdateParams } from './types'

export type {
  AddButtonProps,
  AddPopupProps,
  AddVacation,
  AdminCardProps,
  AdminVacation,
  DeleteButtonProps,
  DeletePopupProps,
  DeleteVacation,
  EditButtonProps,
  EditPopupProps,
  FollowButtonProps,
  Follower,
  SetVacation,
  UserCardProps,
  Vacation,
  VacationCreationParams,
  VacationUpdateParams,
  VacationsComponentProps,
} from './types'
export { default as VacationsComponent, formatDate } from './vacations'

export { AddButton, DeleteButton, EditButton, FollowButton } from './buttons'
export { AdminCardComponent, UserCardComponent } from './cards'
export { AddPopup, DeletePopup, EditPopup } from './popups'

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
