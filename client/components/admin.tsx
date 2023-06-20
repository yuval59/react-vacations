import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {
  AddButton,
  AddPopup,
  AdminVacation,
  NavbarComponent,
  StatsComponent,
  VacationsComponent,
  addVacationConstructor,
  deleteVacationConstructor,
  getVacationsConstructor,
  setVacationConstructor,
} from '.'
import { ROLES, ROUTES } from '../constants'

export default () => {
  const router = useRouter()
  const [{ jwt }, setCookie] = useCookies(['jwt'])
  const [vacations, setVacations] = useState<AdminVacation[]>([])
  const [addPopup, setAddPopup] = useState(false)

  const openTooltip = () => setAddPopup(true)
  const closeTooltip = () => setAddPopup(false)

  const getVacations = getVacationsConstructor({
    role: ROLES.ADMIN,
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

  useEffect(() => {
    getVacations()
  }, [])

  const logout = () => {
    setCookie('jwt', '')
    router.push(ROUTES.LOGIN)
  }

  const navbarParams = {
    middleElement: (
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
    ),
    logoutParams: { logout },
  }

  const statsParams = {
    vacations,
  }

  return (
    <div className="container-fluid overflow-hidden">
      <NavbarComponent params={navbarParams} />
      <VacationsComponent
        role={ROLES.ADMIN}
        params={{
          vacations,
          setVacation,
          deleteVacation,
        }}
      />
      <StatsComponent params={statsParams} />
    </div>
  )
}
