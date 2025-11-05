import React from 'react';
import { TrophyIcon } from '../components/icons.js';
import GlassCard from '../components/GlassCard.js';

const sportsHighlights = [
  {
    title: 'Continental football finals promise blockbuster rematches',
    summary:
      'Champions from Europe and South America headline a week of title clashes, with tactical tweaks and youthful squads bringing fresh energy to historic rivalries.',
    meta: 'Global Football',
  },
  {
    title: 'Olympic qualifiers redefine medal outlook',
    summary:
      'Track and field, swimming, and gymnastics squads locked spots after record-breaking trials, reshuffling podium predictions ahead of next summer.',
    meta: 'Road to Paris',
  },
  {
    title: 'Esports leagues unveil player wellness standards',
    summary:
      'Franchises adopt mandatory rest windows, mental health support, and analytics dashboards to keep athletes in peak condition through extended seasons.',
    meta: 'Next-Gen Arena',
  },
  {
    title: 'Analytics revolution hits grassroots coaching',
    summary:
      'Community clubs leverage affordable wearables and AI scouting tools to identify breakout talent earlier than ever.',
    meta: 'Future of Sport',
  },
];

function Sports() {
  return (
    <section className="space-y-12">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 shadow-inner backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <TrophyIcon className="h-4 w-4" />
          Performance Hub
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl dark:text-white">Sport &amp; Momentum</h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Game-changing performances, data-driven strategy, and the athletes redefining the next era of sport.
          </p>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {sportsHighlights.map((brief) => (
          <GlassCard key={brief.title} title={brief.title} summary={brief.summary} meta={brief.meta} accent="Sports" />
        ))}
      </div>
    </section>
  );
}

export default Sports;
