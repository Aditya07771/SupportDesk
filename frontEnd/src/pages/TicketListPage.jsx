import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTickets } from '../hooks/useTickets'
import TicketCard from '../components/ui/TicketCard'
import SearchBar from '../components/ui/SearchBar'
import FilterBar from '../components/ui/FilterBar'
import Pagination from '../components/ui/Pagination'
import EmptyState from '../components/ui/EmptyState'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const TicketListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { tickets, loading, total, page, totalPages, fetchTickets } = useTickets()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [status, setStatus] = useState(searchParams.get('status') || '')
  const [currentPage, setCurrentPage] = useState(1)

  const updateURL = useCallback((newSearch, newStatus) => {
    const params = {}
    if (newSearch) params.search = newSearch
    if (newStatus) params.status = newStatus
    setSearchParams(params)
  }, [setSearchParams])

  useEffect(() => {
    const params = { page: currentPage, limit: 10 }
    if (search) params.search = search
    if (status) params.status = status
    fetchTickets(params)
  }, [search, status, currentPage, fetchTickets])

  const handleSearch = useCallback((value) => {
    setSearch(value)
    setCurrentPage(1)
    updateURL(value, status)
  }, [status, updateURL])

  const handleFilterChange = useCallback((value) => {
    setStatus(value)
    setCurrentPage(1)
    updateURL(search, value)
  }, [search, updateURL])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">All Tickets</h1>
        <Link
          to="/tickets/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          New Ticket
        </Link>
      </div>

      <div className="space-y-4 mb-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by name, email, ID..."
        />
        <FilterBar
          activeFilter={status}
          onFilterChange={handleFilterChange}
        />
      </div>

      <p className="text-sm text-slate-500 mb-4">
        Showing {total} ticket{total !== 1 ? 's' : ''}
      </p>

      {loading ? (
        <LoadingSpinner />
      ) : tickets.length === 0 ? (
        <EmptyState
          title="No tickets found"
          message="Try adjusting your search or filter criteria"
        />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {tickets.map(ticket => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              limit={10}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  )
}

export default TicketListPage
