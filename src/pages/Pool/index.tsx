import React, { useState } from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'
import AppBar from 'components/AppBar'
import { BodyScroller } from 'components/swap/styleds'
import Tab from '../../components/tab/Tab'
import Tabs from '../../components/tab/Tabs'
import TabPanel from '../../components/tab/TabPanel'
import AppBody from '../AppBody'
import ToggleDrawer from '../../components/Header/ToggleDrawer'
import CurrencyDropdown from '../../components/Dropdowns/CurrencyDropdown'
import PoolsTable from '../../components/Table/pools'
import PoolsOverview from '../../components/pools/PoolsOverview'

// TODO: move to shared library
const CurrencySelectWrapper = styled.div`
  display: flex;
  padding: 6px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none
  `}
`

export default function Pool() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const TabChangeHandler: any = (e: any, newValue: any) => setActiveTab(newValue)

  return (
    <>
      <AppBar style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <ToggleDrawer />
        <Tabs value={activeTab} onChange={TabChangeHandler}>
          <Tab key={`tab-0`} label={t`Overview`} />
          <Tab key={`tab-1`} label={t`Search`} />
        </Tabs>
        <CurrencySelectWrapper>
          <CurrencyDropdown />
        </CurrencySelectWrapper>
      </AppBar>
      <BodyScroller>
        <TabPanel key={'tab-panel-0'} activeIndex={activeTab} index={0}>
          <PoolsOverview type="new" />
          {/* <TopLoosersPools />
          <NewPools /> */}
        </TabPanel>
        <TabPanel key={'tab-panel-1'} activeIndex={activeTab} index={1}>
          <AppBody size="lg">
            <PoolsTable />
          </AppBody>
        </TabPanel>
      </BodyScroller>
    </>
  )
}
