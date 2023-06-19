import { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { EditPopupProps, objectExclude } from '../'

export default (props: EditPopupProps) => {
  const { closeTooltip, open, setVacation, vacation } = props.params
  const [tempVacation, setTempVacation] = useState(
    objectExclude({ ...vacation }, ['followers'])
  )

  const getTempEditField = (
    name: string,
    key: keyof typeof tempVacation,
    type: 'text' | 'number' = 'text'
  ) => (
    <div className="card-body d-flex justify-content-around">
      <h5 className="card-text">{name}:</h5>
      <input
        type={type}
        value={tempVacation[key] ?? (type == 'number' ? 0 : '')}
        onChange={({ target: { value } }) =>
          setTempVacation({
            ...tempVacation,
            [key]: type == 'number' ? parseFloat(value) : value,
          })
        }
      />
    </div>
  )

  const SaveVacation = () => {
    closeTooltip()
    setVacation(tempVacation)
  }

  return (
    <Popup
      modal
      closeOnDocumentClick
      open={open}
      onClose={closeTooltip}
      onOpen={() => setTempVacation(vacation)}
    >
      <div className="card text-center">
        <div className="card-header">Edit Vacation</div>

        {getTempEditField('Destination', 'destination')}

        {getTempEditField('Description', 'description')}

        {getTempEditField('Price', 'price', 'number')}

        {getTempEditField('Start date', 'start_date')}

        {getTempEditField('End date', 'end_date')}

        {getTempEditField('Picture link', 'picture')}

        <div className="card-body d-flex justify-content-around">
          <button className="btn btn-danger" onClick={closeTooltip}>
            Discard Changes
          </button>

          <button className="btn btn-primary" onClick={SaveVacation}>
            Save Changes
          </button>
        </div>
      </div>
    </Popup>
  )
}
