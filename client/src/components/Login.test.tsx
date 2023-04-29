import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders Login component', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
