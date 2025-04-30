import React, { useState } from 'react';

const therapists = [
  { name: 'Dr. Nisha Verma', location: 'Delhi', language: 'Hindi', cost: 'Free' },
  { name: 'Dr. Sarah Ali', location: 'Mumbai', language: 'English', cost: 'Sliding Scale' },
  { name: 'Dr. Rohan Mehta', location: 'Pune', language: 'English', cost: 'Paid' },
  // Add more profiles
];

const HelpFinder = () => {
  const [filters, setFilters] = useState({ location: '', language: '', cost: '' });
  const [booking, setBooking] = useState({ name: '', email: '', message: '', date: '' });

  const filtered = therapists.filter(
    (t) =>
      (!filters.location || t.location === filters.location) &&
      (!filters.language || t.language === filters.language) &&
      (!filters.cost || t.cost === filters.cost)
  );

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    alert('Booking inquiry submitted!');
    setBooking({ name: '', email: '', message: '', date: '' });
  };

  return (
    <div className="min-h-screen bg-[#FFE4D7] px-6 py-10 text-gray-800">
      <h1 className="text-4xl font-bold text-center text-black mb-10">Professional Help Finder </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <select name="location" value={filters.location} onChange={handleChange} className="p-3 rounded-lg border">
          <option value="">All Locations</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
        </select>

        <select name="language" value={filters.language} onChange={handleChange} className="p-3 rounded-lg border">
          <option value="">Any Language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>

        <select name="cost" value={filters.cost} onChange={handleChange} className="p-3 rounded-lg border">
          <option value="">All Costs</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
          <option value="Sliding Scale">Sliding Scale</option>
        </select>
      </div>

      {/* Therapist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
        {filtered.map((t, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-xl p-6 transition-transform hover:scale-105 hover:shadow-xl "
          >
            <h3 className="text-xl font-semibold text-[#F1A6B4]">{t.name}</h3>
            <p className="mt-2"><span className="font-semibold">Location:</span> {t.location}</p>
            <p><span className="font-semibold">Language:</span> {t.language}</p>
            <p><span className="font-semibold">Cost:</span> {t.cost}</p>
            <a
              href="https://www.betterhelp.com/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 mt-3 inline-block"
            >
              Connect on BetterHelp →
            </a>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center col-span-full">No results match your filters.</p>}
      </div>

      {/* Booking Form */}
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Request a Session</h2>
        <form onSubmit={handleBooking} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={booking.name}
            onChange={(e) => setBooking({ ...booking, name: e.target.value })}
            required
            className="w-full p-3 border rounded-md"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={booking.email}
            onChange={(e) => setBooking({ ...booking, email: e.target.value })}
            required
            className="w-full p-3 border rounded-md"
          />
          <input
            type="date"
            value={booking.date}
            onChange={(e) => setBooking({ ...booking, date: e.target.value })}
            required
            className="w-full p-3 border rounded-md"
          />
          <textarea
            placeholder="Tell us briefly what you're going through..."
            value={booking.message}
            onChange={(e) => setBooking({ ...booking, message: e.target.value })}
            required
            className="w-full p-3 border rounded-md h-32"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#F1A6B4] text-black font-semibold py-3 rounded-lg hover:bg-pink-600 transition"
          >
            Send Inquiry 💌
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpFinder;
