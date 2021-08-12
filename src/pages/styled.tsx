import styled from 'styled-components/macro'

export const StandardPageWrapper = styled.div`
  padding-top: 160px;
  width: 100%;
`
export const BodyPanel = styled.div`
  box-sizing: border-box;
  padding: 2rem;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0.625rem;
  `}
`
