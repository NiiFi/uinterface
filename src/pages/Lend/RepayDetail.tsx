import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { FixedNumber } from '@ethersproject/bignumber'
import { DefaultCard } from 'components/Card'
import { ResponsiveRow } from 'components/Row'
import LendForm from './components/LendForm'
import HealthFactor from './components/HealthFactor'
import { FormType, NumeralFormatType } from 'constants/lend'
import { useApiMarket } from 'hooks/useApi'
import { useActiveWeb3React } from 'hooks/web3'
import useLending from 'hooks/useLending'
import { useAllTokenBalances } from 'state/wallet/hooks'
import { TYPE, FlexColumn, FlexRowWrapper, BaseCurrencyView } from 'theme'
import { shortenDecimalValues } from 'utils'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'

export default function RepayDetail({ address, type }: { address: string; type: string }) {
  const { account } = useActiveWeb3React()
  const { data, loader, abortController } = useApiMarket(address)
  const relevantTokenBalances = useAllTokenBalances()
  const lendingData = useLending(address, data)
  const [totalValue, setTotalValue] = useState('0')

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!lendingData || !lendingData.variableDebt || !relevantTokenBalances) return
    const total = type === 'stable' ? lendingData.stableDebt : lendingData.variableDebt
    const currentBallance = formatCurrencyAmount(
      relevantTokenBalances[address],
      relevantTokenBalances[address]?.currency?.decimals || 18
    )

    if (currentBallance[0] !== '<') {
      setTotalValue(
        FixedNumber.from(currentBallance).subUnsafe(FixedNumber.from(total)).isNegative() ? currentBallance : total
      )
    }
  }, [lendingData, relevantTokenBalances, address, type])

  return (
    <>
      <ResponsiveRow gap="2rem">
        <DefaultCard width="66%">
          {loader ||
            (data && (
              <LendForm
                type={FormType.REPAY}
                totalAvailable={shortenDecimalValues(totalValue, NumeralFormatType)}
                data={data}
                decimals={relevantTokenBalances[address]?.currency?.decimals || 18}
                lendingData={lendingData}
              />
            ))}
        </DefaultCard>
        <FlexColumn width="32%">
          {account ? (
            <DefaultCard>
              <TYPE.body style={{ marginBottom: '16px' }}>
                <Trans>Reserve Overview</Trans>
              </TYPE.body>
              <FlexRowWrapper>
                <TYPE.common>
                  <Trans>You Borrowed</Trans>
                </TYPE.common>
                <TYPE.common>
                  {shortenDecimalValues(lendingData?.borrowed)} {data?.symbol}
                </TYPE.common>
              </FlexRowWrapper>
              <FlexRowWrapper>
                <TYPE.common>
                  <Trans>Total Balance</Trans>
                </TYPE.common>
                <TYPE.common>
                  {shortenDecimalValues(lendingData?.deposited)} {data?.symbol}
                </TYPE.common>
              </FlexRowWrapper>
              <FlexRowWrapper>
                <TYPE.common>
                  <Trans>Loan to value</Trans>
                </TYPE.common>
                <TYPE.common>{shortenDecimalValues(lendingData?.ltv || '')}</TYPE.common>
              </FlexRowWrapper>
              <FlexRowWrapper>
                <TYPE.common>
                  <Trans>Health factor</Trans>
                </TYPE.common>
                <HealthFactor value={lendingData?.healthFactor || '0'} />
              </FlexRowWrapper>
            </DefaultCard>
          ) : (
            ''
          )}
          {loader ||
            (data && (
              <DefaultCard>
                <TYPE.body style={{ marginBottom: '16px' }}>
                  {data?.symbol} <Trans>Reserve Overview</Trans>
                </TYPE.body>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Utilization rate</Trans>
                  </TYPE.common>
                  <TYPE.common>{shortenDecimalValues(data.utilizationRate)} %</TYPE.common>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Asset price</Trans>
                  </TYPE.common>
                  <TYPE.common>
                    <BaseCurrencyView type="symbol" value={data.priceUSD as unknown as number} />
                  </TYPE.common>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Available liquidity</Trans>
                  </TYPE.common>
                  <TYPE.common>{shortenDecimalValues(data.availableLiquidity)}</TYPE.common>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Stable borrow APY</Trans>
                  </TYPE.common>
                  <TYPE.common>{shortenDecimalValues(data.stableBorrowAPY)} %</TYPE.common>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Vairable borrow APY</Trans>
                  </TYPE.common>
                  <TYPE.common>{shortenDecimalValues(data.variableBorrowAPY)} %</TYPE.common>
                </FlexRowWrapper>
              </DefaultCard>
            ))}
        </FlexColumn>
      </ResponsiveRow>
    </>
  )
}
