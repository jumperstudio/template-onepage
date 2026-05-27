import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let canAnimate = true;

try {
  gsap.registerPlugin(ScrollTrigger);
} catch {
  canAnimate = false;
}

const reducedMotionQuery = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null;
const prefersReduced = reducedMotionQuery?.matches ?? false;
const revealSelector = '.reveal-up, .reveal-mask';
let lastScrollY = window.scrollY;
let isScrollingDown = true;

function runSafely(callback, fallback) {
  try {
    callback();
  } catch {
    fallback?.();
  }
}

function setWithoutReveal(el, visible) {
  el.classList.add('reveal-no-transition');
  el.classList.toggle('is-visible', visible);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.remove('reveal-no-transition'));
  });
}

function showWithReveal(el) {
  el.classList.remove('reveal-no-transition');
  el.classList.add('is-visible');
}

function isFullyBelowViewport(el) {
  return el.getBoundingClientRect().top >= window.innerHeight;
}

function initSmoothScroll() {
  if (prefersReduced || !canAnimate) return;

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  lenis.on('scroll', ScrollTrigger.update);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      try {
        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        lenis.scrollTo(target, { offset: -40, duration: 1.3 });
      } catch {
        // Ignore invalid selectors in href values.
      }
    });
  });
}

function initScrollDirection(revealItems) {
  let resetQueued = false;

  const resetItemsBelowViewport = () => {
    resetQueued = false;

    revealItems.forEach((el) => {
      if (isFullyBelowViewport(el) && el.classList.contains('is-visible')) {
        setWithoutReveal(el, false);
      }
    });
  };

  window.addEventListener(
    'scroll',
    () => {
      const currentScrollY = window.scrollY;
      isScrollingDown = currentScrollY >= lastScrollY;

      if (!isScrollingDown && !resetQueued) {
        resetQueued = true;
        requestAnimationFrame(resetItemsBelowViewport);
      }

      lastScrollY = currentScrollY;
    },
    { passive: true },
  );
}

function initScrollProgress() {
  if (!canAnimate) return;

  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });
}

function initRevealOnScroll() {
  const revealItems = Array.from(document.querySelectorAll(revealSelector));

  if (prefersReduced || !canAnimate) {
    revealItems.forEach((el) => setWithoutReveal(el, true));
    return;
  }

  initScrollDirection(revealItems);

  revealItems.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 94%',
      end: 'bottom 15%',
      onEnter: () => {
        if (isScrollingDown) {
          showWithReveal(el);
        } else {
          setWithoutReveal(el, true);
        }
      },
      onEnterBack: () => setWithoutReveal(el, true),
    });
  });
}

function initStagger() {
  document.querySelectorAll('[data-stagger]').forEach((container) => {
    container.querySelectorAll('[data-stagger-item]').forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.08}s`;
    });
  });
}

function initParallax() {
  if (prefersReduced || !canAnimate) return;

  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;

    gsap.to(el, {
      yPercent: -15 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

function initHeroAnimation() {
  if (prefersReduced || !canAnimate) return;

  const heroLines = document.querySelectorAll('[data-hero-line]');
  if (heroLines.length) {
    gsap.set(heroLines, { yPercent: 110 });
    gsap.to(heroLines, {
      yPercent: 0,
      duration: 1.1,
      stagger: 0.08,
      ease: 'expo.out',
      delay: 0.2,
    });
  }

  const heroFade = document.querySelectorAll('[data-hero-fade]');
  if (heroFade.length) {
    gsap.fromTo(
      heroFade,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        delay: 0.7,
        ease: 'power3.out',
      },
    );
  }
}

function initSectionFade() {
  if (prefersReduced || !canAnimate) return;

  document.querySelectorAll('[data-section-blur]').forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0.92 },
      {
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 94%',
          end: 'top 58%',
          scrub: 0.8,
        },
      },
    );
  });
}

function initMotion() {
  runSafely(initSmoothScroll);
  runSafely(initScrollProgress);
  runSafely(initRevealOnScroll, () => {
    document.querySelectorAll(revealSelector).forEach((el) => setWithoutReveal(el, true));
  });
  runSafely(initStagger);
  runSafely(initParallax);
  runSafely(initHeroAnimation);
  runSafely(initSectionFade);

  if (canAnimate) {
    runSafely(() => ScrollTrigger.refresh());
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMotion, { once: true });
} else {
  initMotion();
}
