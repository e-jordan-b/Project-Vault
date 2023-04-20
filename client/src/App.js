import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './components/register'
import Login from './components/login'
import Home from './components/home'
import UserContext from './context/UserContext'
import './App.css'
import Layout from './components/layout'

function App () {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<Layout/>}>
          <Route path="/home" element={<Home/>} />
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
