/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cornflower: {
          DEFAULT: '#6495ED',
          light: '#E6F0FF',
          dark: '#4169E1',
        },
        russet: {
          DEFAULT: '#80461B',
          light: '#F5E6D3',
          dark: '#5C3315',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
