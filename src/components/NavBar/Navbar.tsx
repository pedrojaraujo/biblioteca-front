'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface NavbarProps {
  onThemeChange: (theme: string) => void;
}

export default function Navbar({ onThemeChange }: NavbarProps) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    onThemeChange(savedTheme);
  }, [onThemeChange]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    onThemeChange(newTheme);
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 px-20">
      <div className="flex items-center space-x-2 text-white">
        {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
        <span>{theme === 'light' ? 'Claro' : 'Escuro'}</span>
        <Switch checked={theme === 'dark'} onChange={toggleTheme} />
      </div>
      <div className="text-white">
        <ul className="flex space-x-4">
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/login'}>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
