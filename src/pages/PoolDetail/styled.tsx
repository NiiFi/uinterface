import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import { AutoColumn } from 'components/Column'

export const TextLabel = styled(TYPE.black)`
  font-size: 1rem;
  font-weight: 400 !important;
`
export const TextValue = styled(TYPE.black)<{ fontSize?: string }>`
  font-size: ${({ fontSize }) => fontSize ?? '1.25rem'};
  font-weight: 500 !important;
`
export const TextItemWrapper = styled(AutoColumn)`
  margin: 1rem 1rem 1rem 0px;
`
