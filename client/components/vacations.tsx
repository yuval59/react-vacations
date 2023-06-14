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

const formatDate = (date: string) => dayjs(date).format(DATE_FORMAT)

function VacationsComponent() {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['jwt'])
  const [vacations, setVacations] = useState<Vacation[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getVacations()
  }, [])

  const logout = () => {
    router.push(ROUTES.LOGIN)
  }

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

  const follow = async (e: React.MouseEvent<HTMLElement>) => {
    if (!('id' in e.target)) return

    await axios.post(FETCH_ROUTES.BASE + FETCH_ROUTES.FOLLOW, '', {
      params: { id: e.target.id },
      headers: { Authorization: cookies.jwt },
    })

    getVacations()
  }

  const unfollow = async (e: React.MouseEvent<HTMLElement>) => {
    if (!('id' in e.target)) return

    await axios.delete(FETCH_ROUTES.BASE + FETCH_ROUTES.FOLLOW, {
      params: { id: e.target.id },
      headers: { Authorization: cookies.jwt },
    })

    getVacations()
  }

  const getFollowButton = (following: boolean, id: string) => (
    <button
      id={id}
      onClick={following ? unfollow : follow}
      className={following ? 'btn btn-danger' : 'btn btn-primary'}
    >
      {following ? 'Unfollow' : 'Follow'}
    </button>
  )

  const getVacationCard = (vacation: Vacation) => (
    <div className="col">
      <div className="card text-center">
        <div className="card-header">{vacation.destination}</div>

        {vacation.picture ? (
          <img
            src={vacation.picture}
            className="card-img-top"
            alt="Vacation Image"
          />
        ) : null}

        <div className="card-body">
          <h5 className="card-title">{`${formatDate(
            vacation.start_date
          )} to ${formatDate(vacation.end_date)}`}</h5>
          <p className="card-text">{vacation.description}</p>
          <p className="card-text">{vacation.price}</p>
        </div>

        <div className="card-body">
          {getFollowButton(vacation.following, vacation.id)}
        </div>
      </div>
    </div>
  )

  const getNavBar = () => (
    <div className="navbar navbar-light bg-light mb-2 d-flex justify-content-around">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
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
      <button className="btn btn-info" onClick={logout}>
        Log Out
      </button>
    </div>
  )

  return (
    <div>
      {getNavBar()}
      <div className="row row-cols-4">
        {vacations
          .filter((vacation) =>
            vacation.destination.toLowerCase().includes(search.toLowerCase())
          )
          .map(getVacationCard)}
      </div>
    </div>
  )
}

export default VacationsComponent
