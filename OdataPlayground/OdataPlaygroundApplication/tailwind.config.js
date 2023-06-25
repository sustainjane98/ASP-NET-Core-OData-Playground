/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
