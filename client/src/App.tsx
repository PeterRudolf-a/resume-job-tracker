import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadResume from './pages/UploadResume';
import SavedResumes from './pages/SavedResumes';
import LoginRegister from './pages/LoginRegister';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadResume />} />
        <Route path="/auth" element={<LoginRegister />} />
        <Route path="/saved" element={<SavedResumes />} />
      </Routes>
    </Router>
  );
}

export default App;
