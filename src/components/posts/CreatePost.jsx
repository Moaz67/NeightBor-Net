import React, { useState,useRef  } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';

const { FiImage, FiMapPin, FiAlertTriangle, FiShoppingBag, FiCalendar, FiThumbsUp, FiX } = FiIcons;

const postTypes = [
  { id: 'general', label: 'General', icon: FiThumbsUp, color: 'blue' },
  { id: 'alert', label: 'Alert', icon: FiAlertTriangle, color: 'red' },
  { id: 'recommendation', label: 'Recommendation', icon: FiThumbsUp, color: 'green' },
  { id: 'marketplace', label: 'Marketplace', icon: FiShoppingBag, color: 'purple' },
  { id: 'event', label: 'Event', icon: FiCalendar, color: 'indigo' },
];

function CreatePost() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedType, setSelectedType] = useState('general');
  const [imagePreview, setImagePreview] = useState(null);
  
  const { register, handleSubmit, reset, watch } = useForm();
  const { addPost, fetchPosts } = usePostStore();
  const { user } = useAuthStore();
const fileRef = useRef(null);
  const content = watch('content');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    const formData = new FormData();
    formData.append("type", selectedType);
    formData.append("detail", data.content);
    formData.append("userId", 1); 

    if (data.price) {
      formData.append("price", data.price);
    }
    if (data.isUrgent) {
      formData.append("urgent", true);
    }
    if (fileRef.current) {
      formData.append("image", fileRef.current); 
    }

    await addPost(formData); 

    reset();
    setImagePreview(null);
    setIsExpanded(false);
    setSelectedType("general");
    toast.success("Post shared with your neighborhood!");
    await fetchPosts();
  } catch (error) {
    console.error("Error creating post:", error);
    toast.error(error.message || "Failed to create post");
  } finally {
    setIsSubmitting(false);
  }
};


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // const reader = new FileReader();
      // reader.onload = (e) => setImagePreview(e.target.result);
      // reader.readAsDataURL(file);
       fileRef.current = file; 
    setImagePreview(URL.createObjectURL(file)); 
    }
  };

  // return (
  //   <motion.div
  //     initial={{ y: 20, opacity: 0 }}
  //     animate={{ y: 0, opacity: 1 }}
  //     className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
  //   >
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //       <div className="p-6">
  //         {/* Header */}
  //         <div className="flex items-center space-x-3 mb-4">
  //           <img
  //             src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
  //             alt="Your avatar"
  //             className="w-12 h-12 rounded-full object-cover"
  //           />
  //           <div className="flex-1">
  //             <textarea
  //               {...register('content')}
  //               placeholder="What's happening in your neighborhood?"
  //               className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
  //               rows={isExpanded ? 4 : 2}
  //               onFocus={() => setIsExpanded(true)}
  //             />
  //           </div>
  //         </div>

  //         {/* Post Type Selection */}
  //         {isExpanded && (
  //           <motion.div
  //             initial={{ opacity: 0, height: 0 }}
  //             animate={{ opacity: 1, height: 'auto' }}
  //             className="mb-4"
  //           >
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Post Type
  //             </label>
  //             <div className="flex flex-wrap gap-2">
  //               {postTypes.map((type) => (
  //                 <motion.button
  //                   key={type.id}
  //                   type="button"
  //                   whileHover={{ scale: 1.02 }}
  //                   whileTap={{ scale: 0.98 }}
  //                   onClick={() => setSelectedType(type.id)}
  //                   className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
  //                     selectedType === type.id
  //                       ? `bg-${type.color}-100 text-${type.color}-700 border border-${type.color}-200`
  //                       : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
  //                   }`}
  //                 >
  //                   <SafeIcon icon={type.icon} className="w-4 h-4" />
  //                   <span>{type.label}</span>
  //                 </motion.button>
  //               ))}
  //             </div>
  //           </motion.div>
  //         )}

  //         {/* Price Input for Marketplace */}
  //         {isExpanded && selectedType === 'marketplace' && (
  //           <motion.div
  //             initial={{ opacity: 0, height: 0 }}
  //             animate={{ opacity: 1, height: 'auto' }}
  //             className="mb-4"
  //           >
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Price (optional)
  //             </label>
  //             <div className="relative">
  //               <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
  //               <input
  //                 {...register('price')}
  //                 type="number"
  //                 step="0.01"
  //                 min="0"
  //                 placeholder="0.00"
  //                 className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  //               />
  //             </div>
  //           </motion.div>
  //         )}

  //         {/* Image Preview */}
  //         {imagePreview && (
  //           <motion.div
  //             initial={{ opacity: 0, scale: 0.9 }}
  //             animate={{ opacity: 1, scale: 1 }}
  //             className="mb-4 relative"
  //           >
  //             <img
  //               src={imagePreview}
  //               alt="Preview"
  //               className="w-full h-48 object-cover rounded-lg"
  //             />
  //             <motion.button
  //               type="button"
  //               whileHover={{ scale: 1.1 }}
  //               whileTap={{ scale: 0.9 }}
  //               onClick={() => setImagePreview(null)}
  //               className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
  //             >
  //               <SafeIcon icon={FiX} className="w-4 h-4" />
  //             </motion.button>
  //           </motion.div>
  //         )}
  //       </div>

  //       {/* Actions */}
  //       {isExpanded && (
  //         <motion.div
  //           initial={{ opacity: 0, height: 0 }}
  //           animate={{ opacity: 1, height: 'auto' }}
  //           className="px-6 py-4 bg-gray-50 border-t border-gray-200"
  //         >
  //           <div className="flex items-center justify-between">
  //             <div className="flex items-center space-x-4">
  //               <label className="cursor-pointer">
  //                 <input
  //                   type="file"
  //                   accept="image/*"
  //                   onChange={handleImageUpload}
  //                   className="hidden"
  //                 />
  //                 <motion.div
  //                   whileHover={{ scale: 1.05 }}
  //                   whileTap={{ scale: 0.95 }}
  //                   className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
  //                 >
  //                   <SafeIcon icon={FiImage} className="w-5 h-5" />
  //                   <span className="text-sm font-medium">Add Photo</span>
  //                 </motion.div>
  //               </label>
                
  //               <div className="flex items-center space-x-2 text-gray-500 text-sm">
  //                 <SafeIcon icon={FiMapPin} className="w-4 h-4" />
  //                 <span>Maple Heights</span>
  //               </div>
  //             </div>

  //             <div className="flex items-center space-x-3">
  //               <motion.button
  //                 type="button"
  //                 whileHover={{ scale: 1.02 }}
  //                 whileTap={{ scale: 0.98 }}
  //                 onClick={() => {
  //                   setIsExpanded(false);
  //                   reset();
  //                   setImagePreview(null);
  //                   setSelectedType('general');
  //                 }}
  //                 className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
  //               >
  //                 Cancel
  //               </motion.button>
                
  //               <motion.button
  //                 type="submit"
  //                 whileHover={{ scale: 1.02 }}
  //                 whileTap={{ scale: 0.98 }}
  //                 disabled={!content?.trim()}
  //                 className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
  //               >
  //                 Share Post
  //               </motion.button>
  //             </div>
  //           </div>
  //         </motion.div>
  //       )}
  //     </form>
  //   </motion.div>
  // );
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
              alt="Your avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                {...register('content')}
                placeholder="What's happening in your neighborhood?"
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                rows={isExpanded ? 4 : 2}
                onFocus={() => setIsExpanded(true)}
              />
            </div>
          </div>

          {/* Post Type Selection */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Type
              </label>
              <div className="flex flex-wrap gap-2">
                {postTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedType === type.id
                        ? `bg-${type.color}-100 text-${type.color}-700 border border-${type.color}-200`
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
                    }`}
                  >
                    <SafeIcon icon={type.icon} className="w-4 h-4" />
                    <span>{type.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Price Input for Marketplace */}
          {isExpanded && selectedType === 'marketplace' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  {...register('price')}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </motion.div>
          )}

          {/* Urgent Checkbox for Alerts */}
          {isExpanded && selectedType === 'alert' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4"
            >
              <label className="flex items-center">
                <input
                  {...register('isUrgent')}
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Mark as urgent</span>
              </label>
            </motion.div>
          )}

          {/* Image Preview */}
          {imagePreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 relative"
            >
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
              >
                <SafeIcon icon={FiX} className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Actions */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="px-6 py-4 bg-gray-50 border-t border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiImage} className="w-5 h-5" />
                    <span className="text-sm font-medium">Add Photo</span>
                  </motion.div>
                </label>
                
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                  <span>{user?.neighborhood || 'Your Neighborhood'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsExpanded(false);
                    reset();
                    setImagePreview(null);
                    setSelectedType('general');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!content?.trim() || isSubmitting}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  {isSubmitting ? 'Posting...' : 'Share Post'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}

export default CreatePost;