import React, { useEffect, useState, lazy, Suspense, useCallback } from 'react'
import { useHistory, RouteComponentProps } from 'react-router-dom'
import { Trans } from '@lingui/macro'
import { Plus } from 'react-feather'
import Tab from 'components/tab/Tab'
import Tabs from 'components/tab/Tabs'
import ToggleDrawer from 'components/Header/ToggleDrawer'
import { CustomAppBar } from 'pages/styled'
import { AutoColumn } from 'components/Column'
import { BodyScroller, CurrencySelectWrapper } from 'theme'
import TabPanel from 'components/tab/TabPanel'
import CurrencyDropdown from 'components/Dropdowns/CurrencyDropdown'
import { LoaderWrapped } from 'theme/components'

const SUBPAGES = ['deposit', 'borrow', 'markets']

const getComponentName = (uri: string) => {
  const page: string = uri.split('/').reverse()[0]
  return `${page[0].toUpperCase() + page.slice(1)}`
}

import { ButtonPrimary, ButtonProps } from 'components/Button'
// TODO: remove as useless
// eslint-disable-next-line
const CreateDepositButton = ({ onClick, ...rest }: ButtonProps) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick && onClick(e)
    },
    [onClick]
  )

  return (
    <ButtonPrimary
      {...rest}
      style={{ height: '2.25rem', fontSize: '0.875rem', textTransform: 'uppercase' }}
      onClick={handleClick}
    >
      <Plus style={{ marginRight: '0.5rem' }} />
      <Trans>Create Deposit</Trans>
    </ButtonPrimary>
  )
}

export default function Lend(props: RouteComponentProps<{ page: string }>) {
  const [activeTab, setActiveTab] = useState<number>(0)
  const history = useHistory()

  const {
    match: {
      params: { page },
    },
  } = props

  const componentName = getComponentName(page || SUBPAGES[activeTab])
  const Component = lazy(() => import(`pages/Lend/${componentName}`))

  const TabChangeHandler: any = (e: any, newValue: number) => {
    const page: string = newValue ? `/${SUBPAGES[newValue]}` : ''
    history.push(`/lend${page}`)
    setActiveTab(newValue)
  }

  useEffect(() => {
    const page = location.hash.split('/').reverse()[0]
    if (SUBPAGES.indexOf(page) === -1) return

    setActiveTab(SUBPAGES.indexOf(page))
  }, [])

  return (
    <>
      <CustomAppBar>
        <ToggleDrawer />
        <Tabs value={activeTab} onChange={TabChangeHandler}>
          <Tab key={`tab-0`} label={`Deposit`} />
          <Tab key={`tab-1`} label={`Borrow`} />
          <Tab key={`tab-2`} label={`Markets`} />
        </Tabs>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* {SUBPAGES[activeTab] === 'deposit' && <CreateDepositButton onClick={() => alert('not implemented yet')} />} */}
          <CurrencySelectWrapper>
            <CurrencyDropdown />
          </CurrencySelectWrapper>
        </div>
      </CustomAppBar>
      <BodyScroller>
        <TabPanel key={`tab-panel-${activeTab}`} activeIndex={activeTab} index={activeTab}>
          <AutoColumn gap="lg">
            <Suspense fallback={<LoaderWrapped />}>
              <Component />
            </Suspense>
          </AutoColumn>
        </TabPanel>
      </BodyScroller>
    </>
  )
}
