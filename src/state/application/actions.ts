import { createAction } from '@reduxjs/toolkit'

export type PopupContent = {
  txn: {
    hash: string
    success: boolean
    summary?: string
  }
}

export enum ApplicationModal {
  WALLET,
  SETTINGS,
  SELF_CLAIM,
  ADDRESS_CLAIM,
  CLAIM_POPUP,
  MENU,
  DELEGATE,
  VOTE,
  POOL_OVERVIEW_OPTIONS,
  MANAGE_WALLET_LIST,
  CREATE_POOL,
}

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('application/updateBlockNumber')
export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
export const addPopup =
  createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>('application/addPopup')
export const removePopup = createAction<{ key: string }>('application/removePopup')
export const showDrawer = createAction<{ showDrawer: boolean }>('application/showDrawer')
export const setEthereumToBaseCurrencyRateApiState = createAction<{ error: any; loading: boolean }>(
  'application/setEthereumToBaseCurrencyRateApiState'
)
