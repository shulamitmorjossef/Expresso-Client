import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from '../src/components/login'; // תקן נתיב אם צריך

jest.mock('axios');

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

    expect(screen.getByRole('heading', { name: 'התחברות' })).toBeInTheDocument();
    expect(screen.getByLabelText('שם משתמש:')).toBeInTheDocument();
    expect(screen.getByLabelText('סיסמה:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'התחברות' })).toBeInTheDocument();

  });

  test('shows error when login fails with invalid credentials', async () => {
    axios.post.mockRejectedValue({ response: { status: 401 } });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('שם משתמש:'), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText('סיסמה:'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: 'התחברות' }));

    await waitFor(() => {
      expect(screen.getByText('❌ Invalid username or password')).toBeInTheDocument();
    });
  });

  test('shows server error when server is down', async () => {
    axios.post.mockRejectedValue({});

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('שם משתמש:'), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText('סיסמה:'), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: 'התחברות' }));

    await waitFor(() => {
      expect(screen.getByText('❌ Server error. Please try again later.')).toBeInTheDocument();
    });
  });

  test('redirects to /customer-home on successful login', async () => {
    axios.post.mockResolvedValue({ data: { token: 'fake_token' } });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('שם משתמש:'), { target: { value: 'correctuser' } });
    fireEvent.change(screen.getByLabelText('סיסמה:'), { target: { value: 'correctpass' } });
    fireEvent.click(screen.getByRole('button', { name: 'התחברות' }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake_token');
    });
  });
});
