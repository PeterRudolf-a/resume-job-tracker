import { Request, Response } from 'express';
import { parseResume } from '../utils/pdfParser';
import path from 'path';

export const uploadResume = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const text = await parseResume(file.path);

    // For now, just return extracted text
    res.status(200).json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error parsing resume' });
  }
};
