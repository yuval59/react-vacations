import { useState } from 'react'
import {
  AdminCardProps,
  DeleteButton,
  DeletePopup,
  EditButton,
  EditPopup,
} from '..'

export default (props: AdminCardProps) => {
  const [edit, setEdit] = useState(false)

  const openEdit = () => setEdit(true)
  const closeEdit = () => setEdit(false)

  const [Delete, setDelete] = useState(false)

  const openDelete = () => setDelete(true)
  const closeDelete = () => setDelete(false)

  const {
    params: { vacation, formatDate, setVacation, deleteVacation },
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
          <EditButton params={{ openTooltip: openEdit }} />
          <EditPopup
            params={{
              open: edit,
              closeTooltip: closeEdit,
              vacation,
              setVacation,
            }}
          />
        </div>

        <div className="card-body">
          <DeleteButton params={{ openTooltip: openDelete }}></DeleteButton>
          <DeletePopup
            params={{
              open: Delete,
              closeTooltip: closeDelete,
              deleteVacation,
              vacation,
            }}
          ></DeletePopup>
        </div>
      </div>
    </div>
  )
}
