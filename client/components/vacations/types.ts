import { ROLES } from '../../constants'
import { formatDate } from './'

type IncludeSearch = { search: string }
type IncludeVacations<VacationType = Vacation> = {
  vacations: VacationType[]
}
type IncludeSetVacation = {
  setVacation: SetVacation
}
type IncludeGetVacation = {
  getVacations: () => void
}
type IncludeDeleteVacation = {
  deleteVacation: DeleteVacation
}
type IncludeAddVacation = {
  addVacation: AddVacation
}
type IncludeJwt = {
  jwt: string
}
type IncludePopupProps = {
  open: boolean
  closeTooltip: () => void
}

type VacationsAsUser = {
  role: typeof ROLES.USER
  params: IncludeVacations & IncludeSearch & IncludeGetVacation & IncludeJwt
}

type VacationsAsAdmin = {
  role: typeof ROLES.ADMIN
  params: IncludeVacations<AdminVacation> &
    IncludeSetVacation &
    IncludeDeleteVacation
}

type IncludeVacation<VacationType = Vacation> = {
  vacation: VacationType
}
type IncludeFormatDate = {
  formatDate: typeof formatDate
}

export type VacationsComponentProps = VacationsAsAdmin | VacationsAsUser

export type Vacation = {
  id: string
  description: string
  destination: string
  picture: string
  start_date: string
  end_date: string
  price: number
  following: boolean
}

export type Follower = {
  id: string
  first_name: string
  last_name: string
  username: string
}

export type AdminVacation = Omit<Vacation, 'following'> & {
  followers: Follower[]
}

export type VacationUpdateParams = {
  id: string

  description?: string
  picture?: string
  price?: number
  destination?: string
  start_date?: string
  end_date?: string
}

export type VacationCreationParams = {
  destination: string
  start_date: string
  end_date: string

  description?: string
  picture?: string
  price?: number
}

export type SetVacation = (params: VacationUpdateParams) => void
export type DeleteVacation = (id: string) => void
export type AddVacation = (params: VacationCreationParams) => void

export type UserCardProps = {
  params: IncludeVacation & IncludeGetVacation & IncludeJwt & IncludeFormatDate
}

export type AdminCardProps = {
  params: IncludeVacation<AdminVacation> &
    IncludeFormatDate &
    IncludeSetVacation &
    IncludeDeleteVacation
}

export type FollowButtonProps = {
  following: boolean
  vacationId: string
  jwt: string
  getVacations: () => void
}

export type DeleteButtonProps = {
  params: { openTooltip: () => void }
}

export type DeletePopupProps = {
  params: IncludeVacation<AdminVacation> &
    IncludePopupProps &
    IncludeDeleteVacation
}

export type EditButtonProps = {
  params: { openTooltip: () => void }
}

export type EditPopupProps = {
  params: IncludeVacation<AdminVacation> &
    IncludePopupProps &
    IncludeSetVacation
}

export type AddButtonProps = {
  params: { openTooltip: () => void }
}

export type AddPopupProps = {
  params: IncludePopupProps & IncludeAddVacation
}
