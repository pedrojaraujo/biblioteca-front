import { useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '@/themes/theme';

export const useTheme = () => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme === 'light' ? lightTheme : darkTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme === 'light' ? lightTheme : darkTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return { theme, handleThemeChange };
};
