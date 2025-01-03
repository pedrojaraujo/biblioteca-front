import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBooks } from '@/services/libraryService';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  return { books, loading };
};
