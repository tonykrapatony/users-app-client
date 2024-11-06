/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      darkBlue: '#1f2937',
      darkBlueTransparent: "rgba(31, 41, 55, .56)",
      purple: '#6366F1',
      red: '#4f1b1b',
      lightRed: '#752727',
      green: '#1f4515',
      lightGreen: '#2e6320',
      black: '#000',
      white: '#ffffff',
      gray: '#e3e3e3',
      inherit: 'inherit'
    },
    extend: {
      height: {
        'screen-minus-160': 'calc(100vh - 160px)',
        '100vh': '100vh',
      },
      width: {
        '100vw': '100vw',
      },
      gridTemplateRows: {
        '2-auto': 'repeat(2, auto)',
        '3-auto': 'repeat(3, auto)'
      },
      gridTemplateColumns: {
        '2-auto': 'repeat(2, auto)',
        '1fr-auto': '1fr auto'
      },
    },
  },
  plugins: [],
}

