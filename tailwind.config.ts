import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#369afb',
        'primary-dark': '#152c56',
        'primary-light': '#5cb9fe',
        'secondary': '#000000',
        'secondary-light': '#ffffff',
        'accent': '#369afb',
        'accent-dark': '#152c56',
        'mariner-50': '#eff8ff',
        'mariner-100': '#daefff',
        'mariner-200': '#bde3ff',
        'mariner-300': '#90d3ff',
        'mariner-400': '#5cb9fe',
        'mariner-500': '#369afb',
        'mariner-600': '#1f7cf1',
        'mariner-700': '#1866e0',
        'mariner-800': '#1a51b3',
        'mariner-900': '#1b478d',
        'mariner-950': '#152c56',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #369afb 0%, #152c56 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #152c56 0%, #369afb 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-custom': 'pulseDot 2s ease-in-out infinite',
        'border-glow': 'borderGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(54, 154, 251, 0.5)' },
          '50%': { borderColor: 'rgba(54, 154, 251, 1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '52px' }],
        '6xl': ['60px', { lineHeight: '64px' }],
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
export default config
