import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { Trans } from '@lingui/macro'
import { GridList, GridListTile } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import { FlexColumn } from 'components/Column'
import { DefaultCard } from 'components/Card'
import { getPoolsData } from 'components/Table/sample-pools'
import { TYPE } from 'theme'

type PoolsOverviewProps = {
  type: 'new' | 'gainer' | 'looser'
  limit?: number
}

export default function PoolsOverview({ type, limit }: PoolsOverviewProps) {
  const poolsData = useMemo(() => {
    return getPoolsData(type, limit)
  }, [type, limit])

  return (
    <>
      <FlexColumn style={{ padding: '5px 0' }}>
        <TYPE.mediumHeader>Top Gainer Pools [FIXME]</TYPE.mediumHeader>
        <NavLink to={'/swap'}>
          <Trans>See all</Trans>
        </NavLink>
      </FlexColumn>
      <GridList cols={isMobile ? 1 : 3}>
        {Object.entries(poolsData).map(([key, item]) => {
          return (
            <GridListTile key={key} style={{ padding: 10 }}>
              <DefaultCard>
                <div>
                  {item.token0.symbol} / {item.token1.symbol}
                </div>
                <FlexColumn style={{ padding: '5px 0' }}>
                  <div>
                    <TYPE.subHeader color="text1">Liquidity</TYPE.subHeader>
                    <TYPE.mediumHeader fontSize="16">$1.24b</TYPE.mediumHeader>
                  </div>
                  <div>
                    <TYPE.subHeader color="text1">ROI (1Y)</TYPE.subHeader>
                    <TYPE.mediumHeader fontSize="16">0,01</TYPE.mediumHeader>
                  </div>{' '}
                  <div>
                    <TYPE.subHeader>Trending</TYPE.subHeader>
                    <TYPE.mediumHeader fontSize="16">+114,6%</TYPE.mediumHeader>
                  </div>
                </FlexColumn>
              </DefaultCard>
            </GridListTile>
          )
        })}
      </GridList>
    </>
  )
}
