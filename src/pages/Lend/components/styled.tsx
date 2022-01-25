import styled from 'styled-components/macro'
import { ButtonEmpty } from 'components/Button'
import { AutoRow } from 'components/Row'

export const InputWrapper = styled(AutoRow)`
  position: relative;
`

export const Input = styled.input<{ imageUrl: string }>`
  position: relative;
  display: flex;
  padding: 16px 56px;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.bg7};
  background-repeat: no-repeat;
  background-position: 3%;
  background-image: url('${({ imageUrl }) => imageUrl}');
  border: none;
  outline: none;
  border-radius: 6px;
  color: ${({ theme }) => theme.text6};
  border-style: solid;
  border: 1px solid ${({ theme }) => theme.text6};
  -webkit-appearance: none;
  font-size: 18px;

  transition: border 100ms;
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 16px;
  `}
`

export const OverlapButton = styled(ButtonEmpty)`
  position: absolute;
  top: 28px;
  right: 10px;
  width: 50px;
`
