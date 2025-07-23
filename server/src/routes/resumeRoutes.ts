import express from 'express';
import multer from 'multer';
import { authMiddleware } from '../middleware/auth';
import { uploadResume } from '../controllers/resumeController';
import { getMyResumes } from '../controllers/resumeController';


const router = express.Router();

const storage = multer.diskStorage({
  destination: 'src/uploads/',
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/upload', authMiddleware, upload.single('resume'), uploadResume);
router.get('/mine', authMiddleware, getMyResumes);


export default router;
