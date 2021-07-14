import React from 'react'
import styled from 'styled-components/macro'

import { ETHIcon, NIIIcon, IconProps } from 'components/Icons'

type CurrencyNames = 'NII' | 'ETH'
type Props = {
  symbol: CurrencyNames
  containerStyle?: React.CSSProperties
  rootStyle?: React.CSSProperties
  iconProps?: IconProps
  hideSymbol?: boolean
}
const CurrencyAvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text1};
  span {
    margin-left: 8px;
    font-size: 1.25rem;
  }
`
const CurrencyLogoWrapper = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 50%;
  display: flex;
`
export const CurrencyAvatar = ({ symbol, iconProps, containerStyle, rootStyle, hideSymbol }: Props) => {
  let Icon
  if (symbol === 'ETH') {
    Icon = <ETHIcon {...iconProps} />
  } else if (symbol === 'NII') {
    Icon = <NIIIcon {...iconProps} />
  }
  return (
    <CurrencyAvatarWrapper style={rootStyle}>
      <CurrencyLogoWrapper style={containerStyle}>{Icon}</CurrencyLogoWrapper>
      {!hideSymbol && <span>{symbol}</span>}
    </CurrencyAvatarWrapper>
  )
}

export default CurrencyAvatar
