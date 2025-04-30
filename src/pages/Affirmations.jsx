import React, { useState, useEffect } from "react";

const allAffirmations = [
  {
    front: "You are enough 💖",
    back: "Believe in your worth. You deserve love and peace.",
    mood: "Self-Love",
  },
  {
    front: "Breathe deeply 🌬️",
    back: "Inhale calm, exhale stress. You’ve got this.",
    mood: "Anxiety",
  },
  {
    front: "This too shall pass ⏳",
    back: "Every feeling is temporary. You are resilient.",
    mood: "Healing",
  },
  {
    front: "You are not alone 🤝",
    back: "There is support around you. You’re never a burden.",
    mood: "Anxiety",
  },
  {
    front: "Your emotions are valid 🌈",
    back: "Feelings are meant to be felt. You’re human.",
    mood: "Self-Love",
  },
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
    // Random daily affirmation
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setDailyAffirmation(affirmations[randomIndex]);
  }, [affirmations]);

  const handleMoodFilter = (mood) => {
    setFilteredMood(mood);
  };

  const addCustomAffirmation = () => {
    if (customFront && customBack) {
      const newAffirmation = {
        front: customFront,
        back: customBack,
        mood: customMood,
      };
      setAffirmations([newAffirmation, ...affirmations]);
      setCustomFront("");
      setCustomBack("");
    }
  };

  const displayedAffirmations =
    filteredMood === "All"
      ? affirmations
      : affirmations.filter((a) => a.mood === filteredMood);

  return (
    <div className="bg-[#FFE4D7] min-h-screen p-10 text-black">
      <h1 className="text-4xl font-bold text-center mb-6 text-black">
        Daily Affirmations
      </h1>

      {/* Daily Random Affirmation */}
      {dailyAffirmation && (
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg p-6 mb-10 border-l-4 border-[#F1A6B4]">
          <h2 className="text-xl font-semibold text-[#F1A6B4] mb-2">
            💡Affirmation of the Day
          </h2>
          <p className="text-lg text-gray-700">{dailyAffirmation.front}</p>
          <p className="text-sm mt-2 text-gray-500 italic">
            {dailyAffirmation.back}
          </p>
        </div>
      )}

      {/* Mood Filter */}
      <div className="flex justify-center mb-8 gap-4 flex-wrap">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => handleMoodFilter(mood)}
            className={`px-4 py-2 rounded-full border font-medium ${
              filteredMood === mood
                ? "bg-[#F1A6B4] text-black"
                : "bg-white text-black border-[#F1A6B4]"
            } transition-all`}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Add Your Own Affirmation */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Add Your Own Affirmation
        </h2>
        <input
          type="text"
          placeholder="Affirmation front"
          className="w-full p-3 border rounded-md mb-3"
          value={customFront}
          onChange={(e) => setCustomFront(e.target.value)}
        />
        <textarea
          placeholder="Affirmation back"
          className="w-full p-3 border rounded-md mb-3"
          value={customBack}
          onChange={(e) => setCustomBack(e.target.value)}
        />
        <select
          className="w-full p-3 border rounded-md mb-3"
          value={customMood}
          onChange={(e) => setCustomMood(e.target.value)}
        >
          {moods.filter((m) => m !== "All").map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button
          onClick={addCustomAffirmation}
          className="bg-[#F1A6B4] hover:bg-pink-600 text-black px-6 py-2 rounded-full transition"
        >
          Add Affirmation
        </button>
      </div>

      {/* Flip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto  max-w-4xl ">
        {displayedAffirmations.map((item, index) => (
          <div
            key={index}
            className="bg-white h-48 perspective"
            style={{ animation: `fadeIn 0.4s ease ${index * 0.1}s both` }}
          >
            <div className="relative w-full h-full transition-transform duration-500 transform-style preserve-3d hover:rotate-y-180">
              <div className="absolute backface-hidden w-full h-full p-6 rounded-xl shadow-md bg-white flex items-center justify-center text-xl text-pink-600 font-bold">
                {item.front}
              </div>
              <div className="absolute w-full h-full p-6 rounded-xl shadow-md bg-[#F1A6B4] transform rotate-y-180 backface-hidden flex items-center justify-center text-gray-700">
                {item.back}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Affirmations;
