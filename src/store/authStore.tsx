import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { BASE_URL } from '../utils';
import type { AuthStore, IUser } from '../types';

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userProfile: null,
      allUsers: [],

      addUser: (user: IUser) => set({ userProfile: user }),
      removeUser: () => set({ userProfile: null }),

      fetchAllUsers: async () => { 
        try {
          const response = await axios.get(`${BASE_URL}/pages/api/user`);
          set({ allUsers: response.data });
          console.log(response)
        } catch (error) {
          console.error('Fetch Users Error:', error);
        }
      },
    }),
    { name: 'auth' }
  )
);

export default useAuthStore;
