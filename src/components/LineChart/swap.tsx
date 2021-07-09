import React, { useState, useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Trans } from '@lingui/macro'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import LineChart from './index'
import getLineChartData from './data'
import { TYPE } from '../../theme'
import { ButtonOutlined } from '../Button'

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
  const realCurrency = 'US$'

  const lineChartData = useMemo(() => {
    return getLineChartData(currentChartPeriod)
  }, [currentChartPeriod])

  const handleChartType = (e: React.ChangeEvent<any>): void => {
    setCurrentChartValue(e.target.value)
  }

  const handleChartPeriod = (e: React.ChangeEvent<any>): void => {
    setCurrentChartPeriod(e.target.value)
  }

  const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 0px;
    color: ${({ theme }) => theme.text5};
  `

  const ControlWrapper = styled(Wrapper)`
    border-top: 1px solid ${({ theme }) => theme.bg5}
    box-sizing: border-box;
    margin: 0;
    padding: 0.4rem 0px;
    margin-top: 10px;
  `

  const dateFormat = currentChartPeriod === 'all' ? 'MMM' : 'dd'

  return (
    <>
      <TYPE.mediumHeader style={{ paddingBottom: '10px' }}>
        <Trans>ETH-ANY Pair Stats (Dummy data)</Trans>
      </TYPE.mediumHeader>
      <Wrapper>
        <TYPE.black fontWeight={400}>
          <Trans>Liquidity</Trans>
        </TYPE.black>
        <TYPE.black>{liquidityHover ? `${liquidityHover} ${realCurrency}` : '-'}</TYPE.black>
      </Wrapper>
      <Wrapper>
        <TYPE.black fontWeight={400}>
          <Trans>Volume</Trans>
        </TYPE.black>
        <TYPE.black>{volumeHover ? `${volumeHover} ${realCurrency}` : '-'}</TYPE.black>
      </Wrapper>
      <Wrapper>
        <TYPE.black fontWeight={400}>
          <Trans>Fees</Trans>
        </TYPE.black>
        <TYPE.black>{feesHover ? `${feesHover} ${realCurrency}` : '-'}</TYPE.black>
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
        style={{ flexDirection: 'column' }}
      />
    </>
  )
}

export default SwapChart
