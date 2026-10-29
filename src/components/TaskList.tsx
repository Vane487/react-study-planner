import type { Task } from '../types/task'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  isListEmpty: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TaskList({
  tasks,
  isListEmpty,
  onToggle,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <section className="empty-state">
        <h2>{isListEmpty ? 'Завдань поки немає.' : 'За цим фільтром завдань немає.'}</h2>
        <p>Додай нове завдання або зміни фільтр.</p>
      </section>
    )
  }

  return (
    <section className="task-list" aria-label="Список завдань">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </section>
  )
}
