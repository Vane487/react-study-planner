import { useContext } from 'react'
import { TaskContext } from '../context/taskContext'

export function useTaskContext() {
  const taskContext = useContext(TaskContext)

  if (!taskContext) {
    throw new Error('useTaskContext має використовуватися всередині TaskProvider.')
  }

  return taskContext
}
