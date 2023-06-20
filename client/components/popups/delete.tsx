import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { DeletePopupProps } from '..'

export default (props: DeletePopupProps) => {
  const { closeTooltip, open, deleteVacation, vacation } = props.params

  const save = () => {
    closeTooltip()
    deleteVacation(vacation.id)
  }

  return (
    <Popup modal closeOnDocumentClick open={open} onClose={closeTooltip}>
      <div className="card text-center">
        <div className="card-header">Verification dialog</div>
        <div className="card-title">Are you sure?</div>

        <div className="card-body d-flex justify-content-around">
          <button className="btn btn-secondary" onClick={closeTooltip}>
            Go back
          </button>

          <button className="btn btn-danger" onClick={save}>
            Delete this vacation
          </button>
        </div>
      </div>
    </Popup>
  )
}
