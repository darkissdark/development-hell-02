import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

import Rater from 'rater-js';
import 'rater-js/lib/style.css';

import janeDoe1x from '../images/feedbacks/jane_doe.jpg';
import janeDoe2x from '../images/feedbacks/jane_doe@2x.jpg';
import johnSmith1x from '../images/feedbacks/john_smith.jpg';
import johnSmith2x from '../images/feedbacks/john_smith@2x.jpg';
import emilyJohnson1x from '../images/feedbacks/emily_johnson.jpg';
import emilyJohnson2x from '../images/feedbacks/emily_johnson@2x.jpg';
import sofiaLee1x from '../images/feedbacks/sofia_lee.jpg';
import sofiaLee2x from '../images/feedbacks/sofia_lee@2x.jpg';
import carlosMendez1x from '../images/feedbacks/carlos_mendez.jpg';
import carlosMendez2x from '../images/feedbacks/carlos_mendez@2x.jpg';
import natalieBrooks1x from '../images/feedbacks/natalie_brooks.jpg';
import natalieBrooks2x from '../images/feedbacks/natalie_brooks@2x.jpg';
import davidNguyen1x from '../images/feedbacks/david_nguyen.jpg';
import davidNguyen2x from '../images/feedbacks/david_nguyen@2x.jpg';
import aishaPatel1x from '../images/feedbacks/aisha_patel.jpg';
import aishaPatel2x from '../images/feedbacks/aisha_patel@2x.jpg';
import michaelThompson1x from '../images/feedbacks/michael_thompson.jpg';
import michaelThompson2x from '../images/feedbacks/michael_thompson@2x.jpg';
import elenaGarcia1x from '../images/feedbacks/elena_garcia.jpg';
import elenaGarcia2x from '../images/feedbacks/elena_garcia@2x.jpg';
import jamesOconnor1x from '../images/feedbacks/james_oconnor.jpg';
import jamesOconnor2x from '../images/feedbacks/james_oconnor@2x.jpg';
import samanthaLee1x from '../images/feedbacks/samantha_lee.jpg';
import samanthaLee2x from '../images/feedbacks/samantha_lee@2x.jpg';

const feedbacksData = [
  {
    text: 'Great selection, fast delivery, and beautifully packaged books. My go-to store for weekend reads!',
    author: 'Jane Doe',
    position: 'Book Lover, Reader',
    avatar1x: janeDoe1x,
    avatar2x: janeDoe2x,
    rating: 4.8,
    subscription: 'gold',
  },
  {
    text: 'Customer service was super helpful, and my order arrived earlier than expected. Highly recommend!',
    author: 'John Smith',
    position: 'Editor, BookMag',
    avatar1x: johnSmith1x,
    avatar2x: johnSmith2x,
    rating: 4.6,
    subscription: 'silver',
  },
  {
    text: 'Love the curated picks and clear descriptions. Makes it easy to find my next favorite book.',
    author: 'Emily Johnson',
    position: 'Author, Novelist',
    avatar1x: emilyJohnson1x,
    avatar2x: emilyJohnson2x,
    rating: 4.9,
    subscription: 'gold',
  },
  {
    text: 'Such a lovely experience shopping here. The recommendations are always on point!',
    author: 'Sofia Lee',
    position: 'Literature Professor',
    avatar1x: sofiaLee1x,
    avatar2x: sofiaLee2x,
    rating: 4.7,
    subscription: 'silver',
  },
  {
    text: 'I’ve discovered so many hidden gems thanks to this store. The reviews really help!',
    author: 'Carlos Mendez',
    position: 'Blogger, Read & Roam',
    avatar1x: carlosMendez1x,
    avatar2x: carlosMendez2x,
    rating: 4.5,
    subscription: 'silver',
  },
  {
    text: 'As a parent, I appreciate the kid-friendly book sections. My son loves everything we order!',
    author: 'Natalie Brooks',
    position: 'Mother & Teacher',
    avatar1x: natalieBrooks1x,
    avatar2x: natalieBrooks2x,
    rating: 4.6,
    subscription: 'gold',
  },
  {
    text: 'The curated collections are fantastic! I always find exactly what I’m looking for and discover new favorites.',
    author: 'David Nguyen',
    position: 'Graphic Designer',
    avatar1x: davidNguyen1x,
    avatar2x: davidNguyen2x,
    rating: 4.7,
    subscription: 'silver',
  },
  {
    text: 'Fast shipping and top-notch service, with timely updates throughout delivery. I’ll definitely be back for more!',
    author: 'Aisha Patel',
    position: 'Marketing Specialist',
    avatar1x: aishaPatel1x,
    avatar2x: aishaPatel2x,
    rating: 4.8,
    subscription: 'gold',
  },
  {
    text: 'Their children’s book selection is unbeatable. My daughter can’t wait for the next delivery!',
    author: 'Michael Thompson',
    position: 'Pediatric Nurse',
    avatar1x: michaelThompson1x,
    avatar2x: michaelThompson2x,
    rating: 4.5,
    subscription: 'silver',
  },
  {
    text: 'I love the author spotlights and exclusive interviews. It adds so much value to my reading experience!',
    author: 'Elena Garcia',
    position: 'Content Writer',
    avatar1x: elenaGarcia1x,
    avatar2x: elenaGarcia2x,
    rating: 4.9,
    subscription: 'gold',
  },
  {
    text: 'The gift wrapping option was perfect for presents. Such a thoughtful touch and impeccable attention to detail!',
    author: 'James O’Connor',
    position: 'Event Planner',
    avatar1x: jamesOconnor1x,
    avatar2x: jamesOconnor2x,
    rating: 4.6,
    subscription: 'silver',
  },
  {
    text: 'Great loyalty program with real perks and exclusive offers. I’ve saved so much on my orders and truly feel valued!',
    author: 'Samantha Lee',
    position: 'Digital Strategist',
    avatar1x: samanthaLee1x,
    avatar2x: samanthaLee2x,
    rating: 5.0,
    subscription: 'gold',
  },
];

function renderFeedbackSlides(data) {
  const wrapper = document.querySelector('.swiper-feedback-wrapper');
  if (!wrapper) return;
  wrapper.innerHTML = '';

  data.forEach(
    ({ text, author, position, avatar1x, avatar2x, rating, subscription }) => {
      const slide = document.createElement('li');
      slide.className = 'swiper-slide feedback-card';
      slide.innerHTML = `
      <blockquote class="feedback-text">${text}</blockquote>
      <div class="feedback-meta">
        <div class="feedback-rating" data-rating="${rating}"></div>
        <div class="badge badge--${subscription}">
          ${subscription === 'gold' ? 'Gold' : 'Silver'} Verified
        </div>
      </div>
      <div class="feedback-author-wrapper">
        <img
          src="${avatar1x}"
          srcset="${avatar1x} 1x, ${avatar2x} 2x"
          alt="${author}"
          width="48"
          height="48"
          loading="lazy"
        />
        <div class="author-details">
          <h3 class="author-name">${author}</h3>
          <p>${position}</p>
        </div>
      </div>
    `;
      wrapper.appendChild(slide);
    }
  );
}

function initFeedbackSlider() {
  const swiper = new Swiper('.feedbacks-slider', {
    slidesPerView: 1,
    spaceBetween: 24,
    speed: 600,
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

  document.querySelectorAll('.feedback-rating').forEach(el => {
    new Rater({
      element: el,
      max: 5,
      step: 0.1,
      rating: parseFloat(el.dataset.rating),
      readOnly: true,
      starSize: 20,
      showToolTip: false,
    });
  });

  swiper.el.addEventListener('mouseenter', () => swiper.autoplay?.stop());
  swiper.el.addEventListener('mouseleave', () => swiper.autoplay?.start());
  swiper.el.addEventListener('focusin', () => swiper.autoplay?.stop());
  swiper.el.addEventListener('focusout', () => swiper.autoplay?.start());
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeedbackSlides(feedbacksData);
  initFeedbackSlider();
});
