import { AdminCardProps } from './types'

function AdminCardComponent(props: AdminCardProps) {
  const {
    params: { vacation, formatDate },
  } = props

  return (
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
      </div>
    </div>
  )
}

export default AdminCardComponent
