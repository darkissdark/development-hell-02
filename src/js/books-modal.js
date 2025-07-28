import Accordion from 'accordion-js';
import { showToast } from './common.js';
import { getDataById } from './books-api.js';

const accordion = new Accordion('.modal-books-accordion-container', {
  duration: 400,
  showMultiple: true,
});

const refs = {
  modal: document.querySelector('.modal-books'),
  backdrop: document.querySelector('.modal-books-backdrop'),
  input: document.querySelector('.quantity-selector-quantity-input'),
};

const handleModalBookClick = event => {
  const target = event.target;
  const action = target.dataset.action;

  // Обробка кнопок
  if (action === 'buy-now') {
    showToast('Дякуємо за покупку', 'success');
    return;
  }
  if (action === 'add-to-cart') {
    const quantity = parseInt(refs.input.value) || 1;

    // Якщо погратись і буде час то можна динамічно productid змінювати
    const cartData = {
      productId: 'Books',
      quantity: quantity,
    };

    localStorage.setItem('cart-item', JSON.stringify(cartData));
    showToast(`Книгу додано у кошик: ${quantity} шт.`, 'success');
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
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && refs.backdrop.classList.contains('show-modal')) {
    closeModal();
    return;
  }
});

//todo - Модалка відкриття, наразі не реалізована !
const openModal = () => {
  refs.backdrop.classList.add('show-modal');
  document.body.classList.add('modal-open');
};

//Модалка закриття
const closeModal = () => {
  refs.backdrop.classList.remove('show-modal');
  document.body.classList.remove('modal-open');
};

// Логіка інпуту + -
const updateQuantity = change => {
  const currentValue = parseInt(refs.input.value) || 1;
  const newValue = Math.max(1, Math.min(10, currentValue + change));
  refs.input.value = newValue;
};

//Логіка верифікації інпуту по клаві
refs.input.addEventListener('input', e => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

refs.input.addEventListener('blur', e => {
  const value = parseInt(e.target.value) || 1;
  e.target.value = Math.max(1, Math.min(10, value));
});

/// Відмальовка DOM/ Приклад

export async function fillData(bookId) {
  const book = await getDataById(bookId);
  console.log(book);
  const { book_image: bookImage, title, description, price, author } = book;

  const modalImage = document.querySelector('.modal-books-img');
  const modalTitle = document.querySelector('.modal-books-title');
  const modalAuthor = document.querySelector('.modal-books-text');
  const modalPrice = document.querySelector('.modal-books-price');
  const modalDetails = document.querySelector('.js-ac-text-details');

  modalImage.src = bookImage;
  modalTitle.textContent = title;
  modalAuthor.textContent = author;
  modalPrice.textContent = `${price}$`;
  modalDetails.textContent = description;
}

// Приклад передачі айдішніка
fillData('68680e31ac8a51f74dd6a25b');
