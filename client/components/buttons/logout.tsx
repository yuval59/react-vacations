import { LogoutButtonProps } from '../'

export default (props: LogoutButtonProps) => {
  const { logout } = props.params

  return (
    <button className="btn btn-info" onClick={logout}>
      Log Out
    </button>
  )
}
