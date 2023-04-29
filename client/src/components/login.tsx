import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import '../styles/login.css';
import http from '../services/api.service';
import { useForm, SubmitHandler } from 'react-hook-form';

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

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState(initialCredentials);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await http.login(credentials);
    if (response!.status === 401) {
      alert('Wrong email or password');
      return;
    } else {
      setUser(response!.data);
      navigate('/home');
    }
  };

  return (
    <div className='loginContainer'>
      <div className='anotherContainer'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('email', {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && <span>This field is required</span>}
          <input {...register('password', { required: true })} />
          {errors.password && <span>This field is required</span>}
          <input type='submit' />
        </form>
        <span>Dont have an account?</span>
        <Link to={'/register'}> Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
