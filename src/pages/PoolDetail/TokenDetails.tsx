import React from 'react'
import { Trans } from '@lingui/macro'

import { TextItemWrapper, TextValue, TextLabel } from 'components/pools/styled'
import { BaseCurrencyView } from 'theme'

export type TokenDetailProps = {
  symbol?: string
  address?: string
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TokenDetail(props: TokenDetailProps) {
  /**
   * NOTE: We need to implement the API that fetches the detail
   * about the Token. Then we also need to integrate API
   * Which convert the overall value to User Selected Currency.
   * That Is why Passing the props of address and symbol.
   *
   * TODO: Once we Implement the API we need to make the symbol and address required in interface.
   */
  return (
    <>
      <TextItemWrapper>
        <TextLabel>
          <Trans>Price</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>
          <BaseCurrencyView type="id" value="2,153.74" />
        </TextValue>
      </TextItemWrapper>
      <TextItemWrapper>
        <TextLabel>
          <Trans>Market Cap</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>
          <BaseCurrencyView type="id" value="250,740,789,640" />
        </TextValue>
      </TextItemWrapper>
      <TextItemWrapper>
        <TextLabel>
          <Trans>Trading Volume</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>
          <BaseCurrencyView type="id" value="28,275,865,529" />
        </TextValue>
      </TextItemWrapper>
      <TextItemWrapper>
        <TextLabel>
          <Trans>24h Low / 24h High</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>
          <BaseCurrencyView type="id" value="1,817.05" />
        </TextValue>
        <TextValue fontSize={'1rem'}>
          <BaseCurrencyView type="id" value="2,279.35" />
        </TextValue>
      </TextItemWrapper>
    </>
  )
}
