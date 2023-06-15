import { AdminVacation, Vacation, formatDate } from '../'
import { ROLES } from '../../../constants'

type IncludeVacation = { vacation: Vacation }
type IncludeAdminVacation = { vacation: AdminVacation }
type IncludeJwt = { jwt: string }
type IncludeGetVacations = { getVacations: () => void }
type IncludeFormatDate = { formatDate: typeof formatDate }

export type UserCardProps = {
  params: IncludeVacation & IncludeJwt & IncludeGetVacations & IncludeFormatDate
}

export type AdminCardProps = {
  params: IncludeAdminVacation & IncludeFormatDate
}

export type AsUser = {
  role: typeof ROLES.USER
} & IncludeVacation &
  IncludeJwt &
  IncludeGetVacations

export type AsAdmin = {
  role: typeof ROLES.ADMIN
} & IncludeAdminVacation
