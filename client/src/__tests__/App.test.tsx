import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders app header', () => {
  render(<App />);
  expect(screen.getByText(/Vite/i)).toBeInTheDocument();
});
