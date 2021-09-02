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
import DashboardAssetsTable from 'components/Table/Dashboard/Assets'
import DashboardHistoryTable from 'components/Table/Dashboard/History'
import { AutoColumn } from 'components/Column'
import { ResponsiveRow } from 'components/Row'
import { BodyScroller, CurrencySelectWrapper, TYPE } from 'theme'
import BuySection from './BuySection'
const StyledAppBar = styled(AppBar)`
  padding: 0px 2rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 0px 0.625rem;
  `}
`

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
                <DashboardHistoryTable />
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
