import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiMapPin, FiMessageCircle } = FiIcons;

const trendingTopics = [
  {
    id: 1,
    title: 'Local Restaurant Week',
    posts: 23,
    trend: '+15%'
  },
  {
    id: 2,
    title: 'Community Garden Project',
    posts: 18,
    trend: '+8%'
  },
  {
    id: 3,
    title: 'Neighborhood Watch',
    posts: 12,
    trend: '+22%'
  },
  {
    id: 4,
    title: 'Summer Block Party',
    posts: 9,
    trend: '+5%'
  }
];

function TrendingSection() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Trending in Your Area</h2>
        </div>
        
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
              className="p-3 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{topic.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <SafeIcon icon={FiMessageCircle} className="w-3 h-3" />
                    <span>{topic.posts} posts</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">{topic.trend}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          View All Trending
        </motion.button>
      </div>
    </motion.div>
  );
}

export default TrendingSection;