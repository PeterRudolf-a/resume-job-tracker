import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadResume from './pages/UploadResume';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadResume />} />
      </Routes>
    </Router>
  );
}

export default App
