import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders UploadResume form', () => {
  render(<App />);
  expect(screen.getByText(/Upload Your Resume/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
});
test('renders ResumeList component', () => {
  render(<App />);
  expect(screen.getByText(/Your Resumes/i)).toBeInTheDocument();
});
test('renders ResumeDetails component', () => {
  render(<App />);
  expect(screen.getByText(/Resume Details/i)).toBeInTheDocument();
});
