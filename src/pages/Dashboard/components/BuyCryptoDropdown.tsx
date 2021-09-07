import React, { useState } from 'react'
import { DotsDropDownIcon } from './DotsDropDownIcon'
import styled from 'styled-components/macro'
import { useBuyTokenModalToggle, useDepositToNahmiiModalToggle } from 'state/application/hooks'
import { Trans } from '@lingui/macro'
import useFakeBuyTokenFlow from 'hooks/useFakeBuyTokenFlow'

const BuyCryptoDropdownWrapper = styled.div`
  position: relative;
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: flex;
  `}
`

const DropdownSection = styled.div<{ show: boolean }>`
  display: flex;
  width: 160px;
  flex-direction: column;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  position: absolute;
  right: 0;
  top: 48px;
  background: #fff;
  border: 1px solid #c9f0ed;
  box-sizing: border-box;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`

const StyledNavDiv = styled.div`
  padding-left: 20px;
  color: #0c443f;
  display: flex;
  &:hover {
    cursor: pointer;
  }
`

export const BuyCryptoDropdown = () => {
  const [show, setShow] = useState<boolean>(false)
  const { buyState } = useFakeBuyTokenFlow()
  const toggleBuyTokenModal = useBuyTokenModalToggle()
  const toggleDepositToNahmiiModal = useDepositToNahmiiModalToggle()

  function toggleDropdown() {
    setShow(!show)
  }

  return (
    <BuyCryptoDropdownWrapper>
      <DotsDropDownIcon handleClick={toggleDropdown} />
      <DropdownSection show={show}>
        {buyState === 'buy' && (
          <StyledNavDiv style={{ paddingTop: '23px', paddingBottom: '14px' }} onClick={toggleBuyTokenModal}>
            <Trans>Buy Crypto</Trans>
          </StyledNavDiv>
        )}
        {buyState === 'process' && (
          <StyledNavDiv style={{ paddingTop: '23px', paddingBottom: '14px' }}>
            <Trans>Waiting</Trans>
          </StyledNavDiv>
        )}
        {buyState === 'deposit' && (
          <StyledNavDiv style={{ paddingTop: '23px', paddingBottom: '14px' }} onClick={toggleDepositToNahmiiModal}>
            <Trans>Deposit</Trans>
          </StyledNavDiv>
        )}
        <StyledNavDiv style={{ paddingTop: '14px', paddingBottom: '21px' }}>Send</StyledNavDiv>
      </DropdownSection>
    </BuyCryptoDropdownWrapper>
  )
}
