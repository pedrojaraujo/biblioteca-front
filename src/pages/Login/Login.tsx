'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { loginUser } from '@/services/libraryService';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !password) {
      alert('Preencha usuário e senha!');
      return;
    }

    try {
      const data = await loginUser({ user, pass: password });
      if (data.token) {
        setLogin(true);
        console.log('Login bem-sucedido:', data);
        // Salvar token no localStorage, se necessário
        localStorage.setItem('token', data.token);
      } else if (data.error) {
        alert(data.error); // Mostra a mensagem de erro retornada
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      alert('Erro ao realizar login. Tente novamente mais tarde.');
    }
  };
  return (
    <main>
      <form
        className="flex h-auto w-[350px] flex-col items-center justify-center gap-5"
        onSubmit={handleLogin}
      >
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
          <Button className="w-3/4" variant="outlined" type="submit">
            Entrar
          </Button>
        </div>
      </form>
    </main>
  );
}
