import iziToast from 'izitoast';
import Accordion from 'accordion-js';

const refs = {
  btnBuy: document.querySelector('.js-modal-books-buy'),
};

const accordion = new Accordion('.modal-books-accordion-container', {
  duration: 400,
  showMultiple: true,
});
