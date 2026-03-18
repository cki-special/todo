import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { Todo, Priority, FilterType } from '../types/todo'

const PRIORITY_WEIGHT: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [])
  const [filter, setFilter] = useLocalStorage<FilterType>('todo-filter', 'all')

  const filteredTodos = useMemo(() => {
    const filtered = todos.filter((t) => {
      if (filter === 'active') return !t.completed
      if (filter === 'completed') return t.completed
      return true
    })

    return [...filtered].sort((a, b) => {
      // Incomplete before complete
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      // By priority
      const pd = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
      if (pd !== 0) return pd
      // Newest first
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [todos, filter])

  const counts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  )

  function addTodo(text: string, priority: Priority, dueDate: string | null) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
    }
    setTodos([newTodo, ...todos])
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  function toggleTodo(id: string) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function editTodo(
    id: string,
    updates: Partial<Pick<Todo, 'text' | 'priority' | 'dueDate'>>
  ) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  function clearCompleted() {
    setTodos(todos.filter((t) => !t.completed))
  }

  return {
    todos,
    filter,
    filteredTodos,
    counts,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    setFilter,
    clearCompleted,
  }
}
