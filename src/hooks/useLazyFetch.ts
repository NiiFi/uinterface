import { useState, useCallback } from 'react'
import { Dictionary } from 'utils'

export default function useLazyFetch<T = Dictionary>(
  url: string,
  rootData?: boolean
): [(options?: any) => Promise<void>, { data: T | undefined; error: any; loading: boolean }] {
  const [data, setData] = useState<T>()
  const [error, setError] = useState<Dictionary>()
  const [loading, setLoading] = useState<boolean>(false)

  const handler = useCallback(
    async (options?: any) => {
      const DefaultOption = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
      const finalOptions = Object.assign(DefaultOption, options)
      setLoading(true)
      setError(undefined)
      try {
        const response = await fetch(url, finalOptions)
        if (!response.ok) {
          setError({
            status: response.status,
            error: await response.json(),
          })
        } else {
          const responseData = await response.json()
          setData(rootData ? responseData : responseData?.data || responseData)
        }
      } catch (e) {
        setError({
          error: {
            message: e.message,
          },
        })
      } finally {
        setLoading(false)
      }
    },
    [url, rootData]
  )

  return [handler, { data, error, loading }]
}
