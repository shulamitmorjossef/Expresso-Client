import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from '../src/components/login';
import React from 'react';

jest.mock('../src/config', () => ({
  default: 'http://mocked-url.com'
}));

jest.mock('axios');

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login component', () => {

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders login form correctly', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/user name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('shows error when login fails with invalid credentials', async () => {
    axios.post.mockRejectedValue({ response: { status: 401 } });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/user name:/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText(/password:/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });
  });

  test('shows server error when server is down', async () => {
    axios.post.mockRejectedValue({});

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/user name:/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText(/password:/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText('Server error. Please try again later.')).toBeInTheDocument();
    });
  });

  test('redirects to /CustomerHome on successful customer login', async () => {
    axios.post.mockResolvedValue({
      data: { token: 'fake_token', user_type: 'customer' }
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/user name:/i), { target: { value: 'correctuser' } });
    fireEvent.change(screen.getByLabelText(/password:/i), { target: { value: 'correctpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake_token');
      expect(mockedNavigate).toHaveBeenCalledWith('/CustomerHome');
    });
  });

  test('redirects to /AdminHome on successful manager login', async () => {
    axios.post.mockResolvedValue({
      data: { token: 'manager_token', user_type: 'manager' }
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/user name:/i), { target: { value: 'manager' } });
    fireEvent.change(screen.getByLabelText(/password:/i), { target: { value: 'adminpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('manager_token');
      expect(mockedNavigate).toHaveBeenCalledWith('/AdminHome');
    });
  });

  test('shows error on unknown user type', async () => {
    axios.post.mockResolvedValue({
      data: { token: 'some_token', user_type: 'alien' }
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/user name:/i), { target: { value: 'alien' } });
    fireEvent.change(screen.getByLabelText(/password:/i), { target: { value: 'alienpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText('Unknown user type')).toBeInTheDocument();
    });
  });
});
