/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#5B8DB8',
          600: '#4A7AA3',
          700: '#3B6A8F',
          DEFAULT: '#5B8DB8',
        },
        secondary: { DEFAULT: '#7CB9A8' },
        surface: '#F5F7FA',
        card: '#FFFFFF',
        border: '#E2E8F0',
        textPrimary: '#2D3748',
        textSecondary: '#718096',
        locationHome: '#FFFFFF',
        locationOutside: '#FDE8C8',
        locationOnline: '#DAEDF9',
      }
    }
  },
  plugins: []
};
