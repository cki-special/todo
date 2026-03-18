import type { FilterType } from '../types/todo'

interface Props {
  filter: FilterType
  counts: { all: number; active: number; completed: number }
  onFilterChange: (f: FilterType) => void
  onClearCompleted: () => void
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

export function FilterBar({ filter, counts, onFilterChange, onClearCompleted }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <div className="flex bg-slate-800/60 border border-slate-700/50 rounded-xl p-1 gap-1">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === key
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {label}
            <span
              className={`text-xs rounded-full px-1.5 py-0.5 ${
                filter === key ? 'bg-indigo-500/60 text-white' : 'bg-slate-700 text-slate-400'
              }`}
            >
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      <span className="text-slate-500 text-sm ml-2">
        {counts.active} {counts.active === 1 ? 'task' : 'tasks'} remaining
      </span>

      {counts.completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="ml-auto text-xs text-slate-500 hover:text-red-400 transition-colors"
        >
          Clear completed
        </button>
      )}
    </div>
  )
}
