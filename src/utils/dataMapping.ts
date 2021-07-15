import { TransactionListQuery, TransactionTableData, Swap, Burn, Mint } from '../components/Table/types'

function mapSwapResponseToTableData(swaps: Array<Swap>): Array<TransactionTableData> {
  /**
   * Reason for disabling the below typescript rule is to
   * avoid missing argument error.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return swaps.map(({ amount0Out, amount1In, amount1Out, amount0In, to, ...rest }, _) => {
    const amount0 = amount0In
    const amount1 = amount1In
    return {
      ...rest,
      amount0: amount0 === '0' ? amount0Out : amount0,
      address: to,
      amount1: amount1 === '0' ? amount1Out : amount1,
    }
  })
}

function mapBurnResponseToTableData(burns: Array<Burn>): Array<TransactionTableData> {
  /**
   * Reason for disabling the below typescript rule is to
   * avoid the liquidity being part of return result. and _ need to be passed as it was
   * throwing the missing argument error
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return burns.map(({ liquidity, sender, ...rest }, _) => {
    return {
      ...rest,
      address: sender,
    }
  })
}

function mapMintResponseToTableData(mints: Array<Mint>): Array<TransactionTableData> {
  /**
   * Reason for disabling the below typescript rule is to
   * avoid the liquidity being part of return result. and _ need to be passed as it was
   * throwing the missing argument error
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return mints.map(({ liquidity, to, ...rest }, _) => {
    return {
      ...rest,
      address: to,
    }
  })
}

export function mapTransactionListDataToTableData(data: TransactionListQuery): Array<TransactionTableData> {
  const tableData: Array<TransactionTableData> = []
  /**
   * Reason for disabling the below typescript rule is to
   * avoid missing argument error.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data.transactions.reduce((acc: Array<TransactionTableData>, { swaps, mints, burns }, _) => {
    const mappedSwaps = mapSwapResponseToTableData(swaps)
    const mappedMints = mapMintResponseToTableData(mints)
    const mappedBurns = mapBurnResponseToTableData(burns)
    tableData.push(...mappedSwaps, ...mappedMints, ...mappedBurns)
    return tableData
  }, tableData)
  return tableData
}
