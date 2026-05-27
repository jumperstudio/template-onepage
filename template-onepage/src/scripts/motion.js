// motion.js — animações discretas, multinicho
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

console.log('motion.js: script started');

try {
  gsap.registerPlugin(ScrollTrigger);
  console.log('motion.js: gsap registered');
} catch (e) {
  console.error('motion.js: failed to register gsap ScrollTrigger', e);
}

const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ═══ SMOOTH SCROLL ═══════════════════════════════════════════════════════
if (!prefersReduced) {
  try {
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
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        try {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -40, duration: 1.3 });
          }
        } catch (err) {
          console.error('motion.js: smooth scroll target error', err);
        }
      });
    });
    console.log('motion.js: smooth scroll initialized');
  } catch (e) {
    console.error('motion.js: failed to initialize smooth scroll', e);
  }
}

// ═══ SCROLL PROGRESS ═════════════════════════════════════════════════════
try {
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
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
    console.log('motion.js: scroll progress initialized');
  }
} catch (e) {
  console.error('motion.js: failed to initialize scroll progress', e);
}

// ═══ REVEAL ON SCROLL ════════════════════════════════════════════════════
try {
  const setWithoutReveal = (el, visible) => {
    el.classList.add('reveal-no-transition');
    el.classList.toggle('is-visible', visible);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.remove('reveal-no-transition'));
    });
  };

  const showWithReveal = (el) => {
    el.classList.remove('reveal-no-transition');
    el.classList.add('is-visible');
  };

  const revealItems = Array.from(document.querySelectorAll('.reveal-up, .reveal-mask'));
  let lastRevealScrollY = window.scrollY;
  let resetQueued = false;

  const resetItemsBelowViewport = () => {
    resetQueued = false;
    revealItems.forEach((el) => {
      if (el.classList.contains('is-visible') && el.getBoundingClientRect().top >= window.innerHeight + 8) {
        setWithoutReveal(el, false);
      }
    });
  };

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < lastRevealScrollY;

    if (isScrollingUp && !resetQueued) {
      resetQueued = true;
      requestAnimationFrame(resetItemsBelowViewport);
    }

    lastRevealScrollY = currentScrollY;
  }, { passive: true });

  revealItems.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      end: 'bottom 15%',
      onEnter: () => showWithReveal(el),
      onEnterBack: () => {
        if (!el.classList.contains('is-visible')) {
          setWithoutReveal(el, true);
        }
      },
    });

    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      onLeaveBack: () => {
        setWithoutReveal(el, false);
      }
    });
  });
  console.log('motion.js: reveal on scroll triggers initialized');
} catch (e) {
  console.error('motion.js: failed to initialize reveal on scroll', e);
}

// ═══ STAGGER ═════════════════════════════════════════════════════════════
try {
  document.querySelectorAll('[data-stagger]').forEach((container) => {
    const children = container.querySelectorAll('[data-stagger-item]');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.08}s`;
    });
  });
} catch (e) {
  console.error('motion.js: failed to initialize stagger', e);
}

// ═══ PARALLAX SUTIL ══════════════════════════════════════════════════════
try {
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
} catch (e) {
  console.error('motion.js: failed to initialize parallax', e);
}

// ═══ HERO ENTRADA ════════════════════════════════════════════════════════
function initHeroAnimation() {
  console.log('motion.js: initHeroAnimation called');
  try {
    const heroLines = document.querySelectorAll('[data-hero-line]');
    console.log('motion.js: found hero lines:', heroLines.length);
    if (heroLines.length) {
      gsap.set(heroLines, { yPercent: 110 });
      gsap.to(heroLines, {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'expo.out',
        delay: 0.2,
      });
      console.log('motion.js: hero lines animation started');
    }

    const heroFade = document.querySelectorAll('[data-hero-fade]');
    console.log('motion.js: found hero fade items:', heroFade.length);
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
        }
      );
      console.log('motion.js: hero fade animation started');
    }

    setTimeout(() => {
      const lines = document.querySelectorAll('[data-hero-line]');
      lines.forEach((line, i) => {
        const parent = line.parentElement;
        const compLine = window.getComputedStyle(line);
        const compParent = parent ? window.getComputedStyle(parent) : null;
        console.log(`motion.js debug: line ${i} ("${line.textContent.trim()}"): ` +
          `inlineTransform="${line.style.transform}" | ` +
          `compTransform="${compLine.transform}" | ` +
          `compOpacity="${compLine.opacity}" | ` +
          `compColor="${compLine.color}" | ` +
          `parentHeight="${compParent ? compParent.height : 'null'}" | ` +
          `parentOverflow="${compParent ? compParent.overflow : 'null'}" | ` +
          `parentDisplay="${compParent ? compParent.display : 'null'}"`
        );
      });
    }, 2000);
  } catch (e) {
    console.error('motion.js: failed to run initHeroAnimation', e);
  }
}

try {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('motion.js: document ready state complete/interactive, running immediately');
    initHeroAnimation();
  } else {
    console.log('motion.js: document not ready, adding load listener');
    window.addEventListener('load', initHeroAnimation);
  }
} catch (e) {
  console.error('motion.js: failed to schedule initHeroAnimation', e);
}

// ═══ SECTION BACKGROUND FADE (sem deslocar fundos) ═══════════════════════
try {
  document.querySelectorAll('[data-section-blur]').forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0.92 },
      {
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          end: 'top 58%',
          scrub: 0.8,
        },
      }
    );
  });
} catch (e) {
  console.error('motion.js: failed to initialize section background fade', e);
}
