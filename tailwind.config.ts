import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E4E7F0',
          100: '#C4CBE0',
          200: '#9CA6CC',
          300: '#7481B8',
          400: '#4C5DA4',
          500: '#3B4A8A',
          600: '#2D3870',
          700: '#1F2656',
           800: '#151B30',
           900: '#0A0C16',
          950: '#04050A'
        },
        cream: {
          50: '#FCF9F5',
          100: '#F5EDE1',
          200: '#EDE0CD',
          300: '#E0CDB0',
          400: '#D3BA93',
          500: '#C6A776',
          600: '#A8865A',
          700: '#8B6A45',
          800: '#6E4F30',
          900: '#51341B'
        },
        warm: {
          50: '#FFF8F0',
          100: '#FFEBD6',
          200: '#FFD9B3',
          300: '#FFC08A',
          400: '#FFA75C',
          500: '#F58C35',
          600: '#D9741F',
          700: '#B35D14',
          800: '#8C470C',
          900: '#663205'
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#3B4A8A',
            '--tw-prose-headings': '#0A0C16',
            '--tw-prose-links': '#3B4A8A',
            '--tw-prose-bold': '#0A0C16',
            '--tw-prose-quotes': '#2D3870',
            '--tw-prose-quote-borders': '#3B4A8A',
            maxWidth: 'none',
          }
        },
        invert: {
          css: {
            '--tw-prose-body': '#EDE0CD',
            '--tw-prose-headings': '#FCF9F5',
            '--tw-prose-links': '#9CA6CC',
            '--tw-prose-bold': '#FCF9F5',
            '--tw-prose-quotes': '#E0CDB0',
            '--tw-prose-quote-borders': '#9CA6CC',
          }
        }
      }
    }
  },
  plugins: [typography]
} satisfies Config;
