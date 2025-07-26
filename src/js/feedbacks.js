import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

const feedbacksData = [
  {
    text: 'Great selection, fast delivery, and beautifully packaged books. My go-to store for weekend reads!',
    author: 'Jane Doe',
    position: 'Book Lover, Reader',
    avatar: '../images/feedbacks/jane_doe.jpg',
  },
  {
    text: 'Customer service was super helpful, and my order arrived earlier than expected. Highly recommend!',
    author: 'John Smith',
    position: 'Editor, BookMag',
    avatar: '../images/feedbacks/john_smith.jpg',
  },
  {
    text: 'Love the curated picks and clear descriptions. Makes it easy to find my next favorite book.',
    author: 'Emily Johnson',
    position: 'Author, Novelist',
    avatar: '../images/feedbacks/emily_johnson.jpg',
  },
  {
    text: 'Such a lovely experience shopping here. The recommendations are always on point!',
    author: 'Sofia Lee',
    position: 'Literature Professor',
    avatar: '../images/feedbacks/sofia_lee.jpg',
  },
  {
    text: 'I’ve discovered so many hidden gems thanks to this store. The reviews really help!',
    author: 'Carlos Mendez',
    position: 'Blogger, Read & Roam',
    avatar: '../images/feedbacks/carlos_mendez.jpg',
  },
  {
    text: 'As a parent, I appreciate the kid-friendly book sections. My son loves everything we order!',
    author: 'Natalie Brooks',
    position: 'Mother & Teacher',
    avatar: '../images/feedbacks/natalie_brooks.jpg',
  },
];

function renderFeedbackSlides(data) {
  const wrapper = document.querySelector('.swiper-feedback-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = '';

  data.forEach(({ text, author, position, avatar }) => {
    const slide = document.createElement('li');
    slide.className = 'swiper-slide feedback-card';
    slide.role = 'listitem';
    slide.innerHTML = `
      <blockquote class="feedback-text">${text}</blockquote>
      <div class="feedback-rating">
        <svg class="icon-feedback-star" width="24" height="24">
            <use xlink:href="#star"></use>
        </svg>
      </div>
      <div class="feedback-author-wrapper">
        <img src="${avatar}" alt="${author}" width="48" height="48" loading="lazy" />
        <div class="author-details">
          <h3 class="author-name">${author}</h3>
          <p>${position}</p>
        </div>
      </div>
    `;
    wrapper.appendChild(slide);
  });
}

function initFeedbackSlider() {
  new Swiper('.feedbacks-slider', {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      prevEl: '.button-nav.prev',
      nextEl: '.button-nav.next',
      disabledClass: 'button-nav--disabled',
    },
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: {
      enabled: true,
      prevSlideMessage: 'Previous feedback',
      nextSlideMessage: 'Next feedback',
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 24 },
      1440: { slidesPerView: 3, spaceBetween: 24 },
    },
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeedbackSlides(feedbacksData);
  initFeedbackSlider();
});
