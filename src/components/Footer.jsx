import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#FFE4D7] to-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-[#093832]/10 pb-10">
          
          {/* Brand Mission */}
          <div className="text-center md:text-left max-w-sm">
            <h3 className="text-3xl font-bold text-[#093832] mb-3">Sahayak</h3>
            <p className="text-[#093832]/70 leading-relaxed">
              A dedicated space made with love to support your mental wellness journey. 
              Because you deserve to feel heard.
            </p>
          </div>

          {/* Quick Links - Ready for PHP Pages */}
          <div className="flex gap-10 text-[#093832] font-semibold">
            <div className="flex flex-col gap-2">
              <Link to="/about" className="hover:text-[#F1A6B4] transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-[#F1A6B4] transition-colors">Contact</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="hover:text-[#F1A6B4] transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-[#F1A6B4] transition-colors">Terms</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-sm text-[#093832]/60 font-medium">
          <p>&copy; {new Date().getFullYear()} Sahayak. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Built with <span className="text-[#F1A6B4] animate-pulse">❤️</span> by <span className="text-[#093832] font-bold">Arzoo</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
