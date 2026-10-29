import { useState } from 'react'
import { Header } from './components/Header'
import { TaskFilters } from './components/TaskFilters'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { TaskStats } from './components/TaskStats'
import { initialTasks } from './data/initialTasks'
import type { NewTask, Task, TaskFilter } from './types/task'

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<TaskFilter>('all')

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'active') return !task.completed
    return true
  })

  function addTask(newTask: NewTask): void {
    const task: Task = {
      ...newTask,
      id: Date.now(),
      completed: false,
    }

    setTasks((previousTasks) => [task, ...previousTasks])
  }

  function toggleTask(id: number): void {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(id: number): void {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id))
  }

  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <main className="planner">
      <Header />
      <TaskForm onAdd={addTask} />
      <TaskStats total={tasks.length} completed={completedCount} />
      <TaskFilters activeFilter={filter} tasks={tasks} onChange={setFilter} />
      <TaskList
        tasks={visibleTasks}
        isListEmpty={tasks.length === 0}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
    </main>
  )
}

export default App
