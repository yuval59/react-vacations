import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { FETCH_ROUTES, ROLES, ROUTES } from '../constants'
import NavbarComponent from './navbar'
import { AdminVacation, VacationsComponent } from './vacations'

function AdminComponent() {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['jwt'])
  const [vacations, setVacations] = useState<AdminVacation[]>([])

  const getVacations = async () => {
    try {
      const { data }: { data: AdminVacation[] } = await axios.get(
        FETCH_ROUTES.BASE + FETCH_ROUTES.STATS,
        {
          headers: { Authorization: cookies.jwt },
        }
      )

      setVacations(data)
    } catch {
      router.push(ROUTES.LOGIN)
    }
  }

  return (
    <div className="container-fluid overflow-hidden">
      <NavbarComponent />
      <VacationsComponent
        params={{
          vacationProps: { vacations, getVacations, jwt: cookies.jwt },
          role: ROLES.ADMIN,
        }}
      />
    </div>
  )
}

export default AdminComponent
