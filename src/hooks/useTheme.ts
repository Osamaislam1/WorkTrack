import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}

const updateThemeClass = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggle: () => 
        set((state) => {
          const newIsDark = !state.isDark;
          updateThemeClass(newIsDark);
          return { isDark: newIsDark };
        }),
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: (state) => {
        // Apply theme on page load
        if (state) {
          updateThemeClass(state.isDark);
        }
      },
    }
  )
);