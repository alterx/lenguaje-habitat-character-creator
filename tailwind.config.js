/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      colors: {
        // Forest-themed dark palette inspired by the game cover
        forest: {
          50: '#f7f9f7', // Very light green-tinted white
          100: '#e8f2e8', // Light green-tinted gray
          200: '#d1e7d1', // Light forest green
          300: '#a8d5a8', // Medium light green
          400: '#6ab66a', // Medium green
          500: '#4a9d4a', // Base green
          600: '#3a7c3a', // Darker green
          700: '#2d5f2d', // Deep forest green
          800: '#1f4a1f', // Very dark forest green
          900: '#133313', // Almost black forest green
          950: '#0a1f0a', // Deepest forest black
        },
        // Mystical accent colors
        mist: {
          50: '#f8faf9',
          100: '#f0f4f1',
          200: '#dfe8e1',
          300: '#c5d4c7',
          400: '#a3b8a6',
          500: '#829b85',
          600: '#677d6a',
          700: '#536456',
          800: '#455247',
          900: '#3a433c',
        },
        // Parchment colors for text/content areas
        parchment: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#fbf2e5',
          300: '#f7e8d1',
          400: '#f1d8b5',
          500: '#e9c896',
          600: '#deb674',
          700: '#d19f52',
          800: '#b8894a',
          900: '#9a7142',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        fantasy: ['Papyrus', 'Brush Script MT', 'cursive'],
      },
      backgroundImage: {
        'forest-texture':
          'radial-gradient(circle at 25% 25%, rgba(26, 51, 26, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 41, 16, 0.05) 0%, transparent 50%)',
        'paper-texture':
          'radial-gradient(circle at 50% 50%, rgba(139, 69, 19, 0.03) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
