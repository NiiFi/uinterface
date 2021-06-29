import { gql } from '@apollo/client'
export const TRANSACTION_QUERY_GQL = gql`
  query transactions {
    transactions(first: 500, orderBy: timestamp, orderDirection: desc) {
      mints(orderBy: timestamp, orderDirection: desc) {
        transaction {
          id
          timestamp
          __typename
        }
        pair {
          token0 {
            id
            symbol
            __typename
          }
          token1 {
            id
            symbol
            __typename
          }
          __typename
        }
        to
        liquidity
        amount0
        amount1
        amountUSD
        __typename
      }
      burns(orderBy: timestamp, orderDirection: desc) {
        transaction {
          id
          timestamp
          __typename
        }
        pair {
          token0 {
            id
            symbol
            __typename
          }
          token1 {
            id
            symbol
            __typename
          }
          __typename
        }
        sender
        liquidity
        amount0
        amount1
        amountUSD
        __typename
      }
      swaps(orderBy: timestamp, orderDirection: desc) {
        transaction {
          id
          timestamp
          __typename
        }
        pair {
          token0 {
            id
            symbol
            __typename
          }
          token1 {
            id
            symbol
            __typename
          }
          __typename
        }
        amount0In
        amount0Out
        amount1In
        amount1Out
        amountUSD
        to
        __typename
      }
      __typename
    }
  }
`
