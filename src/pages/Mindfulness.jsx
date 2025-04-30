import React, { useState, useRef } from "react";

const meditationAudios = [
  { title: "5-Minute Calm Meditation", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Deep Relaxation", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
];

const natureSounds = [
  { title: "Forest Ambience", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Rain Sounds", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
];

const Mindfulness = () => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef(null);

  const handlePlay = (src) => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.play();
      setCurrentAudio(src);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setCurrentAudio(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE4D7] text-black p-6 md:p-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-black">
        Relax for a while
      </h2>

      {/* Audio Players */}
      <div className="grid md:grid-cols-2 gap-10 mb-10 max-w-4xl mx-auto">
        {/* Meditation Tracks */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-[#dcd6f7]">
          <h3 className="text-2xl font-semibold mb-4 text-[#F1A6B4]">Guided Meditations</h3>
          {meditationAudios.map((audio, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <span>{audio.title}</span>
              {currentAudio === audio.src ? (
                <button onClick={handlePause} className="px-4 py-2 bg-[#F1A6B4] text-black rounded-full text-sm">
                  Pause
                </button>
              ) : (
                <button onClick={() => handlePlay(audio.src)} className="px-4 py-2 bg-[#F1A6B4] text-black rounded-full text-sm">
                  Play
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Nature Sounds */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-[#dcd6f7]">
          <h3 className="text-2xl font-semibold mb-4 text-[#F1A6B4]">Nature Sounds / ASMR</h3>
          {natureSounds.map((sound, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <span>{sound.title}</span>
              {currentAudio === sound.src ? (
                <button onClick={handlePause} className="px-4 py-2 bg-[#F1A6B4] text-black rounded-full text-sm">
                  Pause
                </button>
              ) : (
                <button onClick={() => handlePlay(sound.src)} className="px-4 py-2 bg-[#F1A6B4] text-black rounded-full text-sm">
                  Play
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} />

      {/* Breathing Animation */}
      <div className="mt-10 flex flex-col items-center">
        <h3 className="text-2xl font-semibold mb-6 text-black">Breathe With Me</h3>
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-[#F1A6B4] opacity-60 rounded-full animate-breath "></div>
          </div>
          <p className=" text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-[#555]  ">
                Inhale... Exhale...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mindfulness;
