import React, { useCallback, useContext, useEffect, useState } from 'react'
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
import { WalletConnect } from 'components/Wallet'
import Toggle from 'components/Toggle'
import { useApiMarket } from 'hooks/useApi'
import { useActiveWeb3React } from 'hooks/web3'
import { BaseCurrencyView, FlexRowWrapper, TYPE, translatedYesNo, HorizontalSeparator } from 'theme'
import { shortenDecimalValues, getContract } from 'utils'
import { FixedNumber, formatFixed } from '@ethersproject/bignumber'
import ERC20_ABI from 'abis/erc20.json'
import DATA_PROVIDER_ABI from 'abis/lending-protocol-data-provider.json'
import LENDING_POOL_ABI from 'abis/lending-pool.json'
import { PROTOCOL_DATA_PROVIDER_ADDRESS, LENDING_POOL_CONTRACT_ADDRESS } from 'constants/general'
import { calculateGasMargin } from '../../utils/calculateGasMargin'

export default function MarketsDetail({ address }: { address: string }) {
  const theme = useContext(ThemeContext)
  const [walletBalance, setWalletBalance] = useState('0')
  const [deposited, setDeposited] = useState('0')
  const [borrowed, setBorrowed] = useState('0')
  const [variableDebt, setVariableDebt] = useState('0')
  const [stableDebt, setStableDebt] = useState('0')
  const [healthFactor, setHealthFactor] = useState('0')
  const [ltv, setLtv] = useState('0')
  const [availableToBorrow, setAvailableToBorrow] = useState('0')
  const [useAsCollateral, setUseAsCollateral] = useState(false)
  const { data, loader, abortController } = useApiMarket(address)

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { account, library, chainId } = useActiveWeb3React()

  const handleSetUserUseReserveAsCollateral = useCallback(
    async (newStatus: boolean) => {
      if (!account || !library || !chainId) return
      const lendingPoolContract = getContract(LENDING_POOL_CONTRACT_ADDRESS, LENDING_POOL_ABI, library, account)

      await lendingPoolContract.setUserUseReserveAsCollateral(address, newStatus, {
        gasPrice: await lendingPoolContract.provider.getGasPrice(),
        gasLimit: calculateGasMargin(
          await lendingPoolContract.estimateGas.setUserUseReserveAsCollateral(address, newStatus)
        ),
      })
    },
    [account, library, chainId, address]
  )

  const handleSwapBorrowRateMode = useCallback(
    async (mode: 1 | 2) => {
      if (!account || !library || !chainId) return
      const lendingPoolContract = getContract(LENDING_POOL_CONTRACT_ADDRESS, LENDING_POOL_ABI, library, account)

      await lendingPoolContract.swapBorrowRateMode(address, mode, {
        gasPrice: await lendingPoolContract.provider.getGasPrice(),
        gasLimit: calculateGasMargin(await lendingPoolContract.estimateGas.swapBorrowRateMode(address, mode)),
      })
    },
    [account, library, chainId, address]
  )

  useEffect(() => {
    if (!data || !account || !library || !chainId) return
    const tokenContract = getContract(address, ERC20_ABI, library, account)
    const protocolDataProviderContract = getContract(
      PROTOCOL_DATA_PROVIDER_ADDRESS,
      DATA_PROVIDER_ABI,
      library,
      account
    )
    const lendingPoolContract = getContract(LENDING_POOL_CONTRACT_ADDRESS, LENDING_POOL_ABI, library, account)

    Promise.all([
      tokenContract.balanceOf(account),
      tokenContract.decimals(),
      protocolDataProviderContract.getUserReserveData(address, account),
      lendingPoolContract.getUserAccountData(account),
    ])
      .then((res) => {
        const [token, decimals, reserve, pool] = res
        const currentVariableDebt = formatFixed(reserve.currentVariableDebt, decimals)
        const currentStableDebt = formatFixed(reserve.currentStableDebt, decimals)
        const availableBorrowsETH = formatFixed(pool.availableBorrowsETH, 18)

        setVariableDebt(currentVariableDebt)
        setStableDebt(currentStableDebt)
        setWalletBalance(formatFixed(token, decimals))
        setDeposited(formatFixed(reserve.currentATokenBalance, decimals))
        setBorrowed(FixedNumber.from(currentVariableDebt).addUnsafe(FixedNumber.from(currentStableDebt)).toString())
        setHealthFactor(formatFixed(pool.healthFactor, 18))
        setLtv(formatFixed(pool.ltv, 2))
        setUseAsCollateral(reserve.usageAsCollateralEnabled)
        setAvailableToBorrow(
          FixedNumber.from(availableBorrowsETH)
            .divUnsafe(FixedNumber.from(data?.priceETH))
            .mulUnsafe(FixedNumber.from('0.99'))
            .toString()
        )
      })
      .catch((e) => console.log(e)) // TODO: implement proper error handling
  }, [account, library, chainId, address, data])

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
                    <HorizontalSeparator />
                    <TYPE.black fontSize={16} fontWeight={400}>
                      <Trans>Utilisation Rate</Trans>
                    </TYPE.black>
                    <TYPE.black fontSize={16}>{shortenDecimalValues(data.utilizationRate)} %</TYPE.black>
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
                      <TYPE.common>{shortenDecimalValues(data.depositAPY)} %</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Deposit APR</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.depositAPR)} %</TYPE.common>
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
                      <TYPE.common>{shortenDecimalValues(data.stableBorrowAPY)} %</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Borrow APR</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.stableBorrowAPR)} %</TYPE.common>
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
                      <TYPE.common>{shortenDecimalValues(data.variableBorrowAPY)} %</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Borrow APR</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.variableBorrowAPR)} %</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>% over total</Trans>
                      </TYPE.common>
                      <TYPE.common>-</TYPE.common>
                    </FlexRowWrapper>
                  </DefaultCard>
                </ResponsiveRow>
                <DefaultCard style={{ marginTop: '20px' }}>
                  <ResponsiveRow>
                    <TYPE.common>
                      <Trans>Maximum LTV</Trans>
                      <TYPE.darkGray>{shortenDecimalValues(data.ltv)} %</TYPE.darkGray>
                    </TYPE.common>
                    <TYPE.common>
                      <Trans>Liquidation threshold</Trans>
                      <TYPE.darkGray>{shortenDecimalValues(data.liquidationThreshold)} %</TYPE.darkGray>
                    </TYPE.common>
                    <TYPE.common>
                      <Trans>Liquidation penalty</Trans>
                      <TYPE.darkGray>{shortenDecimalValues(data.liquidationPenalty)} %</TYPE.darkGray>
                    </TYPE.common>
                    <TYPE.common>
                      <Trans>Used as collateral</Trans>
                      <TYPE.darkGray>{translatedYesNo(data.usedAsCollateral)}</TYPE.darkGray>
                    </TYPE.common>
                    <TYPE.common>
                      <Trans>Stable borrowing</Trans>
                      <TYPE.darkGray>{translatedYesNo(data.stableBorrowing)}</TYPE.darkGray>
                    </TYPE.common>
                  </ResponsiveRow>
                </DefaultCard>
              </DefaultCard>
              <DefaultCard width="32%">
                <TYPE.body style={{ marginBottom: '16px' }}>
                  <Trans>Your Information</Trans>
                </TYPE.body>
                {account ? (
                  <>
                    <FlexRowWrapper>
                      <ButtonGray style={{ fontSize: '14px' }} padding={'10px 14px'}>
                        <Trans>Deposit</Trans>
                      </ButtonGray>
                      <ButtonEmpty style={{ fontSize: '14px' }} padding={'10px 14px'}>
                        <Trans>Withdraw</Trans>
                      </ButtonEmpty>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Your wallet balance</Trans>
                      </TYPE.common>
                      <TYPE.common>
                        {shortenDecimalValues(walletBalance)} {data.symbol}
                      </TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>You already deposited</Trans>
                      </TYPE.common>
                      <TYPE.common>
                        {shortenDecimalValues(deposited)} {data.symbol}
                      </TYPE.common>
                    </FlexRowWrapper>
                    {parseInt(deposited) ? (
                      <FlexRowWrapper>
                        <TYPE.common>
                          <Trans>Use as collateral</Trans>
                        </TYPE.common>
                        <TYPE.common>
                          {' '}
                          <Toggle
                            id="toggle-expert-mode-button"
                            isActive={useAsCollateral}
                            toggle={() => handleSetUserUseReserveAsCollateral(!useAsCollateral)}
                          />
                        </TYPE.common>
                      </FlexRowWrapper>
                    ) : (
                      ''
                    )}
                    <ButtonGray style={{ fontSize: '14px' }} padding={'10px 14px'} margin={'16px 0'} width={'50%'}>
                      <Trans>Borrow</Trans>
                    </ButtonGray>{' '}
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Borrowed</Trans>
                      </TYPE.common>
                      <TYPE.common>
                        {shortenDecimalValues(borrowed)} {data.symbol}
                      </TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Health factor</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(healthFactor)}</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Loan to value</Trans>
                      </TYPE.common>
                      <TYPE.common>{ltv} %</TYPE.common>
                    </FlexRowWrapper>
                    {data.borrowingEnabled && (
                      <FlexRowWrapper>
                        <TYPE.common>
                          <Trans>Available to you</Trans>
                        </TYPE.common>
                        <TYPE.common>
                          {shortenDecimalValues(
                            FixedNumber.from(availableToBorrow)
                              .subUnsafe(FixedNumber.from(data.availableLiquidity))
                              .isNegative()
                              ? availableToBorrow
                              : data.availableLiquidity
                          )}{' '}
                          {data.symbol}
                        </TYPE.common>
                      </FlexRowWrapper>
                    )}
                    {(!FixedNumber.from(stableDebt).isZero() || !FixedNumber.from(variableDebt).isZero()) && (
                      <>
                        <HorizontalSeparator />
                        {!FixedNumber.from(stableDebt).isZero() && (
                          <FlexRowWrapper>
                            <TYPE.common>
                              <Trans>Stable</Trans>
                            </TYPE.common>
                            <TYPE.common>
                              <Toggle
                                id="stable-mode-button"
                                isActive={true}
                                toggle={() => {
                                  handleSwapBorrowRateMode(1)
                                }}
                              />
                            </TYPE.common>
                            <TYPE.common>
                              <TYPE.darkGray>{shortenDecimalValues(stableDebt)}</TYPE.darkGray>
                            </TYPE.common>
                            <TYPE.common>
                              <TYPE.darkGray>
                                <BaseCurrencyView
                                  type="symbol"
                                  value={
                                    FixedNumber.from(stableDebt)
                                      .mulUnsafe(FixedNumber.from(data.priceUSD))
                                      .toString() as unknown as number
                                  }
                                />
                              </TYPE.darkGray>
                            </TYPE.common>
                            <TYPE.common>
                              <ButtonGray style={{ fontSize: '14px' }} padding={'0 14px'}>
                                <Trans>Repay</Trans>
                              </ButtonGray>
                            </TYPE.common>
                          </FlexRowWrapper>
                        )}
                        {!FixedNumber.from(variableDebt).isZero() && (
                          <FlexRowWrapper>
                            <TYPE.common>
                              <Trans>Variable</Trans>
                            </TYPE.common>
                            <TYPE.common>
                              <Toggle
                                id="variable-mode-button"
                                isActive={true}
                                toggle={() => {
                                  handleSwapBorrowRateMode(2)
                                }}
                              />
                            </TYPE.common>
                            <TYPE.common>
                              <TYPE.darkGray>{shortenDecimalValues(variableDebt)}</TYPE.darkGray>
                            </TYPE.common>
                            <TYPE.common>
                              <TYPE.darkGray>
                                <BaseCurrencyView
                                  type="symbol"
                                  value={
                                    FixedNumber.from(variableDebt)
                                      .mulUnsafe(FixedNumber.from(data.priceUSD))
                                      .toString() as unknown as number
                                  }
                                />
                              </TYPE.darkGray>
                            </TYPE.common>
                            <TYPE.common>
                              <ButtonGray style={{ fontSize: '14px' }} padding={'0 14px'}>
                                <Trans>Repay</Trans>
                              </ButtonGray>
                            </TYPE.common>
                          </FlexRowWrapper>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <WalletConnect />
                )}
              </DefaultCard>
            </ResponsiveRow>
          </>
        ))}
    </>
  )
}
