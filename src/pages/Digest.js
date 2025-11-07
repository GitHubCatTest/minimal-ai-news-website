import React, { useEffect, useState } from 'react';
import SectionHeading from '../components/SectionHeading.js';
import TrendCard from '../components/TrendCard.js';
import { getDigest } from '../services/dataClient.js';

function Digest() {
  const [digest, setDigest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setCopied(false);
    }
  };

  const handleExport = () => {
    window.print();
  };

  const generatedLabel = digest?.generatedAt
    ? new Date(digest.generatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    : null;

  return (
    <div className="container flex flex-col gap-8">
      <SectionHeading
        eyebrow="Daily Wrap"
        title="Your AI-crafted market close briefing"
        description="One card to catch up: cross-asset movers, headliners, and trend momentum synthesized into a concise wrap-up."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            {generatedLabel && (
              <span className="rounded-full border border-black/5 bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-600 shadow-subtle dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
                {generatedLabel}
              </span>
            )}
            <button
              type="button"
              onClick={handleCopyLink}
              className="rounded-full border border-black/5 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600 shadow-subtle transition-colors duration-200 hover:text-accent-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
            >
              {copied ? 'Copied' : 'Copy link'}
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="rounded-full border border-black/5 bg-accent-blue px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-subtle transition-transform duration-200 ease-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 dark:border-transparent"
            >
              Export PDF
            </button>
          </div>
        }
      />

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-400/60 dark:bg-amber-500/10 dark:text-amber-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="h-64 animate-pulse rounded-xl bg-white shadow-subtle dark:bg-slate-900" />
      ) : (
        digest && (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <section className="space-y-6">
              <article className="rounded-xl border border-black/5 bg-surface p-6 shadow-card dark:border-white/10 dark:bg-slate-950">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Wrap-up</h2>
                <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">{digest.wrapUp}</p>
              </article>

              <div className="grid gap-4 sm:grid-cols-3">
                {digest.highlights.map((item) => (
                  <div key={item.title} className="rounded-xl border border-black/5 bg-surface p-4 shadow-subtle dark:border-white/10 dark:bg-slate-950">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {digest.headlines.map((headline) => (
                  <div key={headline.title} className="flex h-full flex-col justify-between rounded-xl border border-black/5 bg-surface p-4 shadow-subtle transition-transform duration-200 ease-out hover:-translate-y-1 dark:border-white/10 dark:bg-slate-950">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{headline.source}</p>
                      <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100">{headline.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-3 dark:text-slate-300">{headline.summary}</p>
                    </div>
                    <a
                      href={headline.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center text-sm font-semibold text-accent-blue hover:underline"
                    >
                      Read more
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <aside className="flex flex-col gap-6">
              <div className="rounded-xl border border-black/5 bg-surface p-5 shadow-subtle dark:border-white/10 dark:bg-slate-950">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Top movers</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  {digest.movers.crypto.slice(0, 2).map((asset) => (
                    <li key={`crypto-${asset.symbol}`} className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{asset.symbol}</span>
                      <span className={Number(asset.change24h) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                        {Number(asset.change24h).toFixed(2)}%
                      </span>
                    </li>
                  ))}
                  {digest.movers.stocks.slice(0, 2).map((asset) => (
                    <li key={`stock-${asset.symbol}`} className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{asset.symbol}</span>
                      <span className={Number(asset.change24h) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                        {Number(asset.change24h).toFixed(2)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                {digest.trends.slice(0, 3).map((trend) => (
                  <TrendCard key={`digest-${trend.term}`} trend={trend} />
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
