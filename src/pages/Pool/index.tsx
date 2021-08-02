import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import { t } from '@lingui/macro'
import qs from 'qs'
import { ArrowLeft } from 'react-feather'
import Tab from '../../components/tab/Tab'
import Tabs from '../../components/tab/Tabs'
import TabPanel from '../../components/tab/TabPanel'
import AppBody from '../AppBody'
import ToggleDrawer from '../../components/Header/ToggleDrawer'
import CurrencyDropdown from '../../components/Dropdowns/CurrencyDropdown'
import PoolsTable from '../../components/Table/pools'
import PoolsOverview, { getTitle } from '../../components/pools/PoolsOverview'
import { BodyScroller, Disclaimer, BarTitle, CurrencySelectWrapper } from '../../theme'
import CreatePoolButton from 'components/pools/CreatePoolButton'
import { PoolAppBar } from './styleds'
const tabNameToIndex: any = {
  0: 'overview',
  1: 'search',
}

type PoolsParams = {
  page?: string
}

export default function Pool() {
  const history = useHistory()
  const { search } = history.location
  const { state } = useLocation<any>() // FIXME: any
  const [activeTab, setActiveTab] = useState<number>(0)
  const params = useParams<PoolsParams>()

  const TabChangeHandler: any = useCallback(
    (e: any, newValue: any) => {
      history.push(`/pools/${tabNameToIndex[newValue]}`)
      setActiveTab(newValue)
    },
    [history]
  )

  useEffect(() => {
    const parsedQuery = qs.parse(search, { ignoreQueryPrefix: true })
    if (parsedQuery?.type !== undefined) {
      history.replace({
        ...history.location,
        state: { activeTab: 1, type: parsedQuery.type },
      })
    }
  }, [search, history])

  useEffect(() => {
    setActiveTab(state?.activeTab || activeTab)
  }, [state, activeTab])

  useEffect(() => {
    if (params?.page === undefined) {
      TabChangeHandler(null, 0)
    } else {
      setActiveTab(
        parseInt(Object.keys(tabNameToIndex).find((k) => tabNameToIndex[k] === params?.page?.split('?')[0]) || '0')
      )
    }
  }, [params, TabChangeHandler, setActiveTab, history])

  return (
    <>
      <PoolAppBar>
        {activeTab === 1 && state?.type ? (
          <BarTitle>
            <ArrowLeft style={{ cursor: 'pointer' }} onClick={history.goBack} />
            {getTitle(state?.type)}
          </BarTitle>
        ) : (
          <>
            <ToggleDrawer />
            <Tabs value={activeTab} onChange={TabChangeHandler}>
              <Tab key={`tab-0`} label={t`Overview`} />
              <Tab key={`tab-1`} label={t`Search`} />
            </Tabs>
          </>
        )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CreatePoolButton />
          <CurrencySelectWrapper>
            <CurrencyDropdown />
          </CurrencySelectWrapper>
        </div>
      </PoolAppBar>
      <BodyScroller>
        <TabPanel key={'tab-panel-0'} activeIndex={activeTab} index={0}>
          <Disclaimer>
            <span>Disclaimer:</span>
            {` `}
            {t`This is Dummy Data`}
          </Disclaimer>
          <PoolsOverview type="gainer" />
          <PoolsOverview type="looser" style={{ paddingTop: '50px' }} />
          <PoolsOverview type="new" style={{ paddingTop: '50px' }} />
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
