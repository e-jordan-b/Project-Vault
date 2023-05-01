import React from 'react';
import { UserContextType } from '../types/user.type';
// import User from '../types/user.type';

const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default UserContext;
