import { DeleteButtonProps } from '..'

export default (props: DeleteButtonProps) => (
  <button className="btn btn-danger" onClick={props.params.openTooltip}>
    Delete
  </button>
)
