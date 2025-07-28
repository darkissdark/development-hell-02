import Swiper from 'swiper/bundle';

import janeDoe from '../images/feedbacks/jane_doe.jpg';
import johnSmith from '../images/feedbacks/john_smith.jpg';
import emilyJohnson from '../images/feedbacks/emily_johnson.jpg';
import sofiaLee from '../images/feedbacks/sofia_lee.jpg';
import carlosMendez from '../images/feedbacks/carlos_mendez.jpg';
import natalieBrooks from '../images/feedbacks/natalie_brooks.jpg';
import davidNguyen from '../images/feedbacks/david_nguyen.jpg';
import aishaPatel from '../images/feedbacks/aisha_patel.jpg';
import michaelThompson from '../images/feedbacks/michael_thompson.jpg';
import elenaGarcia from '../images/feedbacks/elena_garcia.jpg';
import jamesOconnor from '../images/feedbacks/james_oconnor.jpg';
import samanthaLee from '../images/feedbacks/samantha_lee.jpg';

const feedbacksData = [
  {
    text: 'Great selection, fast delivery, and beautifully packaged books. My go-to store for weekend reads!',
    author: 'Jane Doe',
    position: 'Book Lover, Reader',
    avatar: janeDoe,
  },
  {
    text: 'Customer service was super helpful, and my order arrived earlier than expected. Highly recommend!',
    author: 'John Smith',
    position: 'Editor, BookMag',
    avatar: johnSmith,
  },
  {
    text: 'Love the curated picks and clear descriptions. Makes it easy to find my next favorite book.',
    author: 'Emily Johnson',
    position: 'Author, Novelist',
    avatar: emilyJohnson,
  },
  {
    text: 'Such a lovely experience shopping here. The recommendations are always on point!',
    author: 'Sofia Lee',
    position: 'Literature Professor',
    avatar: sofiaLee,
  },
  {
    text: 'I’ve discovered so many hidden gems thanks to this store. The reviews really help!',
    author: 'Carlos Mendez',
    position: 'Blogger, Read & Roam',
    avatar: carlosMendez,
  },
  {
    text: 'As a parent, I appreciate the kid-friendly book sections. My son loves everything we order!',
    author: 'Natalie Brooks',
    position: 'Mother & Teacher',
    avatar: natalieBrooks,
  },
  {
    text: 'The curated collections are fantastic! I always find exactly what I’m looking for and discover new favorites.',
    author: 'David Nguyen',
    position: 'Graphic Designer',
    avatar: davidNguyen,
  },
  {
    text: 'Fast shipping and top-notch service, with timely updates throughout delivery. I’ll definitely be back for more!',
    author: 'Aisha Patel',
    position: 'Marketing Specialist',
    avatar: aishaPatel,
  },
  {
    text: 'Their children’s book selection is unbeatable. My daughter can’t wait for the next delivery!',
    author: 'Michael Thompson',
    position: 'Pediatric Nurse',
    avatar: michaelThompson,
  },
  {
    text: 'I love the author spotlights and exclusive interviews. It adds so much value to my reading experience!',
    author: 'Elena Garcia',
    position: 'Content Writer',
    avatar: elenaGarcia,
  },
  {
    text: 'The gift wrapping option was perfect for presents. Such a thoughtful touch and impeccable attention to detail!',
    author: 'James O’Connor',
    position: 'Event Planner',
    avatar: jamesOconnor,
  },
  {
    text: 'Great loyalty program with real perks and exclusive offers. I’ve saved so much on my orders and truly feel valued!',
    author: 'Samantha Lee',
    position: 'Digital Strategist',
    avatar: samanthaLee,
  },
];

function renderFeedbackSlides(data) {
  const wrapper = document.querySelector('.swiper-feedback-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = '';

  data.forEach(({ text, author, position, avatar }) => {
    const stars = Array(5)
      .fill(
        `
      <li class="feedback-rating__star">
        <svg class="icon-feedback-star" width="20" height="20">
          <use xlink:href="#star"/>
        </svg>
      </li>
    `
      )
      .join('');

    const slide = document.createElement('li');
    slide.className = 'swiper-slide feedback-card';
    slide.setAttribute('role', 'listitem');
    slide.innerHTML = `
      <blockquote class="feedback-text">${text}</blockquote>
      <ul class="feedback-rating" aria-label="Rating: 5 stars">
        ${stars}
      </ul>
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
  const swiper = new Swiper('.feedbacks-slider', {
    slidesPerView: 1,
    spaceBetween: 24,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 1000,
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

  const sliderEl = swiper.el;

  swiper.el.addEventListener('mouseenter', () => {
    swiper.autoplay.stop();
  });
  swiper.el.addEventListener('mouseleave', () => {
    swiper.autoplay.start();
  });
  sliderEl.addEventListener('focusin', () => swiper.autoplay.stop());
  sliderEl.addEventListener('focusout', () => swiper.autoplay.start());
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeedbackSlides(feedbacksData);
  initFeedbackSlider();
});
