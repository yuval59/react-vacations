import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {
  BOOTSTRAP_ICONS,
  DATE_FORMAT,
  FETCH_ROUTES,
  ROUTES,
} from '../constants'
import { Vacation } from '../types'

function VacationsComponent() {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['jwt'])
  const [vacations, setVacations] = useState<Vacation[]>([])

  const getVacations = async () => {
    try {
      const { data }: { data: Vacation[] } = await axios.get(
        FETCH_ROUTES.BASE + FETCH_ROUTES.GET_VACATIONS,
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

  const tryFollow = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      if (!('id' in e.target)) return

      await axios.post(FETCH_ROUTES.BASE + FETCH_ROUTES.FOLLOW, '', {
        params: { id: e.target.id },
        headers: { Authorization: cookies.jwt },
      })

      getVacations()
    } catch {}
  }

  const tryUnFollow = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      if (!('id' in e.target)) return

      await axios.delete(FETCH_ROUTES.BASE + FETCH_ROUTES.FOLLOW, {
        params: { id: e.target.id },
        headers: { Authorization: cookies.jwt },
      })

      getVacations()
    } catch {}
  }

  const getVacationCard = (vacation: Vacation) => (
    <tr key={vacation.id} className={vacation.following ? 'table-primary' : ''}>
      <td>{vacation.destination}</td>
      <td>{vacation.description}</td>
      <td>{vacation.price}</td>
      <td>
        <img src={vacation.picture}></img>
      </td>
      <td>{dayjs(vacation.start_date).format(DATE_FORMAT)}</td>
      <td>{dayjs(vacation.end_date).format(DATE_FORMAT)}</td>
      <td>
        <button
          id={vacation.id}
          onClick={vacation.following ? tryUnFollow : tryFollow}
          className="btn btn-outline-primary"
        >
          {vacation.following
            ? BOOTSTRAP_ICONS.UNFOLLOW
            : BOOTSTRAP_ICONS.FOLLOW}
          {vacation.following ? 'Unfollow' : 'Follow'}
        </button>
      </td>
    </tr>
  )

  useEffect(() => {
    getVacations()
  }, [])

  return (
    <table className="table table-striped table-bordered align-middle bg-white">
      <thead>
        <tr>
          <th>Destination</th>
          <th>Description</th>
          <th>Price</th>
          <th>Picture</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>{vacations && vacations.map(getVacationCard)}</tbody>
    </table>
  )
}

export default VacationsComponent
