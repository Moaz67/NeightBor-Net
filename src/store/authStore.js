import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  
  login: (userData) => {
    set({ user: userData });
    localStorage.setItem('user', JSON.stringify(userData));
  },
  
  logout: async () => {
  
  await fetch("https://localhost:7097/logout", {
    method: "POST",
    credentials: "include", 
  });


  set({ user: null });
  localStorage.removeItem("user");
},

  
  checkAuth: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    }
  },
  
  updateProfile: (updates) => {
    set((state) => {
      const updatedUser = { ...state.user, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  }
}));