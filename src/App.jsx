import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Tracker from "./pages/Tracker";
import Forum from "./pages/Forum";
import Resources from "./pages/Resources";
import Emergency from "./pages/Emergency";
import Mindfulness from "./pages/Mindfulness";
import Dashboard from "./pages/Dashboard";
import Challenges from './pages/Challenges';
import ChatbotWidget from "./components/ChatbotWidget";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenges" element={<Challenges />} />
      </Routes>
      <ChatbotWidget />
      <Mindfulness/>
      <Footer />
    </Router>
  );
}
