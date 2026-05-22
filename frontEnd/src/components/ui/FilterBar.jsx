const FilterBar = ({ activeFilter, onFilterChange }) => {
  const filters = ['All', 'Open', 'In Progress', 'Closed']

  return (
    <div className="flex space-x-2">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter === 'All' ? '' : filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            (filter === 'All' && activeFilter === '') || activeFilter === filter
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
