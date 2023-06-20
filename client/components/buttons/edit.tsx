import { EditButtonProps } from '..'

export default (props: EditButtonProps) => (
  <button className="btn btn-primary" onClick={props.params.openTooltip}>
    Edit
  </button>
)
