import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import PoolsTable from '../../components/Table/pools'

export default function Pool() {
  const theme = useContext(ThemeContext)

  return (
    <>
      <PoolsTable />
    </>
  )
}
