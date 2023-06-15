import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import NavbarComponent from '../components/navbar'
import { Vacation, VacationsComponent } from '../components/vacations'
import { FETCH_ROUTES, ROLES, ROUTES } from '../constants'

export default () => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['jwt'])
  const [search, setSearch] = useState('')
  const [vacations, setVacations] = useState<Vacation[]>([])

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

  return (
    <div className="container-fluid overflow-hidden">
      <NavbarComponent searchProps={{ search, setSearch }} />
      <VacationsComponent
        params={{
          vacationProps: { vacations, getVacations, jwt: cookies.jwt },
          searchProps: search,
          role: ROLES.USER,
        }}
      />
    </div>
  )
}
