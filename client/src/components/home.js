import React, { useContext } from 'react'
import NavBar from './navBar'
import UserContext from '../context/UserContext'
import Menu from './menu'
import '../styles/home.css'

function Home () {
  const { user } = useContext(UserContext)
  console.log(user)

  return (
    <>
    <NavBar/>
    <div className='homeDiv'>
      <Menu/>
      <div>
        <h1>Home</h1>
      </div>
    </div>
    </>
  )
}

export default Home
