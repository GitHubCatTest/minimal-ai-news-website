module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', '"Space Grotesk"', '"Rubik"', 'sans-serif'],
      },
      colors: {
        accent: "#7dd3fc",
        midnight: "#0f172a",
        alabaster: "#f5f7fb",
      },
      boxShadow: {
        glow: '0 0 35px rgba(125, 211, 252, 0.45)',
        frosted: '0 20px 60px -30px rgba(15, 23, 42, 0.65)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      transitionTimingFunction: {
        'in-out-soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
