import { useEffect, useState } from "react";
import axios from "axios";

type Resume = {
  _id: string;
  skills: string;
  education: string;
  experience: string;
  rawText: string;
  uploadedAt: string;
};

const SavedResumes = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showRaw, setShowRaw] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resume/mine", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setResumes(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to load resumes");
        } else {
          setError("Failed to load resumes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Saved Resumes</h1>

      {resumes.map((resume) => (
        <div key={resume._id} className="border p-4 rounded shadow-sm bg-white">
          <p className="text-sm text-gray-500 mb-2">
            Uploaded: {new Date(resume.uploadedAt).toLocaleString()}
          </p>

          <div className="space-y-2">
            <div>
              <h2 className="font-semibold">Skills</h2>
              <p className="bg-gray-50 p-2 rounded">
                {resume.skills || "Not found"}
              </p>
            </div>

            <div>
              <h2 className="font-semibold">Education</h2>
              <p className="bg-gray-50 p-2 rounded">
                {resume.education || "Not found"}
              </p>
            </div>

            <div>
              <h2 className="font-semibold">Experience</h2>
              <p className="bg-gray-50 p-2 rounded">
                {resume.experience || "Not found"}
              </p>
            </div>

            <button
              onClick={() =>
                setShowRaw(showRaw === resume._id ? null : resume._id)
              }
              className="text-blue-500 underline text-sm mt-2"
            >
              {showRaw === resume._id
                ? "Hide full text"
                : "Show full resume text"}
            </button>

            {showRaw === resume._id && (
              <pre className="bg-gray-100 text-sm p-2 mt-2 overflow-auto rounded whitespace-pre-wrap">
                {resume.rawText}
              </pre>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedResumes;
