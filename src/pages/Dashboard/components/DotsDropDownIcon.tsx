import React from 'react'
import DotsDDSvgSrc from '../../../assets/svg/dotsDropDown.svg'
import styled from 'styled-components/macro'

const SvgIconWrapper = styled.img`
  height: 40px;
`

const Wrapper = styled.div`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: flex
    cursor: pointer
    position: relative
  `};
`

export const DotsDropDownIcon = (props: any) => {
  const { handleClick } = props

  return (
    <Wrapper>
      <SvgIconWrapper src={DotsDDSvgSrc} onClick={handleClick} />
    </Wrapper>
  )
}
