import { AdminVacation, Vacation } from '../components/types'
import {
  IncludeGetVacations,
  IncludeJwt,
  IncludeOnFail,
  IncludeSetVacations,
  IncludeVacations,
} from '../components/types/misc'
import { ROLES } from '../constants'

type GetVacationsAsUser = {
  role: typeof ROLES.USER
} & IncludeOnFail &
  IncludeJwt &
  IncludeSetVacations

type GetVacationsAsAdmin = {
  role: typeof ROLES.ADMIN
} & IncludeOnFail &
  IncludeJwt &
  IncludeSetVacations<AdminVacation>

export type GetVacationsParams = GetVacationsAsUser | GetVacationsAsAdmin

type SortVacationsAsUser = {
  role: typeof ROLES.USER
  a: Vacation
  b: Vacation
}

type SortVacationsAsAdmin = {
  role: typeof ROLES.ADMIN
  a: AdminVacation
  b: AdminVacation
}

export type SortVacationsParams = SortVacationsAsUser | SortVacationsAsAdmin

export type SetVacationParams = IncludeOnFail &
  IncludeJwt &
  IncludeVacations<AdminVacation> &
  IncludeSetVacations<AdminVacation>

export type DeleteVacationParams = IncludeOnFail &
  IncludeJwt &
  IncludeVacations<AdminVacation> &
  IncludeSetVacations<AdminVacation>

export type AddVacationParams = IncludeOnFail & IncludeJwt & IncludeGetVacations
