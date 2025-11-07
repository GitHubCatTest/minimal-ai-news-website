import React, { useEffect, useState } from 'react';
import SectionHeading from '../components/SectionHeading.js';
import MoverCard from '../components/MoverCard.js';
import { getMarketMovers } from '../services/dataClient.js';

function MarketMovers() {
  const [marketMovers, setMarketMovers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMarketMovers();
        if (!cancelled) {
          setMarketMovers(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Unable to reach live pricing feeds. Showing the latest saved snapshot.');
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

  const sections = [
    { title: 'Crypto gainers', assets: marketMovers?.crypto?.gainers ?? [] },
    { title: 'Crypto pullbacks', assets: marketMovers?.crypto?.losers ?? [] },
    { title: 'Equity gainers', assets: marketMovers?.stocks?.gainers ?? [] },
    { title: 'Equity pullbacks', assets: marketMovers?.stocks?.losers ?? [] },
  ];

  return (
    <div className="flex flex-col gap-12">
      <SectionHeading
        eyebrow="Live Movers"
        title="Market radar for crypto & equities"
        description="Realtime gainers and decliners curated for AI, cloud, and digital asset exposure. Pulls from CoinGecko and Alpha Vantage when keys are connected."
      />

      {error && (
        <div className="rounded-3xl border border-amber-200/60 bg-amber-50/50 p-6 text-sm text-amber-700 backdrop-blur-2xl dark:border-amber-400/30 dark:bg-amber-500/5 dark:text-amber-200">
          {error}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {sections.map((section, index) => (
          <div
            key={section.title}
            className="flex flex-col gap-5 rounded-[2rem] border border-white/20 bg-white/25 p-6 shadow-frosted backdrop-blur-2xl dark:border-white/10 dark:bg-white/10"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300">{section.title}</h2>
              <span className="text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
                {loading ? 'Loading' : 'Updated'}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {(loading ? Array.from({ length: 4 }) : section.assets).map((asset, idx) =>
                loading ? (
                  <div key={`skeleton-${index}-${idx}`} className="h-48 animate-pulse rounded-3xl bg-white/40 backdrop-blur-xl dark:bg-white/10" />
                ) : (
                  <MoverCard key={`${section.title}-${asset.symbol}`} asset={asset} />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketMovers;
