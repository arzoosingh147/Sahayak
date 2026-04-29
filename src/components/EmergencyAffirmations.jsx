import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIcon, ChatBubbleLeftEllipsisIcon, BeakerIcon, SparklesIcon } from '@heroicons/react/24/solid';

const affirmations = [
  "You are enough just as you are.",
  "You have the strength to get through this.",
  "This feeling is temporary, you are stronger than you think.",
  "It's okay to take things one step at a time.",
  "You are worthy of love and happiness.",
  "Every day is a new beginning.",
  "You are in control of your thoughts and feelings."
];

export default function EmergencyAffirmations() {
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);

  const getNewAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(affirmations[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-[#FFE4D7] pt-32 pb-20 px-6 text-[#093832]">
      <header className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-block p-4 bg-[#F92F60] rounded-full mb-6 animate-pulse shadow-lg shadow-red-200">
           <PhoneIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Emergency Support</h1>
        <p className="text-lg opacity-80 font-medium">You are not alone. Help is just a moment away.</p>
      </header>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
        
        {/* Immediate Resources Card */}
        <section className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-t-8 border-[#F92F60]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Crisis Helplines
            </h2>
            <div className="space-y-4">
              <a href="tel:988" className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl border-2 border-transparent hover:border-[#F92F60] transition-all">
                <div className="p-3 bg-[#F92F60] rounded-xl text-white"><PhoneIcon className="w-5 h-5" /></div>
                <div>
                  <p className="font-bold text-sm uppercase opacity-50">National Lifeline</p>
                  <p className="text-xl font-black">Call Emergency Services</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="p-3 bg-[#093832] rounded-xl text-white"><ChatBubbleLeftEllipsisIcon className="w-5 h-5" /></div>
                <div>
                  <p className="font-bold text-sm uppercase opacity-50">Crisis Text Line</p>
                  <p className="text-lg font-bold">Text HOME to 741741</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-b-8 border-[#093832]">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#093832]">
              Quick Grounding
            </h2>
            <ul className="space-y-4">
              {[
                { icon: "🌬️", text: "Focus on your breathing — 4 seconds in, 4 seconds out." },
                { icon: "✋", text: "5-4-3-2-1: Name 5 things you see, 4 you feel, 3 you hear." },
                { icon: "🤝", text: "Reach out to a trusted friend or family member." }
              ].map((tip, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="text-2xl">{tip.icon}</span>
                  <p className="font-medium opacity-80 leading-relaxed">{tip.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Affirmations Section */}
        <section className="flex flex-col">
          <div className="bg-[#093832] p-10 rounded-[3rem] shadow-2xl flex-grow flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <SparklesIcon className="w-full h-full scale-150" />
            </div>
            
            <h2 className="text-[#F1A6B4] text-sm font-black uppercase tracking-[0.2em] mb-8">
              Healing Affirmation
            </h2>

            <AnimatePresence mode="wait">
              <motion.p
                key={currentAffirmation}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl md:text-3xl font-bold text-white leading-tight mb-10 px-4"
              >
                "{currentAffirmation}"
              </motion.p>
            </AnimatePresence>

            <button
              onClick={getNewAffirmation}
              className="bg-[#F1A6B4] text-[#093832] px-8 py-4 rounded-full font-black shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              I need a different boost
            </button>
          </div>

          <div className="mt-6 p-6 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-white/50">
             <p className="text-sm font-bold text-center opacity-60 italic">
               Remember: You have survived 100% of your hardest days so far.
             </p>
          </div>
        </section>
      </div>
    </div>
  );
}
