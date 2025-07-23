import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition mt-4"
    >
      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeToggleButton;
