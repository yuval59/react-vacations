import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {
  NavbarComponent,
  Vacation,
  VacationsComponent,
  getVacationsConstructor,
} from '../components'
import { ROLES, ROUTES } from '../constants'

export default () => {
  const router = useRouter()
  const [{ jwt }, setCookie] = useCookies(['jwt'])
  const [search, setSearch] = useState('')
  const [vacations, setVacations] = useState<Vacation[]>([])
  useEffect(() => {
    getVacations()
  }, [])

  const getVacations = getVacationsConstructor({
    jwt,
    setVacations,
    onFail: (err: unknown) => {
      router.push(ROUTES.LOGIN)
    },
  })

  const logout = () => {
    setCookie('jwt', '')
    router.push(ROUTES.LOGIN)
  }

  const searchElement = (
    <div>
      <label className="me-2" htmlFor="searchBar">
        Search
      </label>
      <input
        type="text"
        id="searchBar"
        value={search}
        onChange={({ target: { value } }) => {
          setSearch(value)
        }}
      />
    </div>
  )

  const navbarParams = {
    middleElement: searchElement,
    logoutParams: { logout },
  }

  return (
    <div className="container-fluid overflow-hidden">
      <NavbarComponent params={navbarParams} />
      <VacationsComponent
        role={ROLES.USER}
        params={{
          vacations,
          getVacations,
          jwt,
          search,
        }}
      />
    </div>
  )
}
