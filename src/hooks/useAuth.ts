import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email, password) => {
        if (email === 'admin@example.com' && password === 'password') {
          set({ isAuthenticated: true, user: { email } });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
      changePassword: (currentPassword, newPassword) => {
        if (currentPassword === 'password') {
          // In a real app, you'd update the password in a backend
          return true;
        }
        return false;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);