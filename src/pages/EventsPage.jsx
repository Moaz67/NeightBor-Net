import React from 'react';
import { motion } from 'framer-motion';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiMapPin, FiClock, FiUsers, FiPlus, FiChevronLeft, FiChevronRight } = FiIcons;

const events = [
  {
    id: 1,
    title: 'Community Garage Sale',
    date: new Date(2024, 2, 16),
    time: '9:00 AM - 4:00 PM',
    location: 'Riverside Park',
    organizer: 'Lisa Rodriguez',
    organizerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    attendees: 67,
    description: 'Annual neighborhood garage sale featuring dozens of families. Find treasures and meet your neighbors!',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'Community',
    isAttending: true
  },
  {
    id: 2,
    title: 'Neighborhood Watch Meeting',
    date: new Date(2024, 2, 18),
    time: '7:00 PM - 8:30 PM',
    location: 'Community Center',
    organizer: 'Safety Committee',
    organizerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    attendees: 34,
    description: 'Monthly safety meeting to discuss neighborhood security and community concerns.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    category: 'Safety',
    isAttending: false
  },
  {
    id: 3,
    title: 'Book Club: "The Seven Husbands of Evelyn Hugo"',
    date: new Date(2024, 2, 20),
    time: '2:00 PM - 4:00 PM',
    location: 'Corner Coffee House',
    organizer: 'Emma Davis',
    organizerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    attendees: 12,
    description: 'Monthly book discussion. New members welcome! Coffee and pastries provided.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    category: 'Culture',
    isAttending: true
  },
  {
    id: 4,
    title: 'Community Garden Planting Day',
    date: new Date(2024, 2, 22),
    time: '10:00 AM - 2:00 PM',
    location: 'Maple Heights Community Garden',
    organizer: 'Gardening Club',
    organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    attendees: 28,
    description: 'Help plant spring vegetables and flowers in our community garden. Tools and refreshments provided.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    category: 'Community',
    isAttending: false
  },
  {
    id: 5,
    title: 'Weekend Warriors Run',
    date: new Date(2024, 2, 23),
    time: '7:00 AM - 8:00 AM',
    location: 'Neighborhood Trails',
    organizer: 'Running Club',
    organizerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    attendees: 15,
    description: 'Weekly 5K run through scenic neighborhood trails. All fitness levels welcome!',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop',
    category: 'Fitness',
    isAttending: true
  },
  {
    id: 6,
    title: 'Pizza Night Fundraiser',
    date: new Date(2024, 2, 25),
    time: '5:00 PM - 8:00 PM',
    location: "Tony's Pizza",
    organizer: 'PTA Fundraising Committee',
    organizerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face',
    attendees: 89,
    description: 'Family-friendly pizza night to raise funds for the local elementary school playground.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    category: 'Fundraiser',
    isAttending: false
  }
];

const categories = ['All', 'Community', 'Safety', 'Culture', 'Fitness', 'Fundraiser'];

function EventsPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [view, setView] = React.useState('list'); // 'list' or 'calendar'

  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesCategory;
  });

  const upcomingEvents = filteredEvents.filter(event => event.date >= new Date()).slice(0, 3);

  const navigateWeek = (direction) => {
    setCurrentDate(prev => addDays(prev, direction * 7));
  };

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Neighborhood Events</h1>
                <p className="text-gray-600">Discover and join local happenings</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 sm:mt-0 flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Create Event</span>
              </motion.button>
            </div>
          </div>

          {/* View Toggle and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    view === 'list' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  List View
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setView('calendar')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    view === 'calendar' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Calendar View
                </motion.button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {view === 'calendar' ? (
            /* Calendar View */
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Week of {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigateWeek(-1)}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiChevronLeft} className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigateWeek(1)}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiChevronRight} className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-7">
                {weekDays.map((day) => (
                  <div key={day.toISOString()} className="border-r border-gray-200 last:border-r-0">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">
                          {format(day, 'EEE')}
                        </div>
                        <div className="text-lg font-bold text-gray-900 mt-1">
                          {format(day, 'd')}
                        </div>
                      </div>
                    </div>
                    <div className="p-2 min-h-[200px]">
                      {filteredEvents
                        .filter(event => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                        .map(event => (
                          <motion.div
                            key={event.id}
                            whileHover={{ scale: 1.02 }}
                            className="mb-2 p-2 bg-primary-50 border border-primary-200 rounded-lg cursor-pointer"
                          >
                            <div className="text-xs font-medium text-primary-700 truncate">
                              {event.title}
                            </div>
                            <div className="text-xs text-primary-600 mt-1">
                              {event.time.split(' - ')[0]}
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* List View */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Events Sidebar */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Coming Up</h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex-shrink-0 text-center">
                        <div className="text-sm font-medium text-primary-600">
                          {format(event.date, 'MMM')}
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {format(event.date, 'd')}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm truncate">{event.title}</h3>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                          <SafeIcon icon={FiClock} className="w-3 h-3" />
                          <span>{event.time.split(' - ')[0]}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <SafeIcon icon={FiUsers} className="w-3 h-3" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Events List */}
              <div className="lg:col-span-2 space-y-6">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                            <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                              {event.category}
                            </span>
                          </div>
                          {event.isAttending && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                              Attending
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                            <span>{format(event.date, 'EEEE, MMM d')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiClock} className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiUsers} className="w-4 h-4" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <img
                              src={event.organizerAvatar}
                              alt={event.organizer}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-sm text-gray-600">by {event.organizer}</span>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              event.isAttending
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-primary-600 text-white hover:bg-primary-700'
                            }`}
                          >
                            {event.isAttending ? 'View Details' : 'Join Event'}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default EventsPage;