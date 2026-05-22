import { getPriorityColor } from '../../utils/formatters'

const PriorityBadge = ({ priority }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getPriorityColor(priority)}`}>
      {priority}
    </span>
  )
}

export default PriorityBadge
