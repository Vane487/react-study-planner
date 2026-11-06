import { createContext } from 'react'
import type { NewTask, Task, TaskChanges, TaskFilter } from '../types/task'

export interface ToastMessage {
  id: number
  text: string
  tone: 'success' | 'error' | 'info'
  duration: number
  actionLabel?: string
  onAction?: () => void
  showProgress?: boolean
}

export interface TaskContextValue {
  tasks: Task[]
  filter: TaskFilter
  pendingDeleteId: number | null
  editingTask: Task | null
  toast: ToastMessage | null
  setFilter: (filter: TaskFilter) => void
  addTask: (task: NewTask) => void
  updateTask: (id: number, changes: TaskChanges) => void
  toggleTask: (id: number) => void
  startEditing: (task: Task) => void
  cancelEditing: () => void
  requestDelete: (id: number) => void
  undoDelete: () => void
  resetTasks: () => void
  dismissToast: () => void
}

export const TaskContext = createContext<TaskContextValue | null>(null)
