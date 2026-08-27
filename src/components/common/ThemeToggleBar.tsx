import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleBarProps {
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggleBar: React.FC<ThemeToggleBarProps> = ({
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      id="theme-toggle-bar"
      role="radiogroup"
      aria-label="Color theme selection"
      className={`inline-flex items-center p-1 rounded-xl bg-[#EFECE3] dark:bg-[#201D1A] border border-[#D8D4C8] dark:border-[#38332B] shadow-2xs transition-colors ${className}`}
    >
      {/* Light Option */}
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'light'}
        onClick={() => setTheme('light')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-serif font-semibold transition-all duration-200 cursor-pointer ${
          theme === 'light'
            ? 'bg-white text-[#1A1A1A] shadow-xs border border-[#D8D4C8] font-bold'
            : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
        } ${size === 'sm' ? 'px-2 py-0.5 text-[11px]' : ''}`}
        title="Switch to Light Theme"
      >
        <Sun className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-amber-600 dark:text-amber-400`} />
        {showLabel && <span>Light</span>}
      </button>

      {/* Dark Option */}
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'dark'}
        onClick={() => setTheme('dark')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-serif font-semibold transition-all duration-200 cursor-pointer ${
          theme === 'dark'
            ? 'bg-[#2A2622] text-[#EDE8DF] shadow-xs border border-[#423D36] font-bold'
            : 'text-[#66625B] dark:text-[#A8A29E] hover:text-[#1A1A1A] dark:hover:text-[#EDE8DF]'
        } ${size === 'sm' ? 'px-2 py-0.5 text-[11px]' : ''}`}
        title="Switch to Dark Theme"
      >
        <Moon className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-indigo-500 dark:text-indigo-400`} />
        {showLabel && <span>Dark</span>}
      </button>
    </div>
  );
};
