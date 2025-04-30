import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-white to-[#FFE4D7]" >
      <section className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-[#093832]"
        >
          Welcome to Sahayak
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 max-w-2xl text-lg text-[#093832]"
        >
          Your friendly companion on the path to mental wellness. We're here to help you feel better, every single day.
        </motion.p>

        <Link to="/dashboard" className="mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#F1A6B4] text-[#093832] px-6 py-3 rounded-full font-semibold shadow-md transition-all hover:bg-pink-500"
          >
            Get Started
          </motion.button>
        </Link>
      </section>

      {/* Vibrant Colored Blocks Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-16">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-yellow-100 p-10 rounded-xl shadow hover:shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold text-black mb-2">Mood Tracker</h2>
          <p>Track your feelings and patterns to understand yourself better.</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gray-200 p-10 rounded-xl shadow hover:shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold text-black mb-2">Helpful Resources</h2>
          <p>Explore guides, tools, and tips curated by mental health experts.</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-purple-100 p-10 rounded-xl shadow hover:shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold text-black mb-2">Community Support</h2>
          <p>Connect with others anonymously and find strength in shared stories.</p>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
