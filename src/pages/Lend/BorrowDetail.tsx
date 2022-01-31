import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { DefaultCard } from 'components/Card'
import { ResponsiveRow } from 'components/Row'
import LendForm from './components/LendForm'
import HealthFactor from './components/HealthFactor'
import { FormType } from 'constants/lend'
import { useApiMarket } from 'hooks/useApi'
import { useActiveWeb3React } from 'hooks/web3'
import useLending from 'hooks/useLending'
import { useAllTokenBalances } from 'state/wallet/hooks'
import { TYPE, FlexColumn, FlexRowWrapper, BaseCurrencyView } from 'theme'
import { shortenDecimalValues } from 'utils'

export default function BorrowDetail({ address }: { address: string }) {
  const { account } = useActiveWeb3React()
  const { data, loader, abortController } = useApiMarket(address)
  const [walletBalance, setWalletBalance] = useState('0')
  const [borrowed, setBorrowed] = useState('0')
  const [decimals, setDecimals] = useState(18)
  const [symbol, setSymbol] = useState('')
  const [totalCollateral, setTotalCollateral] = useState(0)
  const relevantTokenBalances = useAllTokenBalances()
  const lendingData = useLending(address, data)

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!data || !lendingData) return

    const decimals = relevantTokenBalances[address]?.currency?.decimals || 18

    setSymbol(data.symbol)
    setWalletBalance(lendingData.availableToBorrow)
    setDecimals(decimals)
    setBorrowed(lendingData.borrowed)
    setTotalCollateral(Number(lendingData?.totalCollateralETH))
  }, [data, relevantTokenBalances, address, account, lendingData])

  return (
    <>
      <ResponsiveRow gap="2rem">
        <DefaultCard width="66%">
          {loader ||
            (data && (
              <LendForm
                type={FormType.BORROW}
                symbol={symbol}
                address={address}
                totalAvailable={walletBalance}
                currencyPrice={data.priceETH}
                decimals={decimals}
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
                  <Trans>You borrowed</Trans>
                </TYPE.common>
                <TYPE.common>
                  {shortenDecimalValues(borrowed)} {symbol}
                </TYPE.common>
              </FlexRowWrapper>
              <FlexRowWrapper>
                <TYPE.common>
                  <Trans>Total collateral</Trans>
                </TYPE.common>
                <TYPE.common>
                  <BaseCurrencyView type="symbol" value={totalCollateral} currency="ETH" />
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
