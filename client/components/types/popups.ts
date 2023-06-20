import { AdminVacation } from '.'
import {
  IncludeAddVacation,
  IncludeDeleteVacation,
  IncludePopupProps,
  IncludeSetVacation,
  IncludeVacation,
  IncludeVacations,
} from './misc'

export type DeletePopupProps = {
  params: IncludeVacations<AdminVacation> &
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
