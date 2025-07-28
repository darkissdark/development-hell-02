console.log('Location script loaded');

const hiddenEls = document.querySelectorAll('.location-hidden, .location-hidden-side');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.intersectionRatio > 0.5) {
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
  },
  {
    threshold: 0.5,
  }
);

hiddenEls.forEach((el) => observer.observe(el));

