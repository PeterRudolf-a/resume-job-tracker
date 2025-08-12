import fs from "fs";
import path from "path";

const uploadsDir = path.join(__dirname, "../uploads");

fs.readdir(uploadsDir, (err, files) => {
  if (err) {
    console.error("Error reading uploads folder:", err);
    process.exit(1);
  }

  for (const file of files) {
    fs.unlink(path.join(uploadsDir, file), (err) => {
      if (err) console.error(`Error deleting ${file}:`, err);
      else console.log(`Deleted: ${file}`);
    });
  }
});
