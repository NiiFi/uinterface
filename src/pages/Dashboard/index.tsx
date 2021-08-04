import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import ToggleDrawer from 'components/Header/ToggleDrawer'
import CollectionImage1 from 'assets/images/nft-collection-1.png'
import CollectionImage2 from 'assets/images/nft-collection-2.png'
import CollectionImage3 from 'assets/images/nft-collection-3.png'
import CollectionImage4 from 'assets/images/nft-collection-4.png'
import AppBar from 'components/AppBar'
import CurrencyDropdown from 'components/Dropdowns/CurrencyDropdown'
import AppBody from '../AppBody'
import TabPanel from 'components/tab/TabPanel'
import { AutoColumn } from 'components/Column'
import { ResponsiveRow } from 'components/Row'
import { WalletItem } from 'components/Header/WalletList'
import { BodyScroller, CurrencySelectWrapper, TYPE } from 'theme'
import { useUserWallets } from 'state/user/hooks'
import { useActiveWeb3React } from 'hooks/web3'

const StyledAppBar = styled(AppBar)`
  padding: 0px 2rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 0px 0.625rem;
  `}
`
export default function Dashboard() {
  const { userWallets, userRecentWallet } = useUserWallets()
  const { account } = useActiveWeb3React()

  const activeWallet =
    account && userWallets[account.toLowerCase()]
      ? userWallets[account.toLowerCase()]
      : userRecentWallet && userWallets[userRecentWallet.toLowerCase()]
      ? userWallets[userRecentWallet.toLowerCase()]
      : null
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
              <AppBody size="lg">
                {activeWallet && (
                  <WalletItem
                    style={{ marginBottom: '0px' }}
                    name={activeWallet.name}
                    address={account || userRecentWallet || ''}
                  />
                )}
              </AppBody>
            </ResponsiveRow>
            <ResponsiveRow gap="2rem">
              <AppBody size="md">
                <span>Table 1</span>
              </AppBody>
              <AppBody size="md">
                <span>Table 2</span>
              </AppBody>
            </ResponsiveRow>
            <ResponsiveRow>
              <AppBody size="lg" padding="2rem">
                <TYPE.mediumHeader>
                  <Trans>NFT&apos;s Collections</Trans>
                </TYPE.mediumHeader>
                <ResponsiveRow gap="2rem" style={{ marginTop: '1rem', overflowX: 'auto' }}>
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
