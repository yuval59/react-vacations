import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { ROLES_VALUES, ROUTES } from '../constants'
import { LoginButton, LoginUserInfo } from './'

export default () => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['jwt'])
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  })
  const [message, setMessage] = useState('')

  const setRoute = (destination: (typeof ROUTES)[keyof typeof ROUTES]) => () =>
    router.push(destination)

  const onSuccess = (jwt: string, role: ROLES_VALUES) => {
    setCookie('jwt', jwt)

    switch (role) {
      case 'user':
        return setRoute(ROUTES.VACATIONS)()

      case 'admin':
        return setRoute(ROUTES.ADMIN)()
    }
  }

  const LoginButtonParams = { userInfo, onSuccess, setMessage }

  const getInputField = (
    name: string,
    key: keyof LoginUserInfo,
    type: string = 'text'
  ) => (
    <div className="form-outline form-white mb-4">
      <label className="form-label">{name}</label>
      <input
        type={type}
        className="form-control form-control-lg"
        value={userInfo[key]}
        onChange={({ target: { value } }) => {
          setUserInfo({
            ...userInfo,
            [key]: value,
          })
        }}
      />
    </div>
  )

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white">
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your username and password!
                </p>

                <div className="text-danger" hidden={message == ''}>
                  {message}
                </div>

                {getInputField('Username', 'username')}

                {getInputField('Password', 'password', 'password')}

                <LoginButton params={LoginButtonParams}></LoginButton>
              </div>

              <div>
                <p className="mb-0">
                  {`Don't have an account? `}
                  <a
                    href="#"
                    onClick={setRoute(ROUTES.REGISTER)}
                    className="link-primary"
                  >
                    Sign Up
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
