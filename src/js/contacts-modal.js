import iziToast from 'izitoast';
import { sendDataToBackEnd } from './backend-api';
import { hideLoader, showLoader } from './common';

const refs = {
  openFormModal: document.querySelectorAll('.register-btn'),
  formBackdrop: document.querySelector('#modalContacts'),
  closeBtnModal: document.querySelector('.modal-form-close'),
  formList: document.querySelector('.form-box'),
  inputName: document.querySelector('[data-name]'),
  inputEmail: document.querySelector('[data-email]'),
  inputArea: document.querySelector('[data-area]'),
  submitBtnModal: document.querySelector('.form-btn-submit'),
  titleEventSection: document.querySelectorAll('.event-subhead'),
  titleEventModal: document.querySelector('.modal-form-subscription'),
};

// ! OPEN / CLOSE MODAL
const closeBtn = () => {
  closeModal();
};

const closeEscape = e => {
  if (e.key === 'Escape') {
    closeModal();
  }
};

const closeBackdrop = e => {
  if (e.target === refs.formBackdrop) {
    closeModal();
  }
};

function addEventListeners() {
  refs.closeBtnModal.addEventListener('click', closeModal);
  refs.formBackdrop.addEventListener('click', closeBackdrop);
  document.addEventListener('keydown', closeEscape);
}

function removeEventListeners() {
  refs.closeBtnModal.removeEventListener('click', closeModal);
  refs.formBackdrop.removeEventListener('click', closeBackdrop);
  document.removeEventListener('keydown', closeEscape);
}

function openModal(e) {
  const btn = e.currentTarget;
  transferEventTitle(btn);
  refs.formBackdrop.classList.add('show-modal');
  document.body.classList.add('modal-open');
  addEventListeners();
}

function closeModal() {
  refs.formBackdrop.classList.remove('show-modal');
  document.body.classList.remove('modal-open');
  removeEventListeners();
}

// !!! LISTENER
refs.openFormModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

refs.closeBtnModal.addEventListener('click', closeBtn);

document.addEventListener('keydown', closeEscape);

document.addEventListener('click', closeBackdrop);

// ! TITLE
function transferEventTitle(btn) {
  const eventCard = btn.closest('.event-card');
  const titleElement = eventCard
    ? eventCard.querySelector('.event-subhead')
    : null;

  if (titleElement) {
    const titleText = titleElement.textContent;

    refs.titleEventModal.textContent = titleText;
  }
}

// ! LOCAL STORAGE

function saveToLocalStorage() {
  const formData = {
    name: refs.inputName.value.trim(),
    email: refs.inputEmail.value.trim(),
    message: refs.inputArea.value.trim(),
  };

  localStorage.setItem('contactFormData', JSON.stringify(formData));
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem('contactFormData');

  if (savedData) {
    const parsedData = JSON.parse(savedData);

    refs.inputName.value = parsedData.name || '';
    refs.inputEmail.value = parsedData.email || '';
    refs.inputArea.value = parsedData.message || '';
  }
}

refs.formList.addEventListener('input', saveToLocalStorage);
loadFromLocalStorage();

// !! SUBMIT BTN
refs.formList.addEventListener('submit', async e => {
  e.preventDefault();
  const formDataId = e.currentTarget.previousElementSibling.textContent;

  const formData = {
    name: refs.inputName.value.trim(),
    email: refs.inputEmail.value.trim(),
    message: refs.inputArea.value.trim() || 'No message typed', // required on backend
  };

  try {
    showLoader();
    await sendDataToBackEnd(formData, formDataId);

    localStorage.removeItem('contactFormData');
    refs.formList.reset();
    iziToast.info({
      message: 'Thank you, our manager will contact you!',
      position: 'center',
    });
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'center',
    });
  } finally {
    hideLoader();
    closeModal();
  }
});
