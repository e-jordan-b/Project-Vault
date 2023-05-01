import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import '../styles/login.css';
import http from '../services/api.service';
import { useForm, SubmitHandler } from 'react-hook-form';
import { type } from '@testing-library/user-event/dist/type';

interface ICredentials {
  email: string;
  password: string;
}

const initialCredentials: ICredentials = {
  email: '',
  password: '',
};

interface IFormInput {
  email: string;
  password: string;
}

interface LoginProps {
  login: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ login }) => {
  // const { user, setUser } = useContext(UserContext);
  // const [credentials, setCredentials] = useState(initialCredentials);
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await login(data.email, data.password);
    reset();
  };

  // const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  //   const response = await http.login(credentials);
  //   if (response!.status === 401) {
  //     alert('Wrong email or password');
  //     return;
  //   } else {
  //     setUser(response!.data);
  //     navigate('/home');
  //   }
  // };

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
};

export default Login;
