import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './components/register'
import Login from './components/login'
import Home from './components/home'
import UserContext from './context/UserContext'
import './App.css'
import Layout from './components/layout'
import Project from './components/projectInfo'
import Donate from './components/donateButton'
import Following from './components/followingProjects'
import PersonalProjects from './components/personalProjects'

function App () {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route element={<Layout/>}>
          <Route path='/home' element={<Home/>} />
          <Route path='/posts/:id' element={<Project/>} />
          <Route path='/posts/following' element={<Following/>} />
          <Route path='/posts/personal' element={<PersonalProjects/>} />
        </Route>
        <Route path='/payment' element={<Donate/>}/>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
