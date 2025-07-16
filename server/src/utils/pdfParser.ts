import fs from 'fs';
import pdfParse from 'pdf-parse';

export const parseResume = async (filePath: string) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  const rawText = data.text;

  // Extract structured info (basic version)
  const skillsMatch = rawText.match(/Skills[\s\S]*?(?=\n[A-Z])/i);
  const educationMatch = rawText.match(/Education[\s\S]*?(?=\n[A-Z])/i);
  const experienceMatch = rawText.match(/(Experience|Employment History)[\s\S]*?(?=\n[A-Z])/i);

  return {
    rawText,
    skills: skillsMatch ? skillsMatch[0].trim() : null,
    education: educationMatch ? educationMatch[0].trim() : null,
    experience: experienceMatch ? experienceMatch[0].trim() : null,
  };
};

