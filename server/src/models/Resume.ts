import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skills: String,
  education: String,
  experience: String,
  rawText: String,
  uploadedAt: { type: Date, default: Date.now },
});

export const Resume = mongoose.model("Resume", ResumeSchema);
