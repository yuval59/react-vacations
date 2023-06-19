import axios, { AxiosError } from 'axios'
import { useRef, useState } from 'react'
import Popup from 'reactjs-popup'
import { PopupActions } from 'reactjs-popup/dist/types'
import { RegisterButton, RegisterPopupProps } from '../'
import { ERROR_CODES, FETCH_ROUTES } from '../../constants'

export default (props: RegisterPopupProps) => {
  const ref = useRef<PopupActions>()
  const openTooltip = () => ref.current.open()
  const closeTooltip = () => ref.current.close()

  const [message, setMessage] = useState('')

  const onFail = (message: string) => {
    setMessage(message)
    openTooltip()
  }

  const buttomParams = {
    ...props.params,
    onFail,
  }

  return (
    <div>
      <RegisterButton params={buttomParams}></RegisterButton>

      <Popup
        closeOnEscape
        closeOnDocumentClick
        ref={ref}
        onClose={closeTooltip}
        trigger={(open) => <div></div>}
      >
        <div className="card bg-dark text-danger text-center">
          <div className="card-header">ERROR</div>
          <div className="card-title">{message}</div>
        </div>
      </Popup>
    </div>
  )
}

//<RegisterButton params={buttonParams}></RegisterButton>
