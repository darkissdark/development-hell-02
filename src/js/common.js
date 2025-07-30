import iziToast from 'izitoast';

const windowWidth = window.innerWidth;

export function showToast(message, type = 'error') {
  iziToast[type]({
    message,
    position: windowWidth < 768 ? 'center' : 'topRight',
    maxWidth: windowWidth < 432 ? 300 : 400,
  });
}

const scrollUpBtn = document.querySelector('.scroll-up');
const SCROLL_UP_MULTIPLIER = 1.5;

window.addEventListener('scroll', () => {
  const scrollTrigger = window.innerHeight * SCROLL_UP_MULTIPLIER;

  if (window.scrollY > scrollTrigger) {
    scrollUpBtn.classList.add('show');
  } else {
    scrollUpBtn.classList.remove('show');
  }
});

scrollUpBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
// loader
const loaderEl = document.querySelector('.loader');
export function hideLoader() {
  loaderEl.classList.add('hide-loader');
}
export function showLoader() {
  loaderEl.classList.remove('hide-loader');
}
