import fs from "fs";
import pdfParse from "pdf-parse";

const extractSection = (text: string, keywords: string[]) => {
  const lower = text.toLowerCase();
  for (let keyword of keywords) {
    const startIndex = lower.indexOf(keyword.toLowerCase());
    if (startIndex !== -1) {
      const nextHeaderIndex = lower
        .slice(startIndex + keyword.length)
        .search(/\n[A-Z]/);
      return text
        .slice(startIndex, startIndex + keyword.length + nextHeaderIndex)
        .trim();
    }
  }
  return null;
};

export const parseResume = async (filePath: string) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  const text = data.text;

  return {
    rawText: text,
    skills: extractSection(text, [
      "skills",
      "technical skills",
      "technologies",
    ]),
    experience: extractSection(text, [
      "experience",
      "work history",
      "employment",
    ]),
    education: extractSection(text, ["education", "academic"]),
  };
};
