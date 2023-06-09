import axios from 'axios'
import { FollowButtonProps } from '..'
import { FETCH_ROUTES } from '../../constants'

export default (props: FollowButtonProps) => {
  const { following, vacationId, jwt, getVacations } = props

  const follow = async (e: React.MouseEvent<HTMLElement>) => {
    if (!('id' in e.target)) return

    await axios.post(FETCH_ROUTES.BASE + FETCH_ROUTES.FOLLOW, '', {
      params: { id: e.target.id },
      headers: { Authorization: jwt },
    })

    getVacations()
  }

  const unfollow = async (e: React.MouseEvent<HTMLElement>) => {
    if (!('id' in e.target)) return

    await axios.delete(FETCH_ROUTES.BASE + FETCH_ROUTES.FOLLOW, {
      params: { id: e.target.id },
      headers: { Authorization: jwt },
    })

    getVacations()
  }

  return (
    <button
      id={vacationId}
      onClick={following ? unfollow : follow}
      className={following ? 'btn btn-danger' : 'btn btn-primary'}
    >
      {following ? 'Unfollow' : 'Follow'}
    </button>
  )
}
