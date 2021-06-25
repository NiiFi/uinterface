import React from 'react'
import { Trans } from '@lingui/macro'
import Menu from '@material-ui/core/Menu'
import { ChevronDown } from 'react-feather'
import { Percent } from '@uniswap/sdk-core'
import styled from 'styled-components'
import { useSetUserSlippageTolerance, useUserSlippageTolerance } from 'state/user/hooks'

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
  color: ${({ theme }) => theme.text5};
  margin-bottom: 10px;
  margin-top: 0px;
  width: 100%;
`
const ControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.bg5}
  border-bottom: 1px solid ${({ theme }) => theme.bg5}
  padding: 0.5rem 0px;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0px 2rem;
`
const ControlLabel = styled.h3`
  font-size: 1rem;
  margin-bottom: 0px;
  margin-top: 0px;
  font-weight: 400;
`
const ControlBody = styled.div`
  display: flex;
`
const ControlButton = styled.div`
  display: flex;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  padding: 1rem 0px;
  color: ${({ theme }) => theme.text5};
  cursor: pointer;
`

const TWO_PERCENT = `2.00`
const THREE_PERCENT = `3.00`
const DEFAULT_PERCENT = TWO_PERCENT
export default function Slippage() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
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
    setSlippageInput(value)
    setSlippageError(false)
    const parsed = Math.floor(Number.parseFloat(value) * 100)
    if (isNaN(parsed) || value === '.') {
      setSlippageError(true)
      return
    }
  }
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handelCustomSlippageOnBlur = () => {
    onOptionChange(slippageError ? DEFAULT_PERCENT : slippageInput)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <ControlWrapper>
      <ControlLabel>
        <Trans>Slippage Tolerance</Trans>
      </ControlLabel>
      <ControlBody>
        <ControlButton onClick={handleClick}>
          {Number(slippageInput).toFixed(2).replace('.00', '')}% <ChevronDown />
        </ControlButton>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuWrapper>
            <MenuTitle>
              <Trans>Slippage Tolerance</Trans>
            </MenuTitle>
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
                style={{ width: '120px' }}
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
              </SlippageOption>
            </OptionWrapper>
          </MenuWrapper>
        </Menu>
      </ControlBody>
    </ControlWrapper>
  )
}
