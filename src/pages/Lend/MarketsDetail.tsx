import React, { useContext, useState, useEffect, useRef } from 'react'
import { ThemeContext } from 'styled-components'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import { Trans } from '@lingui/macro'
import { ButtonGray, ButtonEmpty } from 'components/Button'
import Card, { DefaultCard } from 'components/Card'
import CurrencyAvatar from 'components/CurrencyAvatar'
import LendHistory from 'components/LineChart/LendHistory'
import DepositApr from 'components/LineChart/DepositApr'
import UtilisationRate from 'components/LineChart/UtilisationRate'
import { ResponsiveRow, RowFixed } from 'components/Row'
import { useApiToken } from 'hooks/useApi'
import { BaseCurrencyView, FlexRowWrapper, TYPE } from 'theme'
import { shortenDecimalValues } from 'utils'
import { FixedNumber } from '@ethersproject/bignumber'

const defaultData = {
  symbol: 'DAI',
  address: '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD',
  priceUSD: '1.001603425808509555',
  marketSize: '100095130904866960226.138433105519090996',
  totalBorrowed: '41189645552983082000.427387662875399452',
  availableLiquidity: '99683234449337129405.711045442643691544',
  utilizationRate: '0.4115049871120184',
  depositAPY: '0.0000763261745362',
  depositAPR: '0.00007620149907',
  variableBorrowAPY: '0.020577264814059',
  variableBorrowAPR: '0.02057524935132',
  stableBorrowAPY: '3.9877459291593809',
  stableBorrowAPR: '3.91028762467566',
  ltv: '75.0',
  liquidationThreshold: '80.0',
  liquidationPenalty: '5.0',
  usedAsCollateral: true,
  stableBorrowing: true,
  timestamp: 1641979416,
  aTokenAddress: '0xdCf0aF9e59C002FA3AA091a46196b37530FD48a8',
  variableDebtTokenAddress: '0xEAbBDBe7aaD7d5A278da40967E62C8c8Fe5fAec8',
  stableDebtTokenAddress: '0x3B91257Fe5CA63b4114ac41A0d467D25E2F747F3',
}

export default function MarketsDetail({ address }: { address: string }) {
  const theme = useContext(ThemeContext)
  const [data, setData] = useState(defaultData)
  const borrowedPercents = useRef(0)
  const { data: tmpData, loader, abortController } = useApiToken(address)

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!tmpData) return
    setData({ ...defaultData, ...tmpData })
  }, [tmpData, setData])

  useEffect(() => {
    if (!data || !data.totalBorrowed) return
    const borrowed = parseFloat(data.totalBorrowed)
    const available = parseFloat(data.availableLiquidity)
    borrowedPercents.current = (borrowed * 100) / (borrowed + available)
  }, [data])

  return (
    <>
      {loader ||
        (data && (
          <>
            <ResponsiveRow gap="2rem">
              <DefaultCard>
                <LendHistory address={data.address} />
              </DefaultCard>
              <DefaultCard>
                <DepositApr address={data.address} />
              </DefaultCard>
              <DefaultCard>
                <UtilisationRate address={data.address} />
              </DefaultCard>
            </ResponsiveRow>
            <ResponsiveRow gap="2rem">
              <DefaultCard width="66%">
                <TYPE.body>
                  <Trans>Reserve Status & Configuration</Trans>
                </TYPE.body>
                <ResponsiveRow gap="2rem" style={{ marginTop: '20px' }}>
                  <Card>
                    <RowFixed style={{ justifyContent: 'start' }}>
                      <TYPE.body>
                        <div style={{ width: 132, height: 132 }}>
                          <CircularProgressbarWithChildren
                            value={borrowedPercents.current}
                            styles={buildStyles({
                              strokeLinecap: 'butt',
                              pathColor: theme.orange1,
                              trailColor: theme.green2,
                            })}
                          >
                            <div style={{ position: 'relative', top: '-5px' }}>
                              <CurrencyAvatar
                                symbol=""
                                address={data.address}
                                hideSymbol={true}
                                iconProps={{ width: '45', height: '45' }}
                              />
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </TYPE.body>
                      <TYPE.body style={{ marginLeft: '45px' }}>
                        <TYPE.orange>
                          <Trans>Total Borrowed</Trans>
                        </TYPE.orange>
                        <TYPE.black fontSize={16} margin="10px 0">
                          {shortenDecimalValues(data.totalBorrowed)}
                        </TYPE.black>
                        <TYPE.darkGray fontSize={12} margin="10px 0">
                          <BaseCurrencyView
                            type="symbol"
                            value={
                              FixedNumber.from(data.totalBorrowed)
                                .mulUnsafe(FixedNumber.from(data.priceUSD))
                                .toString() as unknown as number
                            }
                          />
                          {/* TODO: fix BaseCurrencyView to work with bignumber ^ */}
                        </TYPE.darkGray>
                        <TYPE.green marginTop="10px">
                          <Trans>Available Liquidity</Trans>
                        </TYPE.green>
                        <TYPE.black fontSize={16} margin="10px 0">
                          {shortenDecimalValues(data.availableLiquidity)}
                        </TYPE.black>
                        <TYPE.darkGray fontSize={12} margin="10px 0">
                          <BaseCurrencyView type="symbol" value={data.availableLiquidity as unknown as number} />
                          {/* TODO: convert to USD ^ */}
                        </TYPE.darkGray>
                      </TYPE.body>
                    </RowFixed>
                  </Card>
                  <DefaultCard style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <TYPE.black fontSize={16} fontWeight={400}>
                      <Trans>Reserve Size</Trans>
                    </TYPE.black>
                    <TYPE.black fontSize={16}>
                      <BaseCurrencyView type="symbol" value={data.marketSize as unknown as number} />
                      {/* TODO: convert to USD ^ */}
                    </TYPE.black>
                    <div style={{ width: '100%', borderTop: `1px solid ${theme.bg3}`, margin: '15px 0' }} />
                    <TYPE.black fontSize={16} fontWeight={400}>
                      <Trans>Utilisation Rate</Trans>
                    </TYPE.black>
                    <TYPE.black fontSize={16}>{shortenDecimalValues(data.utilizationRate)}%</TYPE.black>
                  </DefaultCard>
                </ResponsiveRow>
                <ResponsiveRow gap="2rem" style={{ marginTop: '20px' }}>
                  <DefaultCard>
                    <TYPE.body style={{ marginBottom: '16px' }}>
                      <Trans>Deposit</Trans>
                    </TYPE.body>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Deposit APY</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.depositAPY)}%</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Deposit APR</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.depositAPR)}%</TYPE.common>
                    </FlexRowWrapper>
                  </DefaultCard>
                  <DefaultCard>
                    <TYPE.body style={{ marginBottom: '16px' }}>
                      <Trans>Stable Borrowing</Trans>
                    </TYPE.body>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Borrow APY</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.stableBorrowAPY)}%</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Borrow APR</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.stableBorrowAPR)}%</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>% over total</Trans>
                      </TYPE.common>
                      <TYPE.common>-</TYPE.common>
                    </FlexRowWrapper>
                  </DefaultCard>
                  <DefaultCard>
                    <TYPE.body style={{ marginBottom: '16px' }}>
                      <Trans>Variable Borrowing</Trans>
                    </TYPE.body>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Borrow APY</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.variableBorrowAPY)}%</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Borrow APR</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.variableBorrowAPR)}%</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>% over total</Trans>
                      </TYPE.common>
                      <TYPE.common>-</TYPE.common>
                    </FlexRowWrapper>
                  </DefaultCard>
                </ResponsiveRow>
              </DefaultCard>
              <DefaultCard width="32%">
                <TYPE.body>
                  <Trans>Your Information</Trans>
                </TYPE.body>
                <FlexRowWrapper style={{ margin: '16px 0' }}>
                  <ButtonGray style={{ fontSize: '14px' }} padding={'10px 14px'}>
                    <Trans>Deposits</Trans>
                  </ButtonGray>
                  <ButtonEmpty style={{ fontSize: '14px' }} padding={'10px 14px'}>
                    <Trans>Withdraw</Trans>
                  </ButtonEmpty>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Your wallet balance</Trans>
                  </TYPE.common>
                  <TYPE.common>1.75 {data.symbol}</TYPE.common>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>You already deposited</Trans>
                  </TYPE.common>
                  <TYPE.common>0.21 {data.symbol}</TYPE.common>
                </FlexRowWrapper>
                <ButtonGray style={{ fontSize: '14px' }} padding={'10px 14px'} margin={'16px 0'} width={'50%'}>
                  <Trans>Borrows</Trans>
                </ButtonGray>{' '}
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Borrowed</Trans>
                  </TYPE.common>
                  <TYPE.common>0.00 {data.symbol}</TYPE.common>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Health factor</Trans>
                  </TYPE.common>
                  <TYPE.common>5.33</TYPE.common>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Loan to value</Trans>
                  </TYPE.common>
                  <TYPE.common>75%</TYPE.common>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  <TYPE.common>
                    <Trans>Available to you</Trans>
                  </TYPE.common>
                  <TYPE.common>0.00 {data.symbol}</TYPE.common>
                </FlexRowWrapper>
              </DefaultCard>
            </ResponsiveRow>
          </>
        ))}
    </>
  )
}
