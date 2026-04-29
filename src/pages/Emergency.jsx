import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import breathingGif from "../assets/breathing.gif"; 

const helplines = [
  {
    country: "India",
    numbers: [
      { name: "iCall", phone: "9152987821" },
      { name: "AASRA", phone: "91-9820466726" },
    ],
  },
  {
    country: "USA",
    numbers: [
      { name: "Crisis Lifeline", phone: "988" },
      { name: "SAMHSA", phone: "1-800-662-4357" },
    ],
  },
];

const Emergency = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFE4D7] text-[#093832] pt-32 pb-20 px-6">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Emergency Support</h2>
        <p className="text-lg opacity-75 leading-relaxed">
          If you are in immediate danger or need someone to talk to, please use the resources below.
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Panic Button Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-[2.5rem] shadow-xl p-8 border-b-8 border-[#F92F60] flex flex-col items-center justify-center text-center lg:col-span-1"
        >
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl animate-pulse">🆘</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Feeling overwhelmed?</h3>
          <p className="text-sm opacity-70 mb-8">Take a moment to ground yourself with a guided exercise.</p>
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-4 bg-[#F92F60] text-white rounded-2xl font-bold shadow-lg hover:bg-[#e44e4e] transition-all"
          >
            Start Grounding
          </button>
        </motion.div>

        {/* Helpline Cards */}
        {helplines.map((region, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2.5rem] shadow-xl p-8 border-t-8 border-[#F1A6B4]"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-lg">📍</span> {region.country}
            </h3>
            <div className="space-y-4">
              {region.numbers.map((line, idx) => (
                <a 
                  key={idx} 
                  href={`tel:${line.phone}`}
                  className="block p-4 bg-[#FFE4D7]/30 rounded-2xl border-2 border-transparent hover:border-[#F1A6B4] transition-all group"
                >
                  <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-1 group-hover:opacity-100 transition-opacity">
                    {line.name}
                  </p>
                  <p className="text-xl font-black text-[#093832]">{line.phone}</p>
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grounding Modal */}
<AnimatePresence>
  {showModal && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#093832]/60 backdrop-blur-md flex justify-center items-center p-4 md:p-10"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md border-t-8 border-[#F1A6B4] flex flex-col max-h-[90vh] relative"
      >
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-5 text-[#093832]/40 hover:text-[#093832] text-3xl font-bold z-10"
        >
          &times;
        </button>
        
        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <h3 className="text-2xl font-bold mb-4 text-center">Breathe with Sahayak 🌬️</h3>
          
          <div className="bg-[#FFE4D7]/50 p-3 rounded-[1.5rem] mb-6">
            <img
              src={breathingGif}
              alt="Breathing exercise"
              className="w-full max-h-40 object-contain rounded-[1rem] mix-blend-multiply"
            />
          </div>

          <div className="text-left space-y-3">
            <p className="font-bold text-center mb-2 uppercase tracking-widest text-[10px] opacity-50">
              Grounding Technique (5-4-3-2-1)
            </p>
            <div className="grid grid-cols-1 gap-2">
               {[
                 { c: "🔵", t: "5 things you can SEE" },
                 { c: "🟢", t: "4 things you can TOUCH" },
                 { c: "🔴", t: "3 things you can HEAR" },
                 { c: "🟣", t: "2 things you can SMELL" },
                 { c: "🟡", t: "1 thing you can TASTE" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl font-bold text-xs border border-gray-100">
                   <span className="text-base">{item.c}</span> {item.t}
                 </div>
               ))}
            </div>
          </div>

          <button 
            onClick={() => setShowModal(false)}
            className="mt-6 w-full py-3.5 bg-[#093832] text-white rounded-xl font-bold shadow-lg shadow-teal-900/20 active:scale-95 transition-all"
          >
            I Feel Better Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default Emergency;
