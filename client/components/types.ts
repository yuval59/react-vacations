import { ReactNode } from 'react'
import { ROLES, ROLES_VALUES } from '../constants'
import { formatDate } from './vacations'

type VoidFunction = () => void
type IncludeSearch = { search: string }
type IncludeVacations<VacationType = Vacation> = { vacations: VacationType[] }
type IncludeSetVacation = { setVacation: SetVacation }
type IncludeGetVacations = { getVacations: VoidFunction }
type IncludeDeleteVacation = { deleteVacation: DeleteVacation }
type IncludeAddVacation = { addVacation: AddVacation }
type IncludeJwt = { jwt: string }
type IncludeOpenTooltip = { openTooltip: VoidFunction }
type IncludeCloseTooltip = { closeTooltip: VoidFunction }
type IncludePopupProps = { open: boolean } & IncludeCloseTooltip

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
  params: IncludeVacation & IncludeGetVacations & IncludeJwt & IncludeFormatDate
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
} & IncludeGetVacations &
  IncludeJwt

export type DeleteButtonProps = {
  params: IncludeOpenTooltip
}

export type DeletePopupProps = {
  params: IncludeVacation<AdminVacation> &
    IncludePopupProps &
    IncludeDeleteVacation
}

export type EditButtonProps = {
  params: IncludeOpenTooltip
}

export type EditPopupProps = {
  params: IncludeVacation<AdminVacation> &
    IncludePopupProps &
    IncludeSetVacation
}

export type AddButtonProps = {
  params: IncludeOpenTooltip
}

export type AddPopupProps = {
  params: IncludePopupProps & IncludeAddVacation
}

export type RegisterUserInfo = {
  first_name: string
  last_name: string
  username: string
  password: string
}

type IncludeSetMessage = { setMessage: (value: string) => void }

export type RegisterButtonProps = {
  params: {
    userInfo: RegisterUserInfo
    onSuccess: (value: string) => void
  } & IncludeSetMessage
}

export type LoginUserInfo = {
  username: string
  password: string
}

export type LoginButtonProps = {
  params: {
    userInfo: LoginUserInfo
    onSuccess: (jwt: string, role: ROLES_VALUES) => void
  } & IncludeSetMessage
}

type IncludeSetVacations<VacationType = Vacation> = {
  setVacations: (vacations: VacationType[]) => void
}

type IncludeOnFail = { onFail: (err: unknown) => void }

export type VacationTypeUnion = Vacation | AdminVacation

export type GetVacationsParams<
  VacationType extends VacationTypeUnion = Vacation
> = IncludeOnFail & IncludeJwt & IncludeSetVacations<VacationType>

export type SetVacationParams = IncludeOnFail &
  IncludeJwt &
  IncludeVacations<AdminVacation> &
  IncludeSetVacations<AdminVacation>

export type DeleteVacationParams = IncludeOnFail &
  IncludeJwt &
  IncludeVacations<AdminVacation> &
  IncludeSetVacations<AdminVacation>

export type AddVacationParams = IncludeOnFail & IncludeJwt & IncludeGetVacations

export type NavbarProps = {
  params: {
    middleElement: ReactNode
    logoutParams: LogoutButtonParams
  }
}

export type LogoutButtonParams = {
  logout: VoidFunction
}

export type LogoutButtonProps = {
  params: LogoutButtonParams
}
