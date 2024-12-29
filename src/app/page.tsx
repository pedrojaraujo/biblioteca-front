"use client"

import Navbar from '@/components/NavBar/Navbar';
import { useState } from 'react';
import { darkTheme, lightTheme } from '@/themes/theme';
import { ThemeProvider } from '@emotion/react';

export default function Home() {
  const [theme, setTheme] = useState(lightTheme);
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme === 'light' ? lightTheme : darkTheme);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <header>
          <Navbar onThemeChange={handleThemeChange} />
        </header>
      </ThemeProvider>
    </>
  );
}
