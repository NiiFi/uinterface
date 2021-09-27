import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { DEFAULT_ACTIVE_LIST_URLS } from 'constants/lists'
import { updateTokenBalances } from './actions'
import { useBlockNumber } from '../application/hooks'
import JSBI from 'jsbi'
import ERC20_ABI from 'abis/erc20.json'
import { getContract, isAddress } from 'utils'

export default function Updater(): null {
  const dispatch = useAppDispatch()
  const lastBlockNumber = useBlockNumber()

  const { account, library, chainId } = useActiveWeb3React()

  const listsByUrl = useAppSelector((state) => state.lists.byUrl)
  const { current: list } = listsByUrl[DEFAULT_ACTIVE_LIST_URLS[0]]

  useEffect(() => {
    if (!lastBlockNumber) {
      return
    }
    ;(async () => {
      if (!!list && !!account && !!library && !!chainId) {
        const tokenBalances = await Promise.all(
          list.tokens.map(async (token) => {
            const tokenInst = getContract(token.address, ERC20_ABI, library, account)
            let balance = JSBI.BigInt(0)
            try {
              balance = await tokenInst.balanceOf(account)
            } catch (e) {
              console.log(e)
            }
            return { address: isAddress(token.address), balance: balance.toString() }
          })
        )

        dispatch(
          updateTokenBalances({
            address: account,
            chainId,
            blockNumber: lastBlockNumber,
            tokenBalances: tokenBalances.reduce((obj, item) => {
              return {
                ...obj,
                [item['address'].toString()]: item['balance'],
              }
            }, {}),
          })
        )
      }
    })()
  }, [list, account, library, chainId, lastBlockNumber, dispatch])

  return null
}
