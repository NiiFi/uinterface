import React, { lazy, Suspense } from 'react'
import { t } from '@lingui/macro'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import TopBar from 'components/TopBar'
import { BodyScroller } from 'theme'
import { BodyPanel } from 'pages/styled'
import AppBody from 'pages/AppBody'

const allowedTypes: { [type: string]: string } = {
  wallet: t`Wallet`,
  pools: t`Liquidity Pools`,
  farm: t`Yield Farming`,
  nfts: t`NFTs`,
}

export default function DashboardSubpages({
  match: {
    params: { type },
  },
}: RouteComponentProps<{ type: string }>) {
  if (!(type in allowedTypes)) {
    return <Redirect to="/dashboard" />
  }

  const Component = lazy(() => import(`./${type[0].toUpperCase() + type.slice(1)}`))

  return (
    <>
      <TopBar title={allowedTypes[type]} />
      <BodyScroller>
        <BodyPanel>
          <AppBody size="lg">
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          </AppBody>
        </BodyPanel>
      </BodyScroller>
    </>
  )
}
