import React, { useState, useContext, useMemo, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Trans } from '@lingui/macro'
import LineChart from './index'
import { sumBy } from 'lodash'
import getLineChartData from './data'
import { TYPE } from '../../theme'
import { ButtonOutlined } from '../Button'
import SwapLineChartDropdown from '../Dropdowns/SwapLineChartDropdown'
import { AutoRow } from 'components/Row'
import { AutoColumn } from 'components/Column'
import { TextItemWrapper, TextLabel, TextValue } from 'components/pools/styled'
import { MainCurrency, shortenDecimalValues } from 'utils'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'

const StyleButtonOutlined = styled(ButtonOutlined)`
  margin: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 8px;
  `}
`
const CustomButton = ({
  value,
  text,
  current,
  onClick,
}: {
  value: string
  text: string
  current: string
  onClick: (e: React.ChangeEvent<any>) => void
}) => {
  const theme = useContext(ThemeContext)
  return (
    <StyleButtonOutlined
      value={value}
      onClick={onClick}
      width="32px"
      padding="6px"
      style={{
        display: 'inline',
        fontSize: '12px',
        color: current === value ? theme.primary1 : theme.text2,
        borderColor: current === value ? theme.primary1 : theme.bg4,
        marginRight: '0px',
      }}
    >
      <Trans>{text}</Trans>
    </StyleButtonOutlined>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text5};
`

const ControlWrapper = styled(Wrapper)`
  box-sizing: border-box;
  margin: 0;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const ChartRowColumnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    gap: 0.625rem;
    flex-direction: column;
  `}
`
const ChartColumnItem = styled(AutoColumn)<{ flex?: string }>`
  width: 100%;
  flex: ${({ flex }) => (flex ? flex : '')};

  :nth-child(1) {
    border-right: 1px solid ${({ theme }) => theme.bg3};
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex: 1;
    border-right: none;
    :nth-child(1) {
      border-right: none;
      border-bottom: 1px solid ${({ theme }) => theme.bg3};
    }
  `}
`
const PoolDetailChart = ({ token0, token1 }: { token0: string; token1: string }) => {
  const theme = useContext(ThemeContext)
  const [liquiditySum, setLiquiditySum] = useState<number | undefined>()
  const [volumeSum, setVolumeSum] = useState<number | undefined>()
  const [feesSum, setFeesSum] = useState<number | undefined>()
  const [currentChartValue, setCurrentChartValue] = useState<string>('value1')
  const [currentChartPeriod, setCurrentChartPeriod] = useState<string>('week')

  const lineChartData = useMemo(() => {
    return getLineChartData(currentChartPeriod)
  }, [currentChartPeriod])

  useEffect(() => {
    setLiquiditySum(sumBy(lineChartData, 'value1'))
    setVolumeSum(sumBy(lineChartData, 'value2'))
    setFeesSum(sumBy(lineChartData, 'value3'))
  }, [lineChartData, setLiquiditySum, setVolumeSum, setFeesSum])

  const handleChartType = (e: string): void => {
    setCurrentChartValue(e)
  }

  const handleChartPeriod = (e: React.ChangeEvent<any>): void => {
    setCurrentChartPeriod(e.target.value)
  }

  const dateFormat = currentChartPeriod === 'all' ? 'MMM' : 'dd'

  return (
    <ChartRowColumnWrapper>
      <ChartColumnItem flex={'1'}>
        <TYPE.mediumHeaderEllipsis marginBottom="1rem">
          {`${token0}-${token1} `}
          <Trans>Pair Stats</Trans>
        </TYPE.mediumHeaderEllipsis>
        <TextItemWrapper>
          <TextLabel>
            <Trans>Liquidity</Trans>
          </TextLabel>
          <TextValue>
            {shortenDecimalValues(`${liquiditySum}`, TOKEN_VALUE_CURRENCY_FORMAT)} {MainCurrency}
          </TextValue>
        </TextItemWrapper>
        <TextItemWrapper>
          <TextLabel>
            <Trans>Volume</Trans>
          </TextLabel>
          <TextValue>
            {shortenDecimalValues(`${volumeSum}`, TOKEN_VALUE_CURRENCY_FORMAT)} {MainCurrency}
          </TextValue>
        </TextItemWrapper>
        <TextItemWrapper>
          <TextLabel>
            <Trans>Fees</Trans>
          </TextLabel>
          <TextValue>
            {shortenDecimalValues(`${feesSum}`, TOKEN_VALUE_CURRENCY_FORMAT)} {MainCurrency}
          </TextValue>
        </TextItemWrapper>
      </ChartColumnItem>
      <ChartColumnItem flex={'2'}>
        <ControlWrapper>
          <SwapLineChartDropdown onItemSelect={handleChartType} selectedItem={currentChartValue} />
          <AutoRow justify={'flex-end'}>
            <TYPE.main>
              <CustomButton value="today" text="24H" current={currentChartPeriod} onClick={handleChartPeriod} />
              <CustomButton value="week" text="1W" current={currentChartPeriod} onClick={handleChartPeriod} />
              <CustomButton value="month" text="1M" current={currentChartPeriod} onClick={handleChartPeriod} />
              <CustomButton value="all" text="All" current={currentChartPeriod} onClick={handleChartPeriod} />
            </TYPE.main>
          </AutoRow>
        </ControlWrapper>
        <AutoRow>
          <LineChart
            data={lineChartData}
            minHeight={158}
            color={theme.orange1}
            currentValue={currentChartValue}
            dateFormat={dateFormat}
            XAxisTickGap={100}
            YAxisTick={{ fontSize: 14 }}
            style={{ flexDirection: 'column', marginTop: '0.5rem' }}
          />
        </AutoRow>
      </ChartColumnItem>
    </ChartRowColumnWrapper>
  )
}

export default PoolDetailChart
