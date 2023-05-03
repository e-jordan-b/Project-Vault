import React, { useContext, useState } from 'react';
import '../styles/menu.css';
import UserContext from '../context/UserContext';
import CreateProject from './CreateProject';
import { Link } from 'react-router-dom';
import { BiHomeAlt2, BiBookHeart, BiBookOpen, BiUser } from 'react-icons/bi';

function Menu() {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='menuComponent'>
        <nav className='sidebar'>
          <header>
            <div>{user?.email}</div>
            <div className='image-text'>
              <div
                className='logoImag'
                style={{
                  backgroundImage:
                    "url('./project-vault-low-resolution-color-logo_jtpd37.png')",
                }}
              ></div>
            </div>
          </header>

          <div className='menu-bar'>
            <div className='menu'>
              <ul className='menu-links'>
                <li className='nav-link'>
                  <BiHomeAlt2 className='icon' />
                  <Link to='home' className='react-link'>
                    <span className='text'>Home</span>
                  </Link>
                </li>
                <li className='nav-link'>
                  <BiBookOpen className='icon' />
                  <Link to='projects/personal' className='react-link'>
                    <span className='text'>My Projects</span>
                  </Link>
                </li>
                <li className='nav-link'>
                  <BiBookHeart className='icon' />
                  <Link to='projects/following' className='react-link'>
                    <span className='text'>Following</span>
                  </li>
                </Link>
              </ul>

              <div className='userContainer'>
                <BiUser className='userIcon' />
                <span className='userInformation'>
                  Welcome back <br />{' '}
                  <span className='userName'>
                    {user?.firstName} {user?.lastName}
                  </span>
                </span>
              </div>
              <div className='createButtonContainer'>
                <button
                  className='createButton'
                  onClick={() => setIsOpen(true)}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </nav>
        <CreateProject
          open={isOpen}
          onClose={() => setIsOpen(false)}
        ></CreateProject>
      </div>
    </>
  );
}

export default Menu;
