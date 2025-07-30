import { Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-semibold">
        <Link to="/" className="hover:underline">Job Tracker</Link>
      </h1>
      <div className="space-x-4">
        {isLoggedIn && (
          <>
            <Link to="/upload" className="hover:underline">Upload Resume</Link>
            <Link to="/resumes" className="hover:underline">Saved Resumes</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
        {!isLoggedIn && (
          <Link to="/auth" className="hover:underline">Login / Register</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
