import React from 'react'
import styled from 'styled-components/macro'

export const BodyWrapper = styled.div<{ margin?: string }>`
  position: relative;
  margin-top: ${({ margin }) => margin ?? '0px'};
  max-width: 480px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.bg3};
  width: 100%;
  background: ${({ theme }) => theme.bg0};
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, ...rest }: { children: React.ReactNode }) {
  return <BodyWrapper {...rest}>{children}</BodyWrapper>
}
