import React from 'react';
import { ArrowRightIcon } from './icons.js';

function GlassCard({ title, summary, link, meta, accent, actionLabel = 'Read more' }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/70 shadow-frosted backdrop-blur-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.01] hover:border-white/40 hover:shadow-glow dark:border-white/10 dark:bg-white/10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/20 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 dark:from-white/10 dark:to-white/5" />
      <div className="relative z-10 flex h-full flex-col gap-4 p-6 sm:p-8">
        {(meta || accent) && (
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-500/80 dark:text-slate-300/70">
            {accent && (
              <span className="rounded-full border border-white/40 bg-white/70 px-2 py-1 text-[10px] font-semibold tracking-[0.4em] text-slate-600 shadow-inner dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                {accent}
              </span>
            )}
            {meta && <span className="whitespace-nowrap">{meta}</span>}
          </div>
        )}
        <h3 className="text-xl font-semibold text-slate-900 transition-colors duration-300 ease-in-out dark:text-white">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 transition-colors duration-300 ease-in-out dark:text-slate-300">
          {summary}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-transparent bg-white/60 px-4 py-2 text-sm font-medium text-slate-800 transition-all duration-300 ease-in-out hover:border-white/40 hover:bg-white/80 hover:text-slate-900 dark:bg-white/10 dark:text-slate-200 dark:hover:border-white/30 dark:hover:bg-white/20"
            >
              {actionLabel}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-500/70 dark:text-slate-400/70">
              Stay informed
            </span>
          )}
          <span className="pointer-events-none rounded-full bg-white/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.4em] text-slate-500 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 dark:bg-white/10 dark:text-slate-300">
            Explore
          </span>
        </div>
      </div>
    </article>
  );
}

export default GlassCard;
