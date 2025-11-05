import React from 'react';
import { CpuChipIcon } from '../components/icons.js';
import GlassCard from '../components/GlassCard.js';

const techSignals = [
  {
    title: 'AI copilots shift from pilot projects to production scale',
    summary:
      'Enterprise software leaders announced broad rollouts of AI assistants embedded in productivity suites, emphasising responsible guardrails and measurable ROI.',
    meta: 'Productivity',
  },
  {
    title: 'Quantum hardware roadmap accelerates with hybrid designs',
    summary:
      'New superconducting and photonic chip integrations promise more stable qubits, while cloud providers unveil APIs for hybrid quantum-classical workflows.',
    meta: 'Quantum Frontier',
  },
  {
    title: 'Chipmakers invest in greener fabrication ecosystems',
    summary:
      'Semiconductor giants detailed multi-billion dollar plans for water recycling, renewable power sourcing, and AI-driven yield optimisation.',
    meta: 'Sustainable Tech',
  },
  {
    title: 'Cyber resilience frameworks go real-time',
    summary:
      'Security teams adopt continuous validation tools and AI anomaly detection as regulators push for faster breach disclosures and shared threat intel.',
    meta: 'Security Brief',
  },
];

function Tech() {
  return (
    <section className="space-y-12">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 shadow-inner backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <CpuChipIcon className="h-4 w-4" />
          Innovation Lab
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl dark:text-white">Technology &amp; AI</h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            From silicon breakthroughs to software shifts, here&apos;s how innovation is reshaping business and culture.
          </p>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {techSignals.map((brief) => (
          <GlassCard key={brief.title} title={brief.title} summary={brief.summary} meta={brief.meta} accent="Tech" />
        ))}
      </div>
    </section>
  );
}

export default Tech;
