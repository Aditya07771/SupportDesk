import { useState, useCallback } from 'react'
import { getTickets } from '../api/api'

export const useTickets = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchTickets = useCallback(async (params = {}) => {
    setLoading(true)
    setError(null)
    try {
      const response = await getTickets(params)
      const body = response.data
      setTickets(Array.isArray(body?.data) ? body.data : [])
      setTotal(body?.total ?? 0)
      setPage(body?.page ?? 1)
      setTotalPages(body?.totalPages ?? 0)
    } catch (err) {
      setError(err.message)
      setTickets([])
      setTotal(0)
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    tickets,
    loading,
    error,
    total,
    page,
    totalPages,
    fetchTickets
  }
}
