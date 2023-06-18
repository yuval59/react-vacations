import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { ROUTES } from '../constants'

type NavbarProps = {
  middleElement: ReactNode
}

export default (props: NavbarProps) => {
  const router = useRouter()

  const logout = () => {
    router.push(ROUTES.LOGIN)
  }

  const { middleElement } = props

  return (
    <div className="navbar navbar-light bg-light mb-2 d-flex justify-content-around">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      {middleElement}
      <button className="btn btn-info" onClick={logout}>
        Log Out
      </button>
    </div>
  )
}
