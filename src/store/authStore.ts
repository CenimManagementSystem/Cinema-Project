import { create } from 'zustand';
import { User, AuthState, UserRole } from '@/types/auth';

interface AuthStore extends AuthState {
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  register: (name: string, email: string) => void;
  switchRole: (role: UserRole) => void;
}

const DEFAULT_USER: User = {
  id: 'u-1',
  name: 'Alex Mercer',
  email: 'alex.mercer@cinematique.com',
  role: 'ADMIN', // default to admin for instant access to admin dashboard
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  phone: '+1 (555) 234-5678',
  createdAt: '2025-01-15T08:00:00Z',
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: DEFAULT_USER,
  isAuthenticated: true,
  token: 'mock-jwt-token-cinematique-2026',

  login: (email: string, role: UserRole = 'USER') => {
    const user: User = {
      id: `u-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString(),
    };
    set({ user, isAuthenticated: true, token: 'mock-token' });
  },

  register: (name: string, email: string) => {
    const user: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      role: 'USER',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString(),
    };
    set({ user, isAuthenticated: true, token: 'mock-token' });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, token: null });
  },

  switchRole: (role: UserRole) => {
    set((state) => ({
      user: state.user ? { ...state.user, role } : null,
    }));
  },
}));
