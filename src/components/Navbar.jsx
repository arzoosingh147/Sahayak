import { Link, useNavigate, useLocation } from "react-router-dom";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png"; 

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to highlight the active page
  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-5xl bg-[#F1A6B4] shadow-2xl rounded-full px-4 md:px-8 py-3 flex justify-between items-center border border-white/20">
      
      {/* Logo Section */}
      <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
        <img src={logo} alt="Sahayak Logo" className="w-16 h-8 md:w-20 md:h-10 object-contain" />
      </Link>

      {/* Navigation Links */}
      <nav className="hidden lg:flex gap-6 items-center text-[#093832] text-sm font-bold uppercase tracking-wide">
        {[
          { name: "Home", path: "/" },
          { name: "Tracker", path: "/tracker" },
          { name: "Forum", path: "/forum" },
          { name: "Resources", path: "/resources" },
          { name: "Challenges", path: "/challenges" },
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`transition-all duration-200 hover:text-white ${
              isActive(link.path) ? "text-white underline underline-offset-4" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Actions Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Profile Link - Preparing for PHP Sessions */}
        <Link 
          to="/profile" 
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          title="Profile"
        >
          <UserCircleIcon className="w-6 h-6 text-[#093832]" />
        </Link>

        {/* Panic Button */}
        <button
          onClick={() => navigate("/emergency")}
          className="flex items-center gap-1 px-4 py-2 bg-[#F92F60] hover:bg-[#D41B4B] text-white text-xs md:text-sm font-bold rounded-full shadow-lg hover:shadow-pink-500/50 transition-all duration-300 animate-pulse"
        >
          <HeartIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
          <span className="hidden sm:inline uppercase">Help</span>
        </button>
      </div>
    </header>
  );
}
