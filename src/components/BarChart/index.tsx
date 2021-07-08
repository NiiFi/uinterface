import React, { Dispatch, SetStateAction, ReactNode } from 'react'
import { BarChart, ResponsiveContainer, XAxis, Tooltip, Bar } from 'recharts'
import styled from 'styled-components'
import Card from '../Card'
import useTheme from 'hooks/useTheme'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DEFAULT_HEIGHT = 135

const Wrapper = styled(Card)`
  width: 100%;
  height: ${DEFAULT_HEIGHT}px;
  display: flex;
  background-color: ${({ theme }) => theme.bg0}
  flex-direction: column;
  > * {
    font-size: 1rem;
  }
`

export type LineChartProps = {
  data: any[]
  color?: string | undefined
  height?: number | undefined
  minHeight?: number
  setValue?: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setLabel?: Dispatch<SetStateAction<string | undefined>> // used for label of valye
  value?: number
  label?: string
  topLeft?: ReactNode | undefined
  topRight?: ReactNode | undefined
  bottomLeft?: ReactNode | undefined
  bottomRight?: ReactNode | undefined
} & React.HTMLAttributes<HTMLDivElement>

const CustomBar = ({
  x,
  y,
  width,
  height,
  fill,
}: {
  x: number
  y: number
  width: number
  height: number
  fill: string
}) => {
  return (
    <g>
      <rect x={x} y={y} fill={fill} width={width} height={height} rx="2" />
    </g>
  )
}

const Chart = ({
  data,
  color = '#56B2A4',
  setValue,
  setLabel,
  value,
  label,
  minHeight = DEFAULT_HEIGHT,
  ...rest
}: LineChartProps) => {
  const theme = useTheme()
  const parsedValue = value

  return (
    <Wrapper minHeight={minHeight} {...rest}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          onMouseLeave={() => {
            setLabel && setLabel(undefined)
            setValue && setValue(undefined)
          }}
        >
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tickFormatter={(time) => dayjs(time).format('DD')}
            minTickGap={10}
            tick={{ fontSize: 14 }}
            stroke={theme.text4}
          />
          <Tooltip
            cursor={{ fill: theme.bg2 }}
            contentStyle={{ display: 'none' }}
            formatter={(value: number, name: string, props: { payload: { time: string; value: number } }) => {
              if (setValue && parsedValue !== props.payload.value) {
                setValue(props.payload.value)
              }
              const formattedTime = dayjs(props.payload.time).format('MMM D, YYYY')
              if (setLabel && label !== formattedTime) setLabel(formattedTime)
            }}
          />
          <Bar
            dataKey="value"
            fill={color}
            shape={(props) => {
              return <CustomBar height={props.height} width={props.width} x={props.x} y={props.y} fill={color} />
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}

export default Chart
