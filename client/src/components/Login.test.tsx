import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
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
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button');

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

  // const mockLogin = jest.fn((email, password) => {
  //   return Promise.resolve({ email, password });
  // });

  // it('should display required error when value is invalid', async () => {
  //   render(<Login />);

  //   fireEvent.submit(screen.getByRole('button'));

  //   expect(await screen.findAllByRole('alert')).toHaveLength(2);
  //   expect(mockLogin).not.toBeCalled();
  // });

  // it('should display matching error when email is invalid', async () => {
  //   render(<Login />);

  //   fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
  //     target: {
  //       value: 'test',
  //     },
  //   });

  //   fireEvent.input(screen.getByLabelText('password'), {
  //     target: {
  //       value: 'password',
  //     },
  //   });

  //   fireEvent.submit(screen.getByRole('button'));

  //   expect(await screen.findAllByRole('alert')).toHaveLength(1);
  //   expect(mockLogin).not.toBeCalled();
  //   expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('test');
  //   expect(screen.getByLabelText('password')).toHaveValue('password');
  // });

  // it('should display min length error when password is invalid', async () => {
  //   render(<Login />);

  //   fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
  //     target: {
  //       value: 'test@mail.com',
  //     },
  //   });

  //   fireEvent.input(screen.getByLabelText('password'), {
  //     target: {
  //       value: 'pass',
  //     },
  //   });

  //   fireEvent.submit(screen.getByRole('button'));

  //   expect(await screen.findAllByRole('alert')).toHaveLength(1);
  //   expect(mockLogin).not.toBeCalled();
  //   expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
  //     'test@mail.com'
  //   );
  //   expect(screen.getByLabelText('password')).toHaveValue('pass');
  // });

  // it('should not display error when value is valid', async () => {
  //   render(<Login />);

  //   fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
  //     target: {
  //       value: 'test@mail.com',
  //     },
  //   });

  //   fireEvent.input(screen.getByLabelText('password'), {
  //     target: {
  //       value: 'password',
  //     },
  //   });

  //   fireEvent.submit(screen.getByRole('button'));

  //   await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
  //   expect(mockLogin).toBeCalledWith('test@mail.com', 'password');
  //   expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('');
  //   expect(screen.getByLabelText('password')).toHaveValue('');
  // });
});

// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import Login from './Login';
