import { useState } from 'react'
import { useTodos } from '../hooks/useTodos'
import type { Todo } from '../types/todo'
import { Header } from './Header'
import { AddTodoForm } from './AddTodoForm'
import { FilterBar } from './FilterBar'
import { TodoList } from './TodoList'
import { EditTodoModal } from './EditTodoModal'

export function TodoApp() {
  const {
    filteredTodos,
    filter,
    counts,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    setFilter,
    clearCompleted,
  } = useTodos()

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Header />
        <AddTodoForm onAdd={addTodo} />
        <FilterBar
          filter={filter}
          counts={counts}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={setEditingTodo}
        />
      </div>

      <EditTodoModal
        todo={editingTodo}
        onSave={editTodo}
        onClose={() => setEditingTodo(null)}
      />
    </div>
  )
}
