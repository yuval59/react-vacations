import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { NavbarComponent, UserCardComponent, Vacation } from '../components'
import { ROLES, ROUTES } from '../constants'
import { formatDate, getVacationsConstructor, sortVacations } from '../utils'

export default () => {
  const role = ROLES.USER

  const router = useRouter()
  const [{ jwt }, setCookie] = useCookies(['jwt'])
  const [search, setSearch] = useState('')
  const [vacations, setVacations] = useState<Vacation[]>([])
  useEffect(() => {
    getVacations()
  }, [])

  const getVacations = getVacationsConstructor({
    role: ROLES.USER,
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

  const getCards = () =>
    vacations
      .filter((vacation) =>
        vacation.destination.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => sortVacations({ a, b, role }))
      .map((vacation) => (
        <UserCardComponent
          key={vacation.id}
          params={{ vacation, jwt, getVacations, formatDate }}
        />
      ))

  return (
    <div className="container-fluid overflow-hidden">
      <NavbarComponent params={navbarParams} />

      <div className="row row-cols-5">{getCards()}</div>
    </div>
  )
}
