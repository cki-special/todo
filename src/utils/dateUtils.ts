export function formatDueDate(dateStr: string | null): string {
  if (!dateStr) return ''

  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.getTime() === today.getTime()) return 'Today'
  if (date.getTime() === tomorrow.getTime()) return 'Tomorrow'

  const thisYear = today.getFullYear()
  const opts: Intl.DateTimeFormatOptions =
    date.getFullYear() === thisYear
      ? { month: 'short', day: 'numeric' }
      : { month: 'short', day: 'numeric', year: 'numeric' }

  return date.toLocaleDateString('en-US', opts)
}

export function isOverdue(dateStr: string | null, completed: boolean): boolean {
  if (!dateStr || completed) return false

  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return date < today
}

export function isDueSoon(dateStr: string | null, completed: boolean): boolean {
  if (!dateStr || completed) return false

  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const threeDaysLater = new Date(today)
  threeDaysLater.setDate(threeDaysLater.getDate() + 3)

  return date >= today && date <= threeDaysLater
}

export function getDueDateColorClass(
  dateStr: string | null,
  completed: boolean
): string {
  if (isOverdue(dateStr, completed)) return 'text-red-400'
  if (isDueSoon(dateStr, completed)) return 'text-amber-400'
  return 'text-slate-400'
}
