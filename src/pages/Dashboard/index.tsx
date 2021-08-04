import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'

import ToggleDrawer from 'components/Header/ToggleDrawer'
import CollectionImage1 from 'assets/images/nft-collection-1.png'
import CollectionImage2 from 'assets/images/nft-collection-2.png'
import CollectionImage3 from 'assets/images/nft-collection-3.png'
import CollectionImage4 from 'assets/images/nft-collection-4.png'
import AppBar from 'components/AppBar'
import CurrencyDropdown from 'components/Dropdowns/CurrencyDropdown'
import AppBody from '../AppBody'
import Web3Status from 'components/Web3Status'
import TabPanel from 'components/tab/TabPanel'
import DashboardAssetsTable from 'components/Table/Dashboard/Assets'
import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'
import { useCurrency } from 'hooks/Tokens'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { ResponsiveRow, RowBetween } from 'components/Row'
import { WalletItem } from 'components/Header/WalletList'
import { BodyScroller, CurrencySelectWrapper, TYPE, BaseCurrencyView } from 'theme'
import { useUserWallets } from 'state/user/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { useWalletModalToggle } from 'state/application/hooks'
import { useEthereumToBaseCurrencyRatesAndApiState } from 'state/user/hooks'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'

const StyledAppBar = styled(AppBar)`
  padding: 0px 2rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 0px 0.625rem;
  `}
`

const BuySectionAmountFigures = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 1rem;
  border-left: 1px solid ${({ theme }) => theme.bg3};
`
const BuySection = () => {
  const { ethereumToBaseCurrencyRates: rates } = useEthereumToBaseCurrencyRatesAndApiState()
  const toggleWalletModal = useWalletModalToggle()
  const { userWallets, userRecentWallet } = useUserWallets()
  const { account } = useActiveWeb3React()
  const { error } = useWeb3React()
  const inputCurrency = useCurrency('ETH')
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
              <ButtonPrimary fontSize={'0.875rem'} style={{ textTransform: 'uppercase' }}>
                <Trans>Buy Tokens</Trans>
              </ButtonPrimary>
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
  )
}
export default function Dashboard() {
  return (
    <>
      <StyledAppBar>
        <ToggleDrawer />
        <span></span>
        <CurrencySelectWrapper>
          <CurrencyDropdown />
        </CurrencySelectWrapper>
      </StyledAppBar>
      <BodyScroller>
        <TabPanel activeIndex={0} index={0}>
          <AutoColumn gap="lg">
            <ResponsiveRow>
              <AppBody size="lg" style={{ padding: '1.5rem' }}>
                <BuySection />
              </AppBody>
            </ResponsiveRow>
            <ResponsiveRow gap="2rem">
              <AppBody size="md">
                <DashboardAssetsTable />
              </AppBody>
              <AppBody size="md">
                <DashboardAssetsTable />
              </AppBody>
            </ResponsiveRow>
            <ResponsiveRow>
              <AppBody size="lg" padding="2rem">
                <TYPE.mediumHeader>
                  <Trans>NFTs Collection</Trans>
                </TYPE.mediumHeader>
                <ResponsiveRow gap="1rem" style={{ marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                  {[CollectionImage1, CollectionImage2, CollectionImage3, CollectionImage4].map((src, index) => (
                    <div style={{ display: 'flex' }} key={index}>
                      <img src={src} alt={`Nft Collection Image ${index + 1}`} />
                    </div>
                  ))}
                </ResponsiveRow>
              </AppBody>
            </ResponsiveRow>
          </AutoColumn>
        </TabPanel>
      </BodyScroller>
    </>
  )
}
