import { UserCardProps } from '../'
import { FollowButton } from '../buttons'

export default (props: UserCardProps) => {
  const {
    params: { getVacations, jwt, vacation, formatDate },
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

        <div className="card-body">
          <FollowButton
            following={vacation.following}
            vacationId={vacation.id}
            jwt={jwt}
            getVacations={getVacations}
          />
        </div>
      </div>
    </div>
  )
}
