import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { NavbarComponent, Vacation, VacationsComponent } from '../components'
import { FETCH_ROUTES, ROLES, ROUTES } from '../constants'

export default () => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['jwt'])
  const [search, setSearch] = useState('')
  const [vacations, setVacations] = useState<Vacation[]>([])

  useEffect(() => {
    getVacations()
  }, [])

  const getVacations = async () => {
    try {
      const { data }: { data: Vacation[] } = await axios.get(
        FETCH_ROUTES.BASE + FETCH_ROUTES.VACATIONS,
        {
          headers: { Authorization: cookies.jwt },
        }
      )

      setVacations(
        data.sort((a, b) => {
          if (a.following != b.following) return a.following ? -1 : 1

          if (a.start_date != b.start_date)
            return dayjs(b.start_date).unix() - dayjs(a.start_date).unix()

          if (a.destination < b.destination) return -1
          if (a.destination > b.destination) return 1
          return 0
        })
      )
    } catch {
      router.push(ROUTES.LOGIN)
    }
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

  return (
    <div className="container-fluid overflow-hidden">
      <NavbarComponent middleElement={searchElement} />
      <VacationsComponent
        role={ROLES.USER}
        params={{
          vacations,
          getVacations,
          jwt: cookies.jwt,
          search,
        }}
      />
    </div>
  )
}
