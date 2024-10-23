/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        schibsted: ['Schibsted Grotesk', 'sans-serif'],
        lobster: ['Lobster', 'sans-serif'],
      },
      boxShadow: {
        'custom-light':
          'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
      },
      colors: {
        'primary-dark': '#484554',
        'alpha-violet': '#8576FF',
        'base-dark': '#38343F',
      },
    },
  },
  plugins: [],
  important: true,
};
