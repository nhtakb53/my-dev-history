'use client'

import { useState, useEffect } from 'react'
import { getCurrentUser } from '@/lib/auth'

export function useSupabaseData<T>(
  fetchFn: (userId?: string) => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const user = await getCurrentUser()
        const result = await fetchFn(user?.id)
        setData(result)
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  const refetch = async () => {
    try {
      setLoading(true)
      const user = await getCurrentUser()
      const result = await fetchFn(user?.id)
      setData(result)
      return result
    } catch (err) {
      setError(err as Error)
      console.error('Error fetching data:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch, setData }
}
