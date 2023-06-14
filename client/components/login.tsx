import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { FETCH_ROUTES, ROUTES } from '../constants'

function LoginComponent() {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['jwt'])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function tryLogin() {
    try {
      const { data } = await axios.post(
        FETCH_ROUTES.BASE + FETCH_ROUTES.LOGIN,
        {
          username,
          password,
        }
      )

      setCookie('jwt', data.accessToken)

      router.push('/')
    } catch (err) {}
  }

  function register() {
    router.push(ROUTES.REGISTER)
  }

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

                <div className="form-outline form-white mb-4">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={username}
                    onChange={({ target: { value } }) => {
                      setUsername(value)
                    }}
                  />
                </div>

                <div className="form-outline form-white mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={({ target: { value } }) => {
                      setPassword(value)
                    }}
                  />
                </div>

                <button
                  onClick={tryLogin}
                  className="btn btn-outline-light btn-primary btn-lg px-5"
                >
                  Login
                </button>
              </div>

              <div>
                <p className="mb-0">
                  {`Don't have an account? `}
                  <a href="#" onClick={register} className="link-primary">
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

export default LoginComponent
