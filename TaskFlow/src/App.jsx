import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskflowMain from './Pages/TaskflowMain'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TaskflowMain />
    </>
  )
}

export default App
