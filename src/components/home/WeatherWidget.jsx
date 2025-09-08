import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSun, FiMapPin, FiWind, FiDroplet } = FiIcons;

function WeatherWidget() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm text-white overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiMapPin} className="w-4 h-4" />
            <span className="text-sm font-medium">Maple Heights</span>
          </div>
          <SafeIcon icon={FiSun} className="w-8 h-8" />
        </div>
        
        <div className="mb-4">
          <div className="text-3xl font-bold mb-1">72°F</div>
          <div className="text-blue-100">Partly Cloudy</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiWind} className="w-4 h-4 text-blue-200" />
            <span>8 mph</span>
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiDroplet} className="w-4 h-4 text-blue-200" />
            <span>45%</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-blue-400">
          <div className="flex justify-between text-sm">
            <span>High: 78°F</span>
            <span>Low: 65°F</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherWidget;