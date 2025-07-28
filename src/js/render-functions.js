import { refs } from './refs';

export function renderCategories(categories) {
  const markup = categories
    .map(({ list_name }) => {
      const name = list_name.trim() === '' ? 'No Category' : list_name;
      return `
      <li class="category-item js-category-item">
        ${name}
      </li>
      `;
    })
    .join('');
  refs.listOfCategories.insertAdjacentHTML('beforeend', markup);
}

export function renderBooks(books) {
  const markup = books
    .map(
      ({ book_image, price, title, author, description, rank, _id }) =>
        `
      <li class="book-card js-book-card">
        <img
          src='${book_image}'
          alt="${title}"
          class="book-card-image"
        />
        <div class="book-description">
          <div class="book-details">
            <div class="book-info">
              <h4 class="book-title">${title}</h4>
              <p class="book-autor">${author}</p>
            </div>
            <p class="book-price">$${price}</p>
          </div>
          <button class="book-info-btn js-book-info-btn" data-id=${_id} >Learn More</button>
        </div>
      </li>
      `
    )
    .join('');
  refs.bookCard.insertAdjacentHTML('beforeend', markup);
}

const seeNextBooks = refs.showMoreBtn.classList;
export const showLoadMoreButton = () => seeNextBooks.remove('is-hidden');
export const hideLoadMoreButton = () => seeNextBooks.add('is-hidden');
