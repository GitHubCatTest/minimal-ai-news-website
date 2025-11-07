import React, { useEffect, useMemo, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import NewsCard from '../components/NewsCard.js';
import { getNewsArticles } from '../services/dataClient.js';

const CATEGORY_RULES = [
  { label: 'Crypto', icon: '💠', keywords: ['bitcoin', 'ethereum', 'crypto', 'token', 'defi', 'solana', 'layer', 'chain'] },
  { label: 'Semis', icon: '🔧', keywords: ['chip', 'semiconductor', 'nvidia', 'tsmc', 'qualcomm', 'intel'] },
  { label: 'Fintech', icon: '💳', keywords: ['bank', 'fintech', 'payments', 'stripe', 'paypal', 'square', 'block'] },
  { label: 'AI', icon: '🤖', keywords: ['ai', 'artificial intelligence', 'model', 'openai', 'gpt', 'anthropic', 'machine learning'] },
  { label: 'Markets', icon: '📈', keywords: ['stocks', 'market', 'fed', 'treasury', 'yields', 'equity', 'earnings'] },
];

function assignCategory(article) {
  const text = `${article.title ?? ''} ${article.summary ?? ''}`.toLowerCase();
  const match = CATEGORY_RULES.find((rule) => rule.keywords.some((keyword) => text.includes(keyword)));
  if (match) return `${match.icon} ${match.label}`;
  return '📰 Market Intel';
}

function formatMeta(article) {
  const parts = [article.source];
  if (article.publishedAt) {
    try {
      parts.push(formatDistanceToNowStrict(new Date(article.publishedAt), { addSuffix: true }));
    } catch (error) {
      parts.push(article.publishedAt);
    }
  }
  return parts.filter(Boolean).join(' • ');
}

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const payload = await getNewsArticles();
        if (!cancelled) {
          const enriched = (payload.articles ?? []).map((article) => ({
            ...article,
            category: assignCategory(article),
            meta: formatMeta(article),
          }));
          setArticles(enriched);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Unable to load live headlines right now. Showing the latest saved briefings.');
          setArticles([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const { leadStory, sideBriefs, gridStories } = useMemo(() => {
    if (!articles.length) {
      return { leadStory: null, sideBriefs: [], gridStories: [] };
    }
    const [lead, ...rest] = articles;
    return {
      leadStory: lead,
      sideBriefs: rest.slice(0, 3),
      gridStories: rest.slice(3),
    };
  }, [articles]);

  return (
    <div className="container flex flex-col gap-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Daily Brief</p>
        <h1 className="font-serif text-4xl text-slate-900 dark:text-slate-100">
          Simply News – AI-Powered Finance &amp; Tech Intelligence
        </h1>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Smart, readable summaries on business, markets, and emerging technology. Updated throughout the trading day with an AI editor.
        </p>
      </header>

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-400/60 dark:bg-amber-500/10 dark:text-amber-200">
          {error}
        </div>
      )}

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {loading && !leadStory ? (
            <div className="h-64 animate-pulse rounded-xl bg-white shadow-subtle dark:bg-slate-900" />
          ) : (
            leadStory && <NewsCard article={leadStory} variant="feature" />
          )}
        </div>
        <aside className="flex flex-col gap-4">
          {loading && !sideBriefs.length
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={`aside-skeleton-${index}`} className="h-24 animate-pulse rounded-xl bg-white shadow-subtle dark:bg-slate-900" />
              ))
            : sideBriefs.map((article) => <NewsCard key={article.id ?? article.title} article={article} variant="condensed" />)}
        </aside>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-slate-900 dark:text-slate-100">More stories</h2>
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500">AI-curated mix</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(loading && !gridStories.length
            ? Array.from({ length: 8 })
            : gridStories
          ).map((item, index) =>
            loading && !gridStories.length ? (
              <div key={`grid-skeleton-${index}`} className="h-56 animate-pulse rounded-xl bg-white shadow-subtle dark:bg-slate-900" />
            ) : (
              <NewsCard key={item.id ?? item.title} article={item} variant="standard" />
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default News;
