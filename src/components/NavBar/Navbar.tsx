'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useLogado from '@/hooks/useLogado';
import { StyLoginIcon, StyLogoutIcon, NavItem } from './NavBarStyle';
interface NavbarProps {
  onThemeChange: (theme: string) => void;
}

export default function Navbar({ onThemeChange }: NavbarProps) {
  const [theme, setTheme] = useState('light');
  const { logado } = useLogado();

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
  const logoutProvisorio = () => {
    if (logado) {
      localStorage.removeItem('token');
    }
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-around bg-gray-800 p-4 text-base font-bold">
      <div className="flex items-center space-x-2 text-white">
        {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
        <span>{theme === 'light' ? 'Claro' : 'Escuro'}</span>
        <Switch checked={theme === 'dark'} onChange={toggleTheme} />
      </div>
      <div className="text-white">
        <ul className="flex space-x-4">
          <NavItem>
            <Link href={logado ? '/books' : '/'}>Home</Link>
          </NavItem>
          <NavItem>
            <Link href={'/newbook'}>Adicionar livros</Link>
          </NavItem>
        </ul>
      </div>
      <div className="text-white">
        <ul className="flex space-x-4">
          {logado ? (
            <NavItem title="Sair">
              <button onClick={logoutProvisorio}>
                Sair <StyLogoutIcon />
              </button>
            </NavItem>
          ) : (
            <NavItem>
              <Link title="Fazer login" href={'/login'}>
                Entrar <StyLoginIcon />
              </Link>
            </NavItem>
          )}
        </ul>
      </div>
    </nav>
  );
}
