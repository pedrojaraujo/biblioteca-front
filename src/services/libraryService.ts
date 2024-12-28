import { UserInfo } from '@/interfaces/user';
import apiClient from './apiClient';
import { BookCreate, BookDelete, BookUpdate } from '@/interfaces/bookinfo';

export const loginUser = async (userInfo: UserInfo) => {
  try {
    const response = await apiClient.post('/login', userInfo);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Erros enviados pelo back-end
      return error.response.data; // Retorna a mensagem de erro do back-end
    } else {
      // Erros genéricos
      throw new Error('Erro na conexão com o servidor');
    }
  }
};

export const getBooks = async () => {
  const response = await apiClient.get('/books');
  return response.data;
};

export const addBook = async (bookInfo: BookCreate) => {
  const response = await apiClient.post('/add-book', bookInfo);
  return response.data;
};

export const updateBook = async (bookInfo: BookUpdate) => {
  const response = await apiClient.put('/update-book', bookInfo);
  return response.data;
};

export const deleteBook = async (bookInfo: BookDelete) => {
  const response = await apiClient.delete('/delete-book', { data: bookInfo });
  return response.data;
};
