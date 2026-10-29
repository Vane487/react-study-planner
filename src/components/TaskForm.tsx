import { useState, type FormEvent } from 'react'
import type { NewTask, Priority } from '../types/task'

interface TaskFormProps {
  onAdd: (task: NewTask) => void
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('React')
  const [priority, setPriority] = useState<Priority>('medium')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (!title.trim()) {
      setError('Введи назву завдання.')
      return
    }

    onAdd({
      title: title.trim(),
      description: description.trim() || 'Опис не додано.',
      category: category.trim() || 'Без категорії',
      priority,
    })

    setTitle('')
    setDescription('')
    setCategory('React')
    setPriority('medium')
    setError('')
  }

  return (
    <section className="task-form" aria-labelledby="task-form-title">
      <h2 id="task-form-title" className="task-form__title">
        Нове завдання
      </h2>

      <form className="task-form__fields" onSubmit={handleSubmit}>
        <label className="field">
          <span className="field__label">Назва *</span>
          <input
            className="field__control"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Наприклад, повторити props"
          />
        </label>

        <label className="field">
          <span className="field__label">Опис</span>
          <textarea
            className="field__control field__control--textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Коротко напиши, що треба зробити"
          />
        </label>

        <div className="task-form__row">
          <label className="field">
            <span className="field__label">Категорія</span>
            <input
              className="field__control"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="React"
            />
          </label>

          <label className="field">
            <span className="field__label">Пріоритет</span>
            <select
              className="field__control"
              value={priority}
              onChange={(event) => setPriority(event.target.value as Priority)}
            >
              <option value="low">Низький</option>
              <option value="medium">Середній</option>
              <option value="high">Високий</option>
            </select>
          </label>
        </div>

        {error && (
          <p className="task-form__error" role="alert">
            {error}
          </p>
        )}

        <button className="button button--primary" type="submit">
          Додати завдання
        </button>
      </form>
    </section>
  )
}
