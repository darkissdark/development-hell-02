import axios from 'axios';

const baseUrl = 'https://books-backend.p.goit.global/';

// Перелік категорій книг
// https://books-backend.p.goit.global/books/category-list
// Популярні книги, що належать до усіх категорій
// https://books-backend.p.goit.global/books/top-books
// Книги окремої категорії
// https://books-backend.p.goit.global/books/category?category=$
// Детальна інформація про книгу
// https://books-backend.p.goit.global/books/bookId

// const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
// const BASE_URL = 'https://pixabay.com/api/';
// export const PER_PAGE_COUNT = 15;

// export async function getImagesByQuery(query, page = 1) {
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         key: API_KEY,
//         q: query,
//         page,
//         per_page: PER_PAGE_COUNT,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export default getImagesByQuery;
