const theme = require('./src/theme.js');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: theme.spacing[5],
        sm: theme.spacing[6],
        lg: theme.spacing[8],
        xl: theme.spacing[10],
      },
      screens: {
        '2xl': theme.layout.maxWidth,
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      fontSize: theme.typography.scale,
      colors: theme.colors,
      boxShadow: theme.shadows,
      borderRadius: theme.radii,
      spacing: theme.spacing,
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
