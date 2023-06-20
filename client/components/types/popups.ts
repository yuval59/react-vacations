import { AdminVacation } from '.'
import {
  IncludeAddVacation,
  IncludeDeleteVacation,
  IncludePopupProps,
  IncludeSetVacation,
  IncludeVacation,
} from './misc'

export type DeletePopupProps = {
  params: IncludeVacation<AdminVacation> &
    IncludePopupProps &
    IncludeDeleteVacation
}

export type EditPopupProps = {
  params: IncludeVacation<AdminVacation> &
    IncludePopupProps &
    IncludeSetVacation
}

export type AddPopupProps = {
  params: IncludePopupProps & IncludeAddVacation
}
