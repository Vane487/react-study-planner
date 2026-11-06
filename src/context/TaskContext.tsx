import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { TaskContext, type ToastMessage } from './taskContext'
import {
  createInitialTaskState,
  createTask,
  taskReducer,
  TASKS_STORAGE_KEY,
} from '../reducers/taskReducer'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { NewTask, Task, TaskChanges, TaskFilter } from '../types/task'

interface TaskProviderProps {
  children: ReactNode
}

function isTaskFilter(value: unknown): value is TaskFilter {
  return value === 'all' || value === 'active' || value === 'completed'
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, undefined, createInitialTaskState)
  const [savedFilter, setSavedFilter] = useLocalStorage<TaskFilter>('study-planner-filter', 'all')
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const toastId = useRef(0)

  const filter = isTaskFilter(savedFilter) ? savedFilter : 'all'

  const showToast = useCallback(
    (message: Omit<ToastMessage, 'id'>) => {
      toastId.current += 1
      setToast({ ...message, id: toastId.current })
    },
    [],
  )

  const dismissToast = useCallback(() => setToast(null), [])

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks))
    } catch {
      // Дані залишаються доступними у state, навіть якщо localStorage недоступний.
    }
  }, [state.tasks])

  const activeTasksCount = state.tasks.filter((task) => !task.completed).length

  useEffect(() => {
    document.title = `Study Planner — ${activeTasksCount} active tasks`
  }, [activeTasksCount])

  useEffect(() => {
    if (state.pendingDeleteId === null) return

    const deleteTimer = window.setTimeout(() => {
      dispatch({ type: 'confirmDelete' })
      showToast({
        text: 'Завдання остаточно видалено.',
        tone: 'success',
        duration: 3000,
      })
    }, 5000)

    return () => window.clearTimeout(deleteTimer)
  }, [state.pendingDeleteId, showToast])

  const addTask = useCallback(
    (newTask: NewTask) => {
      dispatch({ type: 'add', payload: createTask(newTask) })
      showToast({ text: 'Завдання додано.', tone: 'success', duration: 3000 })
    },
    [showToast],
  )

  const updateTask = useCallback(
    (id: number, changes: TaskChanges) => {
      dispatch({ type: 'update', payload: { id, changes } })
      setEditingTask(null)
      showToast({ text: 'Завдання оновлено.', tone: 'success', duration: 3000 })
    },
    [showToast],
  )

  const toggleTask = useCallback((id: number) => {
    dispatch({ type: 'toggle', payload: { id } })
  }, [])

  const startEditing = useCallback((task: Task) => {
    setEditingTask(task)
  }, [])

  const cancelEditing = useCallback(() => setEditingTask(null), [])

  const undoDelete = useCallback(() => {
    dispatch({ type: 'undoDelete' })
    showToast({ text: 'Видалення скасовано.', tone: 'info', duration: 2500 })
  }, [showToast])

  const requestDelete = useCallback(
    (id: number) => {
      if (state.pendingDeleteId !== null) {
        showToast({
          text: 'Спочатку скасуй або дочекайся поточного видалення.',
          tone: 'error',
          duration: 3000,
        })
        return
      }

      dispatch({ type: 'requestDelete', payload: { id } })
      showToast({
        text: 'Завдання буде видалено через 5 секунд.',
        tone: 'info',
        duration: 5000,
        actionLabel: 'Скасувати',
        onAction: undoDelete,
        showProgress: true,
      })
    },
    [showToast, state.pendingDeleteId, undoDelete],
  )

  const resetTasks = useCallback(() => {
    dispatch({ type: 'reset' })
    setEditingTask(null)
    showToast({ text: 'Початкові дані відновлено.', tone: 'info', duration: 3000 })
  }, [showToast])

  const value = useMemo(
    () => ({
      tasks: state.tasks,
      filter,
      pendingDeleteId: state.pendingDeleteId,
      editingTask,
      toast,
      setFilter: setSavedFilter,
      addTask,
      updateTask,
      toggleTask,
      startEditing,
      cancelEditing,
      requestDelete,
      undoDelete,
      resetTasks,
      dismissToast,
    }),
    [
      addTask,
      cancelEditing,
      dismissToast,
      editingTask,
      filter,
      requestDelete,
      resetTasks,
      startEditing,
      state.pendingDeleteId,
      state.tasks,
      setSavedFilter,
      toast,
      toggleTask,
      undoDelete,
      updateTask,
    ],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
