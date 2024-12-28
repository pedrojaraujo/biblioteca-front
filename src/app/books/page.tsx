'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBooks } from '@/services/libraryService';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'author', headerName: 'Nome do autor', width: 250 },
  { field: 'title', headerName: 'Nome do livro', width: 250 },
];

export default function Books() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
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

  if (loading) {
    return <div>Carregando livros...</div>;
  }

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center">
      <Paper sx={{ height: 400, width: '40%' }}>
        <DataGrid
          rows={books} // Dados dinâmicos
          columns={columns}
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
  );
}
