import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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

// ! TITLE
const originalTitles = [];

function transferEventTitle(btn) {
  const eventCard = btn.closest('.event-card');
  const titleElement = eventCard
    ? eventCard.querySelector('.event-subhead')
    : null;

  if (titleElement) {
    const titleText = titleElement.textContent;

    if (!originalTitles.includes(titleText)) {
      originalTitles.push(titleText);
    }

    refs.titleEventModal.textContent = titleText;
  }
}

function resetEventTitle() {
  document.querySelectorAll('.event-subhead').forEach((titleElement, index) => {
    if (originalTitles[index]) {
      titleElement.textContent = originalTitles[index];
    }
  });

  refs.titleEventModal.textContent = 'Cozy Book Club — "The Midnight Library"';
}

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

  refs.formList.addEventListener('input', handleInput);
  refs.formList.addEventListener('submit', handleSubmit);
}

function removeEventListeners() {
  refs.closeBtnModal.removeEventListener('click', closeModal);
  refs.formBackdrop.removeEventListener('click', closeBackdrop);
  document.removeEventListener('keydown', closeEscape);

  refs.formList.removeEventListener('input', handleInput);
  refs.formList.removeEventListener('submit', handleSubmit);
}

function openModal(e) {
  const btn = e.currentTarget;
  transferEventTitle(btn);
  refs.formBackdrop.classList.add('is-open');
  document.body.classList.add('no-scroll');
  addEventListeners();
}

function closeModal(e) {
  refs.formBackdrop.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  removeEventListeners();
  resetEventTitle();
}

// !!! LISRENER
refs.openFormModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

refs.closeBtnModal.addEventListener('click', closeBtn);

document.addEventListener('keydown', closeEscape);

document.addEventListener('click', closeBackdrop);

// ! VALIDATION

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

refs.formList.addEventListener('submit', e => {
  e.preventDefault();

  localStorage.removeItem('contactFormData');
  refs.formList.reset();

  return iziToast.info({
    title: 'Дякуємо!',
    message: 'Ми відправили Вам на пошту лист з паролем!',
    position: 'center',
  });
});
