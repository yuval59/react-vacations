import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { ERROR_CODES, FETCH_ROUTES, ROUTES } from '../constants'

function RegisterComponent() {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['jwt'])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  async function tryRegister() {
    try {
      const { data } = await axios.post(
        FETCH_ROUTES.BASE + FETCH_ROUTES.REGISTER,
        {
          first_name: firstName,
          last_name: lastName,
          username,
          password,
        }
      )

      setCookie('jwt', data.accessToken)

      router.push('/')
    } catch (err) {
      if (err.code == ERROR_CODES.BAD_REQUEST) return setErr(err.response.data)
    }
  }

  function login() {
    router.push(ROUTES.LOGIN)
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

                <div className="form-outline form-white mb-4">
                  <label className="form-label">First name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value)
                    }}
                  />
                </div>

                <div className="form-outline form-white mb-4">
                  <label className="form-label">Last name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value)
                    }}
                  />
                </div>

                <div className="form-outline form-white mb-4">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value)
                    }}
                  />
                </div>

                <div className="form-outline form-white mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value)
                    }}
                  />
                </div>

                <button
                  onClick={tryRegister}
                  className="btn btn-outline-light btn-primary btn-lg px-5"
                >
                  Register
                </button>
              </div>

              <div>
                <p className="mb-0">
                  Already have an account?{' '}
                  <a href="#" onClick={login} className="link-primary">
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

export default RegisterComponent
