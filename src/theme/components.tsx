import React, { HTMLProps } from 'react'
import ReactGA from 'react-ga4'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { darken } from 'polished'
import { ArrowLeft, X, ExternalLink as LinkIconFeather, Trash } from 'react-feather'
import { useBaseCurrency, useEthereumToBaseCurrencyRatesAndApiState } from 'state/user/hooks'
import { BaseCurrencyDetail } from 'constants/tokens'
import Loader from 'components/Loader'
import { shortenDecimalValues } from 'utils'

export const ButtonText = styled.button`
  outline: none;
  border: none;
  font-size: inherit;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }

  :focus {
    text-decoration: underline;
  }
`

export const Button = styled.button.attrs<{ warning: boolean }, { backgroundColor: string }>(({ warning, theme }) => ({
  backgroundColor: warning ? theme.red1 : theme.primary1,
}))`
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 3rem;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ theme }) => theme.white};
  width: 100%;

  :hover,
  :focus {
    background-color: ${({ backgroundColor }) => darken(0.05, backgroundColor)};
  }

  :active {
    background-color: ${({ backgroundColor }) => darken(0.1, backgroundColor)};
  }

  :disabled {
    background-color: ${({ theme }) => theme.bg1};
    color: ${({ theme }) => theme.text4};
    cursor: auto;
  }
`

export const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
`

// for wrapper react feather icons
export const IconWrapper = styled.div<{ stroke?: string; size?: string; marginRight?: string; marginLeft?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size ?? '20px'};
  height: ${({ size }) => size ?? '20px'};
  margin-right: ${({ marginRight }) => marginRight ?? 0};
  margin-left: ${({ marginLeft }) => marginLeft ?? 0};
  & > * {
    stroke: ${({ theme, stroke }) => stroke ?? theme.blue1};
  }
`

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.primary1)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`

// An internal link from the react-router-dom library that is correctly styled
export const StyledInternalLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

const LinkIconWrapper = styled.a`
  text-decoration: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    text-decoration: none;
    opacity: 0.7;
  }

  :focus {
    outline: none;
    text-decoration: none;
  }

  :active {
    text-decoration: none;
  }
`

export const LinkIcon = styled(LinkIconFeather)`
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.blue1};
`

export const TrashIcon = styled(Trash)`
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.text3};

  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    opacity: 0.7;
  }
`

const rotateImg = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`

export const UniTokenAnimated = styled.img`
  animation: ${rotateImg} 5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  padding: 2rem 0 0 0;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
`

const ETHERSCAN_HOSTNAMES: { [hostname: string]: true } = {
  'etherscan.io': true,
  'ropsten.etherscan.io': true,
  'rinkeby.etherscan.io': true,
  'kovan.etherscan.io': true,
  'goerli.etherscan.io': true,
}

/**
 * Returns the anonymized version of the given href, i.e. one that does not leak user information
 * @param href the anonymized version of the given href
 */
function anonymizeLink(href: string): string {
  try {
    const url = new URL(href)
    if (ETHERSCAN_HOSTNAMES[url.hostname]) {
      return `${url.hostname}/${url.pathname.split('/')[1]}/***`
    }
    return href
  } catch (error) {
    console.error('Failed to anonymize outbound link', error)
    return href
  }
}

function handleClickExternalLink(event: React.MouseEvent<HTMLAnchorElement>) {
  const { target, href } = event.currentTarget

  const anonymizedHref = anonymizeLink(href)

  // don't prevent default, don't redirect if it's a new tab
  if (target === '_blank' || event.ctrlKey || event.metaKey) {
    ReactGA.outboundLink({ label: anonymizedHref }, () => {
      console.debug('Fired outbound link event', anonymizedHref)
    })
  } else {
    event.preventDefault()
    // send a ReactGA event and then trigger a location change
    ReactGA.outboundLink({ label: anonymizedHref }, () => {
      window.location.href = anonymizedHref
    })
  }
}

/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  return <StyledLink target={target} rel={rel} href={href} onClick={handleClickExternalLink} {...rest} />
}

export function ExternalLinkIcon({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  return (
    <LinkIconWrapper target={target} rel={rel} href={href} onClick={handleClickExternalLink} {...rest}>
      <LinkIcon />
    </LinkIconWrapper>
  )
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.img`
  animation: 2s ${rotate} linear infinite;
  width: 16px;
  height: 16px;
`

const BackArrowLink = styled(StyledInternalLink)`
  color: ${({ theme }) => theme.text1};
`
export function BackArrow({ to }: { to: string }) {
  return (
    <BackArrowLink to={to}>
      <ArrowLeft />
    </BackArrowLink>
  )
}

export const CustomLightSpinner = styled(Spinner)<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

export const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

export const HideExtraSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

export const SmallOnly = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: block;
  `};
`

export const ExtraSmallOnly = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: block;
  `};
`
export const CurrencySelectWrapper = styled.div`
  display: flex;
  padding: 6px;
  padding-right: 0px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none
  `}
`
type BaseCurrencyViewProps = {
  value: number
  type?: Exclude<keyof BaseCurrencyDetail, 'label'>
  format?: (detail: BaseCurrencyDetail, value: number) => string
  numeralFormat?: string
  currency?: string
}
export const BaseCurrencyView = ({
  type = 'symbol',
  format,
  value,
  numeralFormat,
  currency = 'USD',
}: BaseCurrencyViewProps) => {
  /**
   * @description
   * This Component is responsible for "Conversion" and  "Displaying" the FIAT values data
   * into User selected BaseCurrency.
   *
   * * ==========
   * * Conversion
   * * ==========
   *
   * Conversion part is based on an assumption.
   * @important It is being assumed that every value in the system coming from
   * the API OR Balance is in US Dollar. That is why you would notice this piece of code down below
   *
   * -----------------------------------------------------------------------------
   * @snippet
   * const valueEquivalent = (value / rates['USD']) * rates[baseCurrencyDetail.id]
   * -----------------------------------------------------------------------------
   * What this code snippet does, it divide the value by the rate of USD.
   * This give us the value in ethereum. then we multiply that ethereum equivalent with
   * selected currency rate.
   *
   * @example
   * * User selected baseCurrency is GBP and 1 ethereum in GBP is £450
   * * Lets assume we pass the value of $3000
   * * Rate of 1 ethereum in USD is $2000
   *
   * * so 3000 / 2000 = 1.5 ethereum
   * * then to get the equivalent in GBP we do 1.5 * 450 = £675
   *
   * * ==========
   * * Displaying
   * * ==========
   *
   * Displaying part is pretty straight forward. It accept a prop called "type"
   * - type === 'id'
   *   This will output "<VALUE> <ID>"
   *      @example "200 USD" OR "400 GBP"
   * - type === 'symbol'
   *   This will output "<SYMBOL> <VALUE>"
   *      @example "$ 200" OR "£ 400"
   *
   * For Custom format you can pass the format prop which should be a function
   * @see BaseCurrencyViewProps
   *
   * * ============
   * * Improvements
   * * ============
   * 1. @see https://github.com/NiiFi/uinterface/issues/79
   *
   */
  const { baseCurrencyDetail } = useBaseCurrency()
  const {
    ethereumToBaseCurrencyRates: rates,
    ethereumToBaseCurrencyRateApiState: { loading },
  } = useEthereumToBaseCurrencyRatesAndApiState()
  if (!rates && loading) {
    return <Loader />
  }
  const valueEquivalent = (value / rates[currency]) * rates[baseCurrencyDetail.id]
  const numeralFormattedValue = shortenDecimalValues(`${valueEquivalent}`, numeralFormat)
  if (format) {
    return <span title={baseCurrencyDetail.label}>{format(baseCurrencyDetail, valueEquivalent)}</span>
  }

  if (type === 'symbol') {
    return <span title={baseCurrencyDetail.label}>{`${baseCurrencyDetail.symbol} ${numeralFormattedValue}`}</span>
  }

  return <span title={baseCurrencyDetail.label}>{`${numeralFormattedValue} ${baseCurrencyDetail.id}`}</span>
}

const LoaderWrapper = styled.div`
  padding: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(20vh - 10rem);
  width: 100%;
`
export const LoaderWrapped = () => {
  return (
    <LoaderWrapper>
      <Loader size="2rem" />
    </LoaderWrapper>
  )
}
