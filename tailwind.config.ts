/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';

const config = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a247f',
        secondary: '#eef2f6',
        gray: '#d3d3d3',
        warning: '#f0da4e',
      },
    },
  },
  plugins: [],
};
export default config satisfies Config;
