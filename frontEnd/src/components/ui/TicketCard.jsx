import { useNavigate } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'
import { timeAgo } from '../../utils/formatters'

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/tickets/${ticket.ticketId}`)}
      className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-150 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-mono text-xs text-slate-400">{ticket.ticketId}</span>
        <StatusBadge status={ticket.status} />
      </div>

      <h3 className="text-slate-900 font-medium mb-2">{ticket.subject}</h3>

      <div className="text-sm text-slate-500 mb-3">
        <p>{ticket.customerName}</p>
        <p>{ticket.customerEmail}</p>
      </div>

      <div className="flex justify-between items-center">
        <PriorityBadge priority={ticket.priority} />
        <span className="text-xs text-slate-400">{timeAgo(ticket.createdAt)}</span>
      </div>
    </div>
  )
}

export default TicketCard
