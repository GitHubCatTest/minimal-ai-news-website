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
    <section className="space-y-12">
      <header className="grid gap-6 rounded-[2.5rem] border border-white/50 bg-white/40 p-8 shadow-[0_32px_70px_-40px_rgba(15,23,42,0.28)] backdrop-blur-3xl sm:grid-cols-[1.35fr,1fr] sm:gap-10">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            <BanknotesIcon className="h-4 w-4" />
            Finance Desk
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Markets &amp; Money</h1>
            <p className="text-base text-slate-600">
              Deep dives into global markets, policy moves, and the capital flows shaping tomorrow&apos;s economy.
            </p>
          </div>
        </div>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            Morning briefings from Wall Street to APAC.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            Signals on inflation, central banks, and currencies.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            Spotlights on sustainable and fintech innovation.
          </li>
        </ul>
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
