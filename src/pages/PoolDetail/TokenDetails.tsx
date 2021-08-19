import React from 'react'
import { Trans } from '@lingui/macro'

import { TextItemWrapper, TextValue, TextLabel } from 'components/pools/styled'
import { useEthereumToBaseCurrencyRatesAndApiState } from 'state/user/hooks'

import { BaseCurrencyView } from 'theme'

export type TokenDetailProps = {
  token: any // FIXME
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
  const { token } = props
  const { ethereumToBaseCurrencyRates: rates } = useEthereumToBaseCurrencyRatesAndApiState()

  const tokenUSD = token?.derivedETH ? token.derivedETH * rates?.['USD'] : 0

  return (
    <>
      <TextItemWrapper>
        <TextLabel>
          <Trans>Price</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}>
          <BaseCurrencyView type="id" value={tokenUSD} numeralFormat={'0,0'} />
        </TextValue>
      </TextItemWrapper>
      <TextItemWrapper>
        <TextLabel>
          <Trans>Market Cap</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}> - </TextValue>
      </TextItemWrapper>
      <TextItemWrapper>
        <TextLabel>
          <Trans>Trading Volume</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}> - </TextValue>
      </TextItemWrapper>
      <TextItemWrapper>
        <TextLabel>
          <Trans>24h Low / 24h High</Trans>
        </TextLabel>
        <TextValue fontSize={'1rem'}> - </TextValue>
        <TextValue fontSize={'1rem'}> - </TextValue>
      </TextItemWrapper>
    </>
  )
}
