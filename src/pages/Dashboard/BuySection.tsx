import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'

import Web3Status from 'components/Web3Status'
import { ButtonPrimary, ButtonPrimaryDashboard } from 'components/Button'
import ProgressCircle from './components/ProgressCircle'
import { ResponsiveRow, RowBetween } from 'components/Row'
import { WalletItem } from 'components/Header/WalletList'
import { TYPE, BaseCurrencyView } from 'theme'
import { useUserWallets } from 'state/user/hooks'

import { useWalletModalToggle } from 'state/application/hooks'

import BuyTokenModal from 'components/BuyTokenModal'
import DepositTokenModal from 'components/DepositTokenModal'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import { BuyCryptoDropdown } from './components/BuyCryptoDropdown'
import { BuyCryptoButton } from './components/BuyCryptoButton'

const BuySectionAmountFigures = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`
const BuySectionCircleDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`

const CircleWrapper = styled.div`
  width: 38px;
`

const BuyCryptoWrapper = styled.div`
  display: flex;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none
  `};
`

const MediaResponsiveRow = styled.div`
  display: contents;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: flex;
  `};
`

const CirclePairWrapper = styled.div`
  display: contents;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: flex;
  flex-direction: column;
`};
`

// TODO: Add type to BuySectionProps
export default function BuySection({ account, balanceValue, data }: any) {
  const toggleWalletModal = useWalletModalToggle()
  const { userWallets, userRecentWallet } = useUserWallets()

  const { error } = useWeb3React()

  const activeWallet =
    account && userWallets[account.toLowerCase()]
      ? userWallets[account.toLowerCase()]
      : userRecentWallet && userWallets[userRecentWallet.toLowerCase()]
      ? userWallets[userRecentWallet.toLowerCase()]
      : null
  if (error || !activeWallet) {
    return <Web3Status />
  }

  return (
    <>
      <RowBetween>
        <ResponsiveRow style={{ width: 'auto' }}>
          <WalletItem
            style={{ marginBottom: '0px', width: 'auto', marginRight: '1rem' }}
            name={activeWallet.name}
            address={account || userRecentWallet || ''}
          />
        </ResponsiveRow>
        <ResponsiveRow gap={'1.25rem'} style={{ width: 'auto', justifyContent: 'flex-end' }}>
          {!account && (
            <div style={{ display: 'flex' }}>
              <ButtonPrimary fontSize={'0.875rem'} onClick={toggleWalletModal} style={{ textTransform: 'uppercase' }}>
                <Trans>Connect Wallet</Trans>
              </ButtonPrimary>
            </div>
          )}
          {account && (
            <>
              <BuyCryptoWrapper>
                <div style={{ display: 'flex', marginRight: '20px' }}>
                  <BuyCryptoButton />
                </div>
                <div style={{ display: 'flex' }}>
                  <ButtonPrimaryDashboard fontSize={'0.875rem'} style={{ textTransform: 'uppercase' }}>
                    <Trans>Send</Trans>
                  </ButtonPrimaryDashboard>
                </div>
              </BuyCryptoWrapper>
              <BuyCryptoDropdown />
            </>
          )}
        </ResponsiveRow>
      </RowBetween>
      <ResponsiveRow style={{ width: 'auto' }}>
        <BuySectionAmountFigures>
          <TYPE.body>
            <Trans>Net Worth</Trans>
          </TYPE.body>
          <TYPE.mediumHeader>
            {/* TODO: decide which balance we will use web3 or from Web API */}
            <BaseCurrencyView
              value={data.balanceUSD || balanceValue}
              type="symbol"
              numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT}
            />
          </TYPE.mediumHeader>
        </BuySectionAmountFigures>
        <MediaResponsiveRow style={{ width: 'auto' }}>
          <CirclePairWrapper>
            <div style={{ display: 'flex' }}>
              <CircleWrapper>
                <ProgressCircle percentage={data.wallet} color={'#9871F9'} />
              </CircleWrapper>
              <BuySectionCircleDescription>
                <TYPE.subHeader>
                  <Trans>Wallet</Trans>
                </TYPE.subHeader>
                <TYPE.mediumHeader fontSize="14px">{data.wallet}%</TYPE.mediumHeader>
              </BuySectionCircleDescription>
            </div>
            <div style={{ display: 'flex' }}>
              <CircleWrapper>
                <ProgressCircle percentage={data.pools} color={'#EF462F'} />
              </CircleWrapper>
              <BuySectionCircleDescription>
                <TYPE.subHeader>
                  <Trans>Liquidity Pools</Trans>
                </TYPE.subHeader>
                <TYPE.mediumHeader fontSize="14px">{data.pools}%</TYPE.mediumHeader>
              </BuySectionCircleDescription>
            </div>
          </CirclePairWrapper>
          <CirclePairWrapper>
            <div style={{ display: 'flex' }}>
              <CircleWrapper>
                <ProgressCircle percentage={data.farming} color={'#09CF7C'} />
              </CircleWrapper>
              <BuySectionCircleDescription>
                <TYPE.subHeader>
                  <Trans>Yield Farming</Trans>
                </TYPE.subHeader>
                <TYPE.mediumHeader fontSize="14px">{data.farming}%</TYPE.mediumHeader>
              </BuySectionCircleDescription>
            </div>
            <div style={{ display: 'flex' }}>
              <CircleWrapper>
                <ProgressCircle percentage={data.nfts} color={'#F79942'} />
              </CircleWrapper>
              <BuySectionCircleDescription>
                <TYPE.subHeader>
                  <Trans>NFTs</Trans>
                </TYPE.subHeader>
                <TYPE.mediumHeader fontSize="14px">{data.nfts}%</TYPE.mediumHeader>
              </BuySectionCircleDescription>
            </div>
          </CirclePairWrapper>
        </MediaResponsiveRow>
      </ResponsiveRow>
      <BuyTokenModal />
      <DepositTokenModal />
    </>
  )
}
