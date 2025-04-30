// src/pages/Emergency.jsx

import React, { useState } from "react";
import breathingGif from "../assets/breathing.gif"; // Add a calm breathing GIF to your assets

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
      { name: "National Suicide Prevention Lifeline", phone: "988" },
      { name: "SAMHSA", phone: "1-800-662-HELP (4357)" },
    ],
  },
];

const Emergency = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-auto bg-[#FFE4D7] text-[#444] pt-28 pb-16 px-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-black">
        Emergency Support
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Panic Button */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-[#f8dcdc] flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-semibold mb-4 text-black">
            Feeling overwhelmed?
          </h3>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-[#F92F60] text-white rounded-full font-semibold hover:bg-[#e44e4e] transition"
          >
            🆘 Panic Button
          </button>
        </div>

        {/* Helpline Cards */}
        {helplines.map((region, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 border border-[#f0eaea]"
          >
            <h3 className="text-xl font-semibold text-[#333] mb-4">
              {region.country}
            </h3>
            <ul className="space-y-2">
              {region.numbers.map((line, idx) => (
                <li key={idx} className="text-md text-[#555]">
                  <strong>{line.name}</strong>:{" "}
                  <a href={`tel:${line.phone}`} className="text-[#F1A6B4]">
                    {line.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-[#999] hover:text-[#333] text-2xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-[#F1A6B4]">
              Breathe with me 🌬️
            </h3>
            <img
              src={breathingGif}
              alt="Breathing exercise"
              className="w-full rounded-lg mb-4"
            />
            <p className="text-[#555] mb-2">Try the 5-4-3-2-1 grounding technique:</p>
            <ul className="text-sm text-[#666] space-y-1">
              <li>🔵 5 things you can see</li>
              <li>🟢 4 things you can touch</li>
              <li>🔴 3 things you can hear</li>
              <li>🟣 2 things you can smell</li>
              <li>🟡 1 thing you can taste</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;
