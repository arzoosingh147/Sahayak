import React, { useState } from 'react';
import { motion } from 'framer-motion';

const therapistsData = [
  { name: 'Dr. Nisha Verma', location: 'Delhi', language: 'Hindi', cost: 'Free', specialized: 'Anxiety' },
  { name: 'Dr. Sarah Ali', location: 'Mumbai', language: 'English', cost: 'Sliding Scale', specialized: 'Depression' },
  { name: 'Dr. Rohan Mehta', location: 'Pune', language: 'English', cost: 'Paid', specialized: 'Trauma' },
];

const HelpFinder = () => {
  const [filters, setFilters] = useState({ location: '', language: '', cost: '' });
  const [booking, setBooking] = useState({ name: '', email: '', message: '', date: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filtered = therapistsData.filter(
    (t) =>
      (!filters.location || t.location === filters.location) &&
      (!filters.language || t.language === filters.language) &&
      (!filters.cost || t.cost === filters.cost)
  );

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // This is where your PHP fetch will go:
    // const response = await fetch('api/book_session.php', { method: 'POST', body: JSON.stringify(booking) });
    
    setTimeout(() => {
      alert('Your inquiry has been sent to our specialists! 💌');
      setBooking({ name: '', email: '', message: '', date: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FFE4D7] px-6 py-20 text-[#093832]">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Help Finder</h1>
          <p className="text-lg opacity-80">Find the right support for your journey.</p>
        </header>

        {/* Improved Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['location', 'language', 'cost'].map((filterKey) => (
            <select
              key={filterKey}
              name={filterKey}
              value={filters[filterKey]}
              onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
              className="p-3 rounded-full border-2 border-[#F1A6B4] bg-white text-[#093832] font-semibold focus:outline-none focus:ring-2 ring-pink-300 transition-all cursor-pointer shadow-sm"
            >
              <option value="">All {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}s</option>
              {Array.from(new Set(therapistsData.map(t => t[filterKey]))).map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          ))}
        </div>

        {/* Therapist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filtered.map((t, idx) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={idx}
              className="bg-white border-b-8 border-[#F1A6B4] shadow-xl rounded-3xl p-8 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-[#093832]">{t.name}</h3>
                <span className="bg-[#FFE4D7] text-[#093832] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {t.cost}
                </span>
              </div>
              <div className="space-y-2 text-sm md:text-base">
                <p>📍 <span className="font-bold">Location:</span> {t.location}</p>
                <p>🗣️ <span className="font-bold">Language:</span> {t.language}</p>
                <p>✨ <span className="font-bold">Specialty:</span> {t.specialized}</p>
              </div>
              <a
                href="https://www.betterhelp.com/"
                target="_blank"
                rel="noreferrer"
                className="mt-6 block text-center bg-[#093832] text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition-colors"
              >
                View Full Profile
              </a>
            </motion.div>
          ))}
        </div>

        {/* Booking Form - Integrated with Theme */}
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-[2rem] shadow-2xl border-t-8 border-[#F1A6B4]">
          <h2 className="text-3xl font-bold text-center mb-8">Request a Private Session</h2>
          <form onSubmit={handleBooking} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Name"
                value={booking.name}
                onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                required
                className="w-full p-4 bg-[#FFE4D7]/30 border-2 border-transparent focus:border-[#F1A6B4] rounded-2xl outline-none transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={booking.email}
                onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                required
                className="w-full p-4 bg-[#FFE4D7]/30 border-2 border-transparent focus:border-[#F1A6B4] rounded-2xl outline-none transition-all"
              />
            </div>
            <input
              type="date"
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              required
              className="w-full p-4 bg-[#FFE4D7]/30 border-2 border-transparent focus:border-[#F1A6B4] rounded-2xl outline-none transition-all"
            />
            <textarea
              placeholder="How can we help you today?"
              value={booking.message}
              onChange={(e) => setBooking({ ...booking, message: e.target.value })}
              required
              className="w-full p-4 bg-[#FFE4D7]/30 border-2 border-transparent focus:border-[#F1A6B4] rounded-2xl outline-none h-32 transition-all"
            ></textarea>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F1A6B4] text-[#093832] hover:bg-pink-400'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Confirm Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpFinder;
