import React, { useState, useEffect } from 'react'
import { Slash } from 'react-feather'
import styled from 'styled-components/macro'
import { Currency } from '@uniswap/sdk-core'
import { IconProps } from 'components/Icons/types'
import { TokenName } from 'state/pool/actions'
import { getTokenLogoURL } from 'components/CurrencyLogo'
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
  symbol: TokenName | string
  currency?: Currency
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
const availableIcons = [
  'USD',
  'ETH',
  'CAD',
  'CHF',
  'INR',
  'HKD',
  'BTC',
  'EUR',
  'CNY',
  'GBP',
  'RUB',
  'MXN',
  'KRW',
  'TRY',
  'JPY',
  'BRL',
  'SEK',
  'AUD',
  'NOK',
  'SGD',
  'NII',
]

const renderImage = (src: string) => {
  return <img src={src} width="30" height="30" />
}

export const CurrencyAvatar = ({ symbol, currency, iconProps, containerStyle, rootStyle, hideSymbol }: Props) => {
  const [logo, setLogo] = useState<any>() // TODO: set proper types
  const backgroundColor = symbol === 'NII' ? 'white' : 'transparent'

  useEffect(() => {
    const logo = new Image()
    logo.src = (currency !== undefined && 'address' in currency && getTokenLogoURL(currency.address)) || ''
    logo.onload = () => {
      setLogo(renderImage(logo.src))
    }
    logo.onerror = () => {
      if (availableIcons.indexOf(symbol as string) === -1) {
        setLogo(<Slash {...iconProps} width={30} height={30} />)
      } else {
        const Icon = CurrencyIconMap[symbol as TokenName]
        setLogo(<Icon {...iconProps} />)
      }
    }
  }, [symbol, currency, iconProps, setLogo])

  return (
    <CurrencyAvatarWrapper style={rootStyle}>
      <CurrencyLogoWrapper style={{ backgroundColor, ...containerStyle }}>{logo}</CurrencyLogoWrapper>
      {!hideSymbol && <span>{symbol}</span>}
    </CurrencyAvatarWrapper>
  )
}

export default CurrencyAvatar
