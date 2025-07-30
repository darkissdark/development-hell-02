import Swiper from 'swiper/bundle';
import Rater from 'rater-js';

import janeDoe1x from '../images/feedbacks/jane_doe.jpg';
import janeDoe2x from '../images/feedbacks/jane_doe@2x.jpg';
import janeDoeWebp1x from '../images/feedbacks/jane_doe.webp';
import janeDoeWebp2x from '../images/feedbacks/jane_doe@2x.webp';

import johnSmith1x from '../images/feedbacks/john_smith.jpg';
import johnSmith2x from '../images/feedbacks/john_smith@2x.jpg';
import johnSmithWebp1x from '../images/feedbacks/john_smith.webp';
import johnSmithWebp2x from '../images/feedbacks/john_smith@2x.webp';

import emilyJohnson1x from '../images/feedbacks/emily_johnson.jpg';
import emilyJohnson2x from '../images/feedbacks/emily_johnson@2x.jpg';
import emilyJohnsonWebp1x from '../images/feedbacks/emily_johnson.webp';
import emilyJohnsonWebp2x from '../images/feedbacks/emily_johnson@2x.webp';

import sofiaLee1x from '../images/feedbacks/sofia_lee.jpg';
import sofiaLee2x from '../images/feedbacks/sofia_lee@2x.jpg';
import sofiaLeeWebp1x from '../images/feedbacks/sofia_lee.webp';
import sofiaLeeWebp2x from '../images/feedbacks/sofia_lee@2x.webp';

import carlosMendez1x from '../images/feedbacks/carlos_mendez.jpg';
import carlosMendez2x from '../images/feedbacks/carlos_mendez@2x.jpg';
import carlosMendezWebp1x from '../images/feedbacks/carlos_mendez.webp';
import carlosMendezWebp2x from '../images/feedbacks/carlos_mendez@2x.webp';

import natalieBrooks1x from '../images/feedbacks/natalie_brooks.jpg';
import natalieBrooks2x from '../images/feedbacks/natalie_brooks@2x.jpg';
import natalieBrooksWebp1x from '../images/feedbacks/natalie_brooks.webp';
import natalieBrooksWebp2x from '../images/feedbacks/natalie_brooks@2x.webp';

import davidNguyen1x from '../images/feedbacks/david_nguyen.jpg';
import davidNguyen2x from '../images/feedbacks/david_nguyen@2x.jpg';
import davidNguyenWebp1x from '../images/feedbacks/david_nguyen.webp';
import davidNguyenWebp2x from '../images/feedbacks/david_nguyen@2x.webp';

import aishaPatel1x from '../images/feedbacks/aisha_patel.jpg';
import aishaPatel2x from '../images/feedbacks/aisha_patel@2x.jpg';
import aishaPatelWebp1x from '../images/feedbacks/aisha_patel.webp';
import aishaPatelWebp2x from '../images/feedbacks/aisha_patel@2x.webp';

import michaelThompson1x from '../images/feedbacks/michael_thompson.jpg';
import michaelThompson2x from '../images/feedbacks/michael_thompson@2x.jpg';
import michaelThompsonWebp1x from '../images/feedbacks/michael_thompson.webp';
import michaelThompsonWebp2x from '../images/feedbacks/michael_thompson@2x.webp';

const feedbacksData = [
  {
    text: 'Great selection, fast delivery, and beautifully packaged books.\nMy go-to store for weekend reads!',
    author: 'Jane Doe',
    position: 'Book Lover, Reader',
    avatar1x: janeDoe1x,
    avatar2x: janeDoe2x,
    avatarWebp1x: janeDoeWebp1x,
    avatarWebp2x: janeDoeWebp2x,
    rating: 4.8,
    subscription: 'gold',
  },
  {
    text: `This bookstore has become my absolute favorite! The rare editions section alone is worth the visit, and the staff always go above and beyond to recommend the perfect titles based on my interests.\nI love how they support local authors and host engaging events each month.`,
    author: 'John Smith',
    position: 'Editor, BookMag',
    avatar1x: johnSmith1x,
    avatar2x: johnSmith2x,
    avatarWebp1x: johnSmithWebp1x,
    avatarWebp2x: johnSmithWebp2x,
    rating: 4.6,
    subscription: null,
  },
  {
    text: `I was pleasantly surprised by the personalized touches in my last order—from the hand-written note tucked inside the package to the custom bookmark.\nThe whole experience felt crafted just for me, and I can’t wait to shop again!`,
    author: 'Emily Johnson',
    position: 'Author, Novelist',
    avatar1x: emilyJohnson1x,
    avatar2x: emilyJohnson2x,
    avatarWebp1x: emilyJohnsonWebp1x,
    avatarWebp2x: emilyJohnsonWebp2x,
    rating: 4.9,
    subscription: 'gold',
  },
  {
    text: `As a literature professor, I’m endlessly impressed by the depth of their catalog.\nThey carry everything from contemporary bestsellers to obscure academic volumes, and their recommendation engine never fails to introduce me to new gems.`,
    author: 'Sofia Lee',
    position: 'Literature Professor',
    avatar1x: sofiaLee1x,
    avatar2x: sofiaLee2x,
    avatarWebp1x: sofiaLeeWebp1x,
    avatarWebp2x: sofiaLeeWebp2x,
    rating: 4.7,
    subscription: null,
  },
  {
    text: 'I’ve discovered so many hidden gems thanks to this store.\nThe reviews really help me find niche titles I wouldn’t have found anywhere else!',
    author: 'Carlos Mendez',
    position: 'Blogger',
    avatar1x: carlosMendez1x,
    avatar2x: carlosMendez2x,
    avatarWebp1x: carlosMendezWebp1x,
    avatarWebp2x: carlosMendezWebp2x,
    rating: 4.5,
    subscription: 'silver',
  },
  {
    text: 'As a parent, I appreciate the kid-friendly book sections.\nMy son can’t get enough of the colorful picture books and board books we order each month!',
    author: 'Natalie Brooks',
    position: 'Mother & Teacher',
    avatar1x: natalieBrooks1x,
    avatar2x: natalieBrooks2x,
    avatarWebp1x: natalieBrooksWebp1x,
    avatarWebp2x: natalieBrooksWebp2x,
    rating: 4.6,
    subscription: null,
  },
  {
    text: `The curated collections are fantastic! I always find exactly what I’m looking for and discover new favorites.\nThe seasonal reading lists they publish are also a great way to branch out beyond my usual genres.`,
    author: 'David Nguyen',
    position: 'Graphic Designer',
    avatar1x: davidNguyen1x,
    avatar2x: davidNguyen2x,
    avatarWebp1x: davidNguyenWebp1x,
    avatarWebp2x: davidNguyenWebp2x,
    rating: 4.7,
    subscription: null,
  },
  {
    text: 'Fast shipping and top-notch service, with timely updates throughout delivery.\nI’ll definitely be back for more, especially during holiday sales!',
    author: 'Aisha Patel',
    position: 'Marketing Specialist',
    avatar1x: aishaPatel1x,
    avatar2x: aishaPatel2x,
    avatarWebp1x: aishaPatelWebp1x,
    avatarWebp2x: aishaPatelWebp2x,
    rating: 4.8,
    subscription: 'gold',
  },
  {
    text: 'Their children’s book selection is unbeatable.\nMy daughter devours every story and can’t wait for the next delivery!',
    author: 'Michael Thompson',
    position: 'Pediatric Nurse',
    avatar1x: michaelThompson1x,
    avatar2x: michaelThompson2x,
    avatarWebp1x: michaelThompsonWebp1x,
    avatarWebp2x: michaelThompsonWebp2x,
    rating: 4.5,
    subscription: 'silver',
  },
];

let feedbackSwiper;

function getTruncateIndex(block, fullText) {
  const clone = block.cloneNode();
  Object.assign(clone.style, {
    visibility: 'hidden',
    position: 'absolute',
    top: '0',
    left: '0',
    height: 'auto',
    webkitLineClamp: 'unset',
    display: 'block',
    overflow: 'visible',
  });
  block.parentNode.appendChild(clone);

  let low = 0,
    high = fullText.length;
  const maxH = block.clientHeight;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    clone.textContent = fullText.slice(0, mid);
    if (clone.scrollHeight <= maxH) low = mid;
    else high = mid - 1;
  }
  clone.remove();
  return low;
}

function renderFeedbackSlides(data) {
  const wrapper = document.querySelector('.swiper-feedback-wrapper');
  wrapper.innerHTML = '';
  data.forEach(
    ({
      text,
      author,
      position,
      avatar1x,
      avatar2x,
      avatarWebp1x,
      avatarWebp2x,
      rating,
      subscription,
    }) => {
      const slide = document.createElement('li');
      slide.className = 'swiper-slide feedback-card';
      slide.innerHTML = `
  <div class="feedback-text-wrapper">
    <blockquote class="feedback-text">
      <span class="text-content">${text}</span>
    </blockquote>
  </div>
  <div class="feedback-overlay" aria-hidden="true">
    <div class="overlay-text"></div>
  </div>
  <div class="feedback-meta">
    <div class="feedback-rating" data-rating="${rating}"></div>
    ${
      subscription
        ? `<div class="badge badge--${subscription}">
             <svg class="icon-verified"><use xlink:href="#icon-verified"/></svg>
             Verified
           </div>`
        : `<div class="badge badge--unverified">Unverified</div>`
    }
  </div>
  <div class="feedback-author-wrapper">
    <picture>
      <source type="image/webp" srcset="${avatarWebp1x} 1x, ${avatarWebp2x} 2x">
      <source type="image/jpeg" srcset="${avatar1x} 1x, ${avatar2x} 2x">
      <img
        src="${avatar1x}"
        alt="${author}"
        width="48" height="48"
        loading="lazy"
      />
    </picture>
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
  feedbackSwiper = new Swiper('.feedbacks-slider', {
    slidesPerView: 1,
    spaceBetween: 24,
    speed: 600,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
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
    on: {
      paginationUpdate: () => {
        document
          .querySelectorAll('.swiper-pagination-bullet')
          .forEach(bullet => bullet.removeAttribute('tabindex'));
      },
    },
  });

  requestAnimationFrame(() => {
    document
      .querySelectorAll('.swiper-pagination-bullet')
      .forEach(bullet => bullet.removeAttribute('tabindex'));
  });

  document.querySelectorAll('.feedback-rating').forEach(el => {
    new Rater({
      element: el,
      max: 5,
      step: 0.1,
      rating: parseFloat(el.dataset.rating),
      readOnly: true,
      starSize: 14,
      showToolTip: false,
    });
  });
}

function bindCardAutoplayEvents() {
  const cards = document.querySelectorAll('.feedback-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      feedbackSwiper?.autoplay?.stop();
    });
    card.addEventListener('mouseleave', () => {
      feedbackSwiper?.autoplay?.start();
    });
    card.addEventListener('focusin', () => {
      feedbackSwiper?.autoplay?.stop();
    });
    card.addEventListener('focusout', () => {
      feedbackSwiper?.autoplay?.start();
    });
  });
}
function attachOverlays() {
  const mqlTablet = window.matchMedia(
    '(min-width: 768px) and (max-width: 1439px)'
  );
  const mqlDesktop = window.matchMedia('(min-width: 1440px)');

  document.querySelectorAll('.feedback-card').forEach(card => {
    const wrapper = card.querySelector('.feedback-text-wrapper');
    const block = wrapper.querySelector('.feedback-text');
    const textEl = block.querySelector('.text-content');
    const overlay = card.querySelector('.feedback-overlay');
    const ovText = overlay.querySelector('.overlay-text');
    let timer,
      isOpen = false;

    if (block.scrollHeight <= block.clientHeight) {
      wrapper.classList.add('full-text');
      return;
    }

    function openOverlay() {
      if (isOpen) return;
      isOpen = true;

      feedbackSwiper.autoplay?.stop();
      feedbackSwiper.allowTouchMove = false;

      overlay.setAttribute('aria-hidden', 'false');
      overlay.style.display = 'block';

      const fullText = textEl.textContent;
      const idx = getTruncateIndex(block, fullText);

      const measure = block.cloneNode();
      Object.assign(measure.style, {
        visibility: 'hidden',
        position: 'absolute',
        top: '0',
        left: '0',
        height: 'auto',
        webkitLineClamp: 'unset',
        display: 'block',
        overflow: 'visible',
      });
      measure.textContent = fullText.slice(0, idx);
      const marker = document.createElement('span');
      marker.className = 'text-marker';
      measure.appendChild(marker);
      block.parentNode.appendChild(measure);

      const cardRect = card.getBoundingClientRect();
      const mRect = marker.getBoundingClientRect();
      overlay.style.setProperty('--text-top', `${mRect.top - cardRect.top}px`);
      overlay.style.setProperty(
        '--text-left',
        `${mRect.left - cardRect.left}px`
      );

      measure.remove();

      const visiblePart = fullText.slice(0, idx);
      const hiddenPart = fullText.slice(idx);

      ovText.textContent = visiblePart;
      ovText.style.display = 'inline-block';
      ovText.style.whiteSpace = 'pre-wrap';
      ovText.style.wordBreak = 'break-word';

      let i = 0;
      (function step() {
        if (i < hiddenPart.length) {
          ovText.textContent += hiddenPart[i++];
          timer = setTimeout(step, 25);
        }
      })();

      const totalDelay = hiddenPart.length * 25 + 2000;
      setTimeout(() => {
        feedbackSwiper.allowTouchMove = true;
        if (!card.matches(':hover') && !card.matches(':focus-within')) {
          feedbackSwiper.autoplay?.start();
        }
      }, totalDelay);
    }
    function closeOverlay(final = false) {
      clearTimeout(timer);
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.display = 'none';
      feedbackSwiper.allowTouchMove = true;
      feedbackSwiper.autoplay?.start();
      if (final) isOpen = false;
    }

    function onMobile() {
      textEl.removeEventListener('click', onTablet);
      textEl.removeEventListener('focusin', onDesktop);
      textEl.removeEventListener('blur', onDesktop);
      textEl.addEventListener('click', () => {
        isOpen ? closeOverlay(true) : openOverlay();
      });
      document.addEventListener('click', e => {
        if (isOpen && !wrapper.contains(e.target)) closeOverlay(true);
      });
    }
    function onTablet() {
      textEl.removeEventListener('click', onMobile);
      textEl.removeEventListener('focusin', onDesktop);
      textEl.removeEventListener('blur', onDesktop);
      textEl.addEventListener('click', openOverlay);
      document.addEventListener('click', e => {
        if (isOpen && !wrapper.contains(e.target)) closeOverlay(true);
      });
    }
    function onDesktop() {
      textEl.removeEventListener('click', onMobile);
      textEl.removeEventListener('click', onTablet);

      card.setAttribute('tabindex', '0');
      card.addEventListener('focusin', openOverlay);
      card.addEventListener('focusout', e => {
        if (!card.contains(e.relatedTarget)) closeOverlay(true);
      });

      card.addEventListener('mouseenter', openOverlay);
      card.addEventListener('mouseleave', () => closeOverlay(true));
    }

    function applyMode() {
      closeOverlay(true);
      if (mqlDesktop.matches) onDesktop();
      else if (mqlTablet.matches) onTablet();
      else onMobile();
    }
    mqlTablet.addListener(applyMode);
    mqlDesktop.addListener(applyMode);
    applyMode();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeedbackSlides(feedbacksData);
  initFeedbackSlider();
  bindCardAutoplayEvents();
  attachOverlays();
  initScrollAnimations();
});
