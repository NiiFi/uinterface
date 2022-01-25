import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { DefaultCard } from 'components/Card'
import { ResponsiveRow } from 'components/Row'
import LendForm, { FormType } from './components/LendForm'
import { useApiMarket } from 'hooks/useApi'
import { useActiveWeb3React } from 'hooks/web3'
import { TYPE, FlexColumn, FlexRowWrapper, BaseCurrencyView, translatedYesNo } from 'theme'
import { shortenDecimalValues } from 'utils'

export default function DepositDetail({ address }: { address: string }) {
  const { account } = useActiveWeb3React()
  const { data, loader, abortController } = useApiMarket(address)
  const [totalBalance] = useState('2.75')
  const [walletBalance] = useState('1.75')
  const [symbol, setSymbol] = useState('')

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!data) return
    setSymbol(data.symbol)
  }, [data])

  return (
    <>
      <ResponsiveRow gap="2rem">
        <DefaultCard width="66%">
          <LendForm type={FormType.DEPOSIT} symbol={symbol} address={address} />
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
                  {shortenDecimalValues(totalBalance)} {symbol}
                </TYPE.common>
              </FlexRowWrapper>
              <FlexRowWrapper>
                <TYPE.common>
                  <Trans>Your wallet balance</Trans>
                </TYPE.common>
                <TYPE.common>
                  {shortenDecimalValues(walletBalance)} {symbol}
                </TYPE.common>
              </FlexRowWrapper>
            </DefaultCard>
          ) : (
            ''
          )}
          {loader ||
            (data && (
              <DefaultCard>
                <TYPE.body style={{ marginBottom: '16px' }}>
                  {symbol} <Trans>Reserve Overview</Trans>
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
                    <Trans>Maximum LTV</Trans>
                  </TYPE.common>
                  <TYPE.common>{shortenDecimalValues(data.ltv)} %</TYPE.common>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Deposit APY</Trans>
                  </TYPE.common>
                  <TYPE.common>{shortenDecimalValues(data.depositAPY)} %</TYPE.common>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Liquidation threshold</Trans>
                  </TYPE.common>
                  <TYPE.common>{shortenDecimalValues(data.liquidationThreshold)} %</TYPE.common>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Liquidation penalty</Trans>
                  </TYPE.common>
                  <TYPE.common>{shortenDecimalValues(data.liquidationPenalty)} %</TYPE.common>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Can be used as collateral</Trans>
                  </TYPE.common>
                  <TYPE.common>{translatedYesNo(data.usedAsCollateral)}</TYPE.common>
                </FlexRowWrapper>
              </DefaultCard>
            ))}
        </FlexColumn>
      </ResponsiveRow>
    </>
  )
}
