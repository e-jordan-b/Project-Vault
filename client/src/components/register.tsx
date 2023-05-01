import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const serverURL = process.env.REACT_APP_SERVER;

function Register() {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  function handleChange(e: any) {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    const { firstName, lastName, email, password } = state;
    const user = { firstName, lastName, email, password };

    fetch(`${serverURL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          alert('Email already in use');
          throw new Error('Email already in use');
        }
      })
      .then((data) => {
        navigate('/login');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='loginContainer'>
      <div className='anotherContainerRegister'>
        <h1>Register</h1>
        <form
          onSubmit={handleSubmit}
          className='registerForm'
        >
          <label htmlFor='firstName'>First Name:</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            required
            value={state.firstName}
            onChange={handleChange}
          ></input>

          <label htmlFor='lastName'>Last Name:</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            required
            value={state.lastName}
            onChange={handleChange}
          ></input>

          <label htmlFor='email'>Email: </label>
          <input
            type='text'
            id='email'
            name='email'
            required
            value={state.email}
            onChange={handleChange}
          ></input>

          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            id='password'
            name='password'
            required
            value={state.password}
            onChange={handleChange}
          ></input>

          <button
            type='submit'
            className='loginButton'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
