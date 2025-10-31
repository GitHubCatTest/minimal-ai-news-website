import React from 'react';
import { BuildingLibraryIcon } from '../components/icons.js';
import GlassCard from '../components/GlassCard.js';

const policyWatch = [
  {
    title: 'Global climate coalition advances supply-chain pact',
    summary:
      'Ministers from 40 economies agreed to align carbon accounting for imported goods, paving the way for synchronised climate tariffs aimed at heavy industry.',
    meta: 'Global Policy',
  },
  {
    title: 'Election reform bill clears key committee stage',
    summary:
      'Legislators advanced a bipartisan package expanding early voting, modernising audit standards, and securing digital infrastructure for 2025 national races.',
    meta: 'Democracy Watch',
  },
  {
    title: 'Security summit outlines new Pacific cooperation roadmap',
    summary:
      'Regional leaders committed to joint maritime patrols, cyber threat sharing, and accelerated humanitarian support to counterbalance emerging strategic risks.',
    meta: 'Geo Strategy',
  },
  {
    title: 'Healthcare negotiations focus on digital patient rights',
    summary:
      'Talks between lawmakers and patient advocates centre on universal portability of health records and AI accountability in triage decisions.',
    meta: 'Policy Lab',
  },
];

function Politics() {
  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 shadow-inner backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <BuildingLibraryIcon className="h-4 w-4" />
          Policy Radar
        </span>
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">Power & Policy</h1>
          <p className="max-w-3xl text-base text-slate-600 dark:text-slate-300">
            Diplomatic shifts, election signals, and legislative agendas shaping the world stage.
          </p>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {policyWatch.map((brief) => (
          <GlassCard key={brief.title} title={brief.title} summary={brief.summary} meta={brief.meta} accent="Politics" />
        ))}
      </div>
    </section>
  );
}

export default Politics;
