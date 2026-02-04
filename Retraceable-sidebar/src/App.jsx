import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar1 from './SideBarcomponents/Sidebar1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar1 />
    </>
  )
}

export default App
