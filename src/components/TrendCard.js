import React from 'react';
import clsx from 'clsx';

function TrendCard({ trend }) {
  const { term, momentum, direction, frequency, headlines = [], insight = [] } = trend;
  const arrow = direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→';
  const momentumLabel = `${arrow} ${momentum > 0 ? '+' : ''}${momentum.toFixed(1)}%`;

  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-black/5 bg-surface p-5 shadow-subtle transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-slate-950">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
          <span className="font-semibold">Today&apos;s trend</span>
          <span
            className={clsx('font-semibold', {
              'text-emerald-600 dark:text-emerald-400': direction === 'up',
              'text-rose-600 dark:text-rose-400': direction === 'down',
              'text-slate-500 dark:text-slate-300': direction === 'flat',
            })}
          >
            {momentumLabel}
          </span>
        </div>
        <h3 className="font-serif text-2xl text-slate-900 dark:text-slate-100">{term}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">Mentioned in {frequency} tracked stories today.</p>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {headlines.slice(0, 2).map((headline) => (
            <li key={headline} className="line-clamp-2">
              • {headline}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 border-t border-black/5 pt-3 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
        <p className="font-semibold uppercase tracking-wide text-slate-500">Why it matters</p>
        <ul className="mt-2 space-y-1">
          {insight.slice(0, 2).map((bullet, index) => (
            <li key={`${term}-insight-${index}`} className="leading-snug">
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default TrendCard;
