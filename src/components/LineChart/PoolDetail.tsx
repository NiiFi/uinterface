import React, { useState, useContext, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Trans } from '@lingui/macro'
import LineChart from './index'
import { TYPE, BaseCurrencyView } from '../../theme'
import { ButtonOutlined } from '../Button'
import SwapLineChartDropdown from '../Dropdowns/SwapLineChartDropdown'
import { useApiPoolStats, IPoolGraph } from 'hooks/useApi'

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

const PoolDetailChart = ({ address, token0, token1 }: { address: string; token0: string; token1: string }) => {
  const theme = useContext(ThemeContext)
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [feesHover, setFeesHover] = useState<number | undefined>()
  const [currentChartValue, setCurrentChartValue] = useState<string>('liquidity')
  const [currentChartPeriod, setCurrentChartPeriod] = useState<string>('week')

  const { data: lineChartData, loader: lineChartLoader, abortController } = useApiPoolStats(address, currentChartPeriod)

  const handleChartType = (e: string): void => {
    setCurrentChartValue(e)
  }

  const handleChartPeriod = (e: React.ChangeEvent<any>): void => {
    setCurrentChartPeriod(e.target.value)
  }

  const dateFormat = currentChartPeriod === 'all' ? 'MMM' : 'dd'

  useEffect(() => {
    if (!lineChartData || !lineChartData.length) return
    lineChartData
      .sort((a: IPoolGraph, b: IPoolGraph) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime()
      })
      .map((item: IPoolGraph) => {
        item.liquidity = Number(item.liquidity)
        item.volume = Number(item.volume)
        item.fees = Number(item.fees)
        return item
      })
  }, [lineChartData])

  useEffect(() => {
    if (!liquidityHover && lineChartData && lineChartData.length) {
      setLiquidityHover(lineChartData[lineChartData.length - 1].liquidity)
    }
  }, [liquidityHover, lineChartData, currentChartPeriod])

  useEffect(() => {
    if (!volumeHover && lineChartData && lineChartData.length) {
      setVolumeHover(lineChartData[lineChartData.length - 1].volume)
    }
  }, [volumeHover, lineChartData, currentChartPeriod])

  useEffect(() => {
    if (!feesHover && lineChartData && lineChartData.length) {
      setFeesHover(lineChartData[lineChartData.length - 1].fees)
    }
  }, [feesHover, lineChartData, currentChartPeriod])

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <TYPE.mediumHeaderEllipsis padding="18px 0">
        {`${token0}-${token1} `}
        <Trans>Pair History</Trans>
      </TYPE.mediumHeaderEllipsis>
      <Wrapper>
        <TYPE.black fontWeight={400}>
          <Trans>TVL</Trans>
        </TYPE.black>
        <TYPE.black style={{ paddingRight: '20px' }}>
          <BaseCurrencyView type="id" numeralFormat={'0,0'} value={liquidityHover || 0} />
        </TYPE.black>
      </Wrapper>
      <Wrapper>
        <TYPE.black fontWeight={400}>
          <Trans>Volume</Trans>
        </TYPE.black>
        <TYPE.black style={{ paddingRight: '20px' }}>
          <BaseCurrencyView type="id" numeralFormat={'0,0'} value={volumeHover || 0} />
        </TYPE.black>
      </Wrapper>
      <Wrapper>
        <TYPE.black fontWeight={400}>
          <Trans>Fees</Trans>
        </TYPE.black>
        <TYPE.black style={{ paddingRight: '20px' }}>
          <BaseCurrencyView type="id" numeralFormat={'0,0'} value={feesHover || 0} />
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
      {lineChartLoader ||
        (lineChartData && (
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
            value1Name={'liquidity'}
            value2Name={'volume'}
            value3Name={'fees'}
            currentValue={currentChartValue}
            dateFormat={dateFormat}
            XAxisTickGap={100}
            YAxisTick={{ fontSize: 14 }}
            style={{ flexDirection: 'column', marginTop: '0.5rem' }}
          />
        ))}
    </>
  )
}

export default PoolDetailChart
