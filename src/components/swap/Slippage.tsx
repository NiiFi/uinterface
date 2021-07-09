import React, { useRef } from 'react'
import { Trans } from '@lingui/macro'

import { ChevronDown, X } from 'react-feather'
import { Percent } from '@uniswap/sdk-core'
import styled from 'styled-components'
import { useSetUserSlippageTolerance, useUserSlippageTolerance } from 'state/user/hooks'
import Menu from '../Menu'
import useTheme from 'hooks/useTheme'
const SlippageOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.bg4};
  color: ${({ theme }) => theme.bg4};
  border-radius: 0.5rem;
  margin: 0px 5px;
  &.active {
    color: ${({ theme }) => theme.primary1}
    border: 1px solid ${({ theme }) => theme.primary1}
    > input {
      color: ${({ theme }) => theme.primary1}
    }
  }
  &:first-child {
    margin-left: 0px
  }
  &:last-child {
    margin-right: 0px
  }

  > input {
    text-align: right;
    width: 100%
    border: none;
    background-color: ${({ theme }) => theme.bg6};
    color: ${({ theme }) => theme.bg4};
    font-size: 1rem;
    &:focus{
      outline-width: 0 !important;
      outline: none;
    }
  }

  &.has-error > input{
    color: red;
  }
  &.has-error {
    border: 1px solid red;
  }
`
const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
`
const MenuTitle = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.black};
  margin-bottom: 10px;
  margin-top: 0px;
  width: 100%;
`
const MenuTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
`

const MenuClose = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  > svg {
    color: ${({ theme }) => theme.text5};
  }
`

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.bg3};
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  padding: 0.5rem 0px;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0px 0px;
`
const ControlLabel = styled.h3`
  font-size: 1rem;
  margin-bottom: 0px;
  margin-top: 0px;
  font-weight: 400;
`
const ControlBody = styled.div`
  display: flex;
  z-index: 11;
`
const ControlButton = styled.div<{ active?: boolean }>`
  display: flex;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 8px;
  color: ${({ theme }) => theme.black};
  cursor: pointer;
  background-color: ${({ active, theme }) => (active ? theme.bg5 : '')};
`

const TWO_PERCENT = `2.00`
const THREE_PERCENT = `3.00`
const DEFAULT_PERCENT = TWO_PERCENT
export default function Slippage() {
  const theme = useTheme()
  const anchorRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState<boolean>(false)
  const userSlippageTolerance = useUserSlippageTolerance()
  const setUserSlippageTolerance = useSetUserSlippageTolerance()

  const currentSlippageValue =
    userSlippageTolerance instanceof Percent ? userSlippageTolerance.toFixed(2) : DEFAULT_PERCENT
  const [slippageInput, setSlippageInput] = React.useState(currentSlippageValue)
  const [slippageError, setSlippageError] = React.useState(false)
  const onOptionChange = (value: string) => {
    setSlippageError(false)
    const parsed = Math.floor(Number.parseFloat(value) * 100)

    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 5000) {
      setUserSlippageTolerance(new Percent(2, 10_000))
    } else {
      const newSlippageValue = new Percent(parsed, 10_000)
      setUserSlippageTolerance(newSlippageValue)
      setSlippageInput(newSlippageValue.toFixed(2))
    }
  }
  const handleCustomSlippageChange = (value: string) => {
    if (!isNaN(Number(value))) {
      setSlippageInput(value)
    }
    setSlippageError(false)
    const parsed = Math.floor(Number.parseFloat(value) * 100)
    if (isNaN(parsed) || value === '.') {
      setSlippageError(true)
      return
    }
  }
  const handleClick = () => {
    setOpen(true)
  }

  const handelCustomSlippageOnBlur = () => {
    onOptionChange(slippageError ? DEFAULT_PERCENT : slippageInput)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ControlWrapper>
      <ControlLabel>
        <Trans>Slippage Tolerance</Trans>
      </ControlLabel>

      <ControlBody ref={anchorRef}>
        <ControlButton onClick={handleClick} active={open}>
          {Number(slippageInput).toFixed(2).replace('.00', '')}% <ChevronDown />
        </ControlButton>
        <Menu id="simple-menu" anchorEl={anchorRef.current} open={open} onClose={handleClose}>
          <MenuWrapper>
            <MenuTitleWrapper>
              <MenuTitle>
                <Trans>Slippage Tolerance</Trans>
              </MenuTitle>
              <MenuClose onClick={handleClose}>
                <X size={'1rem'} color={theme.black} />
              </MenuClose>
            </MenuTitleWrapper>
            <OptionWrapper>
              <SlippageOption
                onClick={() => {
                  onOptionChange(TWO_PERCENT)
                  handleClose()
                }}
                className={slippageInput === TWO_PERCENT ? 'active' : ''}
              >
                <Trans>2%</Trans>
              </SlippageOption>
              <SlippageOption
                onClick={() => {
                  onOptionChange(THREE_PERCENT)
                  handleClose()
                }}
                className={slippageInput === THREE_PERCENT ? 'active' : ''}
              >
                <Trans>3%</Trans>
              </SlippageOption>
              <SlippageOption
                style={{ width: '120px', backgroundColor: theme.bg6 }}
                className={
                  slippageError
                    ? 'has-error'
                    : slippageInput !== THREE_PERCENT && slippageInput !== TWO_PERCENT
                    ? 'active'
                    : ''
                }
              >
                <input
                  placeholder={'Custom'}
                  onBlur={() => handelCustomSlippageOnBlur()}
                  onChange={(e) => handleCustomSlippageChange(e.target.value)}
                  type={'text'}
                  value={slippageInput !== THREE_PERCENT && slippageInput !== TWO_PERCENT ? slippageInput : ''}
                  name="customSlippage"
                />
                <span>%</span>
              </SlippageOption>
            </OptionWrapper>
          </MenuWrapper>
        </Menu>
      </ControlBody>
    </ControlWrapper>
  )
}
