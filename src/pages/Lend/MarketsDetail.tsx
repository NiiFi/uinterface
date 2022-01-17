import React, { useContext, useEffect } from 'react'
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
import { useApiMarket } from 'hooks/useApi'
import { BaseCurrencyView, FlexRowWrapper, TYPE } from 'theme'
import { shortenDecimalValues } from 'utils'
import { FixedNumber } from '@ethersproject/bignumber'

export default function MarketsDetail({ address }: { address: string }) {
  const theme = useContext(ThemeContext)
  const { data, loader, abortController } = useApiMarket(address)

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  data &&
    console.log(
      (parseFloat(data.totalBorrowed) * 100) / (parseFloat(data.totalBorrowed) + parseFloat(data.availableLiquidity))
    )

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
                            value={parseFloat(data.utilizationRate)}
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
                        </TYPE.darkGray>
                        <TYPE.green marginTop="10px">
                          <Trans>Available Liquidity</Trans>
                        </TYPE.green>
                        <TYPE.black fontSize={16} margin="10px 0">
                          {shortenDecimalValues(data.availableLiquidity)}
                        </TYPE.black>
                        <TYPE.darkGray fontSize={12} margin="10px 0">
                          <BaseCurrencyView
                            type="symbol"
                            value={
                              FixedNumber.from(data.availableLiquidity)
                                .mulUnsafe(FixedNumber.from(data.priceUSD))
                                .toString() as unknown as number
                            }
                          />
                        </TYPE.darkGray>
                      </TYPE.body>
                    </RowFixed>
                  </Card>
                  <DefaultCard style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <TYPE.black fontSize={16} fontWeight={400}>
                      <Trans>Reserve Size</Trans>
                    </TYPE.black>
                    <TYPE.black fontSize={16}>
                      <BaseCurrencyView
                        type="symbol"
                        value={
                          FixedNumber.from(data.marketSize)
                            .mulUnsafe(FixedNumber.from(data.priceUSD))
                            .toString() as unknown as number
                        }
                      />
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
