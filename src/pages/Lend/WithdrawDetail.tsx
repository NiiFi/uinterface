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

export default function WithdrawDetail({ address }: { address: string }) {
  const { account } = useActiveWeb3React()
  const { data, loader, abortController } = useApiMarket(address)
  const [availableToWithdraw, setAvailableToWithdraw] = useState('0')
  const relevantTokenBalances = useAllTokenBalances()
  const lendingData = useLending(address, data)

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!lendingData || !data?.priceETH) return
    let calculatedWithdraw = '0'
    const estimatedHealthFactor = FixedNumber.from(lendingData.healthFactor).subUnsafe(FixedNumber.from('1'))
    if (!estimatedHealthFactor.isZero() && !estimatedHealthFactor.isNegative()) {
      calculatedWithdraw = estimatedHealthFactor
        .mulUnsafe(FixedNumber.from(lendingData.totalDebtETH))
        .divUnsafe(FixedNumber.from(lendingData.liquidationThreshold).addUnsafe(FixedNumber.from('0.01')))
        .mulUnsafe(FixedNumber.from('0.99'))
        .divUnsafe(FixedNumber.from(data.priceETH))
        .toString()
    }

    const available = FixedNumber.from(calculatedWithdraw)
      .subUnsafe(FixedNumber.from(lendingData?.deposited))
      .isNegative()
      ? calculatedWithdraw
      : lendingData?.deposited

    setAvailableToWithdraw(
      FixedNumber.from(available).subUnsafe(FixedNumber.from(data.availableLiquidity)).isNegative()
        ? available
        : data.availableLiquidity
    )
  }, [lendingData, data])

  return (
    <>
      <ResponsiveRow gap="2rem">
        <DefaultCard width="66%">
          {loader ||
            (data && (
              <LendForm
                type={FormType.WITHDRAW}
                totalAvailable={shortenDecimalValues(availableToWithdraw, NumeralFormatType)}
                data={data}
                decimals={relevantTokenBalances[address]?.currency?.decimals || 18}
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
