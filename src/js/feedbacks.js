import Swiper from 'swiper/bundle';

import Rater from 'rater-js';

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
    subscription: null,
  },
  {
    text: 'Love еееееее ееееее ккккккккккккк ккккк  к   к к к к к кк к к к к к к к к к  кк к  к кк к к  к к к к к к к к к к к к к к к к к кк  к к к к к к к к к к кк ыпваыпав прав ав пав авы ыв авы авы аывфа ывп акерпкеу екуп кувп ку екуце куцап вып ке ке ываплтукпотлпь цукруцзшгкруц шкгуш кгруцшз цу й  шуцйкшщуцкшзгукшгцуш уцуц  щзшуцйщшцщшуц щуш щ ш щшщшщшщ шщ ш',
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
    subscription: null,
  },
  {
    text: 'I’ve discovered so many hidden gems thanks to this store. The reviews really help!',
    author: 'Carlos Mendez',
    position: 'Blogger',
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
    subscription: null,
  },
  {
    text: 'The curated collections are fantastic! I always find exactly what I’m looking for and discover new favorites.',
    author: 'David Nguyen',
    position: 'Graphic Designer',
    avatar1x: davidNguyen1x,
    avatar2x: davidNguyen2x,
    rating: 4.7,
    subscription: null,
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
];

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
    ({ text, author, position, avatar1x, avatar2x, rating, subscription }) => {
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
    <img
      src="${avatar1x}"
      srcset="${avatar1x} 1x, ${avatar2x} 2x"
      alt="${author}"
      width="48" height="48"
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
    autoplay: {
      delay: 5000,
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

  swiper.el.addEventListener('mouseenter', () => swiper.autoplay?.stop());
  swiper.el.addEventListener('mouseleave', () => swiper.autoplay?.start());
  swiper.el.addEventListener('focusin', () => swiper.autoplay?.stop());
  swiper.el.addEventListener('focusout', () => swiper.autoplay?.start());
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
          timer = setTimeout(step, 50);
        }
      })();
    }
    function closeOverlay(final = false) {
      clearTimeout(timer);
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.display = 'none';
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
      textEl.setAttribute('tabindex', '0');
      textEl.addEventListener('focusin', openOverlay);
      textEl.addEventListener('focusout', () => closeOverlay(true));
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
  attachOverlays();
});
