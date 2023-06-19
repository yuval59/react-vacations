import { AddButtonProps } from '../'

export default (props: AddButtonProps) => (
  <button className="btn btn-success" onClick={props.params.openTooltip}>
    Add vacation
  </button>
)
