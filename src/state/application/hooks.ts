import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { useActiveWeb3React } from '../../hooks/web3'
import { AppState } from '../index'
import { addPopup, ApplicationModal, PopupContent, removePopup, setOpenModal, showDrawer } from './actions'

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React()

  return useAppSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector((state: AppState) => state.application.openModal)
  return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal)
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open])
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET)
}

export function useBuyTokenModalToggle(): () => void {
  return useToggleModal(ApplicationModal.BUY_TOKEN)
}

export function useDepositToNahmiiModalToggle(): () => void {
  return useToggleModal(ApplicationModal.DEPOSIT_TO_NAHMII)
}

export function useManageWalletListModalToggle(): () => void {
  return useToggleModal(ApplicationModal.MANAGE_WALLET_LIST)
}

export function useCreatePoolModalToggle(): () => void {
  return useToggleModal(ApplicationModal.CREATE_POOL)
}

export function useToggleSettingsMenu(): () => void {
  return useToggleModal(ApplicationModal.SETTINGS)
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }))
    },
    [dispatch]
  )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }))
    },
    [dispatch]
  )
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useAppSelector((state: AppState) => state.application.popupList)
  return useMemo(() => list.filter((item) => item.show), [list])
}

export function useToggleDrawer(): { setDrawerToggle: (showDrawer: boolean) => void; showDrawer: boolean } {
  const showDrawerCurrentValue = useAppSelector((state: AppState) => state.application.showDrawer)
  const dispatch = useAppDispatch()
  const setDrawerToggle = useCallback(
    (nextDrawerValue: boolean) => {
      dispatch(showDrawer({ showDrawer: nextDrawerValue }))
    },
    [dispatch]
  )
  return { showDrawer: showDrawerCurrentValue, setDrawerToggle }
}
