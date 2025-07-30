type ResumeProps = {
  skills: string;
  education: string;
  experience: string;
  rawText: string;
  uploadedAt: string;
  showRaw?: boolean;
  toggleRaw?: () => void;
};

const ResumeCard = ({
  skills,
  education,
  experience,
  rawText,
  uploadedAt,
  showRaw = false,
  toggleRaw = () => {},
}: ResumeProps) => {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <p className="text-sm text-gray-500 mb-2">
        Uploaded: {new Date(uploadedAt).toLocaleString()}
      </p>

      <div className="space-y-2">
        <div>
          <h2 className="font-semibold">Skills</h2>
          <p className="bg-gray-50 p-2 rounded">{skills || "Not found"}</p>
        </div>

        <div>
          <h2 className="font-semibold">Education</h2>
          <p className="bg-gray-50 p-2 rounded">{education || "Not found"}</p>
        </div>

        <div>
          <h2 className="font-semibold">Experience</h2>
          <p className="bg-gray-50 p-2 rounded">{experience || "Not found"}</p>
        </div>

        <button
          onClick={toggleRaw}
          className="text-blue-500 underline text-sm mt-2"
        >
          {showRaw ? "Hide full resume text" : "Show full resume text"}
        </button>

        {showRaw && (
          <pre className="bg-gray-100 text-sm p-2 mt-2 overflow-auto rounded whitespace-pre-wrap">
            {rawText}
          </pre>
        )}
      </div>
    </div>
  );
};

export default ResumeCard;
