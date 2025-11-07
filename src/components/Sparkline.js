import React, { useId } from 'react';

function Sparkline({ points = [], positive = true }) {
  if (!points || points.length === 0) {
    return (
      <div className="flex h-12 items-center justify-center text-xs text-slate-400 dark:text-slate-500">
        no data
      </div>
    );
  }

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const normalized = points.map((value, index) => {
    const x = (index / (points.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  });

  const path = `M ${normalized[0]} L ${normalized.slice(1).join(' ')}`;
  const gradientId = useId();

  return (
    <svg
      className="h-12 w-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={positive ? 'rgba(79, 209, 197, 0.6)' : 'rgba(255, 124, 124, 0.6)'} />
          <stop offset="100%" stopColor={positive ? 'rgba(125, 211, 252, 0.6)' : 'rgba(248, 113, 113, 0.6)'} />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Sparkline;
