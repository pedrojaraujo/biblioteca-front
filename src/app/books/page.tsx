'use client';
import { ThemeProvider } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Navbar from '@/components/NavBar/Navbar';
import { useBooks } from '@/hooks/useBooks';
import { useTheme } from '@/hooks/useThemes';
import { Book } from '@/interfaces/bookinfo';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteBook } from '@/services/libraryService';
import { BookDelete } from '@/interfaces/bookinfo';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function BooksPage() {
  const { books, loading, setBooks } = useBooks();
  const { theme, handleThemeChange } = useTheme();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const handleOpenConfirmation = (bookId: number) => {
    setSelectedBookId(bookId);
    setConfirmOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmOpen(false);
    setSelectedBookId(null);
  };

  const handleDeleteConfirmed = async () => {
    if (selectedBookId) {
      try {
        await deleteBook({ id: selectedBookId });
        setBooks((prevBooks) =>
          prevBooks.filter((book: BookDelete) => book.id !== selectedBookId)
        );
        toast.success('Livro deletado com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar o livro:', error);
        toast.error('Erro ao deletar o livro. Tente novamente mais tarde.');
      }
    }
    setConfirmOpen(false);
    setSelectedBookId(null);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!books.length) {
    return <div>Nenhum livro disponível no momento.</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" />
      <div className="flex w-full flex-col justify-center gap-14">
        <header>
          <Navbar onThemeChange={handleThemeChange} />
        </header>
        <main className="flex h-auto flex-col items-center justify-center">
          <Grid container spacing={5} sx={{ padding: 2 }}>
            {books.map((book: Book) => (
              <Grid size={2} spacing={3} key={book.id}>
                <Card sx={{ width: 200, position: 'relative' }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height={80}
                      image={book.imageURL || '/book.jpg'}
                      alt={book.title || 'Livro sem título'}
                    />
                    <IconButton
                      onClick={() => handleOpenConfirmation(book.id)}
                      aria-label="delete"
                      sx={{
                        position: 'absolute',
                        top: 3,
                        right: 3,
                        zIndex: 10,
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <CardContent>
                    <Typography variant="h6" fontSize={16} component="div">
                      {book.title.length > 20
                        ? book.title.substring(0, 20) + '...'
                        : book.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontSize={12}
                      color="text.secondary"
                    >
                      Autor: {book.author}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Dialog open={confirmOpen} onClose={handleCloseConfirmation}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
              Tem certeza de que deseja deletar este livro?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmation}>Cancelar</Button>
              <Button onClick={handleDeleteConfirmed} color="error">
                Deletar
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    </ThemeProvider>
  );
}
