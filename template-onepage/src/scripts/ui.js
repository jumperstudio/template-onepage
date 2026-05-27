if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function onReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
    return;
  }

  callback();
}

function initScrollStart() {
  if (!window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
    window.addEventListener(
      'load',
      () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      },
      { once: true },
    );
  }
}

function initMobileMenu() {
  const mobileMenu = document.querySelector('#mobile-menu');
  const mobileMenuToggles = document.querySelectorAll('[data-mobile-menu-toggle]');
  if (!mobileMenu || mobileMenuToggles.length === 0) return;

  const setMenuState = (isOpen) => {
    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));

    mobileMenuToggles.forEach((item) => {
      item.setAttribute('aria-expanded', String(isOpen));
    });
  };

  mobileMenuToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      setMenuState(!mobileMenu.classList.contains('is-open'));
    });
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });
}

function getLightboxImages(lightbox) {
  const lightboxData = lightbox.querySelector('[data-lightbox-images]');
  if (!lightboxData?.textContent) return [];

  try {
    return JSON.parse(lightboxData.textContent);
  } catch {
    return [];
  }
}

function initLightbox() {
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = lightbox?.querySelector('[data-lightbox-image]');
  const lightboxCounter = lightbox?.querySelector('[data-lightbox-counter]');
  const lightboxTriggers = document.querySelectorAll('[data-lightbox-trigger]');
  if (!lightbox || !lightboxImage || !lightboxCounter || lightboxTriggers.length === 0) return;

  const lightboxImages = getLightboxImages(lightbox);
  if (lightboxImages.length === 0) return;

  let activeIndex = 0;

  const setLightboxImage = (index) => {
    activeIndex = (index + lightboxImages.length) % lightboxImages.length;
    const item = lightboxImages[activeIndex];

    lightboxImage.setAttribute('src', item.src);
    lightboxImage.setAttribute('alt', item.alt);
    lightboxCounter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(lightboxImages.length).padStart(2, '0')}`;
  };

  const openLightbox = (index) => {
    setLightboxImage(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lightbox.querySelector('[data-lightbox-close]')?.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  };

  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openLightbox(Number(trigger.getAttribute('data-lightbox-index') || 0));
    });
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach((button) => {
    button.addEventListener('click', closeLightbox);
  });

  lightbox.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => {
    setLightboxImage(activeIndex - 1);
  });

  lightbox.querySelector('[data-lightbox-next]')?.addEventListener('click', () => {
    setLightboxImage(activeIndex + 1);
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;

    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') setLightboxImage(activeIndex - 1);
    if (event.key === 'ArrowRight') setLightboxImage(activeIndex + 1);
  });
}

onReady(() => {
  initScrollStart();
  initMobileMenu();
  initLightbox();
});
