import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const allAffirmations = [
  { front: "You are enough 💖", back: "Believe in your worth. You deserve love and peace.", mood: "Self-Love" },
  { front: "Breathe deeply 🌬️", back: "Inhale calm, exhale stress. You’ve got this.", mood: "Anxiety" },
  { front: "This too shall pass ⏳", back: "Every feeling is temporary. You are resilient.", mood: "Healing" },
  { front: "You are not alone 🤝", back: "There is support around you. You’re never a burden.", mood: "Anxiety" },
  { front: "Your emotions are valid 🌈", back: "Feelings are meant to be felt. You’re human.", mood: "Self-Love" },
];

const moods = ["All", "Self-Love", "Anxiety", "Healing"];

const Affirmations = () => {
  const [affirmations, setAffirmations] = useState(allAffirmations);
  const [filteredMood, setFilteredMood] = useState("All");
  const [customFront, setCustomFront] = useState("");
  const [customBack, setCustomBack] = useState("");
  const [customMood, setCustomMood] = useState("Self-Love");
  const [dailyAffirmation, setDailyAffirmation] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setDailyAffirmation(affirmations[randomIndex]);
  }, [affirmations]);

  const addCustomAffirmation = () => {
    if (customFront && customBack) {
      const newAffirmation = { front: customFront, back: customBack, mood: customMood };
      setAffirmations([newAffirmation, ...affirmations]);
      setCustomFront(""); setCustomBack("");
    }
  };

  const displayedAffirmations = filteredMood === "All" 
    ? affirmations 
    : affirmations.filter((a) => a.mood === filteredMood);

  return (
    <div className="bg-[#FFE4D7] min-h-screen py-20 px-6 text-[#093832]">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Daily Affirmations</h1>
        <p className="text-lg opacity-80 italic">Positive thoughts to brighten your path.</p>
      </header>

      {/* Daily Highlight Card */}
      {dailyAffirmation && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl p-8 mb-16 border-t-8 border-[#F1A6B4] text-center"
        >
          <span className="bg-[#F1A6B4] text-[#093832] text-xs font-bold px-4 py-1 rounded-full uppercase mb-4 inline-block">
            Insight of the Moment
          </span>
          <h2 className="text-3xl font-bold mb-3">{dailyAffirmation.front}</h2>
          <p className="text-lg opacity-70 italic">"{dailyAffirmation.back}"</p>
        </motion.div>
      )}

      {/* Modern Filter Tabs */}
      <div className="flex justify-center mb-12 gap-3 flex-wrap">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => setFilteredMood(mood)}
            className={`px-6 py-2 rounded-full font-bold transition-all duration-300 shadow-sm ${
              filteredMood === mood
                ? "bg-[#093832] text-white scale-105"
                : "bg-white text-[#093832] border-2 border-[#F1A6B4] hover:bg-[#F1A6B4]"
            }`}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Add Custom Affirmation Form */}
      <section className="max-w-2xl mx-auto bg-white p-10 rounded-[2rem] shadow-xl mb-20 border-b-8 border-[#F1A6B4]">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>✍️</span> Create Your Own
        </h2>
        <div className="space-y-4">
          <input
            type="text" placeholder="Short phrase (e.g., I am brave)"
            className="w-full p-4 bg-[#FFE4D7]/30 border-none rounded-2xl outline-none focus:ring-2 ring-[#F1A6B4]"
            value={customFront} onChange={(e) => setCustomFront(e.target.value)}
          />
          <textarea
            placeholder="A deeper thought or explanation..."
            className="w-full p-4 bg-[#FFE4D7]/30 border-none rounded-2xl outline-none focus:ring-2 ring-[#F1A6B4] h-24"
            value={customBack} onChange={(e) => setCustomBack(e.target.value)}
          />
          <div className="flex gap-4 items-center">
            <select
              className="p-4 bg-white border-2 border-[#F1A6B4] rounded-2xl font-semibold outline-none flex-grow"
              value={customMood} onChange={(e) => setCustomMood(e.target.value)}
            >
              {moods.filter(m => m !== "All").map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <button
              onClick={addCustomAffirmation}
              className="bg-[#F1A6B4] hover:bg-pink-400 text-[#093832] font-bold px-8 py-4 rounded-2xl transition-all shadow-md active:scale-95"
            >
              Add Card
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Flip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <AnimatePresence>
          {displayedAffirmations.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={index}
              className="group h-64 [perspective:1000px]"
            >
              <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-[2rem] shadow-lg flex flex-col items-center justify-center p-6 text-center border-2 border-white group-hover:border-[#F1A6B4]">
                   <span className="text-4xl mb-4">✨</span>
                   <h3 className="text-xl font-bold">{item.front}</h3>
                   <p className="text-xs uppercase tracking-widest mt-4 opacity-40 font-bold">Hover to flip</p>
                </div>
                {/* Back */}
                <div className="absolute inset-0 h-full w-full rounded-[2rem] bg-[#F1A6B4] px-8 text-center text-[#093832] [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center font-medium leading-relaxed">
                  {item.back}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Affirmations;
