import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UploadResume from "./pages/UploadResume";
import SavedResumes from "./pages/SavedResumes";
import ResumeDetails from "./pages/ResumeDetails";
import LoginRegister from "./pages/LoginRegister";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/useAuth";
import './App.css';

function App() {
  const { token } = useAuth();

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginRegister />} />

        {/* Protected routes */}
        <Route
          path="/upload"
          element={token ? <UploadResume /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/resumes"
          element={token ? <SavedResumes /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/resumes/:id"
          element={token ? <ResumeDetails /> : <Navigate to="/login" replace />}
        />

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
