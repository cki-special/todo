import { useState } from 'react'
import type { Priority } from '../types/todo'

interface Props {
  onAdd: (text: string, priority: Priority, dueDate: string | null) => void
}

export function AddTodoForm({ onAdd }: Props) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit() {
    if (!text.trim()) return
    onAdd(text, priority, dueDate || null)
    setText('')
    setPriority('medium')
    setDueDate('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 mb-4 shadow-xl">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task..."
        className="w-full bg-transparent text-white placeholder-slate-500 text-base outline-none mb-3"
        autoFocus
      />
      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="bg-slate-700/80 text-slate-300 text-sm rounded-lg px-3 py-1.5 border border-slate-600/50 outline-none cursor-pointer hover:bg-slate-700 transition-colors"
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-slate-700/80 text-slate-300 text-sm rounded-lg px-3 py-1.5 border border-slate-600/50 outline-none cursor-pointer hover:bg-slate-700 transition-colors"
        />

        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="ml-auto bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
        >
          Add Task
        </button>
      </div>
    </div>
  )
}
