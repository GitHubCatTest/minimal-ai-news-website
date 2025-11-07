import React from 'react';
import Sparkline from './Sparkline.js';

function LookupResult({ snapshot, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-black/5 bg-surface p-6 text-sm text-slate-600 shadow-subtle dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
        Fetching live data…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-600 shadow-subtle dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200">
        {error}
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="rounded-xl border border-black/5 bg-surface p-6 text-sm text-slate-600 shadow-subtle dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
        Enter a ticker or token symbol to surface live pricing and a concise AI readout.
      </div>
    );
  }

  const isPositive = Number(snapshot.change24h) >= 0;
  const changeText = `${isPositive ? '+' : ''}${Number(snapshot.change24h ?? 0).toFixed(2)}%`;
  const priceDisplay =
    snapshot.price === null || typeof snapshot.price === 'undefined'
      ? '—'
      : `$${Number(snapshot.price).toLocaleString('en', { maximumFractionDigits: 2 })}`;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-black/5 bg-surface p-6 shadow-card transition-transform duration-200 ease-out hover:-translate-y-1 dark:border-white/10 dark:bg-slate-950">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl text-slate-900 dark:text-slate-100">{snapshot.name}</h3>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{snapshot.symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{priceDisplay}</p>
          <p className={`text-sm font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{changeText} 24h</p>
        </div>
      </div>
      <Sparkline points={snapshot.sparkline} positive={isPositive} />
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{snapshot.summary}</p>
      {snapshot.marketCap && (
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Market Cap {snapshot.marketCap}</p>
      )}
    </div>
  );
}

export default LookupResult;
