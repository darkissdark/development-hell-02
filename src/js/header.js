const refs = {
  openBtn: document.querySelector('.mobile-menu-open-btn'),
  closeBtn: document.querySelector('.mobile-menu-close-btn'),
  mobileMenu: document.querySelector('.mobile-menu'),
  mobileNavLinks: document.querySelectorAll('.mobile-menu-page-link'),
  desktopNavLinks: document.querySelectorAll('.page-menu-link'),
  body: document.body,
  header: document.querySelector('.header'),
  sections: document.querySelectorAll('header, section'),
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

// ! scroll navigation
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop < lastScrollTop) {
    header.classList.remove('hidden');
  } else {
    header.classList.add('hidden');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ! bold active
window.addEventListener('scroll', () => {
  let currentSectionId = '';

  const scrollPosition = pageYOffset;
  const windowHeight = window.innerHeight;

  const firstSection = document.querySelector('#books');
  const lastSection = document.querySelector('#location');

  const booksTop = firstSection.offsetTop || 0;
  const locationBottom =
    (lastSection.offsetTop || 0) + (lastSection.offsetHeight || 0);

  if (scrollPosition < booksTop) {
    currentSectionId = 'body';
  } else if (scrollPosition + windowHeight > locationBottom - 50) {
    currentSectionId = lastSection.getAttribute('id') || '';
  } else {
    refs.sections.forEach(elem => {
      const elemTop = elem.offsetTop;
      const elemHeight = elem.offsetHeight;

      if (
        scrollPosition >= elemTop - elemHeight &&
        scrollPosition < elemTop + elemHeight
      ) {
        currentSectionId = elem.getAttribute('id') || '';
      }
    });
  }

  refs.desktopNavLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${currentSectionId}`
    );
  });
});
