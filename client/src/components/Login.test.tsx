import React from 'react';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import '@testing-library/jest-dom';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

const alert = '';

const setAlerts = jest.fn();

describe('Login component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Login
          login={mockLogin}
          alerts={alert}
          setAlerts={setAlerts}
        />
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

  test('should display required error when value is invalid', async () => {
    fireEvent.submit(screen.getByRole('button'));

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(mockLogin).not.toBeCalled();
  });

  it('should display matching error when email is invalid', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test',
      },
    });

    fireEvent.input(screen.getByLabelText('password'), {
      target: {
        value: 'password',
      },
    });

    fireEvent.submit(screen.getByRole('button'));

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(mockLogin).not.toBeCalled();
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('test');
    expect(screen.getByLabelText('password')).toHaveValue('password');
  });

  it('should display min length error when password is invalid', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test@mail.com',
      },
    });

    fireEvent.input(screen.getByLabelText('password'), {
      target: {
        value: 'pass',
      },
    });

    fireEvent.submit(screen.getByRole('button'));

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(mockLogin).not.toBeCalled();
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
      'test@mail.com'
    );
    expect(screen.getByLabelText('password')).toHaveValue('pass');
  });

  it('should not display error when value is valid', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test@mail.com',
      },
    });

    fireEvent.input(screen.getByLabelText('password'), {
      target: {
        value: 'password',
      },
    });

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
    expect(mockLogin).toBeCalledWith('test@mail.com', 'password');
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('');
    expect(screen.getByLabelText('password')).toHaveValue('');
  });
});
