import { useEffect, useState } from "react";
import axios from "axios";
import ResumeCard from "../components/ResumeCard";
import Spinner from "../components/Spinner";

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

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Saved Resumes</h1>

      {resumes.map((resume) => (
        <ResumeCard
          key={resume._id}
          {...resume}
          showRaw={showRaw === resume._id}
          toggleRaw={() =>
            setShowRaw((prev) => (prev === resume._id ? null : resume._id))
          }
        />
      ))}
    </div>
  );
};

export default SavedResumes;
