import iziToast from 'izitoast';

const refs = {
  openFormModal: document.querySelector('.register-btn'),
  formBackdrop: document.querySelector('.modal-backdrop-form'),
  closeBtnModal: document.querySelector('.modal-form-close'),
  formList: document.querySelector('.form-box'),
  inputName: document.querySelector('[data-name]'),
  inputEmail: document.querySelector('[data-email]'),
  inputArea: document.querySelector('[data-area]'),
  submitBtnModal: document.querySelector('.form-btn-submit'),
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

function openModal() {
  refs.formBackdrop.classList.add('is-open');
  document.body.classList.add('no-scroll');
  addEventListeners();
}

function closeModal() {
  refs.formBackdrop.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  removeEventListeners();
}

// refs.openFormModal.addEventListener('click', openModal);

refs.closeBtnModal.addEventListener('click', closeBtn);

document.addEventListener('keydown', closeEscape);

document.addEventListener('click', closeBackdrop);

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
