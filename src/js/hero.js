import Swiper from 'swiper/bundle';
const nextSlideEl = document.querySelector('.js-hero-slider-forward');
console.log(nextSlideEl);
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
});
console.dir(swiper);
// if (swiper.activeIndex === swiper.slides.length) {
//   nextSlideEl.disabled = true;
// }
