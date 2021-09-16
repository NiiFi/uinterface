import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { SearchInput } from 'components/SearchModal/styleds'
import { MagnifierIcon } from 'components/Icons'
import useDebouncedChangeHandler from 'hooks/useDebouncedChangeHandler'
import ReactDOMServer from 'react-dom/server'
import useTheme from 'hooks/useTheme'

export const CustomSearchInput = styled(SearchInput)`
  padding: 16px 50px;
  background-repeat: no-repeat;
  background-position: 2%;
  background-color: ${({ theme }) => theme.bg7};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 16px;
    padding: 16px 38px;
  `}
`

type Props = {
  placeholder: string
  query: any
  setQuery: any
  debouncedSearchChange: (value: string) => void
} & React.HTMLAttributes<HTMLDivElement>

const SearchBar = ({ placeholder, debouncedSearchChange, query, setQuery, ...rest }: Props) => {
  const theme = useTheme()
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
      style={{
        height: '48px',
        backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(
          ReactDOMServer.renderToStaticMarkup(MagnifierIcon({ width: 24, height: 24, color: theme.text4 }))
        )}')`,
      }}
    />
  )
}

export default SearchBar
