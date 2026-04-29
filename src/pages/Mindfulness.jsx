import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayIcon, PauseIcon, MusicalNoteIcon, SparklesIcon } from "@heroicons/react/24/solid";

const meditationAudios = [
  { title: "5-Minute Calm Meditation", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "5:00" },
  { title: "Deep Relaxation", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: "12:00" },
];

const natureSounds = [
  { title: "Forest Ambience", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: "∞" },
  { title: "Rain Sounds", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: "∞" },
];

const Mindfulness = () => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef(null);

  const handleToggle = (src) => {
    if (currentAudio === src) {
      audioRef.current.pause();
      setCurrentAudio(null);
    } else {
      audioRef.current.src = src;
      audioRef.current.play();
      setCurrentAudio(src);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE4D7] text-[#093832] py-20 px-6">
      <header className="max-w-4xl mx-auto text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Relax for a while
        </motion.h2>
        <p className="text-lg opacity-75">Take a deep breath and find your inner peace.</p>
      </header>

      {/* Audio Players */}
      <div className="grid lg:grid-cols-2 gap-10 mb-20 max-w-6xl mx-auto">
        {/* Meditation Tracks */}
        <section className="bg-white/50 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-white/40">
          <div className="flex items-center gap-3 mb-8">
            <SparklesIcon className="w-8 h-8 text-[#F1A6B4]" />
            <h3 className="text-2xl font-bold">Guided Meditations</h3>
          </div>
          <div className="space-y-4">
            {meditationAudios.map((audio, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col">
                  <span className="font-bold">{audio.title}</span>
                  <span className="text-xs opacity-50">{audio.duration} mins</span>
                </div>
                <button 
                  onClick={() => handleToggle(audio.src)} 
                  className={`p-3 rounded-full transition-all ${currentAudio === audio.src ? 'bg-[#093832] text-white' : 'bg-[#F1A6B4] text-[#093832] hover:scale-110'}`}
                >
                  {currentAudio === audio.src ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Nature Sounds */}
        <section className="bg-white/50 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-white/40">
          <div className="flex items-center gap-3 mb-8">
            <MusicalNoteIcon className="w-8 h-8 text-[#F1A6B4]" />
            <h3 className="text-2xl font-bold">Nature Ambience</h3>
          </div>
          <div className="space-y-4">
            {natureSounds.map((sound, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
                 <div className="flex flex-col">
                  <span className="font-bold">{sound.title}</span>
                  <span className="text-xs opacity-50">Continuous Loop</span>
                </div>
                <button 
                  onClick={() => handleToggle(sound.src)} 
                  className={`p-3 rounded-full transition-all ${currentAudio === sound.src ? 'bg-[#093832] text-white' : 'bg-[#F1A6B4] text-[#093832] hover:scale-110'}`}
                >
                  {currentAudio === sound.src ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <audio ref={audioRef} onEnded={() => setCurrentAudio(null)} />

      {/* Improved Breathing Animation */}
      <div className="flex flex-col items-center">
        <div className="bg-white/40 p-12 rounded-full backdrop-blur-lg border border-white/20 shadow-inner">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* The Outer Breathing Ring */}
            <motion.div 
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#F1A6B4] opacity-30 rounded-full"
            />
            {/* The Inner Static Circle */}
            <div className="z-10 w-40 h-40 bg-[#F1A6B4] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={currentAudio ? "relaxing" : "breathing"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#093832] font-bold text-center px-4"
                >
                  {currentAudio ? "Listening..." : "Inhale... Exhale..."}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <p className="mt-8 text-sm uppercase tracking-widest font-bold opacity-40">Breathing Synchronizer</p>
      </div>
    </div>
  );
};

export default Mindfulness;
