import React, { useContext } from 'react'
import '../styles/navbar.css'
import UserContext from '../context/UserContext'

function NavBar () {
  const { user } = useContext(UserContext)

  return (
    <nav className='navigationBar'>
      <h1>ProjectVault</h1>
      <ul className='userList'>
        <li>{user.firstName}</li>
        <li>{user.secondName}</li>
      </ul>
    </nav>
  )
}

export default NavBar
