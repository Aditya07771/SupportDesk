const StatCard = ({ title, value, subtitle, color = 'blue' }) => {
  const colorClasses = {
    blue: 'border-blue-500',
    amber: 'border-amber-500',
    green: 'border-green-500',
    slate: 'border-slate-500'
  }

  return (
    <div className={`bg-white rounded-lg border border-slate-200 shadow-sm p-6 border-l-4 ${colorClasses[color]}`}>
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
    </div>
  )
}

export default StatCard
