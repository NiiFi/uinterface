// TODO: remove this file with all it usages
/**
 * Fetch top addresses by volume
 */
export function usePoolDatas(poolAddresses: string[]): {
  loading: boolean
  error: boolean
  data: any
} {
  return {
    loading: false,
    error: false,
    data: poolAddresses,
  }
}
