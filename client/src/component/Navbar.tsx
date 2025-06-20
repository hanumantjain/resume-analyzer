import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, token } = useAuth();
  return (
    <nav className="bg-gray-800 px-4 py-1">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex space-x-4">
          <Link to='/' className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Home</Link>
          <Link to='/profile' className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Profile</Link>
        </div>
        <div>
          {token ? (
            <button 
              onClick={logout} 
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
