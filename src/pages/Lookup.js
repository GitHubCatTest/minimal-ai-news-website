import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading.js';
import LookupResult from '../components/LookupResult.js';
import { lookupSymbol } from '../services/dataClient.js';

function Lookup() {
  const [query, setQuery] = useState('');
  const [snapshot, setSnapshot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLookup = async (symbol) => {
    const trimmed = symbol.trim();
    if (!trimmed) {
      setSnapshot(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await lookupSymbol(trimmed);
      if (!result) {
        setSnapshot(null);
        setError('No data found. Try another ticker or connect your market data key.');
        return;
      }
      setSnapshot(result);
    } catch (err) {
      setError('Unable to retrieve this instrument right now.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex flex-col gap-8">
      <SectionHeading
        eyebrow="Symbol Lookup"
        title="Instant intelligence on any ticker or token"
        description="Search equities or crypto assets to surface pricing, velocity, and an AI-generated synopsis."
        actions={
          <button
            type="button"
            onClick={() => handleLookup(query || 'BTC')}
            className="rounded-full border border-black/5 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-subtle transition-colors duration-200 hover:text-accent-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
          >
            Try BTC
          </button>
        }
      />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleLookup(query);
        }}
        className="flex flex-col gap-4 rounded-xl border border-black/5 bg-surface p-5 shadow-subtle sm:flex-row sm:items-center dark:border-white/10 dark:bg-slate-950"
      >
        <label className="flex grow items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Symbol</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
            placeholder="e.g. NVDA, BTC, ETH"
            className="w-full rounded-lg border border-black/5 bg-white px-4 py-2 text-base font-semibold uppercase tracking-[0.25em] text-slate-900 placeholder:text-slate-400 focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/40 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full border border-black/5 bg-accent-blue px-6 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-subtle transition-transform duration-200 ease-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 dark:border-transparent"
        >
          Lookup
        </button>
      </form>

      <LookupResult snapshot={snapshot} isLoading={isLoading} error={error} />
    </div>
  );
}

export default Lookup;
