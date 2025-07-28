import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';

// Import the components directly for direct testing
import UploadResume from '../pages/UploadResume';
import SavedResumes from '../pages/SavedResumes';
import ResumeDetails from '../pages/ResumeDetails';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('renders UploadResume form', () => {
  render(<UploadResume />);
  expect(screen.getByText(/Upload Your Resume/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
});

test('renders ResumeList (SavedResumes) component', async () => {
  // Simulate an axios.get that resolves with empty resumes array
  mockedAxios.get.mockResolvedValue({ data: [] });
  
  render(<SavedResumes />);
  // Wait for the loading state to be replaced
  await waitFor(() => {
    expect(screen.getByText(/Saved Resumes/i)).toBeInTheDocument();
  });
});

test('renders ResumeDetails component', () => {
  render(<ResumeDetails />);
  expect(screen.getByText(/Resume Details/i)).toBeInTheDocument();
});
