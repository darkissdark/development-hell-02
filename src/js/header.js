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
  const documentHeight = document.body.scrollHeight;

  if (scrollPosition < 50) {
    currentSectionId = 'hero';
    console.log(currentSectionId);
  } else if (scrollPosition + windowHeight > documentHeight - 50) {
    const lastSection = refs.sections[refs.sections.length - 1];
    currentSectionId = lastSection.getAttribute('id') || '';
    console.log(currentSectionId);
  } else {
    refs.sections.forEach(elem => {
      const elemTop = elem.offsetTop;
      const elemHeight = elem.offsetHeight;

      if (
        scrollPosition >= elemTop - elemHeight &&
        scrollPosition < elemTop + elemHeight
      ) {
        currentSectionId = elem.getAttribute('id') || '';
        console.log(currentSectionId);
      }
    });
  }

  refs.desktopNavLinks.forEach(link => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
});
