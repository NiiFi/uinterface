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
export default function Slippage() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const userSlippageTolerance = useUserSlippageTolerance()
  const setUserSlippageTolerance = useSetUserSlippageTolerance()

  const onOptionChange = (value: string) => {
    const parsed = Math.floor(Number.parseFloat(value) * 100)

    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 5000) {
      setUserSlippageTolerance('auto')
    } else {
      setUserSlippageTolerance(new Percent(parsed, 10_000))
    }
    handleClose()
  }
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const currentSlippageValue = userSlippageTolerance instanceof Percent ? userSlippageTolerance.toFixed(0) : '10'
  return (
    <ControlWrapper>
      <ControlLabel>
        <Trans>Slippage Tolerance</Trans>
      </ControlLabel>
      <ControlBody>
        <ControlButton onClick={handleClick}>
          {currentSlippageValue}% <ChevronDown />
        </ControlButton>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuWrapper>
            <MenuTitle>
              <Trans>Slippage Tolerance</Trans>
            </MenuTitle>
            <OptionWrapper>
              <SlippageOption
                onClick={() => onOptionChange('2')}
                className={currentSlippageValue === '2' ? 'active' : ''}
              >
                <Trans>2%</Trans>
              </SlippageOption>
              <SlippageOption
                onClick={() => onOptionChange('3')}
                className={currentSlippageValue === '3' ? 'active' : ''}
              >
                <Trans>3%</Trans>
              </SlippageOption>
              <SlippageOption style={{ width: '120px' }}>
                <input placeholder={'Custom'} type={'text'} name="customSlippage" />
              </SlippageOption>
            </OptionWrapper>
          </MenuWrapper>
        </Menu>
      </ControlBody>
    </ControlWrapper>
  )
}
