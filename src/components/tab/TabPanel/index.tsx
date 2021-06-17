import React from 'react'
import styled from 'styled-components'

type TabPanelProps = {
  activeIndex: number
  index: number
  children: any
}

export default function TabPanel({ activeIndex, index, children }: TabPanelProps) {
  const Wrapper = styled.div`
    padding: 2rem;
    width: 100%;
  `
  return (
    <Wrapper id={`tab-panel-${index}`} hidden={activeIndex !== index}>
      {activeIndex === index && children}
    </Wrapper>
  )
}
