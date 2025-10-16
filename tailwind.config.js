/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable manual toggle using .dark class
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // all files inside app folder
    "./components/**/*.{js,ts,jsx,tsx}", // all components
    "./pages/**/*.{js,ts,jsx,tsx}",      // if you have pages folder, otherwise remove this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
