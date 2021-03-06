import React from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import { ArrowLeft, ArrowRight } from 'react-feather'
type TableToolBarProps = {
  title?: any
  currentPage: number
  totalPages: number
  onNext: (currentPage: number) => void
  onBack: (currentPage: number) => void
}
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`
export const TitleWrapper = styled.div`
  width: 50%;
  font-weight: 500;
  color: ${({ theme }) => theme.text1};
  font-size: 1.25rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 1rem;
  `}
`
export const PagerWrapper = styled.div<{ currentPage: number; totalPages: number }>`
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
  ${({ theme }) => theme.mediaWidth.upToSmall`
    > p {
      font-size: 1rem
    }
    > svg {
      margin: 0px 3px;
    }
  `}
`
export default function TableToolBar({ title, currentPage, totalPages, onNext, onBack }: TableToolBarProps) {
  return (
    <>
      <Wrapper>
        <TitleWrapper>{title}</TitleWrapper>
        <PagerWrapper currentPage={currentPage} totalPages={totalPages}>
          <ArrowLeft onClick={() => onBack(currentPage)} />
          <p>{t`Page ${totalPages === 0 ? 0 : currentPage} of ${totalPages}`}</p>
          <ArrowRight onClick={() => onNext(currentPage)} />
        </PagerWrapper>
      </Wrapper>
    </>
  )
}
