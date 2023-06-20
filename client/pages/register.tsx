import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { RegisterButton, RegisterUserInfo } from '../components'
import { ROUTES } from '../constants'

export default () => {
  const router = useRouter()
  const [{ jwt }, setCookie] = useCookies(['jwt'])
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  })

  const setRoute = (destination: (typeof ROUTES)[keyof typeof ROUTES]) => () =>
    router.push(destination)

  const onSuccess = (value: string) => {
    setCookie('jwt', value)
    setRoute(ROUTES.VACATIONS)()
  }

  const [message, setMessage] = useState('')

  const getInputField = (
    name: string,
    key: keyof RegisterUserInfo,
    type: string = 'text'
  ) => (
    <div className="form-outline form-white mb-4">
      <label className="form-label">{name}</label>
      <input
        type={type}
        className="form-control form-control-lg"
        value={userInfo[key]}
        onChange={({ target: { value } }) => {
          setUserInfo({ ...userInfo, [key]: value })
        }}
      />
    </div>
  )

  const RegisterButtonParams = {
    onSuccess,
    userInfo,
    setMessage,
  }

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white">
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                <p className="text-white-50 mb-5">
                  Please enter your details below!
                </p>

                <div className="text-danger" hidden={message == ''}>
                  {message}
                </div>

                {getInputField('First name', 'first_name')}

                {getInputField('Last name', 'last_name')}

                {getInputField('Username', 'username')}

                {getInputField('Password', 'password', 'password')}

                <RegisterButton params={RegisterButtonParams} />
              </div>

              <div>
                <p className="mb-0">
                  {'Already have an account? '}
                  <a
                    href="#"
                    onClick={setRoute(ROUTES.LOGIN)}
                    className="link-primary"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
