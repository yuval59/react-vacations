import { ReactNode } from 'react'
import { AdminVacation, LogoutButtonProps } from '.'
import { IncludeVacations } from './misc'

export type StatsProps = {
  params: IncludeVacations<AdminVacation>
}

export type NavbarProps = {
  params: {
    middleElement: ReactNode
    logoutParams: LogoutButtonProps['params']
  }
}
