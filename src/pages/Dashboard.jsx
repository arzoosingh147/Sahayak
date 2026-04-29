import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CalendarDaysIcon, 
  BookmarkIcon, 
  BookOpenIcon, 
  ChartBarIcon 
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [lastArticle, setLastArticle] = useState("");
  const [savedTools, setSavedTools] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [moodStats, setMoodStats] = useState({});

  useEffect(() => {
    // This will eventually be: fetch('api/get_user_dashboard.php?user_id=' + sessionID)
    setLastArticle("Managing Anxiety: 5 Easy Steps");
    setSavedTools(["Deep Breathing Exercise", "Self-Compassion Worksheet"]);
    setAppointments([{ date: "2025-05-10", with: "Dr. Alia Khan" }]);
    setMoodStats({ happy: 4, sad: 2, stressed: 1, relaxed: 3 });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-gradient-to-b from-white to-[#FFE4D7] text-[#093832]">
      <div className="max-w-6xl mx-auto">
        
        {/* Welcome Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">Welcome Back, <span className="text-[#F1A6B4]">User</span></h1>
            <p className="opacity-70 font-medium">Your mental wellness journey is progressing beautifully.</p>
          </div>
          <Link to="/tracker" className="bg-[#093832] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all">
            Log Today's Mood
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Mood & Stats */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-xl border-b-8 border-[#F1A6B4]">
              <div className="flex items-center gap-2 mb-6">
                <ChartBarIcon className="w-6 h-6 text-[#F1A6B4]" />
                <h2 className="text-2xl font-bold">Mood Overview</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(moodStats).map(([mood, count]) => (
                  <motion.div 
                    whileHover={{ y: -5 }}
                    key={mood} 
                    className="bg-[#FFE4D7]/40 rounded-3xl p-6 text-center border border-white"
                  >
                    <p className="text-sm font-bold uppercase tracking-widest opacity-50 mb-1">{mood}</p>
                    <p className="text-3xl font-black text-[#093832]">{count}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <BookOpenIcon className="w-6 h-6 text-[#F1A6B4]" />
                <h2 className="text-2xl font-bold">Continue Reading</h2>
              </div>
              <div className="p-6 bg-gray-50 rounded-3xl border-l-8 border-[#093832] flex justify-between items-center">
                <p className="font-bold text-lg">{lastArticle}</p>
                <Link to="/resources" className="text-[#F1A6B4] font-black hover:underline uppercase text-xs tracking-widest">
                  Open →
                </Link>
              </div>
            </section>
          </div>

          {/* Right Column: Appointments & Tools */}
          <div className="space-y-8">
            <section className="bg-[#093832] text-white p-8 rounded-[2.5rem] shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <CalendarDaysIcon className="w-6 h-6 text-[#F1A6B4]" />
                <h2 className="text-2xl font-bold">Schedule</h2>
              </div>
              {appointments.length > 0 ? (
                <ul className="space-y-4">
                  {appointments.map((appt, index) => (
                    <li key={index} className="bg-white/10 p-4 rounded-2xl border border-white/10">
                      <p className="text-xs font-bold opacity-60 uppercase tracking-tighter">{appt.date}</p>
                      <p className="font-bold">Consultation with {appt.with}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="opacity-60 italic text-sm">No upcoming sessions.</p>
              )}
              <Link to="/helpfinder" className="block mt-6 text-center py-3 bg-[#F1A6B4] text-[#093832] rounded-xl font-bold hover:bg-pink-400 transition-colors">
                Book New Session
              </Link>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] shadow-xl border-t-8 border-[#F1A6B4]">
              <div className="flex items-center gap-2 mb-6">
                <BookmarkIcon className="w-6 h-6 text-[#F1A6B4]" />
                <h2 className="text-2xl font-bold">Saved Tools</h2>
              </div>
              <ul className="space-y-3">
                {savedTools.map((tool, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm font-medium p-3 hover:bg-[#FFE4D7]/30 rounded-xl transition-colors cursor-pointer">
                    <span className="w-2 h-2 bg-[#F1A6B4] rounded-full"></span>
                    {tool}
                  </li>
                ))}
              </ul>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
