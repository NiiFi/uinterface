import React, { useState, useContext, useMemo, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Trans } from '@lingui/macro'
import LineChart from './index'
import getLineChartData from './data'
import { TYPE, BaseCurrencyView } from '../../theme'
import { ButtonOutlined } from '../Button'
import SwapLineChartDropdown from '../Dropdowns/SwapLineChartDropdown'
import { MainCurrency, shortenDecimalValues } from 'utils'

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
  padding: 0.5rem 0px;
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
  border-top: 1px solid rgba(228, 247, 245, 1);
  margin-top: 10px;
`

const ButtonControlWrapper = styled(TYPE.main)`
  padding-right: 1rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding-right: 0.5rem;
  `}
`

const PoolDetailChart = ({}: { token0: string; token1: string }) => {
  const theme = useContext(ThemeContext)
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [feesHover, setFeesHover] = useState<number | undefined>()
  const [currentChartValue, setCurrentChartValue] = useState<string>('value1')
  const [currentChartPeriod, setCurrentChartPeriod] = useState<string>('week')

  const lineChartData = useMemo(() => {
    return getLineChartData(currentChartPeriod)
  }, [currentChartPeriod])

  const handleChartType = (e: string): void => {
    setCurrentChartValue(e)
  }

  const handleChartPeriod = (e: React.ChangeEvent<any>): void => {
    setCurrentChartPeriod(e.target.value)
  }

  const dateFormat = currentChartPeriod === 'all' ? 'MMM' : 'dd'

  useEffect(() => {
    if (!liquidityHover && lineChartData) {
      setLiquidityHover(lineChartData[lineChartData.length - 1].value1)
    }
  }, [liquidityHover, lineChartData, currentChartPeriod])

  useEffect(() => {
    if (!volumeHover && lineChartData) {
      setVolumeHover(lineChartData[lineChartData.length - 1].value2)
    }
  }, [volumeHover, lineChartData, currentChartPeriod])

  useEffect(() => {
    if (!feesHover && lineChartData) {
      setFeesHover(lineChartData[lineChartData.length - 1].value3)
    }
  }, [feesHover, lineChartData, currentChartPeriod])

  return (
    <>
      <TYPE.mediumHeaderEllipsis padding="18px 0">
        {`${token0}-${token1} `}
        <Trans>Pair Stats (Dummy data)</Trans>
      </TYPE.mediumHeaderEllipsis>
      <Wrapper>
        <TYPE.black fontWeight={400}>
          <Trans>Liquidity</Trans>
        </TYPE.black>
        <TYPE.black style={{ paddingRight: '20px' }}>
          {liquidityHover ? shortenDecimalValues(String(liquidityHover), '0,0') + ` ${MainCurrency}` : '-'}
        </TYPE.black>
      </Wrapper>
      <Wrapper>
        <TYPE.black fontWeight={400}>
          <Trans>Volume</Trans>
        </TYPE.black>
        <TYPE.black style={{ paddingRight: '20px' }}>
          {volumeHover ? shortenDecimalValues(String(volumeHover), '0,0') + ` ${MainCurrency}` : '-'}
        </TYPE.black>
      </Wrapper>
      <Wrapper>
        <TYPE.black fontWeight={400}>
          <Trans>Fees</Trans>
        </TYPE.black>
        <TYPE.black style={{ paddingRight: '20px' }}>
          {feesHover ? shortenDecimalValues(String(feesHover), '0,0') + ` ${MainCurrency}` : '-'}
        </TYPE.black>
      </Wrapper>
      <ControlWrapper>
        <SwapLineChartDropdown onItemSelect={handleChartType} selectedItem={currentChartValue} />
        <ButtonControlWrapper>
          <CustomButton value="week" text="1W" current={currentChartPeriod} onClick={handleChartPeriod} />
          <CustomButton value="month" text="1M" current={currentChartPeriod} onClick={handleChartPeriod} />
          <CustomButton value="all" text="All" current={currentChartPeriod} onClick={handleChartPeriod} />
        </ButtonControlWrapper>
      </ControlWrapper>
      <LineChart
        data={lineChartData}
        minHeight={158}
        color={theme.orange1}
        value1={liquidityHover}
        setValue1={setLiquidityHover}
        value2={volumeHover}
        setValue2={setVolumeHover}
        value3={feesHover}
        setValue3={setFeesHover}
        currentValue={currentChartValue}
        dateFormat={dateFormat}
        XAxisTickGap={100}
        YAxisTick={{ fontSize: 14 }}
        style={{ flexDirection: 'column', marginTop: '0.5rem' }}
      />
    </>
  )
}

export default PoolDetailChart
