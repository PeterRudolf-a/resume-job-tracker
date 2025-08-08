import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';

// Import components directly for isolated testing
import UploadResume from '../pages/UploadResume';
import SavedResumes from '../pages/SavedResumes';
import ResumeDetails from '../pages/ResumeDetails';

// Mock axios globally
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Client Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders UploadResume form', () => {
    render(<UploadResume />);
    expect(screen.getByText(/Upload Your Resume/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
  });

  test('renders SavedResumes with empty data', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<SavedResumes />);

    // findByText waits automatically for the element to appear
    expect(await screen.findByText(/Saved Resumes/i)).toBeInTheDocument();
    expect(screen.queryByText(/Uploaded:/i)).not.toBeInTheDocument();
  });

  test('renders SavedResumes with mock resume data', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          _id: '1',
          skills: 'JavaScript, React',
          education: 'Durham College',
          experience: 'Uber Eats',
          rawText: 'Some long text here',
          uploadedAt: new Date().toISOString(),
        },
      ],
    });

    render(<SavedResumes />);

    expect(await screen.findByText(/JavaScript, React/i)).toBeInTheDocument();
    expect(screen.getByText(/Durham College/i)).toBeInTheDocument();
    expect(screen.getByText(/Uber Eats/i)).toBeInTheDocument();
  });

  test('renders ResumeDetails component', () => {
    render(<ResumeDetails />);
    expect(screen.getByText(/Resume Details/i)).toBeInTheDocument();
  });
});
