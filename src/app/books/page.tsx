'use client';
import { ThemeProvider } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Navbar from '@/components/NavBar/Navbar';
import { useBooks } from '@/hooks/useBooks';
import { useTheme } from '@/hooks/useThemes';
import { Book } from '@/interfaces/bookinfo';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BooksPage() {
  const { books, loading } = useBooks();
  const { theme, handleThemeChange } = useTheme();

  if (loading) {
    return <div>Carregando livros...</div>;
  }

  if (!books.length) {
    return <div>Nenhum livro disponível no momento.</div>;
  }

  const handleDelete = (bookId: number) => {
    // Adicione a lógica para deletar o livro aqui
    console.log(`Deletar livro com ID: ${bookId}`);
  };

  return (
    <ThemeProvider theme={theme}>
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
                      onClick={() => handleDelete(book.id)}
                      aria-label="delete"
                      sx={{
                        position: 'absolute',
                        top: 3,
                        right:3,
                        zIndex: 10,
                      }}
                      color='error'
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
                    <Typography variant="body2" fontSize={12} color="text.secondary">
                      Autor: {book.author}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
      </div>
    </ThemeProvider>
  );
}
