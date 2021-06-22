import React from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import { ArrowLeft, ArrowRight } from 'react-feather'
type TableToolBarProps = {
  title: string
  currentPage: number
  totalPages: number
  onNext: (currentPage: number) => void
  onBack: (currentPage: number) => void
}
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`
const TitleWrapper = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.text1};
  font-size: 1.25rem;
`
const PagerWrapper = styled.div<{ currentPage: number; totalPages: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.text1};
  > svg {
    width: 1rem;
    height: 1rem;
    margin: 0px 5px;
    cursor: pointer;
  }
  > svg:nth-child(1) {
    margin-left: 0;
    color: ${({ currentPage, theme }) => (currentPage !== 1 ? theme.text1 : theme.text2)};
  }
  > svg:last-child {
    margin-right: 0;
    color: ${({ currentPage, totalPages, theme }) => (currentPage !== totalPages ? theme.text1 : theme.text2)};
  }
`
export default function TableToolBar({ title, currentPage, totalPages, onNext, onBack }: TableToolBarProps) {
  return (
    <Wrapper>
      <TitleWrapper>{title}</TitleWrapper>
      <PagerWrapper currentPage={currentPage} totalPages={totalPages}>
        <ArrowLeft onClick={() => onBack(currentPage)} />
        <p>{t`Page ${currentPage} of ${totalPages}`}</p>
        <ArrowRight onClick={() => onNext(currentPage)} />
      </PagerWrapper>
    </Wrapper>
  )
}
