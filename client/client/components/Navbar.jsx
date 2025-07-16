import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between">
      <Link to="/" className="font-bold text-xl text-blue-600">MERN Blog</Link>
      <div className="space-x-4">
        <Link to="/login" className="text-gray-700">Login</Link>
        <Link to="/register" className="text-gray-700">Register</Link>
      </div>
    </nav>
  );
}
