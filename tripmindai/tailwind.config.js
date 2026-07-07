/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#16233A',
        paper: '#EEEFE7',
        paperDark: '#E4E4D8',
        amber: {
          DEFAULT: '#E8A33D',
          dark: '#C9862B',
          light: '#F4C978',
        },
        teal: {
          DEFAULT: '#2F6F63',
          dark: '#204E45',
          light: '#4E9385',
        },
        coral: '#C1502E',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'dotted-path': 'radial-gradient(circle, rgba(22,35,58,0.35) 1.5px, transparent 1.5px)',
      },
      borderRadius: {
        ticket: '14px',
      },
    },
  },
  plugins: [],
};
