import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'

import Web3Status from 'components/Web3Status'
import { ButtonPrimary, ButtonPrimaryDashboard, ButtonProcess, ButtonSuccess } from 'components/Button'
import ProgressCircle from './ProgressCircle'
import useFakeBuyTokenFlow from 'hooks/useFakeBuyTokenFlow'
import { ResponsiveRow, RowBetween } from 'components/Row'
import { WalletItem } from 'components/Header/WalletList'
import { TYPE, BaseCurrencyView } from 'theme'
import { useUserWallets } from 'state/user/hooks'

import { useWalletModalToggle, useBuyTokenModalToggle, useDepositToNahmiiModalToggle } from 'state/application/hooks'

import BuyTokenModal from 'components/BuyTokenModal'
import DepositTokenModal from 'components/DepositTokenModal'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'

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

// TODO: Add type to BuySectionProps
export default function BuySection({ account, balanceValue }: any) {
  const toggleWalletModal = useWalletModalToggle()
  const toggleBuyTokenModal = useBuyTokenModalToggle()
  const toggleDepositToNahmiiModal = useDepositToNahmiiModalToggle()
  const { userWallets, userRecentWallet } = useUserWallets()

  const { error } = useWeb3React()

  const { buyState } = useFakeBuyTokenFlow()

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
              <div style={{ display: 'flex' }}>
                {buyState === 'buy' && (
                  <ButtonPrimaryDashboard
                    fontSize={'0.875rem'}
                    onClick={toggleBuyTokenModal}
                    style={{ textTransform: 'uppercase' }}
                  >
                    {/* TODO: Add Trans */}
                    <Trans>Buy Crypto</Trans>
                  </ButtonPrimaryDashboard>
                )}
                {buyState === 'process' && (
                  <ButtonProcess fontSize={'0.875rem'} style={{ textTransform: 'uppercase' }}>
                    <Trans>waiting...</Trans>
                  </ButtonProcess>
                )}
                {buyState === 'deposit' && (
                  <ButtonSuccess
                    fontSize={'0.875rem'}
                    onClick={toggleDepositToNahmiiModal}
                    style={{ textTransform: 'uppercase' }}
                  >
                    <Trans>Deposit</Trans>
                  </ButtonSuccess>
                )}
              </div>
              <div style={{ display: 'flex' }}>
                <ButtonPrimaryDashboard fontSize={'0.875rem'} style={{ textTransform: 'uppercase' }}>
                  <Trans>Send</Trans>
                </ButtonPrimaryDashboard>
              </div>
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
            <BaseCurrencyView value={balanceValue * 2} type="symbol" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} />
          </TYPE.mediumHeader>
        </BuySectionAmountFigures>
        <div style={{ display: 'flex' }}>
          <CircleWrapper>
            <ProgressCircle percentage={45} color={'#9871F9'} />
          </CircleWrapper>
          <BuySectionCircleDescription>
            <TYPE.subHeader>Wallet</TYPE.subHeader>
            <TYPE.mediumHeader fontSize="14px">45%</TYPE.mediumHeader>
          </BuySectionCircleDescription>
        </div>
        <div style={{ display: 'flex' }}>
          <CircleWrapper>
            <ProgressCircle percentage={15} color={'#EF462F'} />
          </CircleWrapper>
          <BuySectionCircleDescription>
            <TYPE.subHeader>Liquidity Pools</TYPE.subHeader>
            <TYPE.mediumHeader fontSize="14px">15%</TYPE.mediumHeader>
          </BuySectionCircleDescription>
        </div>
        <div style={{ display: 'flex' }}>
          <CircleWrapper>
            <ProgressCircle percentage={10} color={'#09CF7C'} />
          </CircleWrapper>
          <BuySectionCircleDescription>
            <TYPE.subHeader>Yield Farming</TYPE.subHeader>
            <TYPE.mediumHeader fontSize="14px">10%</TYPE.mediumHeader>
          </BuySectionCircleDescription>
        </div>
        <div style={{ display: 'flex' }}>
          <CircleWrapper>
            <ProgressCircle percentage={20} color={'#F79942'} />
          </CircleWrapper>
          <BuySectionCircleDescription>
            <TYPE.subHeader>NFTs</TYPE.subHeader>
            <TYPE.mediumHeader fontSize="14px">20%</TYPE.mediumHeader>
          </BuySectionCircleDescription>
        </div>
      </ResponsiveRow>
      <BuyTokenModal />
      <DepositTokenModal />
    </>
  )
}
