// import NavBar from './navBar'
import Menu from './menu'
import React from 'react'
import { Outlet } from 'react-router-dom'
import '../styles/layout.css'

function Layout () {
  return (
    <div className='layoutDiv'>
      <Menu/>
      <div className='outletDiv'>
      <Outlet/>
      </div>
      <div className='infoDiv'></div>
    </div>
  )
}

export default Layout
