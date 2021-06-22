import React from 'react'
import styled from 'styled-components/macro'

export const BodyWrapper = styled.div<{ margin?: string; padding?: string }>`
  position: relative;
  margin-top: ${({ margin }) => margin ?? '0px'};
  padding: ${({ padding }) => padding ?? '0px'};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.bg3};
  width: 100%;
  background: ${({ theme }) => theme.bg0};
`
export const BodyWrapperSm = styled(BodyWrapper)`
  max-width: 480px;
`
export const BodyWrapperLg = styled(BodyWrapper)`
  max-width: 100%;
`
/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({
  children,
  size = 'sm',
  ...rest
}: {
  children: React.ReactNode
  margin?: string
  padding?: string
  size?: string
}) {
  if (size === 'sm') return <BodyWrapperSm {...rest}>{children}</BodyWrapperSm>
  if (size === 'lg') return <BodyWrapperLg {...rest}>{children}</BodyWrapperLg>
  return <BodyWrapper {...rest}>{children}</BodyWrapper>
}
