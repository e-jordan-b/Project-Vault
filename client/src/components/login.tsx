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
}

function Login({ login }: LoginProps) {
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

  return (
    <div className='loginContainer'>
      <div className='anotherContainer'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.email && <span role='alert'>{errors.email.message}</span>}
          <label htmlFor='password'>password</label>
          <input
            id='password'
            {...register('password', {
              required: 'required',
              minLength: {
                value: 5,
                message: 'min length is 5',
              },
            })}
            type='password'
          />
          {errors.password && (
            <span role='alert'>{errors.password.message}</span>
          )}
          <button type='submit'>SUBMIT</button>
        </form>
        <span>Dont have an account?</span>
        <Link to={'/register'}> Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
