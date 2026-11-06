import { initialTasks } from '../data/initialTasks'
import type { NewTask, Task, TaskChanges } from '../types/task'

export interface TaskState {
  tasks: Task[]
  pendingDeleteId: number | null
}

export type TaskAction =
  | { type: 'add'; payload: Task }
  | { type: 'toggle'; payload: { id: number } }
  | { type: 'update'; payload: { id: number; changes: TaskChanges } }
  | { type: 'requestDelete'; payload: { id: number } }
  | { type: 'confirmDelete' }
  | { type: 'undoDelete' }
  | { type: 'reset' }

export const TASKS_STORAGE_KEY = 'study-planner-tasks'

function copyInitialTasks(): Task[] {
  return initialTasks.map((task) => ({ ...task }))
}

function readSavedTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY)
    if (!savedTasks) return copyInitialTasks()

    const parsedTasks = JSON.parse(savedTasks) as unknown
    return Array.isArray(parsedTasks) ? (parsedTasks as Task[]) : copyInitialTasks()
  } catch {
    return copyInitialTasks()
  }
}

export function createInitialTaskState(): TaskState {
  return {
    tasks: readSavedTasks(),
    pendingDeleteId: null,
  }
}

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'add':
      return { ...state, tasks: [action.payload, ...state.tasks] }

    case 'toggle':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, completed: !task.completed } : task,
        ),
      }

    case 'update':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload.changes } : task,
        ),
      }

    case 'requestDelete':
      return { ...state, pendingDeleteId: action.payload.id }

    case 'confirmDelete':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== state.pendingDeleteId),
        pendingDeleteId: null,
      }

    case 'undoDelete':
      return { ...state, pendingDeleteId: null }

    case 'reset':
      return { tasks: copyInitialTasks(), pendingDeleteId: null }

    default:
      return state
  }
}

export function createTask(newTask: NewTask): Task {
  return {
    ...newTask,
    id: Date.now(),
    completed: false,
  }
}
