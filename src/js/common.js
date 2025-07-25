// import iziToast from 'izitoast';

const windowWidth = window.innerWidth;

export function showToast(message, type = 'error') {
  iziToast[type]({
    message,
    position: 'topRight',
    maxWidth: windowWidth < 432 ? 300 : 400,
  });
}
