import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <>
          <Sun className="w-5 h-5 mr-2" />
          Light Mode
        </>
      ) : (
        <>
          <Moon className="w-5 h-5 mr-2" />
          Dark Mode
        </>
      )}
    </button>
  );
}