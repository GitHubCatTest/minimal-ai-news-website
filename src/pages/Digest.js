import React, { useEffect, useState } from 'react';
import SectionHeading from '../components/SectionHeading.js';
import GlassCard from '../components/GlassCard.js';
import TrendCard from '../components/TrendCard.js';
import MoverCard from '../components/MoverCard.js';
import { getDigest } from '../services/dataClient.js';

function Digest() {
  const [digest, setDigest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getDigest();
        if (!cancelled) {
          setDigest(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Digest fell back to the cached summary while services reconnect.');
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
        eyebrow="Daily Wrap"
        title="Your AI-crafted market close briefing"
        description="One card to catch up: cross-asset movers, headliners, and trend momentum synthesized into a concise wrap-up."
        actions={
          digest && (
            <span className="rounded-full border border-white/40 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-600 shadow-inner dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
              {new Date(digest.generatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </span>
          )
        }
      />

      {error && (
        <div className="rounded-3xl border border-amber-200/60 bg-amber-50/50 p-6 text-sm text-amber-700 backdrop-blur-2xl dark:border-amber-400/30 dark:bg-amber-500/5 dark:text-amber-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="h-64 animate-pulse rounded-[2.5rem] bg-white/40 backdrop-blur-xl dark:bg-white/10" />
      ) : (
        digest && (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <section className="space-y-6">
              <div className="rounded-[2rem] border border-white/30 bg-white/60 p-8 shadow-frosted backdrop-blur-2xl dark:border-white/10 dark:bg-white/10">
                <h2 className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300">Wrap-up</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink dark:text-slate-100">{digest.wrapUp}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {digest.highlights.map((item) => (
                  <GlassCard
                    key={item.title}
                    title={item.title}
                    summary={item.text}
                    accent="Highlight"
                    actionLabel=""
                  />
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {digest.headlines.map((headline) => (
                  <GlassCard
                    key={headline.title}
                    title={headline.title}
                    summary={headline.summary}
                    link={headline.url}
                    meta={headline.source}
                    accent="Story"
                    actionLabel="Read"
                  />
                ))}
              </div>
            </section>
            <aside className="flex flex-col gap-6">
              <div className="rounded-[1.9rem] border border-white/20 bg-white/25 p-6 shadow-frosted backdrop-blur-2xl dark:border-white/10 dark:bg-white/10">
                <h3 className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300">Top Movers</h3>
                <div className="mt-4 space-y-4">
                  {digest.movers.crypto.slice(0, 2).map((asset) => (
                    <MoverCard key={`crypto-${asset.symbol}`} asset={asset} />
                  ))}
                  {digest.movers.stocks.slice(0, 2).map((asset) => (
                    <MoverCard key={`stock-${asset.symbol}`} asset={asset} />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {digest.trends.slice(0, 3).map((trend) => (
                  <TrendCard key={`digest-${trend.keyword}`} trend={trend} />
                ))}
              </div>
            </aside>
          </div>
        )
      )}
    </div>
  );
}

export default Digest;
