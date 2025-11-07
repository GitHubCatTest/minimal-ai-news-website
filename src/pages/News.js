import React, { useEffect, useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading.js';
import NewsCard from '../components/NewsCard.js';
import GlassCard from '../components/GlassCard.js';
import { getNewsArticles } from '../services/dataClient.js';

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
          setArticles(payload.articles ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Unable to load news right now. Showing the latest saved briefings.');
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

  const [leadStory, supporting] = useMemo(() => {
    if (!articles || articles.length === 0) return [null, []];
    const [lead, ...rest] = articles;
    return [lead, rest];
  }, [articles]);

  return (
    <div className="flex flex-col gap-12">
      <SectionHeading
        eyebrow="Daily Brief"
        title="AI-Powered Finance & Tech Headlines"
        description="Smart summaries of the essential market-moving stories, refreshed throughout the trading day."
      />

      {error && (
        <div className="rounded-3xl border border-amber-200/60 bg-amber-50/50 p-6 text-sm text-amber-700 backdrop-blur-2xl dark:border-amber-400/30 dark:bg-amber-500/5 dark:text-amber-200">
          {error}
        </div>
      )}

      <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          {loading && !leadStory ? (
            <div className="h-64 animate-pulse rounded-[2rem] bg-white/40 backdrop-blur-xl dark:bg-white/10" />
          ) : (
            leadStory && (
              <GlassCard
                title={leadStory.title}
                summary={leadStory.summary}
                link={leadStory.url}
                meta={[leadStory.source, leadStory.publishedAt && new Date(leadStory.publishedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })]
                  .filter(Boolean)
                  .join(' · ')}
                accent="TOP STORY"
                actionLabel="Open coverage"
              />
            )
          )}
          <div className="grid gap-6 sm:grid-cols-2">
            {(loading ? Array.from({ length: 4 }) : supporting.slice(0, 4)).map((item, index) =>
              loading ? (
                <div key={`skeleton-${index}`} className="h-48 animate-pulse rounded-3xl bg-white/40 backdrop-blur-xl dark:bg-white/10" />
              ) : (
                <NewsCard key={item.id ?? item.title} article={item} />
              )
            )}
          </div>
        </div>
        <aside className="flex flex-col gap-6">
          <div className="rounded-[1.9rem] border border-white/20 bg-white/25 p-6 shadow-frosted backdrop-blur-2xl dark:border-white/10 dark:bg-white/10">
            <h2 className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300">Smart Filters</h2>
            <p className="mt-3 text-lg font-semibold text-ink dark:text-white">What the model is tracking</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent/60" aria-hidden="true" />
                <span>Enterprise AI deals, GPU supply signals, and infra capacity updates.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent/40" aria-hidden="true" />
                <span>Crypto liquidity regimes, on-chain flows, and regulatory catalysts.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent/20" aria-hidden="true" />
                <span>Fintech product launches and M&amp;A sentiment from earnings calls.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-[1.9rem] border border-white/20 bg-white/25 p-6 shadow-frosted backdrop-blur-2xl dark:border-white/10 dark:bg-white/10">
            <h3 className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300">Live Refresh</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              News API lookups run every few minutes. Connect your own key for fully live updates and GPT-powered summaries.
            </p>
            <a
              href="https://newsapi.org/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-ink shadow-inner transition-all duration-300 ease-in-out hover:border-white/50 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            >
              Configure API
            </a>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default News;
