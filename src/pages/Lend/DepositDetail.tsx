import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { DefaultCard } from 'components/Card'
import { ResponsiveRow } from 'components/Row'
import LendForm from './components/LendForm'
import HealthFactor from './components/HealthFactor'
import { FormType, NumeralFormatType } from 'constants/lend'
import { useApiMarket } from 'hooks/useApi'
import { useActiveWeb3React } from 'hooks/web3'
import { useProtocolDataProviderContract } from 'hooks/useContract'
import useLending from 'hooks/useLending'
import { useAllTokenBalances } from 'state/wallet/hooks'
import { TYPE, FlexColumn, FlexRowWrapper, BaseCurrencyView, translatedYesNo } from 'theme'
import { shortenDecimalValues } from 'utils'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'

export default function DepositDetail({ address }: { address: string }) {
  const { account } = useActiveWeb3React()
  const { data, loader, abortController } = useApiMarket(address)
  const [walletBalance, setWalletBalance] = useState('0')
  const [decimals, setDecimals] = useState(18)
  const [symbol, setSymbol] = useState('')
  const relevantTokenBalances = useAllTokenBalances()
  const protocolDataProviderContract = useProtocolDataProviderContract()
  const lendingData = useLending(address, data)

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!data || !relevantTokenBalances || !protocolDataProviderContract) return

    const decimals = relevantTokenBalances[address]?.currency?.decimals || 18

    setSymbol(data.symbol)
    setWalletBalance(formatCurrencyAmount(relevantTokenBalances[address], decimals))
    setDecimals(decimals)
  }, [data, relevantTokenBalances, address, protocolDataProviderContract, account])

  return (
    <>
      <ResponsiveRow gap="2rem">
        <DefaultCard width="66%">
          {loader ||
            (data && (
              <LendForm
                type={FormType.DEPOSIT}
                totalAvailable={shortenDecimalValues(walletBalance, NumeralFormatType)}
                data={data}
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
                  <Trans>Total Balance</Trans>
                </TYPE.common>
                <TYPE.common>
                  {shortenDecimalValues(lendingData?.deposited)} {symbol}
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
