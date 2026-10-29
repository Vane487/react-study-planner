import type { Task } from '../types/task'

export const initialTasks: Task[] = [
  {
    id: 1,
    title: 'React Components',
    description: 'Повторити, як компоненти ділять інтерфейс на частини.',
    completed: false,
    priority: 'high',
    category: 'React',
  },
  {
    id: 2,
    title: 'TypeScript Exercises',
    description: 'Виконати вправи з типами для React-проєкту.',
    completed: true,
    priority: 'medium',
    category: 'TypeScript',
  },
  {
    id: 3,
    title: 'Повторити JSX',
    description: 'Подивитися конспект про JSX та props.',
    completed: false,
    priority: 'low',
    category: 'React',
  },
]
