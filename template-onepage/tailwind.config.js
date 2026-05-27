/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // ─── ZONA DE ALTERAÇÃO DA IA ───────────────────────────────────────────
      // A IA SÓ ALTERA primary e secondary. Nada mais neste arquivo.
      colors: {
        primary:   '#E85D26', // cor primária do cliente (client.json → meta.primary_color)
        secondary: '#1C1C1C', // cor secundária do cliente (client.json → meta.secondary_color)
      },
      // ─── FIM DA ZONA DE ALTERAÇÃO ─────────────────────────────────────────

      // DS-02 Modern Local — tokens fixos, não alterar
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.0',  letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2rem)',  { lineHeight: '1.1' }],
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },
      borderRadius: {
        'card': '0.75rem',
        'btn':  '0.375rem',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.14)',
      },
      maxWidth: {
        'content': '72rem',
      },
    },
  },
  plugins: [],
};
