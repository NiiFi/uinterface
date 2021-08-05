import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'

import Web3Status from 'components/Web3Status'
import { ButtonPrimary, ButtonProcess, ButtonSuccess } from 'components/Button'

import useFakeBuyTokenFlow from 'hooks/useFakeBuyTokenFlow'
import { useCurrency } from 'hooks/Tokens'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { ResponsiveRow, RowBetween } from 'components/Row'
import { WalletItem } from 'components/Header/WalletList'
import { TYPE, BaseCurrencyView } from 'theme'
import { useUserWallets } from 'state/user/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { useWalletModalToggle, useBuyTokenModalToggle } from 'state/application/hooks'
import { useEthereumToBaseCurrencyRatesAndApiState } from 'state/user/hooks'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import BuyTokenModal from 'components/BuyTokenModal'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'

const BuySectionAmountFigures = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 1rem;
  border-left: 1px solid ${({ theme }) => theme.bg3};
`
export default function BuySection() {
  const { ethereumToBaseCurrencyRates: rates } = useEthereumToBaseCurrencyRatesAndApiState()
  const toggleWalletModal = useWalletModalToggle()
  const toggleBuyTokenModal = useBuyTokenModalToggle()
  const { userWallets, userRecentWallet } = useUserWallets()
  const { account } = useActiveWeb3React()
  const { error } = useWeb3React()
  const inputCurrency = useCurrency('ETH')
  const { buyState, handleDeposit } = useFakeBuyTokenFlow()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  const activeWallet =
    account && userWallets[account.toLowerCase()]
      ? userWallets[account.toLowerCase()]
      : userRecentWallet && userWallets[userRecentWallet.toLowerCase()]
      ? userWallets[userRecentWallet.toLowerCase()]
      : null
  if (error || !activeWallet) {
    return <Web3Status />
  }
  const balanceValue = balance && rates['USD'] ? Number(formatCurrencyAmount(balance, 4)) * rates['USD'] : 0
  return (
    <>
      <RowBetween>
        <ResponsiveRow style={{ width: 'auto' }}>
          <WalletItem
            style={{ marginBottom: '0px', width: 'auto', marginRight: '1rem' }}
            name={activeWallet.name}
            address={account || userRecentWallet || ''}
          />
          <BuySectionAmountFigures>
            <TYPE.body>
              <Trans>Wallet Balance</Trans>
            </TYPE.body>
            <TYPE.mediumHeader>
              {<BaseCurrencyView value={balanceValue} type="symbol" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} />}
            </TYPE.mediumHeader>
          </BuySectionAmountFigures>
          <BuySectionAmountFigures>
            <TYPE.body>
              <Trans>Net Worth</Trans>
            </TYPE.body>
            <TYPE.mediumHeader>
              <BaseCurrencyView value={balanceValue * 2} type="symbol" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} />
            </TYPE.mediumHeader>
          </BuySectionAmountFigures>
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
                  <ButtonPrimary
                    fontSize={'0.875rem'}
                    onClick={toggleBuyTokenModal}
                    style={{ textTransform: 'uppercase' }}
                  >
                    <Trans>Buy Tokens</Trans>
                  </ButtonPrimary>
                )}
                {buyState === 'process' && (
                  <ButtonProcess fontSize={'0.875rem'} style={{ textTransform: 'uppercase' }}>
                    <Trans>waiting...</Trans>
                  </ButtonProcess>
                )}
                {buyState === 'deposit' && (
                  <ButtonSuccess fontSize={'0.875rem'} onClick={handleDeposit} style={{ textTransform: 'uppercase' }}>
                    <Trans>Deposit</Trans>
                  </ButtonSuccess>
                )}
              </div>
              <div style={{ display: 'flex' }}>
                <ButtonPrimary fontSize={'0.875rem'} style={{ textTransform: 'uppercase' }}>
                  <Trans>Send</Trans>
                </ButtonPrimary>
              </div>
            </>
          )}
        </ResponsiveRow>
      </RowBetween>
      <BuyTokenModal />
    </>
  )
}
