import { Currency } from '@uniswap/sdk-core'
import React, { useMemo } from 'react'
import styled from 'styled-components/macro'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'
import Logo from '../Logo'
import { useAllTokens } from '../../hooks/Tokens'

export const GetTokenLogoURL = (address: string) => {
  const allTokens = useAllTokens()
  return (
    (allTokens[address] as WrappedTokenInfo)?.logoURI || `${process.env.REACT_APP_TOKEN_LOGO_BASE}${address}/logo.png`
  )
}

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
`

export default function CurrencyLogo({
  currency,
  size = '32px',
  style,
  ...rest
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (!currency || currency.isNative) return []

    if (currency.isToken) {
      const defaultUrls = currency.chainId === 1 ? [GetTokenLogoURL(currency.address)] : []
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, ...defaultUrls]
      }
      return defaultUrls
    }
    return []
  }, [currency, uriLocations])

  if (currency?.symbol === 'ETH') {
    return (
      <CurrencyAvatar
        symbol={currency.symbol}
        hideSymbol={true}
        rootStyle={{ width: '32px', height: '32px', ...style }}
        iconProps={{ width: '32px', height: '32px' }}
      />
    )
  }
  if (currency?.isNative) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} {...rest} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} {...rest} />
}
