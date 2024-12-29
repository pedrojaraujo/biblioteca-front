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

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(lightTheme);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !password) {
      setError('Preencha usuário e senha!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await loginUser({ user, pass: password });
      if (data.token) {
        console.log('Login bem-sucedido:', data);
        localStorage.setItem('token', data.token);
        setLogin(true);
      } else if (data.error) {
        setError(data.error); // Mostra a mensagem de erro retornada
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      setError('Erro ao realizar login. Tente novamente mais tarde.');
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
      <Navbar onThemeChange={handleThemeChange} />
      <main className="mt-32 flex h-full w-full items-center justify-center">
        <form
          className="flex h-auto w-[350px] flex-col items-center justify-center gap-5"
          onSubmit={handleLogin}
        >
          <div className="mb-5">
            <Image src="/logo.svg" alt="Logo" width={180} height={180} />
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
          {error && <div className="text-red-500">{error}</div>}
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
