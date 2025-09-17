// import React from 'react';
// import { motion } from 'framer-motion';
// import SafeIcon from '../../common/SafeIcon';
// import * as FiIcons from 'react-icons/fi';

// const { FiSun, FiMapPin, FiWind, FiDroplet } = FiIcons;

// function WeatherWidget() {
//   return (
//     <motion.div
//       initial={{ y: 20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm text-white overflow-hidden"
//     >
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-2">
//             <SafeIcon icon={FiMapPin} className="w-4 h-4" />
//             <span className="text-sm font-medium">Maple Heights</span>
//           </div>
//           <SafeIcon icon={FiSun} className="w-8 h-8" />
//         </div>
        
//         <div className="mb-4">
//           <div className="text-3xl font-bold mb-1">72°F</div>
//           <div className="text-blue-100">Partly Cloudy</div>
//         </div>
        
//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <div className="flex items-center space-x-2">
//             <SafeIcon icon={FiWind} className="w-4 h-4 text-blue-200" />
//             <span>8 mph</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <SafeIcon icon={FiDroplet} className="w-4 h-4 text-blue-200" />
//             <span>45%</span>
//           </div>
//         </div>
        
//         <div className="mt-4 pt-4 border-t border-blue-400">
//           <div className="flex justify-between text-sm">
//             <span>High: 78°F</span>
//             <span>Low: 65°F</span>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default WeatherWidget;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSun, FiMapPin, FiWind, FiDroplet } = FiIcons;

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "debe5cb660861b94a08281f61418d644"; 
        const city = "Lahore"; 
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <motion.div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm text-white p-6">
        <p>Loading weather...</p>
      </motion.div>
    );
  }

  if (!weather || weather.cod !== 200) {
    return (
      <motion.div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm text-white p-6">
        <p>Weather unavailable</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm text-white overflow-hidden"
    >
      <div className="p-6">
        {/* Location + Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiMapPin} className="w-4 h-4" />
            <span className="text-sm font-medium">{weather.name}</span>
          </div>
          <SafeIcon icon={FiSun} className="w-8 h-8" />
        </div>

        {/* Temp + Condition */}
        <div className="mb-4">
          <div className="text-3xl font-bold mb-1">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="text-blue-100 capitalize">
            {weather.weather[0].description}
          </div>
        </div>

        {/* Wind + Humidity */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiWind} className="w-4 h-4 text-blue-200" />
            <span>{weather.wind.speed} m/s</span>
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiDroplet} className="w-4 h-4 text-blue-200" />
            <span>{weather.main.humidity}%</span>
          </div>
        </div>

        {/* High / Low */}
        <div className="mt-4 pt-4 border-t border-blue-400">
          <div className="flex justify-between text-sm">
            <span>High: {Math.round(weather.main.temp_max)}°C</span>
            <span>Low: {Math.round(weather.main.temp_min)}°C</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherWidget;
