export const timeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

export const getStatusColor = (status) => {
  const colors = {
    'Open': 'bg-blue-50 text-blue-700 border-blue-200',
    'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
    'Closed': 'bg-green-50 text-green-700 border-green-200'
  }
  return colors[status] || 'bg-slate-100 text-slate-600 border-slate-200'
}

export const getPriorityColor = (priority) => {
  const colors = {
    'High': 'bg-red-50 text-red-700 border-red-200',
    'Medium': 'bg-orange-50 text-orange-700 border-orange-200',
    'Low': 'bg-slate-100 text-slate-600 border-slate-200'
  }
  return colors[priority] || 'bg-slate-100 text-slate-600 border-slate-200'
}
