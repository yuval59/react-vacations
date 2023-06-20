import { useState } from 'react'
import { FollowersChart, FollowersTable, StatsProps, VacationData } from '.'
import { SortVacationsForChart } from '../utils'

export default (props: StatsProps) => {
  const { vacations } = props.params

  const [selected, setSelected] = useState<VacationData>({
    destination: '',
    following: 0,
    followers: [],
  })

  const chartData = vacations
    .sort(SortVacationsForChart)
    .map(({ destination, followers, id }) => ({
      id,
      destination,
      followers,
      following: followers.length,
    }))

  const chartParams = {
    data: chartData,
    setSelected,
  }

  const tableData = {
    followers: selected.followers,
  }

  return (
    <div className="container-flex d-flex justify-content-around pt-4">
      <div className="container">
        <div className="card">
          <FollowersChart params={chartParams} />
        </div>
      </div>
      <div className="container">
        <div className="card">
          <FollowersTable data={tableData} />
        </div>
      </div>
    </div>
  )
}
