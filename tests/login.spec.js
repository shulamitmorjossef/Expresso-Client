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

describe('Login component (simplified)', () => {

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
    expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows error when login fails with invalid credentials', async () => {
    axios.post.mockRejectedValue({ response: { status: 401 } });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username:/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText(/password:/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });
  });

  test('redirects to /CustomerHome on successful customer login', async () => {
    axios.post.mockResolvedValue({
      data: {
        id: 5,
        username: 'shuli',
        user_type: 'customer',
        token: 'abc123'
      }
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username:/i), { target: { value: 'shuli' } });
    fireEvent.change(screen.getByLabelText(/password:/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.getItem('userType')).toBe('customer');
      expect(mockedNavigate).toHaveBeenCalledWith('/CustomerHome');
    });
  });
});
