
// import { create } from 'zustand';
// import { persist, PersistStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface User {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   role: string;
//   phone:string
// }

// interface UserState {
//   user: User | null;
//   setUser: (user: User) => void;
//   clearUser: () => void;
//    logout: () => void;
// }

// // 👇 Custom persist storage wrapper for AsyncStorage
// const asyncStorage: PersistStorage<UserState> = {
//   getItem: async (name) => {
//     const value = await AsyncStorage.getItem(name);
//     return value ? JSON.parse(value) : null;
//   },
//   setItem: async (name, value) => {
//     await AsyncStorage.setItem(name, JSON.stringify(value));
//   },
//   removeItem: async (name) => {
//     await AsyncStorage.removeItem(name);
//   },
// };

// export const useUserStore = create<UserState>()(
//   persist(
//     (set) => ({
//       user: null,
//       setUser: (user) => set({ user }),
//       clearUser: () => set({ user: null }),
//       logout: () => set({ user: null }), 
//     }),
//     {
//       name: 'user-storage',
//       storage: asyncStorage, // ✅ Uses correct return types
//     }
//   )
// );


import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  logout: () => void;
  updateUser: (updatedFields: Partial<User>) => void; // 👈 added here
}

// 👇 Custom persist storage wrapper for AsyncStorage
const asyncStorage: PersistStorage<UserState> = {
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      logout: () => set({ user: null }),
      updateUser: (updatedFields) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updatedFields },
          });
        }
      },
    }),
    {
      name: 'user-storage',
      storage: asyncStorage,
    }
  )
);

