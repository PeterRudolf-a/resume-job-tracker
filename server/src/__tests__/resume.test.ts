import request from 'supertest';
import express from 'express';
import mongoose, { Types } from 'mongoose';
import path from 'path';

import resumeRoutes from '../routes/resumeRoutes';
import { Resume } from '../models/Resume';

const app = express();
app.use(express.json());
app.use('/api/resume', resumeRoutes);

const mockUserId = new Types.ObjectId();

// Mock auth middleware
jest.mock('../middleware/auth', () => ({
  authMiddleware: (req: any, _res: any, next: any) => {
    req.user = { id: mockUserId.toString() };
    next();
  },
}));

beforeAll(async () => {
  const uri = 'mongodb://localhost:27017/job-tracker-test';
  await mongoose.connect(uri);
});

afterEach(async () => {
  await Resume.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Resume Routes', () => {
  it('should upload and parse a PDF resume', async () => {
    const res = await request(app)
      .post('/api/resume/upload')
      .set('Authorization', 'Bearer dummy')
      .attach('resume', path.join(__dirname, 'test_resume.pdf'));

    expect(res.statusCode).toBe(201);
    expect(res.body.skills).toBeDefined();
    expect(res.body.education).toBeDefined();
    expect(res.body.experience).toBeDefined();
  });

  it('should get uploaded resumes for the user', async () => {
    await Resume.create({
      userId: mockUserId,
      skills: 'JS, React',
      education: 'Durham',
      experience: 'Uber Eats',
      rawText: 'Skills: JS, Education: Durham',
      uploadedAt: new Date(),
    });

    const res = await request(app)
      .get('/api/resume/mine')
      .set('Authorization', 'Bearer dummy');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].skills).toBe('JS, React');
  });

  it('should return 400 if no file is uploaded', async () => {
    const res = await request(app)
      .post('/api/resume/upload')
      .set('Authorization', 'Bearer dummy');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/no file uploaded/i);
  });
});
