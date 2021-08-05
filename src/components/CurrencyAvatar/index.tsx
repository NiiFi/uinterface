import React from 'react'
import styled from 'styled-components/macro'

import { IconProps } from 'components/Icons/types'
import { TokenName } from 'state/pool/actions'
import {
  USD,
  ETH,
  CAD,
  CHF,
  INR,
  HKD,
  BTC,
  EUR,
  CNY,
  GBP,
  RUB,
  MXN,
  KRW,
  TRY,
  JPY,
  BRL,
  SEK,
  AUD,
  NOK,
  SGD,
  NIIIcon,
} from 'components/Icons'
type Props = {
  symbol: TokenName
  containerStyle?: React.CSSProperties
  rootStyle?: React.CSSProperties
  iconProps?: IconProps
  hideSymbol?: boolean
}
const CurrencyAvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 1.25rem;
  span {
    margin-left: 8px;
  }
`
const CurrencyLogoWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 50%;
  display: flex;
`
const CurrencyIconMap: { [currency in TokenName]: (props: IconProps) => JSX.Element } = {
  USD,
  ETH,
  CAD,
  CHF,
  INR,
  HKD,
  BTC,
  EUR,
  CNY,
  GBP,
  RUB,
  MXN,
  KRW,
  TRY,
  JPY,
  BRL,
  SEK,
  AUD,
  NOK,
  SGD,
  NII: NIIIcon,
}
export const CurrencyAvatar = ({ symbol, iconProps, containerStyle, rootStyle, hideSymbol }: Props) => {
  const Icon = CurrencyIconMap[symbol]
  const backgroundColor = symbol === 'NII' ? 'white' : 'transparent'
  return (
    <CurrencyAvatarWrapper style={rootStyle}>
      <CurrencyLogoWrapper style={{ backgroundColor, ...containerStyle }}>
        <Icon {...iconProps} />
      </CurrencyLogoWrapper>
      {!hideSymbol && <span>{symbol}</span>}
    </CurrencyAvatarWrapper>
  )
}

export default CurrencyAvatar
