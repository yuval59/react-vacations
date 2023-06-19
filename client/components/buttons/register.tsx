import axios, { AxiosError } from 'axios'
import { RegisterButtonProps } from '../'
import { ERROR_CODES, FETCH_ROUTES } from '../../constants'

export default (props: RegisterButtonProps) => {
  const { userInfo, onSuccess, onFail } = props.params

  async function tryRegister() {
    try {
      const { data }: { data: { accessToken: string } } = await axios.post(
        FETCH_ROUTES.BASE + FETCH_ROUTES.REGISTER,
        userInfo
      )

      onSuccess(data.accessToken)
    } catch (err: unknown) {
      const errors = err as Error | AxiosError

      if (axios.isAxiosError(errors) && errors.code == ERROR_CODES.BAD_REQUEST)
        onFail(errors.response.data)
    }
  }

  return (
    <button
      onClick={tryRegister}
      className="btn btn-outline-light btn-primary btn-lg px-5"
    >
      Register
    </button>
  )
}
