import { getStatusColor } from '../../utils/formatters'

const StatusBadge = ({ status }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusColor(status)}`}>
      {status}
    </span>
  )
}

export default StatusBadge
