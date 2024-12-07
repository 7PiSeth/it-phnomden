/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors')
module.exports = withMT({
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sun-effect': "url('assets/sunlight.png')",
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
        // Add more custom opacity values here
      },
    },
    fontFamily: {
      signature: ["Great Vibes"],
      'poppins': ['Poppins', 'sans-serif'],
      'raleway': ['Raleway', 'sans-serif'],
      'greatvibes': ['Great Vibes', 'sans-serif'],
      'battambang': ['battambang', 'sans-serif'],
      'bayon': ['Bayon', 'sans-serif'],
      'bokor': ['Bokor', 'sans-serif'],
      'chenla': ['Chenla', 'sans-serif'],
      'content': ['Content', 'sans-serif'],
      'dangrek': ['Dangrek', 'sans-serif'],
      'fasthand': ['Fasthand', 'sans-serif'],
      'freehand': ['Freehand', 'sans-serif'],
      'hanuman': ['Hanuman', 'sans-serif'],
      'khmer': ['khmer', 'sans-serif'],
      'kohsantepheap': ['Koh Santepheap', 'sans-serif'],
      'koulen': ['Koulen', 'sans-serif'],
      'metal': ['Metal', 'sans-serif'],
      'moul': ['Moul', 'sans-serif'],
      'moulpali': ['Moulpali', 'sans-serif'],
      'nokora': ['Nokora', 'sans-serif'],
      'odormeanchey': ['Odor Mean Chey', 'sans-serif'],
      'preahvihear': ['Preahvihear', 'sans-serif'],
      'siemreap': ['Siemreap', 'sans-serif'],
      'suwannaphum': ['Suwannaphum', 'sans-serif'],
      'taprom': ['Taprom', 'sans-serif'],
      'jetBrains':['JetBrains Mono', 'monospace']
    },
    colors: {
      ...colors,
      amber: colors.amber,
      emerald: colors.emerald,
    }
  },
  plugins: [require("daisyui"),],
  darkMode: 'class',
});

