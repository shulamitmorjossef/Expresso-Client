import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // הייבוא החשוב!
import App from '../src/App';

test('app renders and contains Submit button', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /submit/i });
  expect(button).toBeInTheDocument();
});
