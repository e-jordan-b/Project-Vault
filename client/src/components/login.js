import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'

const initialState = {
  email: '',
  password: ''
}

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
      const response = await fetch('http://localhost:3001/login', {
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type='text'
          value={state.email}
          name='email'
          onChange={handleChange}></input>

        <label>Password:</label>
        <input
          type='password'
          value={state.password}
          name='password'
          onChange={handleChange}></input>

        <button
          type='submit'>Log In</button>
      </form>
    </div>
  )
}

export default Login
