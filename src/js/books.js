import Accordion from 'accordion-js';

// console.log('Books script loaded');
const toggle = document.querySelector('.books-accordion-btn');
const content = document.querySelector('.accordion-content');
toggle.addEventListener('click', () => {
  content.classList.toggle('open');
});
