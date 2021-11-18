import React, { lazy, Suspense } from 'react'
import { t } from '@lingui/macro'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import TopBar from 'components/TopBar'
import { BodyScroller } from 'theme'
import { BodyPanel } from 'pages/styled'
import AppBody from 'pages/AppBody'
import { LoaderWrapped } from 'theme/components'

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
      <TopBar title={allowedTypes[type]} showBack={'/dashboard?tab=1'} />
      <BodyScroller>
        <BodyPanel>
          <AppBody size="lg">
            <Suspense fallback={<LoaderWrapped />}>
              <Component />
            </Suspense>
          </AppBody>
        </BodyPanel>
      </BodyScroller>
    </>
  )
}
