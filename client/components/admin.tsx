import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { FETCH_ROUTES, ROLES, ROUTES } from '../constants'
import NavbarComponent from './navbar'
import {
  AddButton,
  AddPopup,
  AdminVacation,
  VacationCreationParams,
  VacationUpdateParams,
  VacationsComponent,
  removeNulls,
} from './vacations'

function AdminComponent() {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['jwt'])
  const [vacations, setVacations] = useState<AdminVacation[]>([])
  const [addPopup, setAddPopup] = useState(false)

  const openTooltip = () => setAddPopup(true)
  const closeTooltip = () => setAddPopup(false)

  useEffect(() => {
    getVacations()
  }, [])

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

  const setVacation = async (params: VacationUpdateParams) => {
    try {
      await axios.patch(
        FETCH_ROUTES.BASE + FETCH_ROUTES.VACATIONS,
        removeNulls(params),
        {
          headers: { Authorization: cookies.jwt },
        }
      )

      setVacations(
        vacations.map((vacation) => {
          if (vacation.id != params.id) return vacation
          for (const key in params) vacation[key] = params[key]
          return vacation
        })
      )
    } catch (err) {
      console.error(err)
    }
  }

  const deleteVacation = async (id: string) => {
    try {
      await axios.delete(FETCH_ROUTES.BASE + FETCH_ROUTES.VACATIONS, {
        headers: { Authorization: cookies.jwt },
        params: { id },
      })

      setVacations(vacations.filter((vacation) => vacation.id != id))
    } catch (err) {
      console.error(err)
    }
  }

  const addVacation = async (params: VacationCreationParams) => {
    try {
      await axios.post(
        FETCH_ROUTES.BASE + FETCH_ROUTES.VACATIONS,
        removeNulls(params),
        {
          headers: { Authorization: cookies.jwt },
        }
      )

      getVacations()
    } catch (err) {
      console.error(err)
    }
  }

  const addVacationElement = (
    <div>
      <AddButton
        params={{
          openTooltip,
        }}
      ></AddButton>
      <AddPopup
        params={{
          open: addPopup,
          closeTooltip,
          addVacation,
        }}
      ></AddPopup>
    </div>
  )

  return (
    <div className="container-fluid overflow-hidden">
      <NavbarComponent middleElement={addVacationElement} />
      <VacationsComponent
        role={ROLES.ADMIN}
        params={{
          vacations,
          setVacation,
          deleteVacation,
        }}
      />
    </div>
  )
}

export default AdminComponent
