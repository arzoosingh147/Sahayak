import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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

// Helper to reset scroll when clicking a link
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/challenges" element={<Challenges />} />
        </Routes>
      </main>

      <ChatbotWidget />
      <Footer />
    </Router>
  );
}
