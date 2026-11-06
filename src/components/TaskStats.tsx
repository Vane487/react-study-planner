import { useTaskContext } from '../hooks/useTaskContext'
import './TaskStats.scss'

export function TaskStats() {
  const { tasks } = useTaskContext()
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const active = total - completed

  return (
    <section className="task-stats" aria-label="Статистика завдань">
      <div className="task-stats__item">
        <span className="task-stats__text">Усього</span>
        <strong className="task-stats__value">{total}</strong>
      </div>
      <div className="task-stats__item task-stats__item--completed">
        <span className="task-stats__text">Виконано</span>
        <strong className="task-stats__value">{completed}</strong>
      </div>
      <div className="task-stats__item task-stats__item--active">
        <span className="task-stats__text">Залишилося</span>
        <strong className="task-stats__value">{active}</strong>
      </div>
    </section>
  )
}
