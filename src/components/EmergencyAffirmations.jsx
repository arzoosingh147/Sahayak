import React, { useState } from 'react';

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

  // Function to generate a new affirmation
  const getNewAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(affirmations[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-[#f2f6f9] pt-28 pb-16 px-8 text-center">
      {/* Emergency Section Card */}
      <section className="emergency-section mb-8 bg-white p-8 rounded-lg shadow-xl max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#5b7fff] mb-6">Emergency Help 🚨</h2>
        <p className="text-lg text-gray-700 mb-6">
          If you're feeling overwhelmed, there are resources available for immediate support:
        </p>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-[#5b7fff] mb-4">Emergency Contacts</h3>
          <ul className="text-lg text-gray-600 list-disc pl-5">
            <li>📞 National Suicide Prevention Lifeline: 1-800-273-TALK (1-800-273-8255)</li>
            <li>📞 Crisis Text Line: Text HOME to 741741</li>
            <li>📞 Local Mental Health Support: [Add Local Support Number]</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-[#5b7fff] mb-4">Crisis Management Tips</h3>
          <ul className="text-lg text-gray-600 list-disc pl-5">
            <li>💡 Focus on your breathing — Try deep breathing exercises.</li>
            <li>💡 Ground yourself — Focus on the present moment, name 5 things you can see, hear, or feel.</li>
            <li>💡 Reach out to a trusted person — Don't be afraid to ask for help when you need it.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-[#5b7fff] mb-4">Calming Activities</h3>
          <ul className="text-lg text-gray-600 list-disc pl-5">
            <li>🧘‍♀️ Practice mindfulness or meditation.</li>
            <li>🎵 Listen to calming music or sounds.</li>
            <li>🌿 Try a quick walk outside or focus on something peaceful in your environment.</li>
          </ul>
        </div>
      </section>

      {/* Affirmations Section Card */}
      <section className="affirmations-section bg-white p-8 rounded-lg shadow-xl max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#5b7fff] mb-6">Simple Affirmations 🌈</h2>
        <p className="text-lg text-gray-700 mb-6">Whenever you need a little boost, here’s a positive affirmation for you:</p>

        <div className="bg-[#d9f7ff] p-6 rounded-xl shadow-lg mb-6">
          <p className="text-2xl text-[#4a90e2] font-semibold">{currentAffirmation}</p>
        </div>

        <button
          onClick={getNewAffirmation}
          className="bg-[#5b7fff] text-white px-6 py-3 rounded-lg text-lg shadow-xl hover:bg-[#4a67d7] transition-all duration-300"
        >
          Get a New Affirmation
        </button>
      </section>
    </div>
  );
}
