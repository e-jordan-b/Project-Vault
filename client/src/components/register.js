import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialState = {
  firstName: '',
  secondName: '',
  email: '',
  password: ''
}

function Register () {
  const [state, setState] = useState(initialState)
  const navigate = useNavigate()

  function handleChange (e) {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit (e) {
    e.preventDefault()

    const { firstName, secondName, email, password } = state
    const user = { firstName, secondName, email, password }

    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else if (res.status === 401) {
          alert('Email already in use')
          throw new Error('Email already in use')
        }
      })
      .then((data) => {
        navigate('/login')
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>

        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          required
          value={state.firstName}
          onChange={handleChange}
        ></input>

        <label>Second Name:</label>
        <input type="text"
          name="secondName"
          required
          value={state.secondName}
          onChange={handleChange}
        ></input>

        <label>Email: </label>
        <input type="text"
          name="email"
          required
          value={state.email}
          onChange={handleChange}
        ></input>

        <label>Password: </label>
        <input type="password"
          name="password"
          required
          value={state.password}
          onChange={handleChange}
        ></input>

        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
