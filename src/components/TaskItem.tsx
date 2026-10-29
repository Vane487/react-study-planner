import type { Task } from '../types/task'

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

const priorityLabel = {
  low: 'Низький',
  medium: 'Середній',
  high: 'Високий',
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <article className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      <div className="task-item__meta">
        <span className="badge">{task.category}</span>
        <span className={`badge badge--${task.priority}`}>
          {priorityLabel[task.priority]}
        </span>
      </div>

      <div className="task-item__content">
        <h2 className="task-item__title">{task.title}</h2>
        <p className="task-item__description">{task.description}</p>
      </div>

      <div className="task-item__actions">
        <button className="button button--success" type="button" onClick={() => onToggle(task.id)}>
          {task.completed ? 'Повернути' : 'Виконано'}
        </button>
        <button className="button button--danger" type="button" onClick={() => onDelete(task.id)}>
          Видалити
        </button>
      </div>
    </article>
  )
}
