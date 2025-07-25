import iziToast from 'izitoast';

const windowWidth = window.innerWidth;

export function showToast(message, type = 'error') {
  iziToast[type]({
    message,
    position: windowWidth < 768 ? 'center' : 'topRight',
    maxWidth: windowWidth < 432 ? 300 : 400,
  });
}
