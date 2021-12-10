import { BigNumber } from 'ethers'
import { useAppSelector } from 'state/hooks'

export default function useTransactionDeadline(): BigNumber | undefined {
  const ttl = useAppSelector((state) => state.user.userDeadline)
  return BigNumber.from(Math.floor(Date.now() / 1000)).add(ttl)
}
