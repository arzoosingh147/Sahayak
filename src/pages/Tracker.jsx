import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getThisWeeksMoodStats, getMoodStreak } from "../utils/moodUtils";
import MoodCalendar from "../components/MoodCalendar";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-[#FFF4E0]", textColor: "text-yellow-700" },
  { emoji: "😐", label: "Neutral", color: "bg-gray-100", textColor: "text-gray-600" },
  { emoji: "😢", label: "Sad", color: "bg-blue-50", textColor: "text-blue-700" },
  { emoji: "😡", label: "Angry", color: "bg-red-50", textColor: "text-red-700" },
  { emoji: "😰", label: "Anxious", color: "bg-purple-50", textColor: "text-purple-700" },
];

export default function Tracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [journal, setJournal] = useState("");
  const [hoveredDayJournal, setHoveredDayJournal] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sahayak-mood-log")) || [];
    setMoodHistory(stored);
  }, []);

  const handleMoodClick = (mood) => {
    const today = new Date().toLocaleDateString();
    const newEntry = {
      date: today,
      mood: mood.label,
      emoji: mood.emoji,
      journal: journal,
    };

    const updated = [...moodHistory.filter((entry) => entry.date !== today), newEntry];
    setSelectedMood(mood);
    setMoodHistory(updated);
    localStorage.setItem("sahayak-mood-log", JSON.stringify(updated));
    // When PHP is ready, we'll add: fetch('api/save_mood.php', { method: 'POST', body: ... })
  };

  const streak = getMoodStreak(moodHistory);
  const weeklyStats = getThisWeeksMoodStats(moodHistory);
  
  const chartData = {
    labels: ["Happy", "Neutral", "Sad", "Angry", "Anxious"],
    datasets: [{
      label: "Mood Distribution",
      data: ["Happy", "Neutral", "Sad", "Angry", "Anxious"].map(label => 
        moodHistory.filter(e => e.mood === label).length
      ),
      borderColor: "#F1A6B4",
      backgroundColor: "rgba(241, 166, 180, 0.2)",
      tension: 0.4,
      fill: true,
    }],
  };

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen bg-[#FFE4D7] text-[#093832]">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">How are you feeling today?</h1>
        <p className="text-lg opacity-75">Your daily check-in helps you see patterns over time.</p>
      </header>

      {/* Journal & Mood Entry Section */}
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-start mb-20">
        
        {/* Left: Input Section */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border-b-8 border-[#F1A6B4]">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>✍️</span> Reflect on your day
            </h2>
            <textarea
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              placeholder="What's on your mind? (Writing helps reduce stress)"
              className="w-full p-4 bg-[#FFE4D7]/30 border-none rounded-2xl outline-none focus:ring-2 ring-[#F1A6B4] h-32 transition-all"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {moods.map((m) => (
              <motion.button
                key={m.label}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleMoodClick(m)}
                className={`${m.color} ${m.textColor} w-20 h-20 md:w-24 md:h-24 rounded-3xl shadow-md flex flex-col items-center justify-center border-2 border-transparent hover:border-[#F1A6B4] transition-all`}
              >
                <span className="text-3xl mb-1">{m.emoji}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">{m.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right: Insights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#093832] text-white p-6 rounded-[2rem] shadow-lg flex flex-col justify-center items-center text-center">
            <span className="text-4xl mb-2">🔥</span>
            <h3 className="text-2xl font-bold">{streak} Days</h3>
            <p className="text-sm opacity-70">Current Streak</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-lg border-2 border-[#F1A6B4] flex flex-col justify-center items-center text-center">
            <span className="text-4xl mb-2">📊</span>
            <h3 className="text-2xl font-bold text-[#093832]">{moodHistory.length}</h3>
            <p className="text-sm opacity-70">Total Logs</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-lg sm:col-span-2 overflow-hidden">
             <h3 className="font-bold mb-4">Mood Trends</h3>
             <Line data={chartData} options={{ plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>

      {/* History & Calendar */}
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl">
          <h3 className="text-2xl font-bold mb-6 border-b-2 border-[#FFE4D7] pb-2">Mood Calendar</h3>
          <MoodCalendar moodHistory={moodHistory} />
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-xl text-left">
          <h3 className="text-2xl font-bold mb-6">Recent Journal Entries</h3>
          <div className="space-y-4">
            {moodHistory.slice(0, 5).map((entry, idx) => (
              <div key={idx} className="p-4 bg-[#FFE4D7]/20 rounded-2xl border-l-4 border-[#F1A6B4]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">{entry.date} — {entry.emoji} {entry.mood}</span>
                </div>
                <p className="text-sm text-[#093832]/80 italic">
                  {entry.journal || "No journal entry for this day."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
