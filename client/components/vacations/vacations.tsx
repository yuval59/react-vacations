import dayjs from 'dayjs'
import { AdminVacation, VacationsComponentProps } from '../'
import { DATE_FORMAT } from '../../constants'
import { AdminCardComponent, UserCardComponent } from '../cards'

export const formatDate = (date: string) => dayjs(date).format(DATE_FORMAT)

export default (props: VacationsComponentProps) => {
  const { role } = props

  const getCards = () => {
    switch (role) {
      case 'user': {
        const { search, getVacations, jwt, vacations } = props.params

        return vacations
          .filter((vacation) =>
            vacation.destination.toLowerCase().includes(search.toLowerCase())
          )
          .map((vacation) => (
            <UserCardComponent
              key={vacation.id}
              params={{ vacation, jwt, getVacations, formatDate }}
            />
          ))
      }

      case 'admin': {
        const { setVacation, deleteVacation, vacations } = props.params

        return vacations.map((vacation: AdminVacation) => (
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
