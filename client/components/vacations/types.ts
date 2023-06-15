import { ROLES } from '../../constants'

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

export type AdminVacation = Vacation & {
  followers: Follower[]
}

type IncludeVacationProps<VacationType = Vacation> = {
  vacationProps: {
    jwt: string
    vacations: VacationType[]
    getVacations: () => void
  }
}

type IncludeSearchProps = {
  searchProps: string
}

export type AsUser = {
  role: typeof ROLES.USER
} & IncludeVacationProps &
  IncludeSearchProps

export type AsAdmin = {
  role: typeof ROLES.ADMIN
} & IncludeVacationProps<AdminVacation>
