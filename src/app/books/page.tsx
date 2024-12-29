"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../../components/NavBar/Navbar';
import { lightTheme, darkTheme } from '@/themes/theme';
import { getBooks } from '@/services/libraryService'; // Certifique-se de importar a função de busca de livros

export default function BooksPage() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [theme, setTheme] = useState(lightTheme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error: any) {
        console.error('Erro ao carregar livros:', error);

        if (error.response?.status === 401) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [router]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme === 'light' ? lightTheme : darkTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme === 'light' ? lightTheme : darkTheme);
  };

  if (loading) {
    return <div>Carregando livros...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <header>
        <Navbar onThemeChange={handleThemeChange} />
      </header>
      <main className="mt-48 flex h-full max-h-screen w-full flex-col items-center justify-center">
        <Paper sx={{ height: 400, width: '40%' }}>
          <DataGrid
            rows={books} // Dados dinâmicos
            columns={[
              { field: 'id', headerName: 'ID', width: 90 },
              { field: 'title', headerName: 'Título', width: 150 },
              { field: 'author', headerName: 'Autor', width: 150 },
              // Adicione mais colunas conforme necessário
            ]}
            localeText={{
              MuiTablePagination: {
                labelRowsPerPage: 'Linhas por página',
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </main>
    </ThemeProvider>
  );
}