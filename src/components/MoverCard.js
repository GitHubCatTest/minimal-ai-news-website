import React from 'react';
import Sparkline from './Sparkline.js';

function formatChange(change) {
  if (change === null || typeof change === 'undefined') return '—';
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

function formatPrice(price) {
  if (price === null || typeof price === 'undefined') return '—';
  if (price >= 1000) {
    return `$${price.toLocaleString('en', { maximumFractionDigits: 0 })}`;
  }
  return `$${price.toLocaleString('en', { maximumFractionDigits: 2 })}`;
}

function MoverCard({ asset }) {
  const isPositive = Number(asset?.change24h) >= 0;
  return (
    <div className="group flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/25 p-5 shadow-frosted backdrop-blur-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:border-white/40 hover:shadow-glow dark:border-white/10 dark:bg-white/10">
      <div className="flex items-center justify-between text-sm uppercase tracking-[0.35em] text-slate-500/80 dark:text-slate-300/80">
        <span className="rounded-full border border-white/40 bg-white/60 px-3 py-1 text-[10px] font-semibold tracking-[0.5em] text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
          {asset.symbol}
        </span>
        <span>{formatChange(Number(asset.change24h))}</span>
      </div>
      <div>
        <p className="text-lg font-semibold text-ink dark:text-white">{asset.name}</p>
        <p className="text-sm text-slate-500 dark:text-slate-300">{formatPrice(Number(asset.price))}</p>
      </div>
      <Sparkline points={asset.sparkline} positive={isPositive} />
      {asset.volume && (
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
          Volume {new Intl.NumberFormat('en', { notation: 'compact' }).format(asset.volume)}
        </p>
      )}
    </div>
  );
}

export default MoverCard;
