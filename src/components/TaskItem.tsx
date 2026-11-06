import type { Task } from '../types/task'
import './TaskItem.scss'

interface TaskItemProps {
  task: Task
  isPendingDelete: boolean
  isDeleteBlocked: boolean
  onToggle: (id: number) => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

const priorityLabel = {
  low: 'Низький',
  medium: 'Середній',
  high: 'Високий',
}

export function TaskItem({
  task,
  isPendingDelete,
  isDeleteBlocked,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const titleClassName = `task-item__title ${task.completed ? 'task-item__title--completed' : ''}`
  const itemClassName = `task-item ${task.completed ? 'task-item--completed' : ''} ${
    isPendingDelete ? 'task-item--pending' : ''
  }`

  return (
    <article className={itemClassName}>
      <div className="task-item__meta">
        <span className="badge">{task.category}</span>
        <span className={`badge badge--${task.priority}`}>
          {priorityLabel[task.priority]}
        </span>
      </div>

      <div className="task-item__content">
        <h2 className={titleClassName}>{task.title}</h2>
        <p className="task-item__description">{task.description}</p>
        {isPendingDelete && <p className="task-item__pending-text">Буде видалено через 5 секунд.</p>}
      </div>

      <div className="task-item__actions">
        <button className="button button--success" type="button" onClick={() => onToggle(task.id)}>
          {task.completed ? 'Повернути' : 'Виконано'}
        </button>
        <button className="button" type="button" onClick={() => onEdit(task)} disabled={isPendingDelete}>
          Редагувати
        </button>
        <button
          className="button button--danger"
          type="button"
          onClick={() => onDelete(task.id)}
          disabled={isPendingDelete || isDeleteBlocked}
        >
          {isPendingDelete ? 'Очікування...' : 'Видалити'}
        </button>
      </div>
    </article>
  )
}
