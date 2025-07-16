/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  corePlugins: {
    container: false,
  },
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1200px'},

      'xl': {'max': '1075px'},

      'lg': {'max': '980px'},

      'ml': {'max': '890px'},

      'md': {'max': '780px'},

      'sm': {'max': '680px'},

      'xs': {'max': '560px'},
    },
    extend: {
      margin: {
        '4.5': '1.13rem'
      },
      fontSize: {
        '1.5xl': '1.375rem',
        '2.5xl': '1.75rem'
      },
      borderRadius: {
        'm': '0.313rem'
      },
      padding: {
        '1.25': '0.313rem',
        '4.5': '1.125rem'
      },
      colors: {
        'light-primary': 'rgb(36, 45, 52, var(--tw-bg-opacity, 1))',
        'main-gray-900': 'rgb(11, 13, 18)',
        'main-gray-700': 'rgb(39, 46, 63)',
        'main-gray-500': 'rgb(68, 80, 111)',
        'main-gray-300': 'rgb(97, 114, 158)',
        'main-gray-100': 'rgb(160, 171, 197)',
        'main-gray-50': 'rgb(223, 227, 236)',
        'main-purple-900': 'rgb(51, 17, 136)',
        'main-purple-700': 'rgb(73, 24, 194)',
        'main-orange-900': 'rgb(145, 33, 8)',
        'main-orange-700': 'rgb(169, 39, 10)'
      },
      boxShadow: {
        'purple-lg': '0 7px 20px rgb(51, 17, 136, .5)'
      },
      gridTemplateColumns: {
        '1-auto-1': '1fr auto 1fr',
        'auto-auto': 'repeat(2, auto)',
        '400-auto': 'min(400px, 50%) auto',
      },
      height: {
        '4.5': '1.128rem',
        '18': '4.5rem'
      },
      width: {
        '38': '9.5rem',
        '4.5': '1.125rem'
    },
      zIndex: {
        '998': '998',
        '999': '999'
      }
    }
  },
  plugins: [],
}

