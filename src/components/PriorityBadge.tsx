import type { Priority } from '../types/todo'

interface Props {
  priority: Priority
}

const STYLES: Record<Priority, string> = {
  high: 'bg-red-500/20 text-red-400 border border-red-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  low: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
}

const LABELS: Record<Priority, string> = {
  high: 'High',
  medium: 'Med',
  low: 'Low',
}

export function PriorityBadge({ priority }: Props) {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${STYLES[priority]}`}
    >
      {LABELS[priority]}
    </span>
  )
}
