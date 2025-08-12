import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import resumeRoutes from "./routes/resumeRoutes";
import authRoutes from "./routes/authRoutes"; // if implemented
import mongoose from "mongoose";

dotenv.config({ path: path.join(__dirname, "../.env") });
connectDB();

const app = express();
app.use(express.json());

// Health check for DB status
app.get("/api/health", (_, res) => {
  res.json({ status: "ok", db: mongoose.connection.readyState });
});

app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
