import { Request, Response } from 'express';
import { parseResume } from '../utils/pdfParser';
import path from 'path';

export const uploadResume = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const parsed = await parseResume(file.path);
    res.status(200).json(parsed);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error parsing resume' });
  }
};
