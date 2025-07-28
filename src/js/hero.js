import Swiper from 'swiper/bundle';
const swiper = new Swiper('.swiper-hero', {
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
    delay: 5000,
    disableOnInteraction: false,
  },
  speed: 1000,

  spaceBetween: 24,
});
