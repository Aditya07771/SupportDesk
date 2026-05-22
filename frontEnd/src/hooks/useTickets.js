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
      setTickets(response.data.data)
      setTotal(response.data.total)
      setPage(response.data.page)
      setTotalPages(response.data.totalPages)
    } catch (err) {
      setError(err.message)
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
