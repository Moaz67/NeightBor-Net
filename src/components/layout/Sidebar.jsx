import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiUser, FiBriefcase, FiUsers, FiShoppingBag, FiCalendar, FiMapPin } = FiIcons;

const menuItems = [
  { icon: FiHome, label: 'Home Feed', path: '/' },
  { icon: FiUser, label: 'Profile', path: '/profile' },
  { icon: FiBriefcase, label: 'Local Business', path: '/business' },
  { icon: FiUsers, label: 'Groups', path: '/groups' },
  { icon: FiShoppingBag, label: 'Marketplace', path: '/marketplace' },
  { icon: FiCalendar, label: 'Events', path: '/events' },
];

function Sidebar() {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50"
    >
      <div className="p-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-3 mb-8"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-community-500 rounded-xl flex items-center justify-center">
            <SafeIcon icon={FiMapPin} className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">NeighborNet</h1>
            <p className="text-sm text-gray-500">Maple Heights</p>
          </div>
        </motion.div>
        
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <SafeIcon 
                    icon={item.icon} 
                    className={`w-5 h-5 ${isActive ? 'text-primary-600' : ''}`} 
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
        
        <div className="mt-8 p-4 bg-gradient-to-br from-community-50 to-primary-50 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-2">Community Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Members</span>
              <span className="font-medium text-community-600">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">This Week's Posts</span>
              <span className="font-medium text-primary-600">89</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Local Businesses</span>
              <span className="font-medium text-gray-900">156</span>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export default Sidebar;