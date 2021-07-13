import React, { Dispatch, SetStateAction, ReactNode } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'
import { DataKey, BaseAxisProps } from 'recharts/types/util/types'
import { RowBetween } from 'components/Row'
import Card from '../Card'
import styled from 'styled-components/macro'
import useTheme from 'hooks/useTheme'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { shortenDecimalValues } from '../../utils'
dayjs.extend(utc)

const DEFAULT_HEIGHT = 100

const Wrapper = styled(Card)`
  width: 100%;
  height: ${DEFAULT_HEIGHT}px;
  padding: 0;
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
  setValue1?: Dispatch<SetStateAction<number | undefined>>
  setValue2?: Dispatch<SetStateAction<number | undefined>>
  setValue3?: Dispatch<SetStateAction<number | undefined>>
  setLabel?: Dispatch<SetStateAction<string | undefined>>
  value1?: number
  value2?: number
  value3?: number
  currentValue: DataKey<any>
  label?: string
  dateFormat?: string
  topLeft?: ReactNode | undefined
  topRight?: ReactNode | undefined
  bottomLeft?: ReactNode | undefined
  bottomRight?: ReactNode | undefined
  XAxisTickGap?: number | undefined
  YAxisTick?: BaseAxisProps['tick']
} & React.HTMLAttributes<HTMLDivElement>

const LineChart = ({
  data,
  color = '#56B2A4',
  value1,
  value2,
  value3,
  setValue1,
  setValue2,
  setValue3,
  currentValue,
  dateFormat,
  label,
  setLabel,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  XAxisTickGap,
  YAxisTick,
  minHeight = DEFAULT_HEIGHT,
  ...rest
}: LineChartProps) => {
  const theme = useTheme()
  const parsedValue1 = value1
  const parsedValue2 = value2
  const parsedValue3 = value3

  let yAxis

  if (YAxisTick) {
    yAxis = (
      <YAxis
        dataKey="value1"
        orientation="right"
        axisLine={false}
        tickLine={false}
        tickFormatter={(value1) => shortenDecimalValues(value1, '0,0a')}
        width={36}
        minTickGap={30}
        tick={YAxisTick}
        stroke={theme.text6}
      />
    )
  }

  return (
    <Wrapper minHeight={minHeight} {...rest}>
      <RowBetween>
        {topLeft ?? null}
        {topRight ?? null}
      </RowBetween>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={100}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          onMouseLeave={() => {
            setLabel && setLabel(undefined)
            setValue1 && setValue1(undefined)
            setValue2 && setValue2(undefined)
            setValue3 && setValue3(undefined)
          }}
        >
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tickFormatter={(time) => dayjs(time).format(dateFormat)}
            minTickGap={XAxisTickGap}
            tick={{ fontSize: 14 }}
            stroke={theme.text6}
          />
          {yAxis}
          <Tooltip
            cursor={{ stroke: theme.bg2 }}
            contentStyle={{ display: 'none' }}
            formatter={(
              value: number,
              name: string,
              props: { payload: { time: string; value1: number; value2?: number; value3?: number } }
            ) => {
              if (setValue1 && parsedValue1 !== props.payload.value1) {
                setValue1(props.payload.value1)
              }
              if (setValue2 && parsedValue2 !== props.payload.value2) {
                setValue2(props.payload.value2)
              }
              if (setValue3 && parsedValue3 !== props.payload.value3) {
                setValue3(props.payload.value3)
              }
              const formattedTime = dayjs(props.payload.time).format('MMM D, YYYY')
              if (setLabel && label !== formattedTime) setLabel(formattedTime)
            }}
          />
          <Area dataKey={currentValue} type="monotone" stroke={color} fill="#ffffff" fillOpacity={0} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
      <RowBetween>
        {bottomLeft ?? null}
        {bottomRight ?? null}
      </RowBetween>
    </Wrapper>
  )
}

export default LineChart
