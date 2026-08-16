import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        svnctm: {
          pink: '#C54B8D',
          'pink-light': '#F7D8E6',
          lavender: '#CFC8FF',
          cream: '#FFF8F4',
          'white-warm': '#F7F5F2',
          'sky-light': '#CFE6FF',
          charcoal: '#2E2E2E',
        },
      },
      fontFamily: {
        heading: [
          'Neue Montreal',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        body: [
          'Avenir',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.2' }],
        'heading-1': ['2.5rem', { lineHeight: '1.3' }],
        'heading-2': ['2rem', { lineHeight: '1.3' }],
        'heading-3': ['1.5rem', { lineHeight: '1.4' }],
        'heading-4': ['1.25rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-base': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'section': '5rem',
        'section-lg': '7rem',
      },
      borderRadius: {
        'brand': '1.5rem',
        'lg': '1rem',
      },
      boxShadow: {
        'soft': '0 10px 40px rgba(46, 46, 46, 0.08)',
        'medium': '0 15px 50px rgba(46, 46, 46, 0.12)',
        'none': 'none',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          'from': {
            opacity: '0',
          },
          'to': {
            opacity: '1',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
