// import React from 'react';
// import { motion } from 'framer-motion';
// import { formatDistanceToNow } from 'date-fns';
// import SafeIcon from '../../common/SafeIcon';
// import * as FiIcons from 'react-icons/fi';

// const { FiHeart, FiMessageCircle, FiShare2, FiFlag, FiMapPin, FiAlertTriangle, FiDollarSign } = FiIcons;

// function PostCard({ post }) {
//   const getPostTypeIcon = () => {
//     switch (post.type) {
//       case 'alert':
//         return <SafeIcon icon={FiAlertTriangle} className="w-4 h-4 text-red-500" />;
//       case 'marketplace':
//         return <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-green-500" />;
//       default:
//         return null;
//     }
//   };

//   const getPostTypeStyle = () => {
//     switch (post.type) {
//       case 'alert':
//         return 'border-l-4 border-red-500 bg-red-50';
//       case 'marketplace':
//         return 'border-l-4 border-green-500 bg-green-50';
//       case 'event':
//         return 'border-l-4 border-purple-500 bg-purple-50';
//       case 'recommendation':
//         return 'border-l-4 border-blue-500 bg-blue-50';
//       default:
//         return 'border-l-4 border-gray-200';
//     }
//   };
//   const handleLike = async () => {
//     try {
//       const res = await fetch(`https://localhost:7097/api/posts/${post.id}/like`, {
//         method: "POST"
//       });
//       if (res.ok) {
//         const newLikes = await res.json();
//         setLikes(newLikes);
//       }
//     } catch (err) {
//       console.error("Error liking post:", err);
//     }
//   };

//   const handleComment = async () => {
//     const text = prompt("Enter your comment:");
//     if (!text) return;

//     try {
//       const res = await fetch(`https://localhost:7097/api/posts/${post.id}/comment`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(text)
//       });
//       if (res.ok) {
//         const newComments = await res.json();
//         setComments(newComments);
//       }
//     } catch (err) {
//       console.error("Error commenting:", err);
//     }
//   };
//   return (
//     <motion.div
//       whileHover={{ y: -2 }}
//       className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${getPostTypeStyle()}`}
//     >
//       <div className="p-6">
//         {/* Header */}
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex items-center space-x-3">
//             <img
//               src={post.user?.image}
//               alt={post.author}
//               className="w-12 h-12 rounded-full object-cover"
//             />
//             <div>
//               <div className="flex items-center space-x-2">
//                 <h3 className="font-semibold text-gray-900">{post.user?.firstName}</h3>
//                 {getPostTypeIcon()}
//               </div>
//               <div className="flex items-center space-x-2 text-sm text-gray-500">
//                 <SafeIcon icon={FiMapPin} className="w-3 h-3" />
//                 <span>{post.neighborhood}</span>
//                 <span>•</span>
//                 <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })} </span>
//               </div>
//             </div>
//           </div>
          
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <SafeIcon icon={FiFlag} className="w-4 h-4" />
//           </motion.button>
//         </div>
        
//         {/* Content */}
//         <div className="mb-4">
//           <p className="text-gray-800 leading-relaxed">{post.detail}</p>
          
//           {post.image && (
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               className="mt-4 rounded-lg overflow-hidden"
//             >
//               <img
//                 src={post.image}
//                 alt="Post attachment"
//                 className="w-full h-64 object-cover"
//               />
//             </motion.div>
//           )}
          
//           {post.price && (
//             <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//               <SafeIcon icon={FiDollarSign} className="w-4 h-4 mr-1" />
//               ${post.price}
//             </div>
//           )}
//         </div>
        
//         {/* Actions */}
//         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//           <div className="flex items-center space-x-6">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
//             >
//               <SafeIcon icon={FiHeart} className="w-5 h-5" />
//               <span className="text-sm font-medium">{post.likes}</span>
//             </motion.button>
            
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
//             >
//               <SafeIcon icon={FiMessageCircle} className="w-5 h-5" />
//               <span className="text-sm font-medium">{post.comments}</span>
//             </motion.button>
            
//             {/* <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
//             >
//               <SafeIcon icon={FiShare2} className="w-5 h-5" />
//               <span className="text-sm font-medium">Share</span>
//             </motion.button> */}
//           </div>
          
//           {post.urgent && (
//             <div className="flex items-center space-x-2 text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm font-medium">
//               <SafeIcon icon={FiAlertTriangle} className="w-4 h-4" />
//               <span>Urgent</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default PostCard;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import SafeIcon from "../../common/SafeIcon";
import * as FiIcons from "react-icons/fi";

const { FiHeart, FiMessageCircle, FiFlag, FiMapPin, FiAlertTriangle, FiDollarSign } = FiIcons;

function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const getPostTypeIcon = () => {
    switch (post.type) {
      case "alert":
        return <SafeIcon icon={FiAlertTriangle} className="w-4 h-4 text-red-500" />;
      case "marketplace":
        return <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getPostTypeStyle = () => {
    switch (post.type) {
      case "alert":
        return "border-l-4 border-red-500 bg-red-50";
      case "marketplace":
        return "border-l-4 border-green-500 bg-green-50";
      case "event":
        return "border-l-4 border-purple-500 bg-purple-50";
      case "recommendation":
        return "border-l-4 border-blue-500 bg-blue-50";
      default:
        return "border-l-4 border-gray-200";
    }
  };

const handleLike = async () => {
  try {
   const res = await fetch(`https://localhost:7097/api/Posts/like?id=${post.id}`, {
  method: "POST",
  credentials: "include",
    });

    if (res.ok) {
      const newLikes = await res.json();
      setLikes(newLikes);
      setLiked(true); 
    } else {
      console.error("Failed to like post", await res.text());
    }
  } catch (err) {
    console.error("Error liking post:", err);
  }
};


  const handleComment = async () => {
    const text = prompt("Enter your comment:");
    if (!text) return;

    try {
      const res = await fetch(`https://localhost:7097/api/posts/${post.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( text ),
      });
      if (res.ok) {
       
          const newComment = await res.json();
        setComments(prev => [...prev, newComment]);
        setShowComments(true); 
      }
    } catch (err) {
      console.error("Error commenting:", err);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${getPostTypeStyle()}`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={post.user?.image}
              alt={post.author}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{post.user?.firstName}</h3>
                {getPostTypeIcon()}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <SafeIcon icon={FiMapPin} className="w-3 h-3" />
                <span>{post.neighborhood}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })} </span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiFlag} className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-800 leading-relaxed">{post.detail}</p>

          {post.image && (
            <motion.div whileHover={{ scale: 1.02 }} className="mt-4 rounded-lg overflow-hidden">
              <img src={post.image} alt="Post attachment" className="w-full h-64 object-cover" />
            </motion.div>
          )}

          {post.price && (
            <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <SafeIcon icon={FiDollarSign} className="w-4 h-4 mr-1" />
              ${post.price}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            {/* Like */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                liked ? "text-red-500" : "text-gray-600 hover:text-red-500"
              }`}
            >
              <SafeIcon icon={FiHeart} className="w-5 h-5" />
              <span className="text-sm font-medium">{likes}</span>
            </motion.button>

            {/* Comment */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <SafeIcon icon={FiMessageCircle} className="w-5 h-5" />
              <span className="text-sm font-medium">{comments.length}</span>
            </motion.button>
          </div>

          {post.urgent && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm font-medium">
              <SafeIcon icon={FiAlertTriangle} className="w-4 h-4" />
              <span>Urgent</span>
            </div>
          )}
        </div>

        {/* Comment Section */}
        {showComments && (
          <div className="mt-4 border-t pt-3 space-y-2">
            {comments.map((c, idx) => (
              <div key={idx} className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                {c.text}
              </div>
            ))}
            <button
              onClick={handleComment}
              className="text-sm text-blue-500 hover:underline"
            >
              Add a comment
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default PostCard;
