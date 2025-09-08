// import React, { useState, useEffect } from 'react';

// import { motion } from 'framer-motion';
// import PostCard from '../components/posts/PostCard';
// import CreatePost from '../components/posts/CreatePost';
// import TrendingSection from '../components/home/TrendingSection';
// import WeatherWidget from '../components/home/WeatherWidget';
// import { usePostStore } from '../store/postStore';

// function HomePage() {
//   const { posts , fetchPosts } = usePostStore();
//   const [filter, setFilter] = useState('all');
//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);
//   const filteredPosts = posts.filter(post => {
//     if (filter === 'all') return true;
//     return post.type === filter;
//   });

//   const filterOptions = [
//     { value: 'all', label: 'All Posts', count: posts.length },
//     { value: 'general', label: 'General', count: posts.filter(p => p.type === 'general').length },
//     { value: 'alert', label: 'Alerts', count: posts.filter(p => p.type === 'alert').length },
//     { value: 'recommendation', label: 'Recommendations', count: posts.filter(p => p.type === 'recommendation').length },
//     { value: 'marketplace', label: 'Marketplace', count: posts.filter(p => p.type === 'marketplace').length },
//     { value: 'event', label: 'Events', count: posts.filter(p => p.type === 'event').length },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Main Feed */}
//           <div className="lg:col-span-3">
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               className="space-y-6"
//             >
//               <CreatePost />
              
//               {/* Filter Tabs */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
//                 <div className="flex flex-wrap gap-2">
//                   {filterOptions.map((option) => (
//                     <motion.button
//                       key={option.value}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setFilter(option.value)}
//                       className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                         filter === option.value
//                           ? 'bg-primary-100 text-primary-700 border border-primary-200'
//                           : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
//                       }`}
//                     >
//                       {option.label}
//                       <span className="ml-2 text-xs bg-white rounded-full px-2 py-1">
//                         {option.count}
//                       </span>
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Posts */}
//               <div className="space-y-4">
//                 {filteredPosts.map((post, index) => (
//                   <motion.div
//                     key={post.id}
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     <PostCard post={post} />
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
          
//           {/* Sidebar */}
//           <div className="space-y-6">
//             <WeatherWidget />
//             <TrendingSection />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  

// }

// export default HomePage;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PostCard from '../components/posts/PostCard';
import CreatePost from '../components/posts/CreatePost';
import TrendingSection from '../components/home/TrendingSection';
import WeatherWidget from '../components/home/WeatherWidget';
import { usePostStore } from '../store/postStore';

function HomePage() {
  const { posts, fetchPosts, isLoading, error } = usePostStore();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

const filteredPosts = posts ? posts.filter(post => {
  if (filter === 'all') return true;
  return post.type === filter;
}) : [];
debugger
  const filterOptions = [
    { value: 'all', label: 'All Posts', count: posts?.length },
    { value: 'general', label: 'General', count: posts?.filter(p => p.type === 'general').length },
    { value: 'alert', label: 'Alerts', count: posts?.filter(p => p.type === 'alert').length },
    { value: 'recommendation', label: 'Recommendations', count: posts?.filter(p => p.type === 'recommendation').length },
    { value: 'marketplace', label: 'Marketplace', count: posts?.filter(p => p.type === 'marketplace').length },
    { value: 'event', label: 'Events', count: posts?.filter(p => p.type === 'event').length },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={fetchPosts}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-6"
            >
              <CreatePost />
              
              {/* Filter Tabs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFilter(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filter === option.value
                          ? 'bg-primary-100 text-primary-700 border border-primary-200'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
                      }`}
                    >
                      {option.label}
                      <span className="ml-2 text-xs bg-white rounded-full px-2 py-1">
                        {option.count}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Posts */}
              <div className="space-y-4">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No posts found. Be the first to share something!</p>
                  </div>
                ) : (
                  filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <WeatherWidget />
            <TrendingSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;