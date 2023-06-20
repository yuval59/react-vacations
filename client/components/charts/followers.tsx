import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts'
import { FollowersChartProps } from '../'

export default (props: FollowersChartProps) => {
  const { data, setSelected } = props.params

  const moveToTable = (
    nextState: unknown,
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (
      typeof nextState == 'object' &&
      'activeTooltipIndex' in nextState &&
      typeof nextState.activeTooltipIndex == 'number'
    )
      setSelected(data[nextState.activeTooltipIndex])
  }

  return (
    <BarChart
      width={730}
      height={250}
      data={data}
      onClick={moveToTable}
      id="barchart"
    >
      <Tooltip />
      <Bar dataKey="following" fill="#8884d8" />

      <XAxis dataKey="destination" />
      <YAxis dataKey="following" />
    </BarChart>
  )
}
