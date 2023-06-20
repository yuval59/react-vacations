import { AdminVacation } from '.'
import {
  IncludeDeleteVacation,
  IncludeFormatDate,
  IncludeGetVacations,
  IncludeJwt,
  IncludeSetVacation,
  IncludeVacation,
} from './misc'

export type UserCardProps = {
  params: IncludeVacation & IncludeGetVacations & IncludeJwt & IncludeFormatDate
}

export type AdminCardProps = {
  params: IncludeVacation<AdminVacation> &
    IncludeFormatDate &
    IncludeSetVacation &
    IncludeDeleteVacation
}
