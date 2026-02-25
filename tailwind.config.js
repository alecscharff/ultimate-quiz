/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fredoka One"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
      },
      keyframes: {
        'bounce-in': {
          '0%':   { transform: 'scale(0.5)', opacity: '0' },
          '60%':  { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        'slide-up': {
          '0%':   { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        'slide-in-left': {
          '0%':   { transform: 'translateX(-24px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',     opacity: '1' },
        },
        'modal-in': {
          '0%':   { transform: 'scale(0.88) translateY(24px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)',        opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.08)' },
        },
        'confetti-fall': {
          '0%':   { transform: 'translateY(-20px) rotate(0deg)',   opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(540deg)', opacity: '0' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      animation: {
        'bounce-in':    'bounce-in 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards',
        'slide-up':     'slide-up 0.4s ease-out forwards',
        'slide-in-left':'slide-in-left 0.4s ease-out forwards',
        'modal-in':     'modal-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'float':        'float 3s ease-in-out infinite',
        'spin-slow':    'spin-slow 10s linear infinite',
        'pulse-scale':  'pulse-scale 2s ease-in-out infinite',
        'confetti-fall':'confetti-fall 2.8s ease-in forwards',
        'shimmer':      'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
