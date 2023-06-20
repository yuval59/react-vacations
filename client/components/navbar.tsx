import { NavbarProps } from '.'
import { LogoutButton } from './buttons'

export default (props: NavbarProps) => {
  const { middleElement, logoutParams } = props.params

  return (
    <div className="navbar navbar-light bg-light mb-2 d-flex justify-content-around">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      {middleElement}
      <LogoutButton params={logoutParams} />
    </div>
  )
}
