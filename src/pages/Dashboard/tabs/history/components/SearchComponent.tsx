import React from 'react'
import styled from 'styled-components'
import SearchSvgSrc from 'assets/svg/search.svg'

const CustomInputWrapper = styled.div`
  padding: 0 !important;
  position: absolute;
`

const SearchIconWrapper = styled.img`
  position: relative;
  height: 25px;
  width: 16px;
  left: 24px;
  top: 7px;
`

const CustomInput = styled.input`
  background: #f7fdfc;
  width: 440px;
  height: 48px;
  border: 1px solid rgba(12, 68, 63, 0.38);
  border-radius: 6px;
  padding-left: 32px;
`

export const SearchComponent = ({ setSearchValue, searchValue }: { setSearchValue: any; searchValue: string }) => {
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value)
    setSearchValue(e.target.value)
  }

  return (
    <>
      <CustomInputWrapper>
        <SearchIconWrapper src={SearchSvgSrc} />
        <CustomInput
          type="search"
          value={searchValue}
          placeholder="Filter by Token, Protocol, Event ..."
          onChange={handleSearch}
        />
      </CustomInputWrapper>
    </>
  )
}
