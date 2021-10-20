import { BigNumber } from '@ethersproject/bignumber'

// TODO: review this value, with previous 20% it is not working
// add 50%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000 + 5000)).div(BigNumber.from(10000))
}
