import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrophyIcon, StarIcon, FireIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";

const challengesData = [
  {
    id: 1,
    title: "7-Day Gratitude Challenge",
    description: "Write 3 things you're grateful for every day to shift your perspective.",
    duration: 7,
    badge: "🌟 Gratitude Star",
    icon: <StarIcon className="w-8 h-8 text-yellow-500" />,
  },
  {
    id: 2,
    title: "30-Day No-Screen Nights",
    description: "Stay away from screens 1 hour before bedtime for better sleep.",
    duration: 30,
    badge: "🌙 Night Owl",
    icon: <FireIcon className="w-8 h-8 text-orange-500" />,
  },
  {
    id: 3,
    title: "7-Day Mindfulness Practice",
    description: "Meditate for 10 minutes daily to ground your thoughts.",
    duration: 7,
    badge: "🧘 Mindfulness Master",
    icon: <CheckBadgeIcon className="w-8 h-8 text-blue-500" />,
  },
];

export default function Challenges() {
  const [progress, setProgress] = useState({});
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleCompleteDay = (id, maxDays) => {
    setProgress((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, maxDays),
    }));
    // PHP integration point: fetch('api/update_challenge.php', { method: 'POST', ... })
  };

  return (
    <div className="px-6 py-20 pt-32 bg-[#FFE4D7] min-h-screen text-[#093832]">
      <header className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Gamified Wellness</h1>
        <p className="text-lg opacity-75">Small daily steps lead to massive mental shifts.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {challengesData.map((challenge) => {
          const currentProgress = progress[challenge.id] || 0;
          const isCompleted = currentProgress >= challenge.duration;
          const percent = (currentProgress / challenge.duration) * 100;

          return (
            <motion.div
              key={challenge.id}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl flex flex-col justify-between border-b-8 border-[#F1A6B4] relative overflow-hidden"
            >
              {isCompleted && (
                <div className="absolute top-0 right-0 bg-[#F1A6B4] text-[#093832] px-4 py-1 rounded-bl-2xl font-bold text-xs">
                  COMPLETED
                </div>
              )}
              
              <div>
                <div className="mb-4">{challenge.icon}</div>
                <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
                <p className="text-sm opacity-70 leading-relaxed mb-6">{challenge.description}</p>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs font-bold mb-2 opacity-50 uppercase tracking-widest">
                  <span>Progress</span>
                  <span>{currentProgress} / {challenge.duration} Days</span>
                </div>
                <div className="w-full bg-[#FFE4D7] rounded-full h-4 mb-6 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    className="bg-[#F1A6B4] h-4 rounded-full"
                  />
                </div>

                <button
                  onClick={() => handleCompleteDay(challenge.id, challenge.duration)}
                  disabled={isCompleted}
                  className={`w-full py-4 rounded-2xl font-bold transition-all shadow-md ${
                    isCompleted 
                    ? "bg-[#093832] text-white cursor-default" 
                    : "bg-[#F1A6B4] text-[#093832] hover:bg-pink-400 active:scale-95"
                  }`}
                >
                  {isCompleted ? "Challenge Won!" : "Log Today's Step"}
                </button>

                {isCompleted && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200 text-center"
                  >
                    <span className="text-sm font-bold">🏆 {challenge.badge}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Leaderboard Section */}
      <div className="mt-20 text-center">
        <button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="group inline-flex items-center gap-2 bg-[#093832] text-white px-10 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transition-all"
        >
          <TrophyIcon className="w-6 h-6 text-yellow-400" />
          {showLeaderboard ? "Hide Rankings" : "View Community Leaderboard"}
        </button>

        <AnimatePresence>
          {showLeaderboard && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-2xl mx-auto mt-10 bg-white p-10 rounded-[3rem] shadow-2xl border-t-8 border-[#F1A6B4]"
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-2">
                <StarIcon className="w-6 h-6 text-[#F1A6B4]" />
                Top Sahayak Champions
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Arzoo", score: 14, rank: 1 },
                  { name: "Shaivya", score: 10, rank: 2 },
                  { name: "Shubham", score: 8, rank: 3 },
                ].map((user) => (
                  <div key={user.rank} className="flex justify-between items-center p-4 bg-[#FFE4D7]/30 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <span className="font-black text-[#F1A6B4]">#{user.rank}</span>
                      <span className="font-bold">{user.name}</span>
                    </div>
                    <span className="font-medium opacity-60">{user.score} Days Completed</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
