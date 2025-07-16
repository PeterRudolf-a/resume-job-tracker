import request from 'supertest';
import express from 'express';
import resumeRoutes from '../routes/resumeRoutes';
import path from 'path';

const app = express();
app.use(express.json());
app.use('/api/resume', resumeRoutes);

describe('Resume Upload API', () => {
  it('should upload and parse a PDF resume', async () => {
    const res = await request(app)
      .post('/api/resume/upload')
      .attach('resume', path.join(__dirname, 'test_resume.pdf'));

    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBeDefined();
  });
});
