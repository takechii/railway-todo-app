import { render, screen } from '@testing-library/react';
import App from './App';

// Jestのグローバル関数に対するESLintの警告を無視
/* eslint-disable no-undef */
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
/* eslint-enable no-undef */
