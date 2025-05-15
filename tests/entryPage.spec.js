import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EntryPage from '../src/components/entryPage';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('EntryPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders EntryPage correctly', () => {
    render(
      <MemoryRouter>
        <EntryPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome to expresso/i)).toBeInTheDocument();
    expect(screen.getByText(/guest login/i)).toBeInTheDocument();

    expect(screen.getAllByText(/login/i)[1]).toBeInTheDocument();

    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  test('navigates to Login page on Login button click', () => {
    render(
      <MemoryRouter>
        <EntryPage />
      </MemoryRouter>
    );

    const loginButtons = screen.getAllByText(/login/i);
    fireEvent.click(loginButtons[1]); 
    expect(mockedNavigate).toHaveBeenCalledWith('/Login');
  });

  test('navigates to Registration page on Register button click', () => {
    render(
      <MemoryRouter>
        <EntryPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/register/i));
    expect(mockedNavigate).toHaveBeenCalledWith('/Registration');
  });

  test('navigates to GuestHome page on Guest Login button click', () => {
    render(
      <MemoryRouter>
        <EntryPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/guest login/i));
    expect(mockedNavigate).toHaveBeenCalledWith('/GuestHome');
  });
});
