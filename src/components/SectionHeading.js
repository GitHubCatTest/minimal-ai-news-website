import React from 'react';

function SectionHeading({ eyebrow, title, description, actions }) {
  return (
    <header className="flex flex-col gap-6 rounded-[2.5rem] border border-white/30 bg-white/50 p-8 shadow-frosted backdrop-blur-2xl transition-all duration-500 ease-in-out hover:shadow-glow dark:border-white/10 dark:bg-white/10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          {eyebrow && (
            <span className="text-xs uppercase tracking-[0.5em] text-slate-500 dark:text-slate-300">{eyebrow}</span>
          )}
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-white">{title}</h1>
        </div>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
      {description && <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>}
    </header>
  );
}

export default SectionHeading;
