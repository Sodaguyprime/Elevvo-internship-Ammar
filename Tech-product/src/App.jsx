import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <p className="text-2xl font-bold text-blue-500">Hello from App.jsx!</p>
    </>
  )
}

export default App
