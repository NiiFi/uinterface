import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { SearchInput } from 'components/SearchModal/styleds'
// import { MagnifierIcon } from 'components/Icons'
import useDebouncedChangeHandler from 'hooks/useDebouncedChangeHandler'

// TODO: add MagnifierIcon
export const CustomSearchInput = styled(SearchInput)``

type Props = {
  placeholder: string
  query: any
  setQuery: any
  debouncedSearchChange: (value: string) => void
} & React.HTMLAttributes<HTMLDivElement>

const SearchBar = ({ placeholder, debouncedSearchChange, query, setQuery, ...rest }: Props) => {
  const [sword, setSword] = useDebouncedChangeHandler<string>(query, debouncedSearchChange, 500)

  useEffect((): any => {
    if (query !== undefined) {
      setQuery(query)
    }
  }, [query, setQuery])

  return (
    <CustomSearchInput
      value={sword}
      placeholder={placeholder}
      onChange={(event) => setSword(event.target.value)}
      {...rest}
    />
  )
}

export default SearchBar
