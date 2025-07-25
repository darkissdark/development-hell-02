import { showToast } from './common';

const form = document.querySelector('.footer-join-form');
const validationMessage = document.querySelector('.footer-form-validation');
const input = document.querySelector('.footer-email');
const copyYear = document.querySelector('#copy-year');

const COPYRIGHT_START_YEAR = 2025;

if (!form || !validationMessage || !input) {
  console.warn('Form or input elements not found.');
} else {
  form.addEventListener('submit', handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();

  input.addEventListener('input', handleInputValidation);

  const formData = new FormData(form);
  const email = formData.get('footer-email').trim();

  if (!email || !input.validity.valid) {
    showError('Please enter a valid email address');
    return;
  }

  clearError('* Required field');
  showToast(`Thank you for subscribing with <b>${email}</b>`, 'success');
  form.reset();
  input.removeEventListener('input', handleInputValidation);
}

function handleInputValidation() {
  clearError('* Required field');
}

function showError(message) {
  validationMessage.textContent = message;
  validationMessage.classList.add('color-error');
  input.classList.add('error');
}

function clearError(message) {
  validationMessage.textContent = message;
  validationMessage.classList.remove('color-error');
  input.classList.remove('error');
}

const currentYear = new Date().getFullYear();
copyYear.textContent =
  currentYear > COPYRIGHT_START_YEAR
    ? `${COPYRIGHT_START_YEAR}-${currentYear}`
    : COPYRIGHT_START_YEAR;
