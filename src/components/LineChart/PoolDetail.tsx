import React, { useState, useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Trans } from '@lingui/macro'
import LineChart from './index'
import getLineChartData from './data'
import { TYPE } from '../../theme'
import { ButtonOutlined } from '../Button'
import SwapLineChartDropdown from '../Dropdowns/SwapLineChartDropdown'

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
    <ButtonOutlined
      value={value}
      onClick={onClick}
      width="32px"
      padding="6px"
      margin="12px"
      style={{
        display: 'inline',
        fontSize: '12px',
        color: current === value ? theme.primary1 : theme.text2,
        borderColor: current === value ? theme.primary1 : theme.bg4,
        marginRight: '0px',
      }}
    >
      <Trans>{text}</Trans>
    </ButtonOutlined>
  )
}

const SwapChart = () => {
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
  `

  const dateFormat = currentChartPeriod === 'all' ? 'MMM' : 'dd'

  return (
    <>
      <ControlWrapper>
        <SwapLineChartDropdown onItemSelect={handleChartType} selectedItem={currentChartValue} />
        <TYPE.main>
          <CustomButton value="week" text="1W" current={currentChartPeriod} onClick={handleChartPeriod} />
          <CustomButton value="month" text="1M" current={currentChartPeriod} onClick={handleChartPeriod} />
          <CustomButton value="all" text="All" current={currentChartPeriod} onClick={handleChartPeriod} />
        </TYPE.main>
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

export default SwapChart
