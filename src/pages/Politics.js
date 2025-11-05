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
    <section className="space-y-12">
      <header className="grid gap-6 rounded-[2.5rem] border border-white/50 bg-white/40 p-8 shadow-[0_32px_70px_-40px_rgba(15,23,42,0.28)] backdrop-blur-3xl sm:grid-cols-[1.35fr,1fr] sm:gap-10">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            <BuildingLibraryIcon className="h-4 w-4" />
            Policy Radar
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Power &amp; Policy</h1>
            <p className="text-base text-slate-600">
              Diplomatic shifts, election signals, and legislation reshaping global priorities.
            </p>
          </div>
        </div>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            Insider reads on elections, coalitions, and policy deals.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            Geopolitical analysis from Brussels to Beijing.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            Weekly briefings on regulation, rights, and governance.
          </li>
        </ul>
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
