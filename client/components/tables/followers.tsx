import { FollowersTableProps } from '../'

export default (props: FollowersTableProps) => {
  const { data } = props

  const getCells = () =>
    data.followers.map((follower) => (
      <tr key={follower.id}>
        <th>{follower.username}</th>
        <td>{follower.first_name}</td>
        <td>{follower.last_name}</td>
        <td>{follower.id}</td>
      </tr>
    ))

  return (
    <table className="table table-striped table-bordered text-center">
      <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">First Name</th>
          <th scope="col">Last name</th>
          <th scope="col">ID</th>
        </tr>
      </thead>
      <tbody>{getCells()}</tbody>
    </table>
  )
}
