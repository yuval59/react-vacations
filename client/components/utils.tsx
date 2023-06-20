import axios from 'axios'
import dayjs from 'dayjs'
import {
  AddVacationParams,
  AdminVacation,
  DeleteVacationParams,
  GetVacationsParams,
  SetVacationParams,
  SortVacationsParams,
  Vacation,
  VacationCreationParams,
  VacationUpdateParams,
} from '.'
import { FETCH_ROUTES, ROLES } from '../constants'

const removeNulls = (params: VacationUpdateParams | VacationCreationParams) => {
  const res = {}
  for (const key in params) if (params[key] != null) res[key] = params[key]
  return res
}

export const SortVacationsForChart = (a: AdminVacation, b: AdminVacation) => {
  return a.destination.localeCompare(b.destination)
}

export const sortVacations = (params: SortVacationsParams) => {
  const { a, b, role } = params

  switch (role) {
    case ROLES.USER: {
      if (a.following != b.following) return a.following ? -1 : 1

      if (a.start_date != b.start_date)
        return dayjs(b.start_date).unix() - dayjs(a.start_date).unix()

      return a.destination.localeCompare(b.destination)
    }

    case ROLES.ADMIN: {
      if (a.start_date != b.start_date)
        return dayjs(b.start_date).unix() - dayjs(a.start_date).unix()

      return a.destination.localeCompare(b.destination)
    }
  }
}

export const getVacationsConstructor =
  (params: GetVacationsParams) => async () => {
    const { onFail, jwt, setVacations, role } = params

    try {
      switch (role) {
        case ROLES.USER: {
          const { data }: { data: Vacation[] } = await axios.get(
            FETCH_ROUTES.BASE + FETCH_ROUTES.VACATIONS,
            {
              headers: { Authorization: jwt },
            }
          )

          setVacations(data)

          break
        }
        case ROLES.ADMIN: {
          const { data }: { data: AdminVacation[] } = await axios.get(
            FETCH_ROUTES.BASE + FETCH_ROUTES.STATS,
            {
              headers: { Authorization: jwt },
            }
          )

          setVacations(data)

          break
        }
      }
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

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export const objectExclude = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Prettify<Omit<T, K>> => {
  const newObj: any = {}
  for (const key of keys) newObj[key] = obj[key]
  return newObj
}
