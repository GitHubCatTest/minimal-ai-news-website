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
      <header className="grid gap-6 rounded-[2.5rem] border border-white/50 bg-white/40 p-8 shadow-[0_32px_70px_-40px_rgba(15,23,42,0.28)] backdrop-blur-3xl sm:grid-cols-[1.35fr,1fr] sm:gap-10">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            <CpuChipIcon className="h-4 w-4" />
            Innovation Lab
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Technology &amp; AI</h1>
            <p className="text-base text-slate-600">
              From silicon breakthroughs to software shifts, here&apos;s how innovation is reshaping business and culture.
            </p>
          </div>
        </div>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            Product launches, funding rounds, and platform shifts.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            Labs innovation across AI, quantum, and frontier tech.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            Cyber resilience insights for leaders and builders.
          </li>
        </ul>
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
