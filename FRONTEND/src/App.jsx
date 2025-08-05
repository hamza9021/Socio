// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import {Login, Signup} from './Components'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
