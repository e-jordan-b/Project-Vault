import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import UserContext from './context/UserContext';
import './App.css';
import Layout from './components/layout';
import ProjectInfo from './components/ProjectInfo';
import Following from './components/followingProjects';
import PersonalProjects from './components/personalProjects';
import Form2 from './components/DonationForm';
import { User, UserContextType } from './types/user.type';
import http from './services/api.service';

interface IFormInput {
  email: string;
  password: string;
}

const App: React.FC = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const userContextValue: UserContextType = {
    user,
    setUser,
  };
  const [alerts, setAlerts] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    http
      .login({ email, password })
      ?.then((response) => {
        if (response!.status === 401) {
          setAlerts('Wrong email or password');
          return;
        } else if (response!.status === 200) {
          setUser(response!.data);
          navigate('/home');
        } else {
          alert('Something went wrong in app, in handle login');
        }
      })
      .catch((error) => {
        console.log('error from app.tsx', error);
        setAlerts(error.response.data.message);
      });
  };

  const handleRegistration = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    // const response = await http.register({
    //   email,
    //   password,
    //   firstName,
    //   lastName,
    // });
    // if (response!.status === 409) {
    //   alert('Email already exists');
    //   return;
    // } else if (response!.status === 201) {
    //   setUser(response!.data);
    //   navigate('/home');
    // } else {
    //   alert('Something went wrong, app handleRegistration');
    // }
    http
      .register({ email, password, firstName, lastName })
      ?.then((response) => {
        if (response!.status === 409) {
          setAlerts('Email already in use');
          return;
        } else if (response!.status === 201) {
          setUser(response!.data);
          navigate('/home');
        } else {
          alert('Something went wrong, app handleRegistration');
        }
      })
      .catch((error) => {
        console.log('error from app.tsx', error);
        setAlerts(error.response.data.message);
      });
  };

  const handleGetProjects = async () => {
    const response = await http.getAllProjects();
    if (response!.status === 200) {
      return response!.data;
    } else {
      alert('Something went wrong, app handleGetProjects');
    }
  };

  return (
    <UserContext.Provider value={userContextValue}>
      <Routes>
        <Route
          path='/'
          element={<Navigate to='/login' />}
        />
        <Route
          path='/register'
          element={
            <Registration
              registration={handleRegistration}
              alerts={alerts}
              setAlerts={setAlerts}
            />
          }
        />
        <Route
          path='/login'
          element={
            <Login
              login={handleLogin}
              alerts={alerts}
              setAlerts={setAlerts}
            />
          }
        />
        <Route element={<Layout />}>
          <Route
            path='/home'
            element={<Home />}
          />
          <Route
            path='/projects/:id'
            element={<ProjectInfo />}
          />
          <Route
            path='/projects/following'
            element={<Following />}
          />
          <Route
            path='/projects/personal'
            element={<PersonalProjects />}
          />
          <Route
            path='*'
            element={<Navigate to='/home' />}
          />
        </Route>
        <Route
          path='/donation/:projectId'
          element={<Form2 />}
        />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
