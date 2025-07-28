import Accordion from 'accordion-js';
import { showToast } from './common.js';
// import { document } from 'postcss';
import { handleBookDetails } from './books';

const accordion = new Accordion('.modal-books-accordion-container', {
  duration: 400,
  showMultiple: true,
});

const refs = {
  modal: document.querySelector('.modal-books'),
  backdrop: document.querySelector('.modal-books-backdrop'),
  input: document.querySelector('.quantity-selector-quantity-input'),
  modalBooksTextWrapper: document.querySelector('.modal-books-text-wrapper'),
  bookPhotoWrapper: document.querySelector('.modal-book-photo-wrapper'),
  accordionDetails: document.querySelector('.js-ac-text-details'),

  //якщо ми захочемо динамічно додавати інфу, її немає не сервері
  accordionShipping: document.querySelector('.js-ac-text-shipping'),
  accordionReturns: document.querySelector('.js-ac-text-returns'),
};

const handleModalBookClick = event => {
  const target = event.target;
  const action = target.dataset.action;

  // Обробка кнопок
  if (action === 'add-to-cart') {
    const quantity = parseInt(refs.input.value) || 1;

    // Якщо погратись і буде час то можна динамічно productid змінювати,
    // Наразі додаєтся тільки кількість
    const cartData = {
      productId: 'Books',
      quantity: quantity,
    };

    localStorage.setItem('cart-item', JSON.stringify(cartData));
    showToast(`Книгу додано у кошик: ${quantity} шт.`, 'success');
    return;
  }
  if (action === 'buy-now') {
    showToast('Дякуємо за покупку', 'success');
    localStorage.removeItem('cart-item');
    return;
  }

  // Обробка інпуту, логіка винесена
  if (target.classList.contains('quantity-selector-decrease')) {
    updateQuantity(-1);
    return;
  }
  if (target.classList.contains('quantity-selector-increase')) {
    updateQuantity(1);
    return;
  }

  // Модалка закриття
  if (target === refs.backdrop) {
    closeModal();
    return;
  }
  if (target.closest('.modal-books-button')) {
    closeModal();
    return;
  }
};

refs.backdrop.addEventListener('click', handleModalBookClick);

//Модалка закриття по esc
const handleEscKey = e => {
  if (e.key === 'Escape' && refs.backdrop.classList.contains('show-modal')) {
    closeModal();
    return;
  }
};

// Модалка відкриття
export const openModal = () => {
  accordion.closeAll();
  refs.backdrop.classList.add('show-modal');
  document.body.classList.add('modal-open');
  // Додавання лісенерів
  document.addEventListener('keydown', handleEscKey);
  refs.backdrop.addEventListener('click', handleModalBookClick);
  refs.input.addEventListener('input', handleInputOnlyNumbers);
  refs.input.addEventListener('blur', handleInputBlur);
};

//Модалка закриття
const closeModal = () => {
  refs.backdrop.classList.remove('show-modal');
  document.body.classList.remove('modal-open');
  // Зняття лісенерів
  document.removeEventListener('keydown', handleEscKey);
  refs.backdrop.removeEventListener('click', handleModalBookClick);
  refs.input.removeEventListener('input', handleInputOnlyNumbers);
  refs.input.removeEventListener('blur', handleInputBlur);
};

// Логіка інпуту + -
const updateQuantity = change => {
  const currentValue = parseInt(refs.input.value) || 1;
  const newValue = Math.max(1, Math.min(10, currentValue + change));
  refs.input.value = newValue;
};

//Логіка верифікації інпуту по клаві
const handleInputOnlyNumbers = e => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
};

const handleInputBlur = e => {
  const value = parseInt(e.target.value) || 1;
  e.target.value = Math.max(1, Math.min(10, value));
};

/// Відмальовка DOM
export function fillDataModalBook({
  book_image: bookImage,
  title,
  description,
  price,
  author,
}) {
  const imageData = `
    <img
            src="${
              bookImage || 'https://placehold.co/309x466/png?text=No+image'
            }"
            alt="${title || 'Без назви'}" 
            class="modal-books-img"
          />
  `;
  // так дані будуть змінюватись, але також видалятся прослуховувачі подій, але таких там немає
  refs.bookPhotoWrapper.innerHTML = imageData;

  const modalBookText = `
            <h2 class="modal-books-title">${title || 'Без назви'}</h2>
            <p class="modal-books-text">${author || 'Невідомий автор'}</p>
            <p class="modal-books-price">${
              price ? price + '$' : 'Ціна не вказана'
            }</p>
         `;
  // так дані будуть змінюватись, але також видалятся прослуховувачі подій, але таких там немає
  refs.modalBooksTextWrapper.innerHTML = modalBookText;

  refs.accordionDetails.textContent = description || 'No description';

  // в обʼєкті refs є також елементи акордіону, якщо захочему ще щось динамічно додавати.
}
