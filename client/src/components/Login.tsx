import React from 'react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import http from '../services/api.service';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  email: string;
  password: string;
}

interface LoginProps {
  login: (email: string, password: string) => void;
  alerts: string;
  setAlerts: (alerts: string) => void;
}

function Login({ login, alerts, setAlerts }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ defaultValues: { email: '', password: '' } });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await login(data.email, data.password);
    reset();
  };

  if (alerts) {
    setTimeout(() => {
      setAlerts('');
    }, 2000);
  }

  return (
    <div className='loginContainer'>
      <div className='anotherContainer'>
        <h1>Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='loginForm'
        >
          <label htmlFor='email'>email</label>
          <input
            id='email'
            {...register('email', {
              required: 'required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            type='email'
          />
          {errors.email && (
            <span
              className='fieldError'
              role='alert'
            >
              {errors.email.message}
            </span>
          )}
          <label htmlFor='password'>password</label>
          <input
            id='password'
            {...register('password', {
              required: 'required',
            })}
            type='password'
          />
          {errors.password && (
            <span
              className='fieldError'
              role='alert'
            >
              {errors.password.message}
            </span>
          )}
          {alerts && (
            <span
              className='wrongCredentials'
              role='alert'
            >
              {alerts}
            </span>
          )}
          <button
            type='submit'
            className='loginButton'
          >
            Log In
          </button>
        </form>
        <small>Dont have an account?</small>
        <Link to={'/register'}>
          <small> Sign Up</small>
        </Link>
      </div>
    </div>
  );
}

export default Login;
