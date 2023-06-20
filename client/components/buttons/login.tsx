import axios, { AxiosError } from 'axios'
import { LoginButtonProps } from '..'
import { ERROR_CODES, FETCH_ROUTES, ROLES_VALUES } from '../../constants'

export default (props: LoginButtonProps) => {
  const { userInfo, onSuccess, setMessage } = props.params

  async function tryLogin() {
    try {
      const { data }: { data: { accessToken: string; role: ROLES_VALUES } } =
        await axios.post(FETCH_ROUTES.BASE + FETCH_ROUTES.LOGIN, userInfo)

      onSuccess(data.accessToken, data.role)
    } catch (err: unknown) {
      const errors = err as Error | AxiosError

      if (axios.isAxiosError(errors) && errors.code == ERROR_CODES.BAD_REQUEST)
        setMessage(errors.response.data)
    }
  }

  return (
    <button
      onClick={tryLogin}
      className="btn btn-outline-light btn-primary btn-lg px-5"
    >
      Login
    </button>
  )
}
