import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/register';
import Login from './components/Login';
import Home from './components/home';
import UserContext from './context/UserContext';
import './App.css';
import Layout from './components/layout';
import Project from './components/projectInfo';
import Following from './components/followingProjects';
import PersonalProjects from './components/personalProjects';
import Form2 from './components/form2';
import { User, UserContextType } from './types/user.type';

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

  const handleLogin = (email: string, password: string) => {
    // this function needs to call the login endpoint
    // and set the user in the context

    console.log('processing the login');
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
          element={<Register />}
        />
        <Route
          path='/login'
          element={<Login login={handleLogin} />}
        />
        <Route element={<Layout />}>
          <Route
            path='/home'
            element={<Home />}
          />
          <Route
            path='/posts/:id'
            element={<Project />}
          />
          <Route
            path='/posts/following'
            element={<Following />}
          />
          <Route
            path='/posts/personal'
            element={<PersonalProjects />}
          />
          <Route
            path='*'
            element={<Navigate to='/home' />}
          />
        </Route>
        <Route
          path='/donation'
          element={<Form2 />}
        />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
