import React, { useContext, useEffect } from 'react'
import { t } from '@lingui/macro'
import { ResponsiveContainer, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts'
import { ThemeContext } from 'styled-components'
import { shortenDecimalValues } from 'utils'
import { Wrapper } from './index'
import { TYPE } from '../../theme'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const labels: any = {
  variableBorrowAPR: t`Variable`,
  stableBorrowAPR: t`Stable`,
}

const getLabel = (label: string) => {
  return labels[label] ? `${labels[label]}: ` : ''
}

const CustomTooltip = (props: any) => {
  const { active, payload, label } = props

  if (active) {
    return (
      <div className="custom-tooltip">
        {label}
        <br />
        {getLabel(payload[0].name)}
        {shortenDecimalValues(payload[0].value)}
        <br />
        {payload[1] ? `${getLabel(payload[1].name)}${shortenDecimalValues(payload[1].value)}` : ''}
      </div>
    )
  }

  return null
}

const SimpleChart = ({
  title,
  data,
  loader,
  dataKey,
  color,
  children,
  prepend,
  height,
  timeFormat,
}: {
  title: string
  data: any
  loader: any
  dataKey?: string
  color?: string
  children?: React.ReactNode
  prepend?: React.ReactNode
  height?: number
  timeFormat?: string
}) => {
  const theme = useContext(ThemeContext)

  useEffect(() => {
    if (!data || !data.length) return
    data
      .sort((a: any, b: any) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime()
      })
      .map((item: any) => {
        item.liquidity = Number(item.liquidity)
        item.volume = Number(item.volume)
        item.fees = Number(item.fees)
        return item
      })
  }, [data])

  return (
    <>
      <TYPE.mediumHeaderEllipsis padding="18px 0">{title}</TYPE.mediumHeaderEllipsis>
      {prepend}
      {loader ||
        (data && (
          <Wrapper minHeight={height || 200}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={400}
                height={250}
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(time) => dayjs(time).format(timeFormat || 'MMM')}
                  minTickGap={100}
                  tick={{ fontSize: 14 }}
                  stroke={theme.text6}
                />
                <YAxis tickFormatter={(value) => `${value}%`} axisLine={false} tickLine={false} width={80} />
                {children ? (
                  children
                ) : (
                  <Line
                    type="monotone"
                    dataKey={dataKey || 'time'}
                    stroke={color || theme.orange1}
                    fill="#ffffff"
                    fillOpacity={0}
                    strokeWidth={2}
                    dot={false}
                  />
                )}
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
          </Wrapper>
        ))}
    </>
  )
}

export default SimpleChart
