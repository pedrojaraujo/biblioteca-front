'use client';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from '@/components/NavBar/Navbar';
import { useTheme } from '@/hooks/useThemes';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { addBook } from '@/services/libraryService';
import { BookCreate } from '@/interfaces/bookinfo';
import { ToastContainer, toast } from 'react-toastify';

export default function NewBook() {
  const { theme, handleThemeChange } = useTheme();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !author) {
      toast.error('Preencha todos os campos!');
      return;
    }

    try {
      const newBook: BookCreate = { title, author };
      addBook(newBook);
      toast.success('Livro adicionado com sucesso!');
      setTitle('');
      setAuthor('');
    } catch (error) {
      console.error(error);
      toast.error('ERRO! Livro não adicionado...');
      setTitle('');
      setAuthor('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" />
      <div className="flex flex-col gap-14">
        <header>
          <Navbar onThemeChange={handleThemeChange} />
        </header>
        <section className="flex w-full justify-center">
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Adicione um novo livro
            </Typography>
            <TextField
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Enviar
            </Button>
          </Box>
        </section>
      </div>
    </ThemeProvider>
  );
}
