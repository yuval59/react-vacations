import { AdminVacation } from '.'
import { ROLES } from '../../constants'
import {
  IncludeDeleteVacation,
  IncludeGetVacations,
  IncludeJwt,
  IncludeSearch,
  IncludeSetVacation,
  IncludeVacations,
} from './misc'

type VacationsAsUser = {
  role: typeof ROLES.USER
  params: IncludeVacations & IncludeSearch & IncludeGetVacations & IncludeJwt
}

type VacationsAsAdmin = {
  role: typeof ROLES.ADMIN
  params: IncludeVacations<AdminVacation> &
    IncludeSetVacation &
    IncludeDeleteVacation
}

export type VacationsComponentProps = VacationsAsAdmin | VacationsAsUser

export type StatsProps = {
  params: IncludeVacations<AdminVacation>
}
