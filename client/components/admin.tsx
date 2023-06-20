import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {
  AddButton,
  AddPopup,
  AdminCardComponent,
  AdminVacation,
  NavbarComponent,
  StatsComponent,
  addVacationConstructor,
  deleteVacationConstructor,
  formatDate,
  getVacationsConstructor,
  setVacationConstructor,
  sortVacations,
} from '.'
import { ROLES, ROUTES } from '../constants'

export default () => {
  const role = ROLES.ADMIN

  const router = useRouter()
  const [{ jwt }, setCookie] = useCookies(['jwt'])
  const [vacations, setVacations] = useState<AdminVacation[]>([])
  const [addPopup, setAddPopup] = useState(false)

  const openTooltip = () => setAddPopup(true)
  const closeTooltip = () => setAddPopup(false)

  const getVacations = getVacationsConstructor({
    role,
    jwt,
    setVacations,
    onFail: (err: unknown) => {
      router.push(ROUTES.LOGIN)
    },
  })

  const addVacation = addVacationConstructor({
    jwt,
    getVacations,
    onFail: (err: unknown) => {},
  })

  const setVacation = setVacationConstructor({
    jwt,
    vacations,
    setVacations,
    onFail: (err: unknown) => {},
  })

  const deleteVacation = deleteVacationConstructor({
    jwt,
    vacations,
    setVacations,
    onFail: (err: unknown) => {},
  })

  const logout = () => {
    setCookie('jwt', '')
    router.push(ROUTES.LOGIN)
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

  const navbarParams = {
    middleElement: addVacationElement,
    logoutParams: { logout },
  }

  const statsParams = {
    vacations,
  }

  const getCards = () => {
    return vacations
      .sort((a, b) => sortVacations({ a, b, role }))
      .map((vacation: AdminVacation) => (
        <AdminCardComponent
          key={vacation.id}
          params={{ vacation, formatDate, setVacation, deleteVacation }}
        />
      ))
  }

  useEffect(() => {
    getVacations()
  }, [])

  return (
    <div className="container-fluid overflow-hidden">
      <NavbarComponent params={navbarParams} />

      <div className="row row-cols-5">{getCards()}</div>

      <StatsComponent params={statsParams} />
    </div>
  )
}
