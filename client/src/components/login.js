import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import '../styles/login.css'

const initialState = {
  email: '',
  password: ''
}

const serverURL = process.env.REACT_APP_SERVER

function Login () {
  const { setUser } = useContext(UserContext)
  const [state, setState] = useState(initialState)
  const navigate = useNavigate()

  function handleChange (e) {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit (e) {
    e.preventDefault()
    const { email, password } = state
    const user = { email, password }

    try {
      const response = await fetch(`${serverURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })

      if (response.status === 401) {
        alert('Wrong email or password')
        return
      }
      const currentUser = await response.json()
      setUser(currentUser)
      navigate('/home')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='loginContainer'>
      <div className='anotherContainer'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className='loginForm'>
          <label htmlFor='name'>Email:</label>
          <input
            type='text'
            id='name'
            value={state.email}
            name='email'
            onChange={handleChange}></input>

          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={state.password}
            name='password'
            onChange={handleChange}></input>

          <button
            type='submit' className='loginButton'>Log In</button>
        </form>
        <span>Dont have an account?</span>
        <Link to={'/register'}> Sign Up</Link>
      </div>
    </div>
  )
}

export default Login
