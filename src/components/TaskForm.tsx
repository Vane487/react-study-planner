import { useState, type FormEvent } from 'react'
import { useTaskContext } from '../hooks/useTaskContext'
import type { Priority, Task } from '../types/task'
import './TaskForm.scss'

interface FormValues {
  title: string
  description: string
  category: string
  priority: Priority
}

const emptyForm: FormValues = {
  title: '',
  description: '',
  category: 'React',
  priority: 'medium',
}

function getFormValues(task: Task | null): FormValues {
  if (!task) return emptyForm

  return {
    title: task.title,
    description: task.description,
    category: task.category,
    priority: task.priority,
  }
}

export function TaskForm() {
  const { editingTask } = useTaskContext()

  return <TaskFormFields key={editingTask?.id ?? 'new'} editingTask={editingTask} />
}

interface TaskFormFieldsProps {
  editingTask: Task | null
}

function TaskFormFields({ editingTask }: TaskFormFieldsProps) {
  const { addTask, cancelEditing, updateTask } = useTaskContext()
  const [form, setForm] = useState<FormValues>(() => getFormValues(editingTask))
  const [error, setError] = useState('')

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]): void {
    setForm((previousForm) => ({ ...previousForm, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (!form.title.trim()) {
      setError('Введи назву завдання.')
      return
    }

    const taskData = {
      title: form.title.trim(),
      description: form.description.trim() || 'Опис не додано.',
      category: form.category.trim() || 'Без категорії',
      priority: form.priority,
    }

    if (editingTask) {
      updateTask(editingTask.id, taskData)
    } else {
      addTask(taskData)
      setForm(emptyForm)
    }

    setError('')
  }

  function handleCancel(): void {
    cancelEditing()
  }

  return (
    <section className="task-form" aria-labelledby="task-form-title">
      <div className="task-form__heading">
        <h2 id="task-form-title" className="task-form__title">
          {editingTask ? 'Редагування завдання' : 'Нове завдання'}
        </h2>
        {editingTask && <p className="task-form__hint">Зміни дані та збережи їх.</p>}
      </div>

      <form className="task-form__fields" onSubmit={handleSubmit}>
        <label className="task-form__field">
          <span className="task-form__label">Назва *</span>
          <input
            className="task-form__control"
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Наприклад, повторити props"
          />
        </label>

        <label className="task-form__field">
          <span className="task-form__label">Опис</span>
          <textarea
            className="task-form__control task-form__control--textarea"
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="Коротко напиши, що треба зробити"
          />
        </label>

        <div className="task-form__row">
          <label className="task-form__field">
            <span className="task-form__label">Категорія</span>
            <input
              className="task-form__control"
              value={form.category}
              onChange={(event) => updateField('category', event.target.value)}
              placeholder="React"
            />
          </label>

          <label className="task-form__field">
            <span className="task-form__label">Пріоритет</span>
            <select
              className="task-form__control"
              value={form.priority}
              onChange={(event) => updateField('priority', event.target.value as Priority)}
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

        <div className="task-form__actions">
          <button className="button button--primary" type="submit">
            {editingTask ? 'Зберегти зміни' : 'Додати завдання'}
          </button>
          {editingTask && (
            <button className="button" type="button" onClick={handleCancel}>
              Скасувати
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
