import React, { useState, useContext, useEffect, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { t, Trans } from '@lingui/macro'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import LineChart from './index'
import getLineChartData from './data'
import { TYPE, Disclaimer } from '../../theme'
import { ButtonOutlined, ButtonRadioChecked } from '../Button'

const SwapChart = () => {
  const theme = useContext(ThemeContext)
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [feesHover, setFeesHover] = useState<number | undefined>()
  const [currentChartValue, setCurrentChartValue] = useState<string>('value1')
  const [currentChartPeriod, setCurrentChartPeriod] = useState<string>('week')
  const [chartData, setChartData] = useState<any>()
  const realCurrency = 'US$'

  // useEffect(() => {
  //   setChartData(getLineChartData(currentChartPeriod))
  // }, [currentChartPeriod])

  // console.log(chartData)

  const lineChartData = useMemo(() => {
    return getLineChartData(currentChartPeriod)
  }, [currentChartPeriod])

  const handleChartType = (e: React.ChangeEvent<any>): void => {
    setCurrentChartValue(e.target.value)
  }

  const handleChartPeriod = (e: React.ChangeEvent<any>): void => {
    setCurrentChartPeriod(e.target.value)
  }

  // const getActiveStyle = (e: React.ChangeEvent<any>) => {
  //   return { borderColor: true ? theme.primary1 : 'transparent' };
  // }

  const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem 0px;
    color: ${({ theme }) => theme.text5};
  `

  const ControlWrapper = styled(Wrapper)`
    border-top: 1px solid ${({ theme }) => theme.bg5}
    box-sizing: border-box;
    margin: 0;
    padding: 0.8rem 0px;
    margin-top: 10px;
  `

  const dateFormat = currentChartPeriod === 'all' ? 'MMM' : 'dd'

  return (
    <>
      <TYPE.largeHeader fontSize="20px" style={{ paddingBottom: '20px' }}>
        <Trans>ETH-ANY Pair Stats</Trans>
      </TYPE.largeHeader>
      <Wrapper>
        <Trans>Liquidity</Trans>
        <div>{liquidityHover ? liquidityHover + realCurrency : '-'}</div>
      </Wrapper>
      <Wrapper>
        <Trans>Volume</Trans>
        <div>{volumeHover ? volumeHover + realCurrency : '-'}</div>
      </Wrapper>
      <Wrapper>
        <Trans>Fees</Trans>
        <div>{feesHover ? feesHover + realCurrency : '-'}</div>
      </Wrapper>
      <ControlWrapper>
        <Select value={currentChartValue} onChange={handleChartType} disableUnderline>
          <MenuItem value={'value1'}>
            <Trans>Liquidity</Trans>
          </MenuItem>
          <MenuItem value={'value2'}>
            <Trans>Volume</Trans>
          </MenuItem>
          <MenuItem value={'value3'}>
            <Trans>Fees</Trans>
          </MenuItem>
        </Select>
        <TYPE.main>
          <ButtonOutlined
            value="week"
            onClick={handleChartPeriod}
            width="25%"
            padding="4px"
            margin="5px"
            style={{ display: 'inline', borderColor: currentChartPeriod === 'week' ? theme.primary1 : theme.bg2 }}
          >
            <Trans>1W</Trans>
          </ButtonOutlined>
          <ButtonOutlined
            value="month"
            onClick={handleChartPeriod}
            width="25%"
            padding="4px"
            margin="5px"
            style={{ display: 'inline', borderColor: currentChartPeriod === 'month' ? theme.primary1 : theme.bg2 }}
          >
            <Trans>1M</Trans>
          </ButtonOutlined>
          <ButtonOutlined
            value="all"
            onClick={handleChartPeriod}
            width="25%"
            padding="4px"
            margin="5px"
            style={{ display: 'inline', borderColor: currentChartPeriod === 'all' ? theme.primary1 : theme.bg2 }}
          >
            <Trans>1W</Trans>
          </ButtonOutlined>
        </TYPE.main>
      </ControlWrapper>
      <LineChart
        data={lineChartData}
        height={300}
        color={theme.orange1}
        value1={liquidityHover}
        setValue1={setLiquidityHover}
        value2={volumeHover}
        setValue2={setVolumeHover}
        value3={feesHover}
        setValue3={setFeesHover}
        currentValue={currentChartValue}
        dateFormat={dateFormat}
        style={{ flexDirection: 'column' }}
      />
      <Disclaimer>
        <span>Disclaimer:</span>
        {` `}
        {t`This is Dummy Data`}
      </Disclaimer>
    </>
  )
}

export default SwapChart
