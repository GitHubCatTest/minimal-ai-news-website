import React from 'react';

function TrendCard({ trend }) {
  const sentimentColor = {
    bullish: 'text-emerald-500',
    neutral: 'text-slate-500',
    watch: 'text-amber-500',
    bearish: 'text-rose-500',
  }[trend.sentiment ?? 'neutral'];

  const formattedChange = trend.change > 0 ? `+${trend.change}` : trend.change;

  return (
    <div className="group flex flex-col gap-3 rounded-3xl border border-white/20 bg-white/25 p-5 shadow-frosted backdrop-blur-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:border-white/40 hover:shadow-glow dark:border-white/10 dark:bg-white/10">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.38em] text-slate-500/80 dark:text-slate-300/80">
        <span className="rounded-full border border-white/40 bg-white/60 px-3 py-1 text-[10px] font-semibold tracking-[0.5em] text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
          TREND
        </span>
        <span className={`${sentimentColor} font-medium`}>{trend.sentiment?.toUpperCase() ?? 'NEUTRAL'}</span>
      </div>
      <h3 className="text-lg font-semibold text-ink dark:text-white">{trend.keyword}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-300">{trend.description}</p>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
        Momentum {formattedChange}%
      </p>
    </div>
  );
}

export default TrendCard;
