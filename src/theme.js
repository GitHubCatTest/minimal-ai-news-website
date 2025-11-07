const theme = {
  colors: {
    background: '#F8F9FB',
    surface: '#FFFFFF',
    text: {
      primary: '#0E1116',
      secondary: '#495163',
      muted: '#6B7280',
    },
    accent: {
      blue: '#3B82F6',
      emerald: '#10B981',
      amber: '#F59E0B',
    },
    border: 'rgba(15, 17, 22, 0.06)',
  },
  radii: {
    'xs': '0.25rem',
    'sm': '0.375rem',
    'md': '0.5rem',
    'lg': '0.75rem',
    'xl': '1rem',
    '2xl': '1.25rem',
  },
  shadows: {
    subtle: '0 1px 2px rgba(15, 17, 22, 0.04), 0 1px 3px rgba(15, 17, 22, 0.06)',
    card: '0 8px 24px rgba(15, 17, 22, 0.08)',
    overlay: '0 20px 48px rgba(15, 17, 22, 0.16)',
  },
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.5rem',
    6: '2rem',
    7: '2.5rem',
    8: '3rem',
    9: '3.5rem',
    10: '4rem',
  },
  typography: {
    scale: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.8125rem', { lineHeight: '1.2rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.65rem' }],
      xl: ['1.25rem', { lineHeight: '1.7rem' }],
      '2xl': ['clamp(1.375rem, 2.5vw, 1.65rem)', { lineHeight: '1.3' }],
      '3xl': ['clamp(1.5rem, 3vw, 1.85rem)', { lineHeight: '1.25' }],
      '4xl': ['clamp(1.625rem, 3.2vw, 2.1rem)', { lineHeight: '1.2' }],
    },
  },
  layout: {
    maxWidth: '1200px',
  },
};

module.exports = theme;
