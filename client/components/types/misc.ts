import { Vacation, VacationCreationParams, VacationUpdateParams } from '.'
import { formatDate } from '../../utils'

export type IncludeSetMessage = { setMessage: (value: string) => void }
export type IncludeSearch = { search: string }
export type IncludeVacations<VacationType = Vacation> = {
  vacations: VacationType[]
}
export type IncludeSetVacation = { setVacation: SetVacation }
export type IncludeGetVacations = { getVacations: () => void }
export type IncludeDeleteVacation = { deleteVacation: DeleteVacation }
export type IncludeAddVacation = { addVacation: AddVacation }
export type IncludeJwt = { jwt: string }
export type IncludeOpenTooltip = { openTooltip: () => void }
export type IncludeCloseTooltip = { closeTooltip: () => void }
export type IncludePopupProps = { open: boolean } & IncludeCloseTooltip
export type SetVacation = (params: VacationUpdateParams) => void
export type DeleteVacation = (id: string) => void
export type AddVacation = (params: VacationCreationParams) => void
export type IncludeVacation<VacationType = Vacation> = {
  vacation: VacationType
}
export type IncludeFormatDate = { formatDate: typeof formatDate }
export type IncludeOnFail = { onFail: (err: unknown) => void }
export type IncludeSetVacations<VacationType = Vacation> = {
  setVacations: (vacations: VacationType[]) => void
}
