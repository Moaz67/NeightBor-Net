import { create } from 'zustand';
import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7097",
});
export const usePostStore = create((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  // posts: [
  //   {
  //     id: 1,
  //     type: 'general',
  //     author: 'Sarah Johnson',
  //     avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face',
  //     content: 'Does anyone know a good plumber in the area? Our kitchen sink is acting up!',
  //     timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  //     likes: 12,
  //     comments: 8,
  //     neighborhood: 'Maple Heights'
  //   },
  //   {
  //     id: 2,
  //     type: 'alert',
  //     author: 'Community Safety Team',
  //     avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  //     content: '⚠️ SAFETY ALERT: Suspicious activity reported on Oak Street. Please be vigilant and report any unusual behavior to local authorities.',
  //     timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  //     likes: 45,
  //     comments: 23,
  //     neighborhood: 'Maple Heights',
  //     urgent: true
  //   },
  //   {
  //     id: 3,
  //     type: 'recommendation',
  //     author: 'Mike Chen',
  //     avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  //     content: 'Highly recommend Tony\'s Pizza on Main Street! Amazing service and the best pepperoni pizza I\'ve had in years. 🍕',
  //     timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
  //     likes: 28,
  //     comments: 15,
  //     neighborhood: 'Maple Heights'
  //   },
  //   {
  //     id: 4,
  //     type: 'event',
  //     author: 'Lisa Rodriguez',
  //     avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  //     content: '🎉 Community Garage Sale this Saturday 9 AM - 4 PM at Riverside Park! Come find some treasures and meet your neighbors.',
  //     timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  //     likes: 67,
  //     comments: 34,
  //     neighborhood: 'Maple Heights'
  //   },
  //   {
  //     id: 5,
  //     type: 'marketplace',
  //     author: 'David Wilson',
  //     avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  //     content: 'FOR SALE: Barely used exercise bike $150. Perfect condition, moving sale. DM me if interested!',
  //     timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
  //     likes: 19,
  //     comments: 7,
  //     neighborhood: 'Maple Heights',
  //     price: 150,
  //     image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  //   }
  // ],
   fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      debugger
      const response = await api.get('/api/posts');
      set({ posts: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching posts:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch posts',
        isLoading: false 
      });
    }
  },

  
  // addPost: (post) => {
  //   const newPost = {
  //     ...post,
  //     id: Date.now(),
  //     timestamp: new Date(),
  //     likes: 0,
  //     comments: 0,
  //     neighborhood: 'Maple Heights'
  //   };
  //   set((state) => ({ posts: [newPost, ...state.posts] }));
  // },
  // addPost: async (postData) => {
  //   try {
  //     debugger
  //     const response = await api.post('/api/posts', postData);
  //     const newPost = response.data;
      
      
  //     set((state) => ({
  //       posts: [newPost, ...state.posts]
  //     }));
      
  //     return newPost;
  //   } catch (error) {
  //     console.error('Error creating post:', error);
  //     throw error.response?.data || error;
  //   }
  // },
   addPost : async (formData) => {
  const res = await api.post("/api/posts", formData, {
    method: "POST",
    body: formData, 
  });
  if (res.status!=200) throw new Error("Failed to create post");
  //return res.json();
},

  updatePost: async (postId, updates) => {
    try {
      const response = await api.put(`/api/posts/${postId}`, updates);
      const updatedPost = response.data;
      
      set((state) => ({
        posts: state.posts.map(post => 
          post.id === postId ? { ...post, ...updatedPost } : post
        )
      }));
      
      return updatedPost;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error.response?.data || error;
    }
  },
   deletePost: async (postId) => {
    try {
      await api.delete(`/api/posts/${postId}`);
      
      set((state) => ({
        posts: state.posts.filter(post => post.id !== postId)
      }));
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error.response?.data || error;
    }
  },
  likePost: async (postId) => {
    try {
      const response = await api.post(`/api/posts/${postId}/like`);
      const { likes } = response.data;
      
      set((state) => ({
        posts: state.posts.map(post => 
          post.id === postId ? { ...post, likes } : post
        )
      }));
      
      return likes;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error.response?.data || error;
    }
  },
  
  addComment: (postId) => {
    set((state) => ({
      posts: state.posts.map(post =>
        post.id === postId ? { ...post, comments: (post.comments || 0) + 1 } : post
      )
    }));
  }
}));