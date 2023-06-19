import axios from 'axios'
import { FETCH_ROUTES } from '../constants'
import {
  AddVacationParams,
  DeleteVacationParams,
  GetVacationsParams,
  SetVacationParams,
  Vacation,
  VacationCreationParams,
  VacationTypeUnion,
  VacationUpdateParams,
} from './'

const removeNulls = (params: VacationUpdateParams | VacationCreationParams) => {
  const res = {}
  for (const key in params) if (params[key] != null) res[key] = params[key]
  return res
}

export const getVacationsConstructor =
  <VacationType extends VacationTypeUnion = Vacation>(
    params: GetVacationsParams<VacationType>
  ) =>
  async () => {
    const { onFail, jwt, setVacations } = params

    try {
      const { data }: { data: VacationType[] } = await axios.get(
        FETCH_ROUTES.BASE + FETCH_ROUTES.STATS,
        {
          headers: { Authorization: jwt },
        }
      )

      setVacations(data)
    } catch (err: unknown) {
      onFail(err)
    }
  }

export const setVacationConstructor =
  (params: SetVacationParams) => async (newVacation: VacationUpdateParams) => {
    const { jwt, setVacations, vacations, onFail } = params

    try {
      await axios.patch(
        FETCH_ROUTES.BASE + FETCH_ROUTES.VACATIONS,
        removeNulls(newVacation),
        {
          headers: { Authorization: jwt },
        }
      )

      setVacations(
        vacations.map((vacation) => {
          if (vacation.id != newVacation.id) return vacation
          for (const key in newVacation) vacation[key] = newVacation[key]
          return vacation
        })
      )
    } catch (err: unknown) {
      onFail(err)
    }
  }

export const deleteVacationConstructor =
  (params: DeleteVacationParams) => async (id: string) => {
    const { jwt, onFail, setVacations, vacations } = params

    try {
      await axios.delete(FETCH_ROUTES.BASE + FETCH_ROUTES.VACATIONS, {
        headers: { Authorization: jwt },
        params: { id },
      })

      setVacations(vacations.filter((vacation) => vacation.id != id))
    } catch (err: unknown) {
      onFail(err)
    }
  }

export const addVacationConstructor =
  (params: AddVacationParams) =>
  async (newVacation: VacationCreationParams) => {
    const { getVacations, jwt, onFail } = params

    try {
      await axios.post(
        FETCH_ROUTES.BASE + FETCH_ROUTES.VACATIONS,
        removeNulls(newVacation),
        {
          headers: { Authorization: jwt },
        }
      )

      getVacations()
    } catch (err: unknown) {
      onFail(err)
    }
  }
