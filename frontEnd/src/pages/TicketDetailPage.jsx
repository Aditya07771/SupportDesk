import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTicketById, updateTicket } from '../api/api'
import { useToast } from '../context/ToastContext'
import StatusBadge from '../components/ui/StatusBadge'
import PriorityBadge from '../components/ui/PriorityBadge'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { formatDateTime } from '../utils/formatters'

const TicketDetailPage = () => {
  const { ticketId } = useParams()
  const { showToast } = useToast()
  const [ticket, setTicket] = useState(null)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [statusChanged, setStatusChanged] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [updating, setUpdating] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await getTicketById(ticketId)
        setTicket(response.data.data)
        setNotes(response.data.data.notes || [])
        setSelectedStatus(response.data.data.status)
      } catch (error) {
        showToast(error.message, 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchTicket()
  }, [ticketId, showToast])

  useEffect(() => {
    if (ticket && selectedStatus !== ticket.status) {
      setStatusChanged(true)
    } else {
      setStatusChanged(false)
    }
  }, [selectedStatus, ticket])

  const handleUpdateStatus = async () => {
    setUpdating(true)
    const originalStatus = ticket.status
    setTicket(prev => ({ ...prev, status: selectedStatus }))

    try {
      const response = await updateTicket(ticketId, { status: selectedStatus })
      setTicket(response.data.data)
      setStatusChanged(false)
      setShowConfirmation(true)
      setTimeout(() => setShowConfirmation(false), 2000)
    } catch (error) {
      setTicket(prev => ({ ...prev, status: originalStatus }))
      setSelectedStatus(originalStatus)
      showToast(error.message, 'error')
    } finally {
      setUpdating(false)
    }
  }

  const handleAddNote = async (e) => {
    e.preventDefault()
    if (!noteText.trim()) return

    setUpdating(true)
    try {
      const response = await updateTicket(ticketId, { noteText })
      if (response.data.note) {
        setNotes(prev => [...prev, response.data.note])
        setNoteText('')
        showToast('Note added successfully', 'success')
      }
    } catch (error) {
      showToast(error.message, 'error')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <LoadingSpinner />

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-slate-900">Ticket not found</h2>
        <Link to="/tickets" className="text-indigo-600 hover:text-indigo-700 mt-4 inline-block">
          ← Back to tickets
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/tickets" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 mb-6">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to tickets
      </Link>

      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">{ticket.subject}</h1>
            <p className="font-mono text-xs text-slate-400 mb-4">{ticket.ticketId}</p>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Notes & Updates</h2>

            {notes.length === 0 ? (
              <p className="text-sm text-slate-400 mb-6">No notes yet</p>
            ) : (
              <div className="space-y-3 mb-6">
                {notes.map(note => (
                  <div key={note._id} className="bg-slate-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-slate-700">{note.noteText}</p>
                      <span className="text-xs text-slate-400 ml-4">{formatDateTime(note.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note..."
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={updating || !noteText.trim()}
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Note
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6 mt-6 lg:mt-0">
          <div className="bg-white border border-slate-200 rounded-lg p-6 lg:sticky lg:top-24">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">Ticket Status</h3>
            <div className="mb-4">
              <StatusBadge status={ticket.status} />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
            <button
              onClick={handleUpdateStatus}
              disabled={!statusChanged || updating}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? 'Updating...' : 'Update Status'}
            </button>
            {showConfirmation && (
              <p className="text-sm text-green-600 mt-2 text-center">Updated!</p>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">Details</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-slate-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p className="text-slate-500">Customer</p>
                  <p className="text-slate-900 font-medium">{ticket.customerName}</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-4 h-4 text-slate-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-slate-500">Email</p>
                  <a href={`mailto:${ticket.customerEmail}`} className="text-indigo-600 hover:text-indigo-700">
                    {ticket.customerEmail}
                  </a>
                </div>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Priority</p>
                <PriorityBadge priority={ticket.priority} />
              </div>
              <div>
                <p className="text-slate-500">Created</p>
                <p className="text-slate-900">{formatDateTime(ticket.createdAt)}</p>
              </div>
              <div>
                <p className="text-slate-500">Last Updated</p>
                <p className="text-slate-900">{formatDateTime(ticket.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailPage
