import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';

const { FiEdit3, FiMapPin, FiCalendar, FiHeart, FiMessageCircle, FiSettings, FiShield } = FiIcons;

function ProfilePage() {
  const { user } = useAuthStore();

  const stats = [
    { label: 'Posts', value: '24', icon: FiMessageCircle },
    { label: 'Helpful Thanks', value: '89', icon: FiHeart },
    { label: 'Neighborhood Rank', value: '#12', icon: FiShield },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-6"
        >
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary-500 to-community-500"></div>
            <div className="relative px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
                <div className="relative -mt-16 mb-4 sm:mb-0">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                    alt={user?.name}
                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-2 right-2 p-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
                  >
                    <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                  </motion.button>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'John Doe'}</h1>
                  <div className="flex items-center space-x-2 text-gray-600 mt-1">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                    <span>Maple Heights</span>
                    {user?.verified && (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        <SafeIcon icon={FiShield} className="w-3 h-3 mr-1" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 mt-1">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                    <span>Member since March 2024</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <SafeIcon icon={FiSettings} className="w-4 h-4" />
                  <span>Edit Profile</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <SafeIcon icon={stat.icon} className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* About & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* About */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">About</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Long-time resident of Maple Heights who loves connecting with neighbors and supporting local businesses. 
                Always happy to help with recommendations and community events!
              </p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Living in Maple Heights for 5 years</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiHeart} className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Interests: Gardening, Local dining, Community events</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-800">Recommended Tony's Pizza on Main Street</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-800">Joined the Community Garden group</p>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-800">Posted about the upcoming block party</p>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-800">Thanked 5 neighbors for their helpful posts</p>
                    <p className="text-sm text-gray-500">1 week ago</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProfilePage;