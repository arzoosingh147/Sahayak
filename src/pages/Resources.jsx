import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiExternalLink, FiSearch } from 'react-icons/fi';
import { FaBookOpen, FaHeartbeat, FaToolbox } from 'react-icons/fa';

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const resources = [
    {
      title: 'Understanding Anxiety',
      description: 'An in-depth article about anxiety symptoms and how to manage them.',
      category: 'Articles',
      icon: <FaBookOpen />,
      color: "text-blue-500",
      link: 'https://example.com/anxiety-article',
    },
    {
      title: 'Burnout Prevention Toolkit',
      description: 'Downloadable toolkit with stress-relief techniques and schedules.',
      category: 'Toolkits',
      icon: <FaToolbox />,
      color: "text-emerald-500",
      downloadable: true,
      link: '/toolkits/burnout-prevention.pdf',
    },
    {
      title: 'Self-Care Basics',
      description: 'A gentle guide to start your self-care journey.',
      category: 'Self-care',
      icon: <FaHeartbeat />,
      color: "text-[#F1A6B4]",
      link: 'https://example.com/self-care-guide',
    },
  ];

  const categories = ['All', 'Articles', 'Self-care', 'Toolkits'];

  const filteredResources = resources.filter(res => 
    (res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     res.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === 'All' || res.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-[#FFE4D7] pt-32 pb-20 px-6 text-[#093832]">
      <header className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Resource Center</h1>
        <p className="text-lg opacity-75 leading-relaxed">
          Carefully curated guides and toolkits to support your mental well-being journey.
        </p>
      </header>

      {/* Search & Filter Bar */}
      <div className="max-w-5xl mx-auto mb-16 flex flex-col md:flex-row gap-6 items-center">
        <div className="relative w-full md:flex-grow">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search for articles, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-sm outline-none focus:ring-2 ring-[#F1A6B4] transition-all"
          />
        </div>
        
        <div className="flex gap-2 bg-white/50 p-2 rounded-2xl backdrop-blur-sm border border-white">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${
                selectedCategory === cat 
                ? 'bg-[#093832] text-white shadow-md' 
                : 'hover:bg-[#F1A6B4]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredResources.map((res, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={index}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all border-b-8 border-[#F1A6B4] flex flex-col text-left"
            >
              <div className={`text-3xl mb-4 ${res.color}`}>
                {res.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 leading-tight">{res.title}</h3>
              <p className="text-[#093832]/70 mb-8 flex-grow leading-relaxed">
                {res.description}
              </p>

              <div className="flex justify-between items-center">
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-[#F1A6B4] hover:text-[#093832] transition-colors"
                >
                  {res.downloadable ? <><FiDownload /> Download</> : <><FiExternalLink /> Read More</>}
                </a>
                <span className="text-[10px] uppercase tracking-widest font-black opacity-30 bg-gray-100 px-3 py-1 rounded-full">
                  {res.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredResources.length === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-20 text-xl opacity-50">
          No resources found matching your search.
        </motion.p>
      )}
    </div>
  );
}
