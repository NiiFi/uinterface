import { useEffect, useState } from 'react'
import { FixedNumber, formatFixed } from '@ethersproject/bignumber'
import { useActiveWeb3React } from 'hooks/web3'
import { useLendingPoolContract, useProtocolDataProviderContract } from 'hooks/useContract'
import { useAllTokenBalances } from 'state/wallet/hooks'

export default function useLending(address: string, data: any) {
  const { account } = useActiveWeb3React()
  const relevantTokenBalances = useAllTokenBalances()
  const lendingPoolContract = useLendingPoolContract()
  const protocolDataProviderContract = useProtocolDataProviderContract()
  const [availableBorrowsETH, setAvailableBorrowsETH] = useState('')
  const [availableToBorrow, setAvailableToBorrow] = useState('')
  const [borrowed, setBorrowed] = useState('0')
  const [deposited, setDeposited] = useState('0')
  const [healthFactor, setHealthFactor] = useState('0')
  const [totalCollateralETH, setTotalCollateralETH] = useState('0')
  const [totalDebtETH, setTotalDebtETH] = useState('0')
  const [liquidationThreshold, setLiquidationThreshold] = useState('0')
  const [ltv, setLtv] = useState('0')

  useEffect(() => {
    if (!account || !data || !lendingPoolContract || !protocolDataProviderContract) return

    const decimals = relevantTokenBalances[address]?.currency?.decimals || 18

    lendingPoolContract
      .getUserAccountData(account)
      .then((pool: any) => {
        const availableBorrowsETH = formatFixed(pool.availableBorrowsETH, 18)
        const availableToBorrowGeneral = FixedNumber.from(availableBorrowsETH)
          .divUnsafe(FixedNumber.from(data.priceETH))
          .mulUnsafe(FixedNumber.from('0.99'))
          .toString()

        setTotalDebtETH(formatFixed(pool.totalDebtETH, 18))

        setAvailableBorrowsETH(availableBorrowsETH)
        setAvailableToBorrow(
          FixedNumber.from(availableToBorrowGeneral).subUnsafe(FixedNumber.from(data.availableLiquidity)).isNegative()
            ? availableToBorrowGeneral
            : data.availableLiquidity
        )
        setHealthFactor(formatFixed(pool.healthFactor, 18))
        setTotalCollateralETH(formatFixed(pool.totalCollateralETH, 18))
        setLtv(formatFixed(pool.ltv, 2))
        setLiquidationThreshold(formatFixed(pool.currentLiquidationThreshold, 18))
      })
      .catch((e: any) => console.log(e)) // TODO: implement proper error handling

    protocolDataProviderContract
      .getUserReserveData(address, account)
      .then((res: any) => {
        const currentVariableDebt = formatFixed(res.currentVariableDebt, decimals)
        const currentStableDebt = formatFixed(res.currentStableDebt, decimals)
        setBorrowed(FixedNumber.from(currentVariableDebt).addUnsafe(FixedNumber.from(currentStableDebt)).toString())
        setDeposited(formatFixed(res.currentATokenBalance, decimals))
      })
      .catch((e: any) => console.log(e)) // TODO: implement proper error handling
  }, [account, lendingPoolContract, data, relevantTokenBalances, address, protocolDataProviderContract])

  return {
    availableBorrowsETH,
    availableToBorrow,
    healthFactor,
    totalCollateralETH,
    borrowed,
    deposited,
    ltv,
    liquidationThreshold,
    totalDebtETH,
  }
}
