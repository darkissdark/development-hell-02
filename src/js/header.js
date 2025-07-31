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

// Функція для плавного скролу до секції з урахуванням хедера
function smoothScrollToSection(targetId) {
  if (targetId === '#body') {
    // Для кнопки Home скролимо до початку сторінки
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return;
  }

  const targetElement = document.querySelector(targetId);
  if (!targetElement) return;

  const headerHeight = refs.header.offsetHeight;
  const targetPosition = targetElement.offsetTop - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
}

// Додаємо обробники для плавного скролу
refs.desktopNavLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    smoothScrollToSection(targetId);
  });
});

refs.mobileNavLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    smoothScrollToSection(targetId);

    // Закриваємо мобільне меню
    refs.mobileMenu.classList.remove('is-open');
    refs.body.classList.remove('modal-open');
  });
});

refs.openBtn.addEventListener('click', () => {
  refs.mobileMenu.classList.add('is-open');
  refs.body.classList.add('modal-open');
});

refs.closeBtn.addEventListener('click', () => {
  refs.mobileMenu.classList.remove('is-open');
  refs.body.classList.remove('modal-open');
});

// ! scroll navigation
let lastScrollTop = 0;
let scrollDirection = 'down'; // 'up' або 'down'

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop < lastScrollTop) {
    refs.header.classList.remove('hidden');
    scrollDirection = 'up';
  } else {
    refs.header.classList.add('hidden');
    scrollDirection = 'down';
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ! bold active
window.addEventListener('scroll', () => {
  let currentSectionId = '';

  const scrollPosition = pageYOffset;
  const windowHeight = window.innerHeight;
  const headerHeight = refs.header.offsetHeight;
  const isScrollingUp = scrollDirection === 'up';

  const firstSection = document.querySelector('#books');
  const lastSection = document.querySelector('#location');

  const booksTop = firstSection.offsetTop || 0;
  const locationBottom =
    (lastSection.offsetTop || 0) + (lastSection.offsetHeight || 0);

  const headerOffset = isScrollingUp ? headerHeight : 0;

  if (scrollPosition < booksTop - headerOffset) {
    currentSectionId = 'body';
  } else if (scrollPosition + windowHeight > locationBottom - 50) {
    currentSectionId = lastSection.getAttribute('id') || '';
  } else {
    refs.sections.forEach(elem => {
      const elemTop = elem.offsetTop;
      const elemHeight = elem.offsetHeight;
      const elemId = elem.getAttribute('id');

      if (!elemId || elemId === 'header') return;

      if (
        scrollPosition + headerOffset >= elemTop &&
        scrollPosition + headerOffset < elemTop + elemHeight
      ) {
        currentSectionId = elemId;
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
