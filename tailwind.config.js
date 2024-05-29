/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        primary: {
          500: '#4361EE',
        },
        green: {
          500: '#148519',
          700: '#046C4E',
        },
        gray: {
          300: '#D1D5DB',
          400: '#53555A',
          900: '#111928',
        },
        red: {
          650: '#D43325',
          550: '#FD0000',
        },
        blue: {
          500: '#1F2A37',
          900: '#111928',
        },
        brown: {
          500: '#532c17',
        },
      },
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    fontSize: {
      xs: [
        '8px',
        {
          letterSpacing: '2%',
          fontWeight: 'normal',
          lineHeight: '1rem',
        },
      ],
      sm: [
        '0.875rem',
        {
          letterSpacing: '2%',
          fontWeight: 'normal',
          lineHeight: '1.25rem',
        },
      ],
      base: [
        '1rem',
        {
          lineHeight: '1.5rem',
        },
      ],
      lg: [
        '1.125rem',
        {
          lineHeight: '1.75rem',
        },
      ],
      xl: [
        '1.25rem',
        {
          lineHeight: '1.75rem',
        },
      ],
      xxl: [
        '1.5rem',
        {
          lineHeight: '2rem',
        },
      ],
      iv: [
        '1.7rem',
        {
          lineHeight: '2.5rem',
        },
      ],
      buttonText: [
        '14px',
        {
          letterSpacing: '2%',
          fontWeight: 'semi-bold',
        },
      ],
      labels: [
        '12px',
        {
          fontWeight: 'medium',
        },
      ],
      'xxx-small': [
        '6px',
        {
          fontWeight: 'medium',
        },
      ],
      'xx-small': [
        '8px',
        {
          fontWeight: 'medium',
        },
      ],
      'x-small': [
        '10px',
        {
          fontWeight: 'medium',
        },
      ],
      small: [
        '14px',
        {
          lineHeight: '140%',
          fontWeight: 'medium',
        },
      ],
      'sm-regular': [
        '14px',
        {
          fontWeight: 'normal',
          lineHeight: '140%',
        },
      ],
      'md-regular': [
        '15px',
        {
          fontWeight: 'normal',
          lineHeight: '140%',
        },
      ],
      'sm-headline': ['16px', { lineHeight: '140%' }],
      'x-sm-headline': ['18px', { lineHeight: '140%' }],
      'md-headline': ['20px', { lineHeight: '140%' }],
      headline: ['24px', { fontWeight: 'medium' }],
      'l-headline': [
        '30px',
        {
          letterSpacing: '-2%',
        },
      ],
      'lg-heading': [
        '36px',
        {
          letterSpacing: '-2%',
          lineHeight: '125%',
        },
      ],
      'xl-heading': [
        '40px',
        {
          letterSpacing: '-2%',
        },
      ],
      'xxl-heading': [
        '52px',
        {
          letterSpacing: '-2%',
          lineHeight: '125%',
        },
      ],
      'xxxl-heading': [
        '100px',
        {
          letterSpacing: '-2%',
          lineHeight: '175%',
        },
      ],
    },
    boxShadow: {
      none: 'none',
      error: '0px 0px 1px 3px rgba(212, 87, 87, 0.1)',
      active: '0px 0px 1px 3px rgba(168, 204, 255, 0.35)',
      gray: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      'gray-100': '0px 0px 3px rgba(0, 0, 0, 0.12)',
      'gray-200': '0px 0px 4px rgba(0, 0, 0, 0.13)',
      basic: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    },
    backgroundImage: {
      authImage: "url('../src/assets/images/AuthPageImage.jpg')",
      authImg: 'url(../src/assets/images/authImg.png)',
      bgImage: "url('../src/assets/images/BgImg.jpeg')",
      courseMgtBg: "url('../src/assets/images/BgImg.jpeg')",
      userMgtBg: "url('../src/assets/images/courseManagement.png')",
      trkRprtBg: "url('../src/assets/images/tracking-and-reporting.png')",
      assessToolsBg: "url('../src/assets/images/assessment-tools.png')",
      notFoundBg: "url('../src/assets/images/404Desert2.jpg')",
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
};
