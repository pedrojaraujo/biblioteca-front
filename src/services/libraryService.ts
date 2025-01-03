import { UserInfo } from '@/interfaces/user';
import apiClient from './apiClient';
import { BookCreate, BookDelete, Book } from '@/interfaces/bookinfo';

export const loginUser = async (userInfo: UserInfo) => {
  try {
    const response = await apiClient.post('/login', userInfo);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
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

export const updateBook = async (bookInfo: Book) => {
  const response = await apiClient.put('/update-book', bookInfo);
  return response.data;
};

export const deleteBook = async (bookInfo: BookDelete) => {
  const response = await apiClient.delete('/delete-book', { data: bookInfo });
  return response.data;
};
