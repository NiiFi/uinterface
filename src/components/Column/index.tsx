import styled from 'styled-components/macro'

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
export const ColumnCenter = styled(Column)`
  width: 100%;
  align-items: center;
`

export const AutoColumn = styled.div<{
  gap?: 'sm' | 'md' | 'lg' | string
  justify?: 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'space-between'
}>`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '1rem') || (gap === 'lg' && '2rem') || gap};
  justify-items: ${({ justify }) => justify && justify};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-row-gap: 1rem;
  `}
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0px;
  color: ${({ theme }) => theme.text5};
`

export default Column
