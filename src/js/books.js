/* ===== Импорт библиотек ===== */
import Accordion from 'accordion-js';
import iziToast from 'izitoast';

/* ===== импорт именных переменных ===== */
import { refs } from './refs';
import { getDataOnRequest, getBooksByCategory } from './books-api';
import {
  renderCategories,
  renderBooks,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './render-functions';

/* ===== аккордион ===== */
const acc = new Accordion('.js-accordion-container', {
  duration: 1000,
  showMultiple: true,
});

/* ===== Переменные для API ===== */
const allBookCategories = 'books/category-list/';
const categoriesOfTopBooks = 'books/top-books/';
const booksAllCategory = 'books/category/';

// ======= Переменные пагинации =======
let originalBooks = []; // основной массив (оригинальные данные после фильтрации)
let visibleBooks = []; // массив для текущей порции на рендер
let page = 1;
let booksPerPage = 10; // по умолчанию, можно менять в зависимости от ширины
let totalCards = null;
let loadedCards = null;

let booksCategories = null;
hideLoadMoreButton();

// ======= Инициализация =======
async function initPage() {
  try {
    const categories = await getDataOnRequest(allBookCategories);
    renderCategories(categories);

    const topBooksRaw = await getDataOnRequest(categoriesOfTopBooks);

    if (!topBooksRaw || !topBooksRaw.length) {
      iziToast.warning({
        message:
          'Sorry, there are currently no books in this category. Please contact us later.',
        position: 'topRight',
      });
      return;
    }
    const books = extractBooks(topBooksRaw);
    setBooksPerPage();
    paginateBooks(books);
  } catch (error) {
    console.error('Ошибка при инициализации страницы:', error.message);
    // iziToast.error({ message: 'Ошибка при загрузке данных.', position: 'topRight' });
  }
}

/* ===== Устанавливает количество загружаемых карт на странице за раз ===== */
function setBooksPerPage() {
  const width = window.innerWidth;

  if (width < 768) {
    booksPerPage = 10;
  } else {
    booksPerPage = 24;
  }
}
/* ===== Проверка изменения разрешения экрана ===== */
window.addEventListener('resize', () => {
  const prev = booksPerPage;
  setBooksPerPage();

  if (booksPerPage !== prev && originalBooks.length > 0) {
    page = 1;
    visibleBooks = [];
    paginateBooks(originalBooks);
  }
});

/* ===== Объединить все массивы в один ===== */
function extractBooks(bookData) {
  const data = bookData.flatMap(({ books }) => books);
  return removeDuplicateBooks(data);
}

/* ===== Удалить повторяющиеся книги по title ===== */
function removeDuplicateBooks(books) {
  const seenTitles = new Set();
  const uniqueBooks = books.filter(book => {
    if (seenTitles.has(book.title)) return false;
    seenTitles.add(book.title);
    return true;
  });

  if (uniqueBooks.length === 0) {
    iziToast.warning({
      message: 'No books available to display.',
      position: 'topRight',
    });
    return;
  }

  return uniqueBooks;
}
/* ======= Пагинация и отправка на отрисовку ======= */
function paginateBooks(rawBooksData) {
  hideLoadMoreButton();

  if (originalBooks.length === 0) {
    // при первоначальной загрузке массива
    originalBooks = rawBooksData;
    totalCards = originalBooks.length;
  }

  const totalPages = Math.ceil(originalBooks.length / booksPerPage);
  if (loadedCards % booksPerPage != 0) {
    page = 1;
    loadedCards = 0;
    visibleBooks = [];
    clearBooks();
  }

  if (totalPages > page) {
    const start = (page - 1) * booksPerPage;
    const end = start + booksPerPage;
    visibleBooks = originalBooks.slice(start, end);
  } else {
    const start = (page - 1) * booksPerPage;
    const end = originalBooks.length;
    visibleBooks = originalBooks.slice(start, end);
    originalBooks = [];
  }

  loadedCards += visibleBooks.length;

  refs.pageEl.textContent = `Showing ${loadedCards} of ${totalCards}`;
  if (visibleBooks.length < booksPerPage || originalBooks.length === 0) {
    scrollByUp();
    renderBooks(visibleBooks);
    visibleBooks = [];
    page = 1;
    iziToast.info({
      message:
        'Sorry, all books in this category are displayed. Please look at books in another category.',
      position: 'topRight',
    });
    return;
  }

  if (page === 1) {
    refs.bookCard.innerHTML = '';
  }
  if (loadedCards != booksPerPage) {
    scrollByUp();
  }
  renderBooks(visibleBooks);
  page++;
  showLoadMoreButton();
}

/* ======= отрисовка модалки ======= */
export async function handleBookDetails(event) {
  const btn = event.target.closest('.js-book-info-btn');
  if (!btn) return;
  console.log('click');

  const bookId = btn.dataset.id;
  if (!bookId) return;
  const bookById = `/books/${bookId}`;
  console.log(bookById);

  try {
    const bookData = await getDataOnRequest(bookById);

    console.log(bookData);

    // const modal = document.querySelector('.js-book-modal');
    // modal.classList.add('is-open');
    // document.body.style.overflow = 'hidden';
  } catch (error) {
    console.error('Ошибка загрузки книги по ID:', error.message);
  }
}

/* ======= Скроллинг до нового запроса ======= */
function scrollByUp() {
  const allCards = document.querySelectorAll('.js-book-card');
  if (allCards.length === 0) return;

  const lastCard = allCards[allCards.length - 1];
  const rect = lastCard.getBoundingClientRect();

  // Вычисляем абсолютную координату низа карточки
  const targetScrollY = rect.top + rect.height + window.scrollY;

  window.scrollTo({
    top: targetScrollY,
    behavior: 'smooth',
  });
}

/* ======= Клик по категории ======= */
const selectCategory = async event => {
  const li = event.target.closest('.js-category-item');
  if (!li) return;
  let books = null;

  booksCategories = li.textContent.trim();

  if (booksCategories === 'All categories') {
    const booksData = await getDataOnRequest(categoriesOfTopBooks);
    books = extractBooks(booksData);
  } else {
    const booksData = await getBooksByCategory(
      booksAllCategory,
      booksCategories
    );
    books = removeDuplicateBooks(booksData);
  }
  console.log(books.length);

  page = 1;
  originalBooks = [];
  visibleBooks = [];
  refs.bookCard.innerHTML = '';

  acc.close(0);
  paginateBooks(books);
};

/* ===== Очищение экрана с карточками ===== */
function clearBooks() {
  refs.bookCard.innerHTML = '';
}

/* ===== Клик по кнопке Show More ===== */
refs.showMoreBtn.addEventListener('click', () => {
  paginateBooks();
});

/* ===== Клик по списку выбора категории ===== */
refs.listOfCategories.addEventListener('click', selectCategory);

/* ===== Клик по кнопке подробной информации ===== */
refs.bookCard.addEventListener('click', handleBookDetails);

initPage();
