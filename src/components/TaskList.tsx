import { useTaskContext } from '../hooks/useTaskContext'
import { TaskItem } from './TaskItem'
import './TaskList.scss'

export function TaskList() {
  const { filter, pendingDeleteId, requestDelete, startEditing, tasks, toggleTask } = useTaskContext()

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'active') return !task.completed
    return true
  })

  if (visibleTasks.length === 0) {
    return (
      <section className="empty-state">
        <h2 className="empty-state__title">
          {tasks.length === 0 ? 'Завдань поки немає.' : 'За цим фільтром завдань немає.'}
        </h2>
        <p className="empty-state__text">Додай нове завдання або зміни фільтр.</p>
      </section>
    )
  }

  return (
    <section className="task-list" aria-label="Список завдань">
      {visibleTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isPendingDelete={task.id === pendingDeleteId}
          isDeleteBlocked={pendingDeleteId !== null && task.id !== pendingDeleteId}
          onToggle={toggleTask}
          onEdit={startEditing}
          onDelete={requestDelete}
        />
      ))}
    </section>
  )
}
