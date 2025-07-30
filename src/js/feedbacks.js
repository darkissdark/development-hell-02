import feedbacksData from './feedbacks-data';
import Swiper from 'swiper/bundle';
import Rater from 'rater-js';

let feedbackSwiper;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
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
  let isUserInteracting = false;
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

    function markUserInteracting() {
      isUserInteracting = true;
      feedbackSwiper?.autoplay?.stop();
      if (feedbackSwiper) {
        feedbackSwiper.allowTouchMove = false;
        feedbackSwiper.allowSlideNext = false;
        feedbackSwiper.allowSlidePrev = false;
      }
    }

    function resetUserInteracting() {
      isUserInteracting = false;
      if (feedbackSwiper) {
        feedbackSwiper.allowTouchMove = true;
        feedbackSwiper.allowSlideNext = true;
        feedbackSwiper.allowSlidePrev = true;
      }
      feedbackSwiper?.autoplay?.start();
    }

    function openOverlay() {
      if (isOpen) return;
      isOpen = true;
      markUserInteracting();

      card.classList.add('gradient-overlay');
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
        if (!isUserInteracting) {
          feedbackSwiper.autoplay?.start();
        }
      }, totalDelay);
    }
    function closeOverlay(final = false) {
      clearTimeout(timer);
      card.classList.remove('gradient-overlay');
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.display = 'none';
      resetUserInteracting();
      if (final) isOpen = false;
    }

    function onMobile() {
      textEl.removeEventListener('click', onTablet);
      textEl.removeEventListener('focusin', onDesktop);
      textEl.removeEventListener('blur', onDesktop);
      textEl.addEventListener('click', () => {
        if (isOpen) {
          resetUserInteracting();
          closeOverlay(true);
        } else {
          openOverlay();
        }
      });
      document.addEventListener('click', e => {
        if (isOpen && !wrapper.contains(e.target)) {
          resetUserInteracting();
          closeOverlay(true);
        }
      });
    }
    function onTablet() {
      textEl.removeEventListener('click', onMobile);
      textEl.removeEventListener('focusin', onDesktop);
      textEl.removeEventListener('blur', onDesktop);
      textEl.addEventListener('click', () => {
        if (isOpen) {
          resetUserInteracting();
          closeOverlay(true);
        } else {
          openOverlay();
        }
      });
      document.addEventListener('click', e => {
        if (isOpen && !wrapper.contains(e.target)) {
          resetUserInteracting();
          closeOverlay(true);
        }
      });
    }
    function onDesktop() {
      textEl.removeEventListener('click', onMobile);
      textEl.removeEventListener('click', onTablet);

      card.setAttribute('tabindex', '0');
      card.addEventListener('focusin', () => {
        isUserInteracting = true;
        openOverlay();
      });
      card.addEventListener('focusout', e => {
        if (!card.contains(e.relatedTarget)) {
          isUserInteracting = false;
          closeOverlay(true);
        }
      });

      card.addEventListener('mouseenter', () => {
        isUserInteracting = true;
        openOverlay();
      });
      card.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        closeOverlay(true);
      });
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
  renderFeedbackSlides(shuffleArray([...feedbacksData]));
  initFeedbackSlider();
  bindCardAutoplayEvents();
  attachOverlays();
});
