import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'

interface SearchFilters {
  type?: string;
  brand?: string;
  minRating?: number;
  maxPrice?: number;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export const useVehicleSearch = (filters: SearchFilters, page = 0, size = 10) => {
  const [data, setData] = useState({ vehicles: [], totalPages: 0, totalItems: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Memoize params to prevent unnecessary API calls
  const params = useMemo(() => ({
    ...filters,
    page,
    size,
  }), [filters, page, size])

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/search`, {
          params,
        })
        setData({
          vehicles: response.data.content,
          totalPages: response.data.totalPages,
          totalItems: response.data.totalElements,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [params])

  return { ...data, loading, error }
}
