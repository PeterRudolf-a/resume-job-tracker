import mongoose, { Types } from 'mongoose';

const mockUserId = new Types.ObjectId();

export const authMiddleware = (req: any, res: any, next: any) => {
  req.user = { id: mockUserId.toString() }; // ✅ new
  next();
};
