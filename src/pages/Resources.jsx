import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { FaBookOpen, FaHeartbeat, FaToolbox } from 'react-icons/fa';

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const resources = [
    {
      title: 'Understanding Anxiety',
      description: 'An in-depth article about anxiety symptoms and how to manage them.',
      category: 'Articles',
      icon: <FaBookOpen className="text-blue-500 text-2xl" />,
      link: 'https://example.com/anxiety-article',
    },
    {
      title: 'Burnout Prevention Toolkit',
      description: 'Downloadable toolkit with stress-relief techniques and schedules.',
      category: 'Toolkits',
      icon: <FaToolbox className="text-green-500 text-2xl" />,
      downloadable: true,
      link: '/toolkits/burnout-prevention.pdf',
    },
    {
      title: 'Self-Care Basics',
      description: 'A gentle guide to start your self-care journey.',
      category: 'Self-care',
      icon: <FaHeartbeat className="text-pink-500 text-2xl" />,
      link: 'https://example.com/self-care-guide',
    },
    {
      title: 'Coping with Depression',
      description: 'A helpful article that explains common signs and coping mechanisms.',
      category: 'Articles',
      icon: <FaBookOpen className="text-blue-500 text-2xl" />,
      link: 'https://example.com/depression-guide',
    },
    {
      title: 'Breathing Exercises Toolkit',
      description: 'A downloadable PDF with calming breathing exercises.',
      category: 'Toolkits',
      icon: <FaToolbox className="text-green-500 text-2xl" />,
      downloadable: true,
      link: '/toolkits/breathing-exercises.pdf',
    },
    {
      title: 'Nighttime Self-Care Routine',
      description: 'A simple bedtime routine for relaxation and better sleep.',
      category: 'Self-care',
      icon: <FaHeartbeat className="text-pink-500 text-2xl" />,
      link: 'https://example.com/bedtime-selfcare',
    },
  ];

  const filteredResources = resources.filter(resource => {
    return (
      (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === 'All' || resource.category === selectedCategory)
    );
  });

  return (
    <div className="min-h-screen bg-[#FFE4D7] pt-28 pb-16 px-6 text-center">
      <h1 className="text-4xl font-bold text-black mb-4">Sahayak Resource Center</h1>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        Explore carefully curated guides, articles, and toolkits to support your mental well-being.
      </p>

      {/* Search Bar */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="🔍 Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-lg shadow-sm"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-10">
        <label className="mr-2 text-xl text-black font-medium">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg text-lg shadow-sm"
        >
          <option>All</option>
          <option>Articles</option>
          <option>Self-care</option>
          <option>Toolkits</option>
        </select>
      </div>

      {/* Resources Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-8">
        {filteredResources.length === 0 ? (
          <p className="text-gray-500">No resources found. Try adjusting your filters or search term.</p>
        ) : (
          filteredResources.map((resource, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-left relative"
            >
              <div className="flex items-center gap-3 mb-4">
                {resource.icon}
                <h3 className="text-xl font-semibold text-black">{resource.title}</h3>
              </div>
              <p className="text-gray-700 mb-4">{resource.description}</p>

              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline text-base font-medium"
                download={resource.downloadable}
              >
                {resource.downloadable ? (
                  <>
                    <FiDownload className="mr-1" /> Download Toolkit
                  </>
                ) : (
                  'Visit Resource'
                )}
              </a>

              <span className="absolute top-4 right-4 bg-gray-200 text-xs px-3 py-1 rounded-full text-gray-600">
                {resource.category}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
