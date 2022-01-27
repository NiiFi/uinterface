import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { formatFixed } from '@ethersproject/bignumber'
import { DefaultCard } from 'components/Card'
import { ResponsiveRow } from 'components/Row'
import LendForm from './components/LendForm'
import { FormType } from 'constants/lend'
import { useApiMarket } from 'hooks/useApi'
import { useActiveWeb3React } from 'hooks/web3'
import { useProtocolDataProviderContract } from 'hooks/useContract'
import { useAllTokenBalances } from 'state/wallet/hooks'
import { TYPE, FlexColumn, FlexRowWrapper, BaseCurrencyView, translatedYesNo } from 'theme'
import { shortenDecimalValues } from 'utils'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'

export default function DepositDetail({ address }: { address: string }) {
  const { account } = useActiveWeb3React()
  const { data, loader, abortController } = useApiMarket(address)
  const [totalBalance, setTotalBalance] = useState('0')
  const [walletBalance, setWalletBalance] = useState('0')
  const [decimals, setDecimals] = useState(18)
  const [symbol, setSymbol] = useState('')
  const relevantTokenBalances = useAllTokenBalances()
  const protocolDataProviderContract = useProtocolDataProviderContract()

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

    protocolDataProviderContract
      .getUserReserveData(address, account)
      .then((res: any) => {
        setTotalBalance(formatFixed(res.currentATokenBalance, decimals))
      })
      .catch((e: any) => console.log(e)) // TODO: implement proper error handling
  }, [data, relevantTokenBalances, address, protocolDataProviderContract, account])

  return (
    <>
      <ResponsiveRow gap="2rem">
        <DefaultCard width="66%">
          {loader ||
            (data && (
              <LendForm
                type={FormType.DEPOSIT}
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
