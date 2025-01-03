'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Navbar from '@/components/NavBar/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/themes/theme';
import { loginUser } from '@/services/libraryService';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(lightTheme);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !password) {
      toast.error('Preencha usuário e senha!');
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser({ user: user, pass: password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        setLogin(true);
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error('Erro ao realizar login. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (login) {
      router.push('/books');
    }
  }, [login, router]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme === 'light' ? lightTheme : darkTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" />
      <Navbar onThemeChange={handleThemeChange} />
      <main className="mt-32 flex h-full w-full items-center justify-center">
        <form
          className="flex h-auto w-[350px] flex-col items-center justify-center gap-5"
          onSubmit={handleLogin}
        >
          <div className="mb-5">
            <Image src="/logo.svg" alt="Logo" width={200} height={200} />
          </div>
          <div className="w-full">
            <TextField
              className="w-full"
              id="username"
              label="Usuário"
              variant="outlined"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="w-full">
            <TextField
              className="w-full"
              id="password"
              label="Senha"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-center">
            <Button
              className="w-3/4"
              variant="outlined"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </Button>
          </div>
        </form>
      </main>
    </ThemeProvider>
  );
}
