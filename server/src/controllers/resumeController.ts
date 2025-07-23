import { Request, Response } from 'express';
import { parseResume } from '../utils/pdfParser';
import { Resume } from '../models/Resume';

export const uploadResume = async (req: any, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const parsed = await parseResume(file.path);
    const userId = req.user?.id;

    const saved = await Resume.create({ ...parsed, userId });
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading resume' });
  }
};

export const getMyResumes = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const resumes = await Resume.find({ userId }).sort({ uploadedAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error('Error fetching resumes:', err);
    res.status(500).json({ message: 'Failed to fetch resumes' });
  }
};