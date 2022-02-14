import React, { useContext } from 'react'
import styled from 'styled-components'
import { Line } from 'recharts'
import { ThemeContext } from 'styled-components'
import { Trans, t } from '@lingui/macro'
import SimpleChart from './SimpleChart'

const Dot = styled.div<{ color: string }>`
  color: ${({ theme }) => theme.text3};
  font-size: 14px;
  ::before {
    font-size: 20px;
    color: ${({ color }) => color};
    content: '●';
    padding-right: 5px;
  }
  padding-right: 15px;
`
const DotsWrapper = styled.div`
  display: flex;
  padding-bottom: 20px;
`

const LendHistory = ({ data, stableEnabled }: { data: any; stableEnabled: boolean }) => {
  const theme = useContext(ThemeContext)

  return (
    <SimpleChart
      title={stableEnabled ? t`Stable vs Variable APR` : t`Variable APR`}
      data={data}
      loader={false}
      timeFormat={'MMM D'}
      prepend={
        <>
          {stableEnabled && (
            <DotsWrapper>
              <Dot color={theme.green2}>
                <Trans>Stable</Trans>
              </Dot>
              <Dot color={theme.orange1}>
                <Trans>Variable</Trans>
              </Dot>
            </DotsWrapper>
          )}
        </>
      }
    >
      <Line
        type="monotone"
        dataKey="variableBorrowAPR"
        stroke={theme.orange1}
        fill="#ffffff"
        fillOpacity={0}
        strokeWidth={2}
        dot={false}
      />
      {stableEnabled && (
        <Line
          type="monotone"
          dataKey="stableBorrowAPR"
          stroke={theme.green2}
          fill="#ffffff"
          fillOpacity={0}
          strokeWidth={2}
          dot={false}
        />
      )}
    </SimpleChart>
  )
}

export default LendHistory
