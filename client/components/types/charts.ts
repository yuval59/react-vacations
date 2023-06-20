import { VacationData } from '..'

export type FollowersChartProps = {
  params: {
    data: VacationData[]
    setSelected: (data: VacationData) => void
  }
}
