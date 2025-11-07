import React, { useEffect, useState } from 'react';
import TrendCard from '../components/TrendCard.js';
import { getTrends, getNewsArticles } from '../services/dataClient.js';

function Trends() {
  const [trends, setTrends] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [trendData, newsData] = await Promise.all([getTrends(), getNewsArticles()]);
        if (!cancelled) {
          setTrends(Array.isArray(trendData) ? trendData : []);
          setStories(newsData.articles?.slice(0, 6) ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Using cached signals while the trend detector reconnects.');
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

  return (
    <div className="container flex flex-col gap-10">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Signal Scanner</p>
        <h1 className="font-serif text-3xl text-slate-900 dark:text-slate-100">AI-detected themes breaking through the noise</h1>
        <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Headline frequency analysis and entity clustering surface today&apos;s dominant conversations. Connect LLM keys to enhance reasoning with narrative context.
        </p>
      </header>

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-400/60 dark:bg-amber-500/10 dark:text-amber-200">
          {error}
        </div>
      )}

      <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          {(loading ? Array.from({ length: 6 }) : trends).map((trend, index) =>
            loading ? (
              <div key={`trend-skeleton-${index}`} className="h-48 animate-pulse rounded-xl bg-white shadow-subtle dark:bg-slate-900" />
            ) : (
              <TrendCard key={trend.term} trend={trend} />
            )
          )}
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-xl border border-black/5 bg-surface p-5 shadow-subtle dark:border-white/10 dark:bg-slate-950">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">How it works</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              We cluster entities, tickers, and AI keywords across the latest headlines, then compare today&apos;s velocity with the prior window to gauge momentum shifts.
            </p>
          </div>
          <div className="rounded-xl border border-black/5 bg-surface p-5 shadow-subtle dark:border-white/10 dark:bg-slate-950">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Context stories</h2>
            <ul className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {(loading ? Array.from({ length: 3 }) : stories.slice(0, 3)).map((story, index) =>
                loading ? (
                  <li key={`story-skeleton-${index}`} className="h-14 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
                ) : (
                  <li key={story.id ?? `${story.title}-${index}`} className="space-y-1">
                    <a
                      href={story.url}
                      className="font-medium text-slate-900 hover:text-accent-blue dark:text-slate-100"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {story.title}
                    </a>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{story.summary}</p>
                  </li>
                )
              )}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default Trends;
