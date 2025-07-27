
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

let swiperInstance = null;

function initEventSlider() {
  const isDesktop = window.innerWidth >= 1440;

  
  const navButtons = document.querySelectorAll('.button-nav');
  navButtons.forEach(btn => {
    btn.style.display = isDesktop ? 'none' : 'flex';
  });
    
    const paginationEl = document.querySelector('.events-pagination');
    if (paginationEl) {
        paginationEl.style.display = isDesktop ? 'none' : 'flex';
    }

  
  if (isDesktop) {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
    return;
  }

  
  if (!swiperInstance) {
    swiperInstance = new Swiper('.event-list', {
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: 24,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      navigation: {
        nextEl: '.js-events-slider-forward',
        prevEl: '.js-events-slider-prev',
      },
      pagination: {
        el: '.events-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
      },
    });
  }
}

initEventSlider();

window.addEventListener('resize', () => {
  initEventSlider();
});

