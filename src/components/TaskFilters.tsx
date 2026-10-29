import type { Task, TaskFilter } from '../types/task'

interface TaskFiltersProps {
  activeFilter: TaskFilter
  tasks: Task[]
  onChange: (filter: TaskFilter) => void
}

const filters: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'Усі' },
  { value: 'active', label: 'Активні' },
  { value: 'completed', label: 'Виконані' },
]

export function TaskFilters({
  activeFilter,
  tasks,
  onChange,
}: TaskFiltersProps) {
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
