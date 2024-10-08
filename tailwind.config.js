/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        karla: ['var(--font-karla)'],
        luckiest: ['var(--font-luckiest-guy)'],
        palanquin_dark: ['var(--font-palanquin-dark)'],
      },
      backgroundImage: {
        'custom-image1': "url('/card_image1.png')", // Use absolute path
        'custom-image2': "url('/card_image2.png')",
        'custom-image3': "url('/card_image3.png')",
        'custom-image4': "url('/card_image4.png')",
        'custom-image5': "url('/card_image5.png')",
        'custom-image6': "url('/card_image6.png')",
      },
      colors: {
        'custom-green': '#30BD75',
        'custom-pink': '#E4086F',
        'custom-yellow': '#FDE504', // Fixed key: changed 'customYellow' to 'custom-yellow'
        'custom-gray': '#201F1F4D',
        'custom-white': '#EDEDED',  // Fixed key: changed 'custom-White' to 'custom-white'
      },
    },
  },
  plugins: [],
};
