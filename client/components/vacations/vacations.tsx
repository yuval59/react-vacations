import dayjs from 'dayjs'
import { useEffect } from 'react'
import { DATE_FORMAT } from '../../constants'
import { AdminCardComponent, UserCardComponent } from './cards'
import { AdminVacation, AsAdmin, AsUser } from './types'

export const formatDate = (date: string) => dayjs(date).format(DATE_FORMAT)

function VacationsComponent(props: { params: AsAdmin | AsUser }) {
  const {
    role,
    vacationProps: { getVacations, vacations, jwt },
  } = props.params

  useEffect(() => {
    getVacations()
  }, [])

  const getCards = () => {
    switch (role) {
      case 'user': {
        const { searchProps } = props.params

        return vacations
          .filter((vacation) =>
            vacation.destination
              .toLowerCase()
              .includes(searchProps.toLowerCase())
          )
          .map((vacation) => (
            <UserCardComponent
              key={vacation.id}
              params={{ vacation, jwt, getVacations, formatDate }}
            />
          ))
      }

      case 'admin':
        return vacations.map((vacation: AdminVacation) => (
          <AdminCardComponent
            key={vacation.id}
            params={{ vacation, formatDate }}
          />
        ))
    }
  }

  return <div className="row row-cols-5">{getCards()}</div>
}

export default VacationsComponent
