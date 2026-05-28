/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      // ─── ZONA DA IA: só altera primary/secondary ───
      colors: {
        primary:   '#FF4D2E',
        secondary: '#0A0A0A',
        cream:     '#F5F1EA',
        smoke:     '#9B9B9B',
        line:      '#E5E1DA',
      },
      // ─── FIM DA ZONA DA IA ───

      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        'huge': ['clamp(3rem, 9vw, 7rem)',  { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        'big':  ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.16', letterSpacing: '-0.02em' }],
        'mid':  ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vw, 8rem)',
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      animation: {
        'marquee': 'marquee 68s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
