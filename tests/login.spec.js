import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../src/components/login.jsx';
import axios from 'axios';

// ללעוג את axios
jest.mock('axios');

describe('Login Component', () => {
    test('renders Login Page title', () => {
        render(<Login />);
        expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    });

    test('renders username and password fields', () => {
        render(<Login />);
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    test('submits form with username and password', async () => {
        axios.post.mockResolvedValue({ data: { message: 'Login successful', user: { username: 'testuser' } } });

        render(<Login />);
        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const button = screen.getByRole('button', { name: /login/i });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:3000/login',
                { username: 'testuser', password: 'testpass' }
            );
        });
    });
});
