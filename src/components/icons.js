import React from 'react';

const IconBase = ({ children, strokeWidth = 1.6, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const MagnifierIcon = (props) => (
  <IconBase {...props}>
    <circle cx="11" cy="11" r="6" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" />
  </IconBase>
);

export const SunIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="3" x2="12" y2="1" />
    <line x1="12" y1="23" x2="12" y2="21" />
    <line x1="5.64" y1="5.64" x2="4.22" y2="4.22" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="3" y1="12" x2="1" y2="12" />
    <line x1="23" y1="12" x2="21" y2="12" />
    <line x1="5.64" y1="18.36" x2="4.22" y2="19.78" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </IconBase>
);

export const MoonIcon = (props) => (
  <IconBase {...props}>
    <path d="M20 12.4A8 8 0 0 1 11.6 4a6.5 6.5 0 1 0 8.4 8.4Z" />
  </IconBase>
);

export const NewspaperIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7 9h6" />
    <path d="M7 13h10" />
    <path d="M7 17h10" />
    <path d="M17 9h2" />
  </IconBase>
);

export const BanknotesIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M6 8v1" />
    <path d="M18 8v1" />
    <path d="M6 15v1" />
    <path d="M18 15v1" />
  </IconBase>
);

export const BuildingLibraryIcon = (props) => (
  <IconBase {...props}>
    <path d="M4 10h16" />
    <path d="M6 10v8" />
    <path d="M10 10v8" />
    <path d="M14 10v8" />
    <path d="M18 10v8" />
    <path d="M3 18h18" />
    <path d="M2 10 12 4l10 6" />
  </IconBase>
);

export const CpuChipIcon = (props) => (
  <IconBase {...props}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M12 2v3" />
    <path d="M12 19v3" />
    <path d="M2 12h3" />
    <path d="M19 12h3" />
    <path d="M5 5l1.5 1.5" />
    <path d="M19 5l-1.5 1.5" />
    <path d="M5 19l1.5-1.5" />
    <path d="M19 19l-1.5-1.5" />
  </IconBase>
);

export const TrophyIcon = (props) => (
  <IconBase {...props}>
    <path d="M8 4h8" />
    <path d="M9 4v3a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2h2" />
    <path d="M15 4v3a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3V6a2 2 0 0 0-2-2h-2" />
    <path d="M12 14v4" />
    <path d="M9 21h6" />
    <path d="M9 11h6" />
  </IconBase>
);

export const ArrowRightIcon = (props) => (
  <IconBase {...props}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </IconBase>
);

export const PaperAirplaneIcon = (props) => (
  <IconBase {...props} strokeWidth={1.8}>
    <path d="M3 11.5 20 3l-8.5 17-1.9-6.8Z" />
    <path d="M11.5 13.5 20 3" />
  </IconBase>
);
