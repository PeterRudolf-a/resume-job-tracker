import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import resumeRoutes from './routes/resumeRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));

app.use(express.json());

app.use('/api/resume', resumeRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
