/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#24292e',
        'secondary-dark': '#2b3137',
        'primary-light': '#fafbfc',
        'secondary-light': '#ffff',
        'green': '#2dba4e',
      },
    },
  },
  plugins: [],
}

