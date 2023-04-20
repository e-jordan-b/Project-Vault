import React, { useContext, useState } from 'react'
import '../styles/menu.css'
import UserContext from '../context/UserContext'
import CreatePost from './createPost'

function Menu () {
  const { user } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='menu'>
      <h1>ProjectVault</h1>
      <h3>HOME</h3>
      <h3>MY PROJECTS</h3>
      <h3>FOLLOWING</h3>
      <button onClick={() => setIsOpen(true)}>CREATE</button>
      <CreatePost open={isOpen} onClose={() => setIsOpen(false)}></CreatePost>
      <h3>{user.firstName}</h3>
      <h3>{user.secondName}</h3>
    </div>
  )
}

export default Menu
