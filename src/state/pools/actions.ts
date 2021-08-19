import { createAction } from '@reduxjs/toolkit'
// import { PoolData } from './reducer'

export const updatePoolData = createAction<{ pools: any /*PoolData*/[] }>('pools/updatePoolData') // FIXME

export const addPoolKeys = createAction<{ poolAddresses: string[] }>('pool/addPoolKeys')
