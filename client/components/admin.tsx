import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { ROLES, ROUTES } from '../constants'
import {
  AddButton,
  AddPopup,
  AdminVacation,
  NavbarComponent,
  VacationsComponent,
  addVacationConstructor,
  deleteVacationConstructor,
  getVacationsConstructor,
  setVacationConstructor,
} from './'

export default () => {
  const router = useRouter()
  const [{ jwt }, setCookie] = useCookies(['jwt'])
  const [vacations, setVacations] = useState<AdminVacation[]>([])
  const [addPopup, setAddPopup] = useState(false)

  const openTooltip = () => setAddPopup(true)
  const closeTooltip = () => setAddPopup(false)

  const getVacations = getVacationsConstructor<AdminVacation>({
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
    </div>
  )
}
