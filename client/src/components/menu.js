import React, { useContext, useState } from 'react'
import '../styles/menu.css'
import UserContext from '../context/UserContext'
import CreatePost from './createPost'
import { Link } from 'react-router-dom'
import { BiHomeAlt2, BiBookHeart, BiBookOpen, BiUser } from 'react-icons/bi'

function Menu () {
  const { user } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='menuComponent'>
      <nav className='sidebar'>
        <header>
          <div className='image-text'>
            <div className='logoImag'style={{ backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_KEY}/image/upload/v1681997706/project-vault-low-resolution-color-logo_jtpd37.png` }}></div>
          </div>
        </header>

        <div className='menu-bar'>
          <div className='menu'>
            <ul className='menu-links'>
              <li className='nav-link'>
                <BiHomeAlt2 className='icon'/>
                <Link to='home' className='react-link'>
                  <span className='text'>Home</span>
                </Link>
              </li>
              <li className='nav-link'>
                <BiBookOpen className='icon'/>
                <Link to='posts/personal' className='react-link'>
                  <span className='text'>My Projects</span>
                </Link>
              </li>
              <li className='nav-link'>
                <BiBookHeart className='icon'/>
                <Link to='posts/following' className='react-link'>
                  <span className='text'>Following</span>
                </Link>
              </li>
            </ul>

          <div className='userContainer'>
            <BiUser className='userIcon'/>
            <span className='userInformation'>Welcome back <br/> <span className='userName'>{user.firstName} {user.secondName}</span></span>
          </div>
          <div className='createButtonContainer'>
              <button className='createButton' onClick={() => setIsOpen(true)}>Create</button>
            </div>
          </div>
        </div>
      </nav>
      <CreatePost open={isOpen} onClose={() => setIsOpen(false)}></CreatePost>
      </div>
    </>
  )
}

export default Menu
