import { Link, useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png"; 

export default function Navbar() {
  const navigate = useNavigate(); 

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-4xl bg-[#F1A6B4] shadow-xl rounded-full px-6 py-3 flex justify-between items-center ">
      <Link to="/" className="text-xl font-bold text-[#093832]">
      <img src={logo} alt="Sahayak Logo" className="w-20 h-10 object-contain" />
      <span className="text-xl font-bold text-white hidden sm:inline"></span>
      </Link>
      <nav className="flex gap-4 items-center text-gray-700 text-sm font-semibold">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <Link to="/tracker" className="hover:text-white transition-colors">Tracker</Link>
        <Link to="/forum" className="hover:text-white transition-colors">Forum</Link>
        <Link to="/resources" className="hover:text-white transition-colors">Resources</Link>
        <Link to="/challenges" className="hover:text-white transition-colors">Challenges</Link>

        
        <button
          onClick={() => navigate("/emergency")}
          className="ml-4 flex items-center gap-1 px-3 py-2 bg-[#F92F60] hover:bg-[#e64848] text-white text-sm rounded-full shadow-md animate-bounce-slow transition-all duration-300"
        >
          <HeartIcon className="w-5 h-5 text-white" />
          <span className="hidden md:inline">Panic</span>
        </button>
      </nav>
    </header>
  );
}
