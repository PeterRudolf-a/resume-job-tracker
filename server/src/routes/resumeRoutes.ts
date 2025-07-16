import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadResume } from '../controllers/resumeController';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'src/uploads/',
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('resume'), uploadResume);

export default router;
