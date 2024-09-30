/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/.vitepress/**/*.{js,ts,vue}",
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
    './public/index.html',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    screens: {
      '2xl': { max: '1699.98px' },
      xl: { max: '1439.98px' },
      lg: { max: '1199.98px' },
      md: { max: '991.98px' },
      sm: { max: '767.98px' },
      xs: { max: '575.98px' },
    },
    extend: {
      backgroundImage: {
        'dark-bg': "url('/src/assets/background-dark.webp')",
        'light-bg': "url('/src/assets/background-light.webp')"
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      spacing: {
        innerWidth: 'var(--inner-width)',
      },
      colors: {
        primary: 'var(--primary)',
        primary50: 'var(--primary-50)',
        info: 'var(--info)',
        black: 'var(--black)',
        dGrey: 'var(--d-grey)',
        grey: 'var(--grey)',
        lGrey: 'var(--l-grey)',
        greyBlue: 'var(--grey-blue)',
        greyBlue50: 'var(--grey-blue-50)',
        sliver: 'var(--sliver)',
        sliver50: 'var(--sliver-50)',
        white: 'var(--white)',
        white50: 'var(--white-50)',
        white33: 'var(--white-33)',
        related1: 'var(--related-1)',
        related2: 'var(--related-2)',
        related3: 'var(--related-3)',
        shade1: 'var(--shade-1)',
        shade2: 'var(--shade-2)',
        tint1: 'var(--tint-1)',
        tint150: 'var(--tint-1-50)',
        tint2: 'var(--tint-2)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        success: 'var(--success)',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    }
  }
}

