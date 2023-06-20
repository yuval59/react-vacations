import { ReactNode } from 'react'
import { LogoutButtonProps } from '.'

export type NavbarProps = {
  params: {
    middleElement: ReactNode
    logoutParams: LogoutButtonProps['params']
  }
}
