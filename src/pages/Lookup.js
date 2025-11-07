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
    <div className="flex flex-col gap-12">
      <SectionHeading
        eyebrow="Symbol Lookup"
        title="Instant intelligence on any ticker or token"
        description="Search equities or crypto assets to surface pricing, velocity, and an AI-generated synopsis."
        actions={
          <button
            type="button"
            onClick={() => handleLookup(query || 'BTC')}
            className="rounded-full border border-white/40 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-ink shadow-inner transition-all duration-300 ease-in-out hover:border-white/60 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
          >
            Auto
          </button>
        }
      />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleLookup(query);
        }}
        className="flex flex-col gap-4 rounded-[2rem] border border-white/30 bg-white/40 p-6 shadow-frosted backdrop-blur-2xl sm:flex-row sm:items-center dark:border-white/10 dark:bg-white/10"
      >
        <label className="flex grow items-center gap-3 rounded-full border border-white/40 bg-white/70 px-5 py-3 text-sm text-slate-600 backdrop-blur-2xl focus-within:border-accent/70 focus-within:shadow-glow dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
          <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Symbol</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
            placeholder="e.g. NVDA, BTC, ETH"
            className="w-full bg-transparent text-lg font-semibold uppercase tracking-[0.35em] text-ink placeholder:text-slate-400 focus:outline-none dark:text-white"
          />
        </label>
        <button
          type="submit"
          className="rounded-full border border-white/40 bg-accent/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-midnight shadow-inner transition-all duration-300 ease-in-out hover:scale-105 hover:border-white/60 hover:bg-accent dark:border-white/20 dark:bg-accent/70 dark:text-white"
        >
          Lookup
        </button>
      </form>

      <LookupResult snapshot={snapshot} isLoading={isLoading} error={error} />
    </div>
  );
}

export default Lookup;
