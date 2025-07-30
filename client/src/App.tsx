import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UploadResume from './pages/UploadResume';
import SavedResumes from './pages/SavedResumes';
import ResumeDetails from './pages/ResumeDetails';
import LoginRegister from './pages/LoginRegister';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UploadResume />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/resumes" element={<SavedResumes />} />
        <Route path="/resumes/:id" element={<ResumeDetails />} />
        <Route path="/auth" element={<LoginRegister />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
