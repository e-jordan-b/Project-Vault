import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './components/register'
import Login from './components/login'
import UserContext from './context/UserContext'

function App () {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
