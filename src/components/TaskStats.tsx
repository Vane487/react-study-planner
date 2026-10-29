interface TaskStatsProps {
  total: number
  completed: number
}

export function TaskStats({ total, completed }: TaskStatsProps) {
  const active = total - completed

  return (
    <section className="task-stats" aria-label="Статистика завдань">
      <div className="task-stats__item">
        <span>Усього</span>
        <strong>{total}</strong>
      </div>
      <div className="task-stats__item task-stats__item--completed">
        <span>Виконано</span>
        <strong>{completed}</strong>
      </div>
      <div className="task-stats__item task-stats__item--active">
        <span>Залишилося</span>
        <strong>{active}</strong>
      </div>
    </section>
  )
}
