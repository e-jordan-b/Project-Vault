import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
import { render, screen, fireEvent } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import * as http from '../services/api.service';

jest.mock('../services/api.service', () => ({
  ...jest.requireActual('../services/api.service'),
  login: jest.fn(),
}));

describe('Login component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });

  test('renders login form', () => {
    const emailInput = screen.getByRole('textbox', { name: '' });
    const passwordInput = screen.getByLabelText('', {
      selector: 'input[type=password]',
    });
    const submitButton = screen.getByRole('button', { name: '' });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('shows error messages when inputs are empty and form is submitted', async () => {
    const submitButton = screen.getByRole('button', { name: '' });
    userEvent.click(submitButton);

    expect(await screen.findAllByText('This field is required')).toHaveLength(
      2
    );
  });

  test('submits form with valid input', async () => {
    const emailInput = screen.getByRole('textbox', { name: '' });
    const passwordInput = screen.getByLabelText('', {
      selector: 'input[type=password]',
    });
    const submitButton = screen.getByRole('button', { name: '' });

    http.login.mockResolvedValue({
      status: 200,
      data: { email: 'test@example.com', password: 'password123' },
    });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    expect(http.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  test('displays error message for incorrect email or password', async () => {
    const emailInput = screen.getByRole('textbox', { name: '' });
    const passwordInput = screen.getByLabelText('', {
      selector: 'input[type=password]',
    });
    const submitButton = screen.getByRole('button', { name: '' });

    http.login.mockResolvedValue({ status: 401 });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'wrongpassword');
    userEvent.click(submitButton);

    expect(
      await screen.findByText('Wrong email or password')
    ).toBeInTheDocument();
  });

  test('renders register link', () => {
    const registerLink = screen.getByRole('link', { name: 'Sign Up' });
    expect(registerLink).toBeInTheDocument();
  });
});
