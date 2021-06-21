import React from 'react'
import styled from 'styled-components'

type TabPanelProps = {
  activeIndex: number
  index: number
  children: any
}

export const TabPanelHeading = styled.p`
  width: 100%;
  margin: 0px 0px 1rem 0px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text1};
  font-weight: 400;
`
const Wrapper = styled.div`
  padding: 1rem 2rem;
  width: 100%;
`

export default function TabPanel({ activeIndex, index, children }: TabPanelProps) {
  return (
    <Wrapper key={`tab-panel-${index}`} id={`tab-panel-${index}`} hidden={activeIndex !== index}>
      {children}
    </Wrapper>
  )
}
