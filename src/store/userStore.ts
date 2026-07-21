import { create } from 'zustand'

export interface User {
  id: string
  name: string
  email: string
}

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

// Global state that outlives a single feature. Anything that only
// matters inside one feature belongs in that feature's own store instead.
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
