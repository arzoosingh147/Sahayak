import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const formatDate = (date) => new Date(date).toLocaleDateString();

export default function MoodCalendar({ moodHistory, setMoodHistory }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalEntry, setJournalEntry] = useState("");

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleDayClick = (date) => {
    setSelectedDate(date);
    const existingEntry = moodHistory.find((entry) => entry.date === date);
    setSelectedMood(existingEntry ? existingEntry.emoji : null);
    setJournalEntry(existingEntry ? existingEntry.journal : "");
    setShowModal(true);
  };

  const handleSaveMood = () => {
    // When PHP is ready, this will be an API call
    const entry = { 
      date: selectedDate, 
      emoji: selectedMood, 
      mood: selectedMood === "😊" ? "Happy" : selectedMood === "😐" ? "Neutral" : selectedMood === "😢" ? "Sad" : selectedMood === "😡" ? "Angry" : "Anxious",
      journal: journalEntry 
    };
    
    const updatedHistory = [
      ...moodHistory.filter((entry) => entry.date !== selectedDate),
      entry,
    ];
    setMoodHistory(updatedHistory);
    localStorage.setItem("sahayak-mood-log", JSON.stringify(updatedHistory));
    setShowModal(false);
  };

  const daysInMonth = [];
  for (let i = 1; i <= numDaysInMonth; i++) {
    const dateStr = `${currentYear}-${currentMonth + 1}-${i}`;
    const formatted = formatDate(dateStr);
    const moodEntry = moodHistory.find((entry) => entry.date === formatted);
    daysInMonth.push({ 
      date: formatted, 
      dayNum: i,
      mood: moodEntry ? moodEntry.emoji : null, 
      journal: moodEntry ? moodEntry.journal : "" 
    });
  }

  return (
    <div className="bg-white shadow-2xl rounded-[2.5rem] p-8 my-10 max-w-4xl mx-auto border-t-8 border-[#F1A6B4]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-[#093832]">
          {now.toLocaleString('default', { month: 'long' })} {currentYear}
        </h3>
        <div className="flex gap-2 items-center text-xs font-bold uppercase opacity-40">
          <span className="w-3 h-3 bg-[#F1A6B4] rounded-full"></span> Logged Days
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-black text-[10px] uppercase tracking-widest text-[#093832]/40 pb-2">
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square"></div>
        ))}

        {daysInMonth.map((day) => (
          <motion.div
            key={day.date}
            whileHover={{ y: -3 }}
            onClick={() => handleDayClick(day.date)}
            className={`relative aspect-square flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all border-2 
              ${day.mood ? "bg-[#FFE4D7] border-[#F1A6B4]" : "bg-gray-50 border-transparent hover:border-gray-200"}`}
          >
            <span className="text-sm font-bold absolute top-2 left-2 opacity-30">{day.dayNum}</span>
            <span className="text-2xl">{day.mood || ""}</span>
            {day.journal && <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#093832] rounded-full"></div>}
          </motion.div>
        ))}
      </div>

      {/* Modern Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#093832]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border-t-8 border-[#F1A6B4]"
            >
              <h3 className="text-2xl font-bold text-[#093832] mb-2">Memory for {selectedDate}</h3>
              <p className="text-sm opacity-60 mb-6 font-medium">How was your headspace this day?</p>
              
              <div className="flex justify-between mb-8 bg-[#FFE4D7]/30 p-4 rounded-2xl">
                {["😊", "😐", "😢", "😡", "😰"].map((emoji) => (
                  <button
                    key={emoji}
                    className={`text-4xl transition-transform hover:scale-125 ${selectedMood === emoji ? "drop-shadow-lg scale-125" : "grayscale opacity-40 hover:grayscale-0"}`}
                    onClick={() => setSelectedMood(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <textarea
                className="w-full h-32 p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#F1A6B4] mb-6 transition-all"
                placeholder="Write your thoughts..."
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
              />

              <div className="flex gap-4">
                <button 
                  className="flex-grow py-3 font-bold text-[#093832]/50 hover:text-[#093832]" 
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="flex-grow py-3 bg-[#F1A6B4] text-[#093832] font-bold rounded-xl shadow-md hover:bg-pink-400 transition-all" 
                  onClick={handleSaveMood}
                >
                  Save Entry
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
