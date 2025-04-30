import React, { useState } from "react";
import { motion } from "framer-motion";

const challengesData = [
  {
    id: 1,
    title: "7-Day Gratitude Challenge",
    description: "Write 3 things you're grateful for every day.",
    duration: "7 days",
    badge: "🌟 Gratitude Star",
  },
  {
    id: 2,
    title: "30-Day No-Screen Nights",
    description: "Stay away from screens 1 hour before bedtime.",
    duration: "30 days",
    badge: "🌙 Night Owl",
  },
  {
    id: 3,
    title: "7-Day Mindfulness Practice",
    description: "Meditate for 10 minutes daily.",
    duration: "7 days",
    badge: "🧘 Mindfulness Master",
  },
];

export default function Challenges() {
  const [progress, setProgress] = useState({});
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleCompleteDay = (id) => {
    setProgress((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, challengesData.find((c) => c.id === id).duration.includes("30") ? 30 : 7),
    }));
  };

  return (
    <div className="px-6 py-10 pt-32 bg-[#FFE4D7]">
      <h1 className="text-3xl font-bold text-black mb-8 text-center">Gamified Wellness Challenges</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {challengesData.map((challenge) => (
          <motion.div
            key={challenge.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-6 rounded-2xl shadow border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">{challenge.title}</h2>
              <p className="mt-2 text-gray-600">{challenge.description}</p>
              <p className="mt-2 text-sm text-gray-500">Duration: {challenge.duration}</p>
            </div>

            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-[#F1A6B4] h-3 rounded-full"
                  style={{
                    width: `${
                      challenge.duration.includes("30")
                        ? ((progress[challenge.id] || 0) / 30) * 100
                        : ((progress[challenge.id] || 0) / 7) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {progress[challenge.id] || 0} / {challenge.duration.includes("30") ? "30" : "7"} days
              </p>

              <button
                onClick={() => handleCompleteDay(challenge.id)}
                className="w-full mt-2 bg-[#F1A6B4] hover:bg-primary text-black text-sm font-semibold px-4 py-2 rounded-full transition-all"
              >
                Mark Today's Progress
              </button>

              {progress[challenge.id] &&
                ((challenge.duration.includes("7") && progress[challenge.id] >= 7) ||
                  (challenge.duration.includes("30") && progress[challenge.id] >= 30)) && (
                  <div className="mt-3 text-green-600 font-semibold flex items-center gap-2">
                    🎉 Badge Earned: {challenge.badge}
                  </div>
                )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leaderboard Toggle */}
      <div className="mt-12 text-center">
        <button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="bg-[#F1A6B4] text-black px-6 py-2 rounded-full font-semibold hover:bg-primary transition-all"
        >
          {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
        </button>

        {showLeaderboard && (
          <div className="max-w-xl mx-auto mt-6 bg-white p-6 rounded-xl shadow-md border">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🏆 Leaderboard</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li>1. Arzoo - 14 Days Completed</li>
              <li>2. Shaivya - 10 Days Completed</li>
              <li>3. Shubham - 8 Days Completed</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
