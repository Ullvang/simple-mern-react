import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MERN title', () => {
  render(<App />);
  const linkElement = screen.getByText(/mern/i);
  expect(linkElement).toBeInTheDocument();
});
