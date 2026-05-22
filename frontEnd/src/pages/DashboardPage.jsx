import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getStats } from '../api/api'
import StatCard from '../components/ui/StatCard'
import TicketCard from '../components/ui/TicketCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const DashboardPage = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats()
        setStats(response.data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1">Welcome back — here's what's happening</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-20 mb-3"></div>
              <div className="h-8 bg-slate-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600 mt-1">Welcome back — here's what's happening</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tickets"
          value={stats?.totalTickets || 0}
          color="slate"
        />
        <StatCard
          title="Open"
          value={stats?.countByStatus?.Open || 0}
          color="blue"
        />
        <StatCard
          title="In Progress"
          value={stats?.countByStatus?.['In Progress'] || 0}
          color="amber"
        />
        <StatCard
          title="Closed"
          value={stats?.countByStatus?.Closed || 0}
          color="green"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Recent Tickets</h2>
          <Link to="/tickets" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats?.recentTickets?.map(ticket => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
