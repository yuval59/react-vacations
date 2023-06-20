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

export type VacationData = {
  destination: string
  followers: Follower[]
  following: number
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
