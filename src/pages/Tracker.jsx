import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getThisWeeksMoodStats, getMoodStreak } from "../utils/moodUtils";
import MoodCalendar from "../components/MoodCalendar";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-yellow-100" },
  { emoji: "😐", label: "Neutral", color: "bg-gray-200" },
  { emoji: "😢", label: "Sad", color: "bg-blue-100" },
  { emoji: "😡", label: "Angry", color: "bg-red-100" },
  { emoji: "😰", label: "Anxious", color: "bg-purple-100" },
];

export default function Tracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [journal, setJournal] = useState(""); 
  const [showPrompt, setShowPrompt] = useState(true); 
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

    const updated = [
      ...moodHistory.filter((entry) => entry.date !== today),
      newEntry,
    ];

    setSelectedMood(mood);
    setMoodHistory(updated);
    setJournal(""); 
    localStorage.setItem("sahayak-mood-log", JSON.stringify(updated));
  };

  const handleJournalChange = (e) => {
    setJournal(e.target.value);
  };

  const streak = getMoodStreak(moodHistory);
  const weeklyStats = getThisWeeksMoodStats(moodHistory);
  const moodLabels = ["Happy", "Neutral", "Sad", "Angry", "Anxious"];
  const moodCounts = moodLabels.map((label) =>
    moodHistory.filter((entry) => entry.mood === label).length
  );

  const chartData = {
    labels: moodLabels,
    datasets: [
      {
        label: "Mood Distribution",
        data: moodCounts,
        borderColor: "#F1A6B4",
        backgroundColor: "rgba(177, 84, 123, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="pt-28 pb-16 px-6 min-h-screen bg-[#FFE4D7] text-center">
      <h1 className="text-4xl font-bold text-black mb-6">How are you feeling today?</h1>

      {/* Mood buttons */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {moods.map((mood) => (
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleMoodClick(mood)}
            key={mood.label}
            className={`rounded-full p-6 w-28 h-28 text-3xl shadow-md transition-all ${mood.color}`}
          >
            {mood.emoji}
          </motion.button>
        ))}
      </div>

      {/* Journal prompt */}
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-white rounded-2xl max-w-md mx-auto py-6 px-8 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-700">Write about your day:</h2>
          <textarea
            value={journal}
            onChange={handleJournalChange}
            rows="4"
            className="mt-2 w-full p-2 border border-gray-300 rounded-lg"
            placeholder="How are you feeling today? Any thoughts you'd like to share?"
          />
        </motion.div>
      )}

      {/* Selected Mood Confirmation */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-white rounded-2xl max-w-md mx-auto py-6 px-8 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-700">
            You’re feeling <span className="text-[#F1A6B4]">{selectedMood.label}</span> today.
          </h2>
          <p className="mt-2 text-sm text-gray-500">Mood saved!</p>
        </motion.div>
      )}

      {/* Mood History */}
      {moodHistory.length > 0 && (
        <>
          <div className="mt-10 max-w-xl mx-auto bg-white rounded-xl shadow-md px-6 py-4 text-left">
            <h3 className="text-lg font-semibold text-black mb-2">Mood History </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {moodHistory
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((entry, idx) => (
                  <li
                    key={idx}
                    onMouseEnter={() => setHoveredDayJournal(entry.journal)} 
                    onMouseLeave={() => setHoveredDayJournal(null)} 
                  >
                    {entry.date} — <span className="text-lg">{entry.emoji}</span>{" "}
                    {entry.mood}
                    {hoveredDayJournal && (
                      <div className="mt-2 text-sm text-gray-500">{hoveredDayJournal}</div>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          {/* Mood Report Card */}
          <div className="mt-6 max-w-xl mx-auto bg-white rounded-xl shadow-md px-6 py-4 text-left">
            <h3 className="text-lg font-semibold text-black mb-2">Mood Report Card </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {Object.entries(weeklyStats).map(([mood, count]) => (
                <li key={mood}>
                  {mood} — {count} time{count > 1 ? "s" : ""}
                </li>
              ))}
            </ul>
          </div>

          {/* Current Mood Streak */}
          <div className="mt-6 max-w-xl mx-auto bg-white rounded-xl shadow-md px-6 py-4 text-left">
            <h3 className="text-lg font-semibold text-black mb-2">Current Mood Streak 🔥</h3>
            <p className="text-sm text-gray-700">
              {streak} day{streak !== 1 ? "s" : ""} in a row!
            </p>
          </div>

          {/* Mood Graph */}
          <div className="mt-8 max-w-3xl mx-auto">
            <Line data={chartData} />
          </div>

          {/* Calendar View */}
          <div className="mt-8 max-w-3xl mx-auto">
            <MoodCalendar moodHistory={moodHistory} />
          </div>
        </>
      )}
    </div>
  );
}
