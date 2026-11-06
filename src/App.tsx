import './App.scss'
import { Header } from './components/Header'
import { TaskFilters } from './components/TaskFilters'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { TaskStats } from './components/TaskStats'
import { Toast } from './components/Toast'

function App() {
  return (
    <main className="planner">
      <Header />
      <TaskForm />
      <TaskStats />
      <TaskFilters />
      <TaskList />
      <Toast />
    </main>
  )
}

export default App
