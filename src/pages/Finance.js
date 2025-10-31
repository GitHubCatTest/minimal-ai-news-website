import React from 'react';
import { BanknotesIcon } from '../components/icons.js';
import GlassCard from '../components/GlassCard.js';

const financeBriefs = [
  {
    title: 'Global markets rally on soft-landing optimism',
    summary:
      'Equities across the U.S., Europe, and Asia climbed as investors responded to cooling inflation and resilient labour data, hinting the Fed could end its tightening cycle without triggering a recession.',
    meta: 'Market Pulse',
  },
  {
    title: 'Central banks coordinate to calm currency volatility',
    summary:
      'Policy makers from the G7 signalled readiness to smooth sharp FX moves after the yen briefly touched a 30-year low, underscoring renewed vigilance on cross-border capital flows.',
    meta: 'FX Watch',
  },
  {
    title: 'Sustainable finance flows set new quarterly record',
    summary:
      'Green bonds and sustainability-linked loans exceeded $400B in issuance, driven by corporate decarbonisation targets and new regulatory incentives across the EU and APAC regions.',
    meta: 'Climate Capital',
  },
  {
    title: 'Fintech earnings spotlight cost discipline and AI spend',
    summary:
      'Leading digital banks reported narrower losses as automation cut servicing costs while AI-powered risk analytics became the top area for fresh investment.',
    meta: 'Earnings Radar',
  },
];

function Finance() {
  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 shadow-inner backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <BanknotesIcon className="h-4 w-4" />
          Finance Desk
        </span>
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">Markets & Money</h1>
          <p className="max-w-3xl text-base text-slate-600 dark:text-slate-300">
            Daily intelligence on macro trends, market moves, and the capital reshaping tomorrow&apos;s economy.
          </p>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {financeBriefs.map((brief) => (
          <GlassCard key={brief.title} title={brief.title} summary={brief.summary} meta={brief.meta} accent="Finance" />
        ))}
      </div>
    </section>
  );
}

export default Finance;
