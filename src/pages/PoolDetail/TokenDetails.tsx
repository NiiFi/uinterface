import React from 'react'
import { Trans } from '@lingui/macro'

import { TextItemWrapper, TextValue, TextLabel } from './styled'

export const MainCurrency = 'US$'
export default function TokenDetail() {
  return (
    <>
      <TextItemWrapper>
        <TextLabel>
          <Trans>Price</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>2,153.74 {MainCurrency}</TextValue>
      </TextItemWrapper>
      <TextItemWrapper>
        <TextLabel>
          <Trans>Market Cap</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>250,740,789,640 {MainCurrency}</TextValue>
      </TextItemWrapper>
      <TextItemWrapper>
        <TextLabel>
          <Trans>Trading Volume</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>28,275,865,529 {MainCurrency}</TextValue>
      </TextItemWrapper>
      <TextItemWrapper>
        <TextLabel>
          <Trans>24h Low / 24h High</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>1,817.05 {MainCurrency}</TextValue>
        <TextValue fontSize={'1rem'}>2,279.35 {MainCurrency}</TextValue>
      </TextItemWrapper>
    </>
  )
}
