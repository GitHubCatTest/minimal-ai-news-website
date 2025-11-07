import React from 'react';
import Sparkline from './Sparkline.js';

function LookupResult({ snapshot, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/30 p-6 text-sm text-slate-500 shadow-frosted backdrop-blur-2xl dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
        Fetching live data…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-200/40 bg-rose-50/30 p-6 text-sm text-rose-500 backdrop-blur-2xl dark:border-rose-500/20 dark:bg-rose-500/5 dark:text-rose-200">
        {error}
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/30 p-6 text-sm text-slate-500 shadow-frosted backdrop-blur-2xl dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
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
    <div className="flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/30 p-6 shadow-frosted backdrop-blur-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-white/10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-ink dark:text-white">{snapshot.name}</h3>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300">{snapshot.symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold text-ink dark:text-white">{priceDisplay}</p>
          <p className={`text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>{changeText} 24h</p>
        </div>
      </div>
      <Sparkline points={snapshot.sparkline} positive={isPositive} />
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{snapshot.summary}</p>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Market Cap {snapshot.marketCap}</p>
    </div>
  );
}

export default LookupResult;
