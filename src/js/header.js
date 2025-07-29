const refs = {
  openBtn: document.querySelector('.mobile-menu-open-btn'),
  closeBtn: document.querySelector('.mobile-menu-close-btn'),
  mobileMenu: document.querySelector('.mobile-menu'),
  mobileNavLinks: document.querySelectorAll('.mobile-menu-page-link'),
  desktopNavLinks: document.querySelectorAll('.page-menu-link'),
  body: document.body,
};

refs.openBtn.addEventListener('click', () => {
  refs.mobileMenu.classList.add('is-open');
  refs.body.classList.add('modal-open');
});

refs.closeBtn.addEventListener('click', () => {
  refs.mobileMenu.classList.remove('is-open');
  refs.body.classList.remove('modal-open');
});

refs.mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    refs.mobileMenu.classList.remove('is-open');
    refs.body.classList.remove('modal-open');
  });
});
