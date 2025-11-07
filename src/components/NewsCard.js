import React from 'react';
import clsx from 'clsx';

function truncateSummary(summary) {
  if (!summary) return '';
  const sentences = summary.split(/\n+|\.\s/).filter(Boolean);
  return sentences.slice(0, 2).join('. ').trim();
}

function NewsCard({ article, variant = 'standard' }) {
  if (!article) return null;
  const { title, summary, url, meta, category } = article;
  const isFeature = variant === 'feature';
  const isCondensed = variant === 'condensed';
  const cardClasses = clsx(
    'group flex h-full flex-col justify-between rounded-xl border border-black/5 bg-surface p-5 shadow-subtle transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-slate-950',
    {
      'lg:min-h-[18rem]': isFeature,
      'min-h-[220px]': variant === 'standard',
    }
  );

  const titleClasses = clsx('font-serif text-slate-900 transition-colors duration-200 group-hover:text-accent-blue dark:text-slate-100', {
    'text-3xl leading-snug line-clamp-2': isFeature,
    'text-lg leading-snug line-clamp-2': variant === 'standard',
    'text-base leading-snug line-clamp-2': isCondensed,
  });

  const summaryClasses = clsx('mt-3 text-sm text-slate-600 dark:text-slate-300', {
    'text-base leading-relaxed line-clamp-3': isFeature,
    'line-clamp-3': variant === 'standard',
    'line-clamp-2': isCondensed,
  });

  const categoryLabel = category ?? '📰 Market Intel';

  return (
    <article className={cardClasses}>
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{categoryLabel}</span>
        <h3 className={titleClasses}>{title}</h3>
        {summary && (
          <p className={summaryClasses}>{truncateSummary(summary)}</p>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="line-clamp-1">{meta}</span>
        {url && (
          <a
            href={url}
            className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Read more
          </a>
        )}
      </div>
    </article>
  );
}

export default NewsCard;
