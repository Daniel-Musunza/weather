/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
  theme: {
    screens: {
      'sm1': '462px',
      'sm': '640px',
      'md': '768px',
      'md1': '923px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'white': '#ffffff',
        'black': '#0000000',
        'darkBlue': '#0E46A3',
        'darkBlue-2': '#192655',
        'lightBlue': '#7286D3',
        'lightBlue-2': '#C4DDFF'
      },
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideLeft: 'slideLeft 0.5mds ease-in-out',
        slideRight: 'slideRight 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}

