import { useState, useEffect, useRef } from 'react'
import type { Todo, Priority } from '../types/todo'

interface Props {
  todo: Todo | null
  onSave: (id: string, updates: Partial<Pick<Todo, 'text' | 'priority' | 'dueDate'>>) => void
  onClose: () => void
}

export function EditTodoModal({ todo, onSave, onClose }: Props) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (todo) {
      setText(todo.text)
      setPriority(todo.priority)
      setDueDate(todo.dueDate ?? '')
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [todo])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (todo) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [todo, onClose])

  if (!todo) return null

  function handleSave() {
    if (!todo || !text.trim()) return
    onSave(todo.id, { text: text.trim(), priority, dueDate: dueDate || null })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Edit task"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Edit Task</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Task</label>
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className="w-full bg-slate-700/80 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full bg-slate-700/80 border border-slate-600/50 text-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-slate-700/80 border border-slate-600/50 text-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
