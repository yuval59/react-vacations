import { ROLES_VALUES } from '../../constants'
import {
  IncludeGetVacations,
  IncludeJwt,
  IncludeOpenTooltip,
  IncludeSetMessage,
} from './misc'

export type LoginUserInfo = {
  username: string
  password: string
}

export type RegisterUserInfo = {
  first_name: string
  last_name: string
  username: string
  password: string
}

export type LoginButtonProps = {
  params: {
    userInfo: LoginUserInfo
    onSuccess: (jwt: string, role: ROLES_VALUES) => void
  } & IncludeSetMessage
}

export type RegisterButtonProps = {
  params: {
    userInfo: RegisterUserInfo
    onSuccess: (value: string) => void
  } & IncludeSetMessage
}

export type AddButtonProps = {
  params: IncludeOpenTooltip
}

export type EditButtonProps = {
  params: IncludeOpenTooltip
}

export type FollowButtonProps = {
  following: boolean
  vacationId: string
} & IncludeGetVacations &
  IncludeJwt

export type DeleteButtonProps = {
  params: IncludeOpenTooltip
}

export type LogoutButtonProps = {
  params: {
    logout: () => void
  }
}
