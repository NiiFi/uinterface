import styled from 'styled-components'

export const MenuButton = styled.div<{ active?: boolean; color?: string }>`
  display: flex;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 8px;
  color: ${({ theme, color }) => (color ? color : theme.text4)};
  cursor: pointer;
  background-color: ${({ active, theme }) => (active ? theme.bg5 : '')};
  :hover {
    background-color: ${({ theme }) => theme.bg5};
  }
`
