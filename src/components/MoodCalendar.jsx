import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const formatDate = (date) => new Date(date).toLocaleDateString();

export default function MoodCalendar({ moodHistory, setMoodHistory }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalEntry, setJournalEntry] = useState(""); 
  const [hoveredDayJournal, setHoveredDayJournal] = useState(null); 


  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); 


  const firstDay = new Date(currentYear, currentMonth, 1);
  const firstDayIndex = firstDay.getDay();


  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const numDaysInMonth = lastDay.getDate();

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
    const existingMood = moodHistory.find((entry) => entry.date === date);
    setSelectedMood(existingMood ? existingMood.mood : null);
    setJournalEntry(existingMood ? existingMood.journal : ""); 
  };

  const handleSaveMood = () => {
    const today = { date: selectedDate, mood: selectedMood, journal: journalEntry };
    const updatedHistory = [
      ...moodHistory.filter((entry) => entry.date !== selectedDate),
      today,
    ];
    setMoodHistory(updatedHistory);
    localStorage.setItem("sahayak-mood-log", JSON.stringify(updatedHistory));
    setShowModal(false);
  };

  // Mood map for display
  const moodMap = {
    "😊": "Happy",
    "😐": "Neutral",
    "😢": "Sad",
    "😡": "Angry",
    "😰": "Anxious",
  };

  const daysInMonth = [];
  for (let i = 1; i <= numDaysInMonth; i++) {
    const date = `${currentYear}-${currentMonth + 1}-${i}`;
    const moodEntry = moodHistory.find((entry) => entry.date === formatDate(date));
    daysInMonth.push({ date: formatDate(date), mood: moodEntry ? moodEntry.emoji : null, journal: moodEntry ? moodEntry.journal : "" });
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 my-10 max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold text-black mb-4">Your Mood Calendar</h3>
      <div className="grid grid-cols-7 gap-2">
        {/* Render Days of the Week */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-semibold text-sm text-gray-600">{day}</div>
        ))}

        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="text-center text-gray-400">{""}</div>
        ))}

        {daysInMonth.map(({ date, mood, journal }) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={date}
            className={`p-4 text-center rounded-lg cursor-pointer ${mood ? "bg-yellow-100" : "bg-gray-100"}`}
            onClick={() => handleDayClick(date)}
            onMouseEnter={() => setHoveredDayJournal(journal)} 
            onMouseLeave={() => setHoveredDayJournal(null)} 
          >
            <span className="text-xl">{mood || "❓"}</span>
            <p className="text-xs text-gray-600">{date.split("-")[2]}</p>

            {hoveredDayJournal && (
              <div className="absolute bottom-0 left-0 right-0 bg-white p-2 text-sm text-gray-700 rounded-lg shadow-md">
                {hoveredDayJournal}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-semibold text-primary mb-4">How did you feel on {selectedDate}?</h3>
            <div className="flex gap-4">
              {["😊", "😐", "😢", "😡", "😰"].map((emoji) => (
                <button
                  key={emoji}
                  className={`text-3xl ${selectedMood === emoji ? "text-primary" : "text-gray-500"}`}
                  onClick={() => setSelectedMood(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <textarea
              className="mt-4 p-2 w-full h-24 border border-gray-300 rounded-lg"
              placeholder="Write your thoughts here..."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
            />

            <div className="mt-6 flex justify-end gap-4">
              <button className="text-gray-500" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="text-primary" onClick={handleSaveMood}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
