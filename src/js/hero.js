import Swiper from 'swiper/bundle';
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  navigation: {
    nextEl: '.js-hero-slider-forward',
    prevEl: '.js-hero-slider-prev',
  },
  autoplay: {
    delay: 10000,
  },
  spaceBetween: 20,
});
