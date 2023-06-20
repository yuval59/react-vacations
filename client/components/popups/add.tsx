import { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { AddPopupProps, VacationCreationParams } from '..'

export default (props: AddPopupProps) => {
  const { closeTooltip, open, addVacation } = props.params

  const [vacationParams, setVacationParams] = useState({})

  const setField = (
    name: string,
    key: keyof VacationCreationParams,
    type: 'text' | 'number' = 'text'
  ) => (
    <div className="card-body d-flex justify-content-around">
      <h5 className="card-text">{name}:</h5>
      <input
        type={type}
        value={vacationParams[key] ?? (type == 'number' ? 0 : '')}
        onChange={({ target: { value } }) =>
          setVacationParams({
            ...vacationParams,
            [key]: type == 'number' ? parseFloat(value) : value,
          })
        }
      />
    </div>
  )

  const save = () => {
    closeTooltip()
    addVacation(vacationParams as VacationCreationParams)
  }

  return (
    <Popup
      modal
      closeOnDocumentClick
      open={open}
      onClose={closeTooltip}
      onOpen={() => setVacationParams({})}
    >
      <div className="card text-center">
        <div className="card-header">Add Vacation</div>
        <div className="card-body">
          <div className="card-title">Required:</div>

          {setField('Destination', 'destination')}
          {setField('Start date', 'start_date')}
          {setField('End date', 'end_date')}

          <div className="card-title">Optional:</div>

          {setField('Description', 'description')}
          {setField('Picture link', 'picture')}
          {setField('Price', 'price', 'number')}
        </div>

        <div className="card-body d-flex justify-content-around">
          <button className="btn btn-secondary" onClick={closeTooltip}>
            Go back
          </button>

          <button className="btn btn-primary" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </Popup>
  )
}
