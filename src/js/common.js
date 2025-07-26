import iziToast from 'izitoast';

const windowWidth = window.innerWidth;

export function showToast(message, type = 'error') {
  iziToast[type]({
    message,
    position: 'topRight',
    maxWidth: windowWidth < 432 ? 300 : 400,
  });
}

const scrollUpBtn = document.querySelector('.scroll-up');

window.addEventListener('scroll', () => {
  const scrollTrigger = window.innerHeight * 1.5;

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
