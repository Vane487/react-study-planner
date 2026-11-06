import { useTaskContext } from '../hooks/useTaskContext'
import './Header.scss'

export function Header() {
  const { resetTasks } = useTaskContext()

  return (
    <header className="header">
      <div>
        <p className="header__eyebrow">React State & Effects · Lab 09</p>
        <h1 className="header__title">Study Planner</h1>
        <p className="header__text">Плануй навчальні завдання просто й зручно.</p>
      </div>
      <button className="button button--header" type="button" onClick={resetTasks}>
        Скинути дані
      </button>
    </header>
  )
}
