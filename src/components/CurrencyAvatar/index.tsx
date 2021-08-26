import React from 'react'
import styled from 'styled-components/macro'
import { IconProps } from 'components/Icons/types'
import { TokenName } from 'state/pool/actions'
import { getTokenLogoURL } from 'components/CurrencyLogo'
import ReactDOMServer from 'react-dom/server'
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
  GenericLogo,
} from 'components/Icons'
type Props = {
  symbol: TokenName | string
  address?: string
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
  > img {
    border-radius: 50%;
  }
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

const renderImage = (src: string, props: IconProps | undefined) => {
  let element = new Image()
  const changeSrc = (newSrc: string) => {
    element.src = newSrc
  }
  return (
    <img
      src={src}
      width={props?.width || 30}
      height={props?.height || 30}
      onError={() =>
        changeSrc(
          `data:image/svg+xml;utf8,${encodeURIComponent(
            ReactDOMServer.renderToStaticMarkup(GenericLogo({ width: props?.width || 30, height: props?.height || 30 }))
          )}`
        )
      }
      ref={(el: HTMLImageElement) => (element = el)}
    />
  )
}

export const CurrencyAvatar = ({ symbol, address, iconProps, containerStyle, rootStyle, hideSymbol }: Props) => {
  const backgroundColor = symbol === 'NII' ? 'white' : 'transparent'

  return (
    <CurrencyAvatarWrapper style={rootStyle}>
      <CurrencyLogoWrapper style={{ backgroundColor, ...containerStyle }}>
        {symbol in CurrencyIconMap
          ? CurrencyIconMap[symbol as TokenName](iconProps as IconProps)
          : renderImage(getTokenLogoURL(address || ''), iconProps)}
      </CurrencyLogoWrapper>
      {!hideSymbol && <span>{symbol}</span>}
    </CurrencyAvatarWrapper>
  )
}

export default CurrencyAvatar
