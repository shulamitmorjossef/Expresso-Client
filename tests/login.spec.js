import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/components/login.jsx';

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

    test('submits form with username and password', () => {
        render(<Login />);
        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const button = screen.getByRole('button', { name: /login/i });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });

        fireEvent.click(button);

    });
});
