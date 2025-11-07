import React from 'react';

function SectionHeading({ eyebrow, title, description, actions }) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{eyebrow}</span>
          )}
          <h1 className="mt-2 font-serif text-3xl text-slate-900 dark:text-slate-100">{title}</h1>
        </div>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
      {description && <p className="max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>}
    </header>
  );
}

export default SectionHeading;
