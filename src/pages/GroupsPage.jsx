import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiPlus, FiSearch, FiMessageCircle, FiCalendar, FiMapPin } = FiIcons;

const groups = [
  {
    id: 1,
    name: 'Maple Heights Gardening Club',
    description: 'Share tips, trade plants, and grow together as a community of garden enthusiasts.',
    members: 156,
    posts: 89,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    category: 'Hobbies',
    isJoined: true,
    lastActivity: '2 hours ago'
  },
  {
    id: 2,
    name: 'Neighborhood Watch',
    description: 'Stay informed about safety in our area and coordinate community security efforts.',
    members: 234,
    posts: 45,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    category: 'Safety',
    isJoined: true,
    lastActivity: '4 hours ago'
  },
  {
    id: 3,
    name: 'Local Food Lovers',
    description: 'Discover the best restaurants, share recipes, and organize food-related events.',
    members: 98,
    posts: 156,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    category: 'Food',
    isJoined: false,
    lastActivity: '1 day ago'
  },
  {
    id: 4,
    name: 'Weekend Warriors Running Club',
    description: 'Join us for weekly runs around the neighborhood and nearby trails.',
    members: 67,
    posts: 78,
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop',
    category: 'Fitness',
    isJoined: false,
    lastActivity: '3 days ago'
  },
  {
    id: 5,
    name: 'Book Club Central',
    description: 'Monthly book discussions and literary events for all reading levels.',
    members: 43,
    posts: 92,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    category: 'Culture',
    isJoined: true,
    lastActivity: '5 days ago'
  },
  {
    id: 6,
    name: 'Pet Parents Network',
    description: 'Connect with other pet owners, organize playdates, and share pet care tips.',
    members: 189,
    posts: 201,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    category: 'Pets',
    isJoined: false,
    lastActivity: '1 week ago'
  }
];

const categories = ['All', 'Hobbies', 'Safety', 'Food', 'Fitness', 'Culture', 'Pets'];

function GroupsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const joinedGroups = groups.filter(group => group.isJoined);

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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Neighborhood Groups</h1>
                <p className="text-gray-600">Connect with neighbors who share your interests</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 sm:mt-0 flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Create Group</span>
              </motion.button>
            </div>
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
                    placeholder="Search groups..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
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

          {/* My Groups */}
          {joinedGroups.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">My Groups</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {joinedGroups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{group.name}</h3>
                      <p className="text-sm text-gray-500">{group.members} members</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* All Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                    {group.category}
                  </div>
                  {group.isJoined && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Joined
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{group.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiUsers} className="w-4 h-4" />
                        <span>{group.members}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiMessageCircle} className="w-4 h-4" />
                        <span>{group.posts}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                      <span>{group.lastActivity}</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      group.isJoined
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {group.isJoined ? 'View Group' : 'Join Group'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default GroupsPage;