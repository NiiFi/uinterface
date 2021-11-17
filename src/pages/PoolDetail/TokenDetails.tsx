import React from 'react'
import { Trans } from '@lingui/macro'
import { shortenDecimalValues } from 'utils'
import { ITokenDetail } from 'hooks/useApi'
import { TextItemWrapper, TextValue, TextLabel } from 'components/pools/styled'

import { BaseCurrencyView } from 'theme'

export type TokenDetailProps = {
  token: ITokenDetail
  oppositeSymbol: string
}

export default function TokenDetail(props: TokenDetailProps) {
  const { token, oppositeSymbol } = props

  return (
    <>
      <TextItemWrapper>
        <TextLabel>
          <Trans>Price</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>
          {shortenDecimalValues(token?.price)} {oppositeSymbol}
        </TextValue>
      </TextItemWrapper>
      <TextItemWrapper>
        <TextLabel>
          <Trans>Market Cap</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>
          <BaseCurrencyView type="symbol" value={token?.mcap} numeralFormat={'0.[00]a'} />
        </TextValue>
      </TextItemWrapper>
      <TextItemWrapper>
        <TextLabel>
          <Trans>Trading Volume</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>
          <BaseCurrencyView type="symbol" value={token?.trading} />
        </TextValue>
      </TextItemWrapper>
      <TextItemWrapper>
        <TextLabel>
          <Trans>24h Low / 24h High</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>
          {shortenDecimalValues(token?.low_24h)} {oppositeSymbol}
        </TextValue>
        <TextValue fontSize={'1rem'}>
          {shortenDecimalValues(token?.high_24h)} {oppositeSymbol}
        </TextValue>
      </TextItemWrapper>
    </>
  )
}
