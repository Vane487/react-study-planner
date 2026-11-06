import type { TaskFilter } from '../types/task'
import { useTaskContext } from '../hooks/useTaskContext'
import './TaskFilters.scss'

const filters: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'Усі' },
  { value: 'active', label: 'Активні' },
  { value: 'completed', label: 'Виконані' },
]

export function TaskFilters() {
  const { filter: activeFilter, setFilter: onChange, tasks } = useTaskContext()
  function countTasks(filter: TaskFilter): number {
    if (filter === 'completed') return tasks.filter((task) => task.completed).length
    if (filter === 'active') return tasks.filter((task) => !task.completed).length
    return tasks.length
  }

  return (
    <nav className="task-filters" aria-label="Фільтри завдань">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`button button--filter ${
            activeFilter === filter.value ? 'button--active' : ''
          }`}
          type="button"
          onClick={() => onChange(filter.value)}
        >
          {filter.label} <span>{countTasks(filter.value)}</span>
        </button>
      ))}
    </nav>
  )
}
