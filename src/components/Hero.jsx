import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, desc, bgColor, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.03, translateY: -5 }}
    className={`${bgColor} p-10 rounded-3xl shadow-sm hover:shadow-xl text-center border border-white/20 transition-all cursor-pointer`}
  >
    <h2 className="text-2xl font-bold text-[#093832] mb-2">{title}</h2>
    <p className="text-[#093832]/80">{desc}</p>
  </motion.div>
);

const Hero = () => {
  const features = [
    {
      title: "Mood Tracker",
      desc: "Track your feelings and patterns to understand yourself better.",
      bgColor: "bg-[#FFF4E0]", // Softer yellow to match theme
      delay: 0.5
    },
    {
      title: "Helpful Resources",
      desc: "Explore guides, tools, and tips curated by mental health experts.",
      bgColor: "bg-[#E8F3F1]", // Soft teal tint
      delay: 0.7
    },
    {
      title: "Community Support",
      desc: "Connect with others anonymously and find strength in shared stories.",
      bgColor: "bg-[#F3E8FF]", // Soft lavender
      delay: 0.9
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-[#FFE4D7] min-h-screen">
      <section className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-[#093832] tracking-tight"
        >
          Welcome to <span className="text-[#F1A6B4]">Sahayak</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 max-w-2xl text-xl text-[#093832] leading-relaxed"
        >
          Your friendly companion on the path to mental wellness. 
          We're here to help you feel better, every single day.
        </motion.p>

        <Link to="/dashboard" className="mt-12">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#e095a3" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#F1A6B4] text-[#093832] px-10 py-4 rounded-full font-bold shadow-lg transition-all"
          >
            Get Started Free
          </motion.button>
        </Link>
      </section>

      {/* Feature Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pb-20 max-w-7xl mx-auto">
        {features.map((f, index) => (
          <FeatureCard key={index} {...f} />
        ))}
      </section>
    </div>
  );
};

export default Hero;
