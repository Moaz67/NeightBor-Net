import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiStar, FiMapPin, FiPhone, FiClock, FiExternalLink, FiFilter } = FiIcons;

const businesses = [
  {
    id: 1,
    name: "Tony's Pizza",
    category: 'Restaurant',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    description: 'Authentic Italian pizza with fresh ingredients',
    address: '123 Main Street',
    phone: '(555) 123-4567',
    hours: 'Mon-Sun 11AM-10PM',
    verified: true
  },
  {
    id: 2,
    name: 'Green Thumb Landscaping',
    category: 'Home Services',
    rating: 4.9,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    description: 'Professional landscaping and garden maintenance',
    address: '456 Oak Avenue',
    phone: '(555) 234-5678',
    hours: 'Mon-Fri 8AM-6PM',
    verified: true
  },
  {
    id: 3,
    name: 'Corner Coffee House',
    category: 'Cafe',
    rating: 4.6,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
    description: 'Locally roasted coffee and fresh pastries',
    address: '789 Pine Street',
    phone: '(555) 345-6789',
    hours: 'Daily 6AM-8PM',
    verified: false
  },
  {
    id: 4,
    name: 'QuickFix Plumbing',
    category: 'Home Services',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
    description: '24/7 emergency plumbing services',
    address: '321 Elm Street',
    phone: '(555) 456-7890',
    hours: '24/7 Emergency Service',
    verified: true
  }
];

const categories = ['All', 'Restaurant', 'Cafe', 'Home Services', 'Retail', 'Healthcare'];

function BusinessPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Local Business Directory</h1>
            <p className="text-gray-600">Discover and support businesses in your neighborhood</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <SafeIcon 
                    icon={FiSearch} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                  />
                  <input
                    type="text"
                    placeholder="Search businesses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Business Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-48 object-cover"
                  />
                  {business.verified && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Verified
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                    {business.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{business.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({business.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{business.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                      <span>{business.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiPhone} className="w-4 h-4" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiClock} className="w-4 h-4" />
                      <span>{business.hours}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      Contact
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Business CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-primary-500 to-community-500 rounded-xl shadow-sm text-white p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-2">Own a Local Business?</h2>
            <p className="text-primary-100 mb-6">
              Join our directory and connect with your neighborhood customers
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Add Your Business
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default BusinessPage;