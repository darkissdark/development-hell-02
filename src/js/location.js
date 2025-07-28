console.log('Location script loaded');

const hiddenEl = document.querySelectorAll('.location-hidden');
const hiddenSideEl = document.querySelectorAll('.location-hidden-side');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const el = entry.target;

    if (entry.isIntersecting) {
      if (el.classList.contains('location-hidden')) {
        el.classList.add('location-show');
      }
      if (el.classList.contains('location-hidden-side')) {
        el.classList.add('location-show-side');
      }
    } else {
      if (el.classList.contains('location-hidden')) {
        el.classList.remove('location-show');
      }
      if (el.classList.contains('location-hidden-side')) {
        el.classList.remove('location-show-side');
      }
    }
  });
});

hiddenEl.forEach(el => observer.observe(el));
hiddenSideEl.forEach(el => observer.observe(el));


