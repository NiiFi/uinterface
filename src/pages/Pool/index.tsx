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
import CreatePoolButton from 'components/pools/CreatePoolButton'
import PoolsOverview from '../../components/pools/PoolsOverview'
import { Disclaimer } from '../../theme'

// TODO: move to shared library
const CurrencySelectWrapper = styled.div`
  display: flex;
  padding: 6px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none
  `}
`

const tabNameToIndex: any = {
  0: 'overview',
  1: 'search',
}

export default function Pool(props: any) {
  const { history } = props
  const [activeTab, setActiveTab] = useState<number>(0)

  const TabChangeHandler: any = (e: any, newValue: any) => {
    history.push(`/pools/${tabNameToIndex[newValue]}`)
    setActiveTab(newValue)
  }

  return (
    <>
      <AppBar style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <ToggleDrawer />
        <Tabs value={activeTab} onChange={TabChangeHandler}>
          <Tab key={`tab-0`} label={t`Overview`} />
          <Tab key={`tab-1`} label={t`Search`} />
        </Tabs>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CreatePoolButton />
          <CurrencySelectWrapper>
            <CurrencyDropdown />
          </CurrencySelectWrapper>
        </div>
      </AppBar>
      <BodyScroller>
        <TabPanel key={'tab-panel-0'} activeIndex={activeTab} index={0}>
          <Disclaimer>
            <span>Disclaimer:</span>
            {` `}
            {t`This is Dummy Data`}
          </Disclaimer>
          <PoolsOverview type="gainer" setActive={setActiveTab} />
          <PoolsOverview type="looser" style={{ paddingTop: '50px' }} setActive={setActiveTab} />
          <PoolsOverview type="new" style={{ paddingTop: '50px' }} setActive={setActiveTab} />
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
