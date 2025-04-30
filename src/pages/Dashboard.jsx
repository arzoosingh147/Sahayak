import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [lastArticle, setLastArticle] = useState("");
  const [savedTools, setSavedTools] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [moodStats, setMoodStats] = useState({});

  useEffect(() => {
    // Dummy data for now — will connect to real data later
    setLastArticle("Managing Anxiety: 5 Easy Steps");
    setSavedTools(["Deep Breathing Exercise", "Self-Compassion Worksheet"]);
    setAppointments([{ date: "2025-05-10", with: "Dr. Alia Khan" }]);
    setMoodStats({ happy: 4, sad: 2, stressed: 1, relaxed: 3 });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 md:px-8 bg-gradient-to-b from-white to-[#FFE4D7] text-gray-800">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Welcome Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Welcome Back to Sahayak </h1>
          <p className="text-gray-500 text-sm md:text-base">Here’s a quick view of your mental wellness journey!</p>
        </div>

        {/* Mood Overview */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-black">Mood Overview </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(moodStats).map(([mood, count]) => (
              <div key={mood} className="bg-[#FFE4D7] rounded-lg p-4 text-center shadow-sm hover:shadow-md transition">
                <p className="text-lg font-semibold capitalize">{mood}</p>
                <p className="text-2xl font-bold text-black">{count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Last Read and Saved Tools */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-black">Last Read Article</h2>
            <Link to="/resources" className="text-blue-600 hover:underline">
              {lastArticle}
            </Link>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2 text-black"> Saved Coping Tools</h2>
            <ul className="list-disc pl-5 text-gray-600">
              {savedTools.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-black">Upcoming Appointments</h2>
          {appointments.length > 0 ? (
            <ul className="space-y-2 text-gray-600">
              {appointments.map((appt, index) => (
                <li key={index}>
                  {appt.date} with <span className="font-semibold">{appt.with}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming appointments scheduled.</p>
          )}
        </div>

      </div>
    </div>
  );
}
