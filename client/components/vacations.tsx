import dayjs from 'dayjs'
import { AdminVacation, VacationsComponentProps, sortVacations } from '.'
import { DATE_FORMAT, ROLES } from '../constants'
import { AdminCardComponent, UserCardComponent } from './cards'

export const formatDate = (date: string) => dayjs(date).format(DATE_FORMAT)

export default (props: VacationsComponentProps) => {
  const { role } = props

  const getCards = () => {
    switch (role) {
      case ROLES.USER: {
        const { search, getVacations, jwt, vacations } = props.params

        return vacations
          .filter((vacation) =>
            vacation.destination.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => sortVacations({ a, b, role }))
          .map((vacation) => (
            <UserCardComponent
              key={vacation.id}
              params={{ vacation, jwt, getVacations, formatDate }}
            />
          ))
      }

      case ROLES.ADMIN: {
        const { setVacation, deleteVacation, vacations } = props.params

        return vacations
          .sort((a, b) => sortVacations({ a, b, role }))
          .map((vacation: AdminVacation) => (
            <AdminCardComponent
              key={vacation.id}
              params={{ vacation, formatDate, setVacation, deleteVacation }}
            />
          ))
      }
    }
  }

  return <div className="row row-cols-5">{getCards()}</div>
}
