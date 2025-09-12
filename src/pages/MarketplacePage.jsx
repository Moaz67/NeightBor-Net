// import React from 'react';
// import { motion } from 'framer-motion';
// import SafeIcon from '../common/SafeIcon';
// import * as FiIcons from 'react-icons/fi';

// const { FiSearch, FiFilter, FiDollarSign, FiMapPin, FiClock, FiHeart, FiMessageCircle, FiPlus } = FiIcons;

// const items = [
//   {
//     id: 1,
//     title: 'Barely Used Exercise Bike',
//     price: 150,
//     category: 'Sports & Fitness',
//     image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
//     seller: 'David Wilson',
//     sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
//     description: 'Perfect condition exercise bike, moving sale. Used only a few times.',
//     location: '0.2 miles away',
//     timePosted: '2 hours ago',
//     likes: 12,
//     type: 'for-sale'
//   },
//   {
//     id: 2,
//     title: 'FREE: Moving boxes and packing supplies',
//     price: 0,
//     category: 'Free Items',
//     image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
//     seller: 'Sarah Johnson',
//     sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face',
//     description: 'Clean moving boxes in various sizes plus bubble wrap and packing paper.',
//     location: '0.1 miles away',
//     timePosted: '4 hours ago',
//     likes: 8,
//     type: 'free'
//   },
//   {
//     id: 3,
//     title: 'Vintage Dining Table Set',
//     price: 300,
//     category: 'Furniture',
//     image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
//     seller: 'Mike Chen',
//     sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
//     description: 'Beautiful vintage dining table with 4 chairs. Some wear but very sturdy.',
//     location: '0.3 miles away',
//     timePosted: '1 day ago',
//     likes: 23,
//     type: 'for-sale'
//   },
//   {
//     id: 4,
//     title: 'Kids Bicycle - Great Condition',
//     price: 75,
//     category: 'Kids & Baby',
//     image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
//     seller: 'Lisa Rodriguez',
//     sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
//     description: 'Red kids bicycle, perfect for ages 6-10. Includes training wheels.',
//     location: '0.4 miles away',
//     timePosted: '2 days ago',
//     likes: 15,
//     type: 'for-sale'
//   },
//   {
//     id: 5,
//     title: 'FREE: Garden Plants and Pots',
//     price: 0,
//     category: 'Garden & Outdoor',
//     image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
//     seller: 'Emma Davis',
//     sellerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
//     description: 'Various garden plants and ceramic pots. Must pick up this weekend.',
//     location: '0.2 miles away',
//     timePosted: '3 days ago',
//     likes: 19,
//     type: 'free'
//   },
//   {
//     id: 6,
//     title: 'Professional Desk Setup',
//     price: 200,
//     category: 'Electronics',
//     image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
//     seller: 'Alex Thompson',
//     sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
//     description: 'Standing desk with monitor arm and cable management. Perfect for home office.',
//     location: '0.5 miles away',
//     timePosted: '1 week ago',
//     likes: 31,
//     type: 'for-sale'
//   }
// ];

// const categories = ['All', 'Electronics', 'Furniture', 'Sports & Fitness', 'Kids & Baby', 'Garden & Outdoor', 'Free Items'];
// const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Distance'];

// function MarketplacePage() {
//   const [searchTerm, setSearchTerm] = React.useState('');
//   const [selectedCategory, setSelectedCategory] = React.useState('All');
//   const [sortBy, setSortBy] = React.useState('Newest');
//   const [showFreeOnly, setShowFreeOnly] = React.useState(false);

//   const filteredItems = items.filter(item => {
//     const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
//     const matchesFree = !showFreeOnly || item.price === 0;
//     return matchesSearch && matchesCategory && matchesFree;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="space-y-6"
//         >
//           {/* Header */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 mb-2">Neighborhood Marketplace</h1>
//                 <p className="text-gray-600">Buy, sell, and share with your neighbors</p>
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="mt-4 sm:mt-0 flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
//               >
//                 <SafeIcon icon={FiPlus} className="w-5 h-5" />
//                 <span>List Item</span>
//               </motion.button>
//             </div>
//           </div>

//           {/* Search and Filters */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="space-y-4">
//               <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
//                 <div className="flex-1">
//                   <div className="relative">
//                     <SafeIcon 
//                       icon={FiSearch} 
//                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
//                     />
//                     <input
//                       type="text"
//                       placeholder="Search marketplace..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-4">
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//                   >
//                     {sortOptions.map(option => (
//                       <option key={option} value={option}>{option}</option>
//                     ))}
//                   </select>
                  
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={showFreeOnly}
//                       onChange={(e) => setShowFreeOnly(e.target.checked)}
//                       className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                     />
//                     <span className="text-sm text-gray-700">Free items only</span>
//                   </label>
//                 </div>
//               </div>
              
//               <div className="flex flex-wrap gap-2">
//                 {categories.map(category => (
//                   <motion.button
//                     key={category}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                       selectedCategory === category
//                         ? 'bg-primary-100 text-primary-700 border border-primary-200'
//                         : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
//                     }`}
//                   >
//                     {category}
//                   </motion.button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Items Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredItems.map((item, index) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -4 }}
//                 className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
//               >
//                 <div className="relative">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="absolute top-3 left-3">
//                     {item.price === 0 ? (
//                       <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
//                         FREE
//                       </span>
//                     ) : (
//                       <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs font-medium">
//                         ${item.price}
//                       </span>
//                     )}
//                   </div>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-white transition-colors"
//                   >
//                     <SafeIcon icon={FiHeart} className="w-4 h-4 text-gray-600 hover:text-red-500" />
//                   </motion.button>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-2">
//                     <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
//                     {item.price > 0 && (
//                       <div className="flex items-center space-x-1 text-primary-600 font-bold">
//                         <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
//                         <span>{item.price}</span>
//                       </div>
//                     )}
//                   </div>
                  
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  
//                   <div className="flex items-center space-x-3 mb-4">
//                     <img
//                       src={item.sellerAvatar}
//                       alt={item.seller}
//                       className="w-8 h-8 rounded-full object-cover"
//                     />
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{item.seller}</p>
//                       <div className="flex items-center space-x-2 text-xs text-gray-500">
//                         <SafeIcon icon={FiMapPin} className="w-3 h-3" />
//                         <span>{item.location}</span>
//                         <span>•</span>
//                         <SafeIcon icon={FiClock} className="w-3 h-3" />
//                         <span>{item.timePosted}</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4 text-sm text-gray-500">
//                       <div className="flex items-center space-x-1">
//                         <SafeIcon icon={FiHeart} className="w-4 h-4" />
//                         <span>{item.likes}</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <SafeIcon icon={FiMessageCircle} className="w-4 h-4" />
//                         <span>Contact</span>
//                       </div>
//                     </div>
                    
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
//                     >
//                       {item.price === 0 ? 'Claim' : 'Contact Seller'}
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Safety Tips */}
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="bg-blue-50 border border-blue-200 rounded-xl p-6"
//           >
//             <h3 className="text-lg font-semibold text-blue-900 mb-2">🛡️ Safety Tips</h3>
//             <ul className="text-blue-800 text-sm space-y-1">
//               <li>• Meet in public places for transactions</li>
//               <li>• Inspect items carefully before purchasing</li>
//               <li>• Trust your instincts - if something feels off, walk away</li>
//               <li>• Report suspicious activity to neighborhood administrators</li>
//             </ul>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default MarketplacePage;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiFilter, FiDollarSign, FiMapPin, FiClock, FiPlus, FiThumbsUp, FiThumbsDown } = FiIcons;

const categories = ['All', 'Electronics', 'Furniture', 'Sports & Fitness', 'Kids & Baby', 'Garden & Outdoor', 'Free Items'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Distance'];

function MarketplacePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  useEffect(() => {
    fetchMarketItems();
  }, []);

  const fetchMarketItems = async () => {
    try {
      debugger
      setLoading(true);
      const response = await fetch('https://localhost:7097/api/market');
      if (!response.ok) {
        throw new Error('Failed to fetch market items');
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesFree = !showFreeOnly || item.price === 0;
    return matchesSearch && matchesCategory && matchesFree;
  });

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Error: {error}</div>;

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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Neighborhood Marketplace</h1>
                <p className="text-gray-600">Buy, sell, and share with your neighbors</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 sm:mt-0 flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>List Item</span>
              </motion.button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <SafeIcon 
                      icon={FiSearch} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                    />
                    <input
                      type="text"
                      placeholder="Search marketplace..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {sortOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showFreeOnly}
                      onChange={(e) => setShowFreeOnly(e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Free items only</span>
                  </label>
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

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.imagePath || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'}
                    alt={item.productName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    {item.price === 0 ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        FREE
                      </span>
                    ) : !item.isAvailable ? (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        SOLD OUT
                      </span>
                    ) : (
                      <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs font-medium">
                        ${item.price}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.productName}</h3>
                    {item.price > 0 && item.isAvailable && (
                      <div className="flex items-center space-x-1 text-primary-600 font-bold">
                        <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
                        <span>{item.price}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.userImagePath || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'}
                        alt={item.userFirstName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.userFirstName}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <SafeIcon icon={FiMapPin} className="w-3 h-3" />
                          <span>{item.locationName}</span>
                          <span>•</span>
                          <SafeIcon icon={FiClock} className="w-3 h-3" />
                          <span>{formatTimeAgo(item.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex items-center space-x-1 text-green-500">
                        <SafeIcon icon={FiThumbsUp} className="w-4 h-4" />
                        <span className="text-xs font-medium">{item.userLikes}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-red-500">
                        <SafeIcon icon={FiThumbsDown} className="w-4 h-4" />
                        <span className="text-xs font-medium">{item.userDislikes}</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    {item.price === 0 ? 'Claim' : 'Contact Seller'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Safety Tips */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-2">🛡️ Safety Tips</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Meet in public places for transactions</li>
              <li>• Inspect items carefully before purchasing</li>
              <li>• Trust your instincts - if something feels off, walk away</li>
              <li>• Report suspicious activity to neighborhood administrators</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default MarketplacePage;