import React, { useEffect, useState } from 'react';
import SectionHeading from '../components/SectionHeading.js';
import TrendCard from '../components/TrendCard.js';
import GlassCard from '../components/GlassCard.js';
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
    <div className="flex flex-col gap-12">
      <SectionHeading
        eyebrow="Signal Scanner"
        title="AI-detected themes breaking through the noise"
        description="Headline frequency analysis and GPT reasoning highlight which stories are accelerating today."
      />

      {error && (
        <div className="rounded-3xl border border-amber-200/60 bg-amber-50/50 p-6 text-sm text-amber-700 backdrop-blur-2xl dark:border-amber-400/30 dark:bg-amber-500/5 dark:text-amber-200">
          {error}
        </div>
      )}

      <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          {(loading ? Array.from({ length: 4 }) : trends).map((trend, index) =>
            loading ? (
              <div key={`skeleton-${index}`} className="h-48 animate-pulse rounded-3xl bg-white/40 backdrop-blur-xl dark:bg-white/10" />
            ) : (
              <TrendCard key={trend.keyword} trend={trend} />
            )
          )}
        </div>
        <aside className="flex flex-col gap-6">
          <div className="rounded-[1.9rem] border border-white/20 bg-white/25 p-6 shadow-frosted backdrop-blur-2xl dark:border-white/10 dark:bg-white/10">
            <h2 className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300">How it works</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              We scan each fetched headline, remove noise words, and track velocity changes. Provide an OpenAI or OpenRouter key to unlock narrative explanations and sentiment scoring in-line.
            </p>
          </div>
          <div className="space-y-4">
            {stories.slice(0, 3).map((article) => (
              <GlassCard
                key={article.id}
                title={article.title}
                summary={article.summary}
                link={article.url}
                meta={article.source}
                accent="Context"
                actionLabel="View story"
              />
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

export default Trends;
