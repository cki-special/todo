import type { Todo } from '../types/todo'
import { PriorityBadge } from './PriorityBadge'
import { formatDueDate, getDueDateColorClass } from '../utils/dateUtils'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (todo: Todo) => void
}

const BORDER_COLOR: Record<Todo['priority'], string> = {
  high: 'border-l-red-500',
  medium: 'border-l-amber-400',
  low: 'border-l-blue-400',
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const dueDateLabel = formatDueDate(todo.dueDate)
  const dueDateColor = getDueDateColorClass(todo.dueDate, todo.completed)

  return (
    <li
      className={`group flex items-start gap-3 bg-slate-800/60 border border-slate-700/50 border-l-4 ${BORDER_COLOR[todo.priority]} rounded-xl px-4 py-3 shadow-lg animate-slide-in transition-opacity ${todo.completed ? 'opacity-60' : ''}`}
      role="listitem"
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-checked={todo.completed}
        role="checkbox"
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-indigo-600 border-indigo-600'
            : 'border-slate-500 hover:border-indigo-400'
        }`}
      >
        {todo.completed && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-relaxed break-words ${
            todo.completed ? 'line-through text-slate-500' : 'text-slate-100'
          }`}
        >
          {todo.text}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <PriorityBadge priority={todo.priority} />
          {dueDateLabel && (
            <span className={`text-xs flex items-center gap-1 ${dueDateColor}`}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {dueDateLabel}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={() => onEdit(todo)}
          title="Edit"
          className="p-1.5 text-slate-500 hover:text-indigo-400 transition-colors rounded-lg hover:bg-slate-700/50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          title="Delete"
          className="p-1.5 text-slate-500 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-700/50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  )
}
