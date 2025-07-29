import Accordion from 'accordion-js';
import { showToast } from './common.js';

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
  addToCartBtn: document.querySelector('[data-action="add-to-cart"]'),
};

const handleModalBookClick = event => {
  const target = event.target;
  const action = target.dataset.action;

  if (action === 'add-to-cart') {
    const quantity = parseInt(refs.input.value) || 1;

    const cartData = {
      productId: 'Books',
      quantity: quantity,
    };

    localStorage.setItem('cart-item', JSON.stringify(cartData));
    closeModal();
    // showToast(`Книгу додано у кошик: ${quantity} шт.`, 'success');
    return;
  }
  if (action === 'buy-now') {
    showToast('Manager will contact you soon', 'success');
    closeModal();
    localStorage.removeItem('cart-item');
    return;
  }

  if (target.classList.contains('quantity-selector-decrease')) {
    updateQuantity(-1);
    return;
  }
  if (target.classList.contains('quantity-selector-increase')) {
    updateQuantity(1);
    return;
  }

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

const handleEscKey = e => {
  if (e.key === 'Escape' && refs.backdrop.classList.contains('show-modal')) {
    closeModal();
    return;
  }
};

export const openModal = () => {
  refs.input.value = '1';
  refs.addToCartBtn.dataset.qty = '1';
  accordion.closeAll();
  refs.backdrop.classList.add('show-modal');
  document.body.classList.add('modal-open');
  // Додавання лісенерів
  document.addEventListener('keydown', handleEscKey);
  refs.backdrop.addEventListener('click', handleModalBookClick);
  refs.input.addEventListener('input', handleInputOnlyNumbers);
  refs.input.addEventListener('blur', handleInputBlur);
};

const closeModal = () => {
  refs.backdrop.classList.remove('show-modal');
  document.body.classList.remove('modal-open');
  // Зняття лісенерів
  document.removeEventListener('keydown', handleEscKey);
  refs.backdrop.removeEventListener('click', handleModalBookClick);
  refs.input.removeEventListener('input', handleInputOnlyNumbers);
  refs.input.removeEventListener('blur', handleInputBlur);
};

const updateQuantity = change => {
  const currentValue = parseInt(refs.input.value) || 1;
  const newValue = Math.max(1, Math.min(99, currentValue + change));
  refs.input.value = newValue;
  refs.addToCartBtn.dataset.qty = newValue;
};

const handleInputOnlyNumbers = e => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
};

const handleInputBlur = e => {
  const value = parseInt(e.target.value) || 1;
  const newValue = Math.max(1, Math.min(99, value));
  e.target.value = newValue;
  refs.addToCartBtn.dataset.qty = newValue;
};

export function fillDataModalBook({
  book_image: bookImage,
  title,
  description,
  price,
  author,
  _id: id,
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

  refs.bookPhotoWrapper.innerHTML = imageData;

  const modalBookText = `
            <h2 class="modal-books-title">${title || 'Без назви'}</h2>
            <p class="modal-books-text">${author || 'Невідомий автор'}</p>
            <p class="modal-books-price">${
              price ? price + '$' : 'Ціна не вказана'
            }</p>
         `;

  refs.modalBooksTextWrapper.innerHTML = modalBookText;

  refs.accordionDetails.textContent = description || 'No description';

  refs.addToCartBtn.dataset.id = id;
  refs.addToCartBtn.dataset.title = title;
  refs.addToCartBtn.dataset.price = price;
}
