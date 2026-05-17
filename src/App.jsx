import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Added useState
import { useLocation } from "react-router-dom";

// Pages & Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tracker from "./pages/Tracker";
import Forum from "./pages/Forum";
import Resources from "./pages/Resources";
import Emergency from "./pages/Emergency";
import Mindfulness from "./pages/Mindfulness";
import Dashboard from "./pages/Dashboard";
import Challenges from './pages/Challenges';
import ChatbotWidget from "./components/ChatbotWidget";
import Auth from "./pages/Auth"; 

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Track login state in React memory
  const [userLoggedIn, setUserLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/mindfulness" element={<Mindfulness />} />
          <Route path="/challenges" element={<Challenges />} />
          
          {/* Pass the dynamic state setter to Auth page */}
          <Route 
            path="/profile" 
            element={userLoggedIn ? <Navigate to="/dashboard" /> : <Auth setLoginState={setUserLoggedIn} />} 
          /> 

          {/* Pass the dynamic state setter to Dashboard page */}
          <Route 
            path="/dashboard" 
            element={userLoggedIn ? <Dashboard setLoginState={setUserLoggedIn} /> : <Navigate to="/profile" />} 
          />
        </Routes>
      </main>

      <ChatbotWidget />
      <Footer />
    </Router>
  );
}
