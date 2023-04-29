import React, { ReactElement, useState } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import UserContext from '../context/UserContext';
import { User, UserContextType } from '../types/user.type';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const userContextValue: UserContextType = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
