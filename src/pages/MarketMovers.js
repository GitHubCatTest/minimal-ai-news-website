import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Sparkline from '../components/Sparkline.js';
import { getMarketMovers, getNewsArticles } from '../services/dataClient.js';

const segments = [
  { id: 'crypto', label: 'Crypto' },
  { id: 'stocks', label: 'Stocks' },
];

const views = [
  { id: 'gainers', label: 'Top Gainers' },
  { id: 'losers', label: 'Top Decliners' },
];

function formatCurrency(value) {
  if (value === null || typeof value === 'undefined') return '—';
  return `$${Number(value).toLocaleString('en', { maximumFractionDigits: 2 })}`;
}

function formatPercent(change) {
  if (change === null || typeof change === 'undefined') return '—';
  const number = Number(change);
  const sign = number > 0 ? '+' : '';
  return `${sign}${number.toFixed(2)}%`;
}

function MarketMovers() {
  const [marketMovers, setMarketMovers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [segment, setSegment] = useState('crypto');
  const [view, setView] = useState('gainers');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [drawerHeadlines, setDrawerHeadlines] = useState([]);
  const [drawerError, setDrawerError] = useState(null);

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

  const tableRows = useMemo(() => {
    if (!marketMovers) return [];
    return marketMovers[segment]?.[view] ?? [];
  }, [marketMovers, segment, view]);

  const handleRowClick = async (asset) => {
    setSelectedAsset(asset);
    setDrawerOpen(true);
    setDrawerLoading(true);
    setDrawerHeadlines([]);
    setDrawerError(null);
    try {
      const news = await getNewsArticles(asset.symbol);
      setDrawerHeadlines((news.articles ?? []).slice(0, 3));
    } catch (err) {
      setDrawerError('Unable to load related headlines.');
    } finally {
      setDrawerLoading(false);
    }
  };

  return (
    <div className="container flex flex-col gap-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Live Movers</p>
        <h1 className="font-serif text-3xl text-slate-900 dark:text-slate-100">Market radar for crypto &amp; equities</h1>
        <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Track top gainers and laggards across digital assets and market-leading equities. Connect CoinGecko and Alpha Vantage keys for real-time data.
        </p>
      </header>

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-400/60 dark:bg-amber-500/10 dark:text-amber-200">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center rounded-full border border-black/5 bg-white p-1 shadow-subtle dark:border-white/10 dark:bg-slate-950">
          {segments.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSegment(option.id)}
              className={clsx(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ease-out',
                segment === option.id
                  ? 'bg-accent-blue text-white'
                  : 'text-slate-600 hover:text-accent-blue dark:text-slate-300'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="inline-flex items-center rounded-full border border-black/5 bg-white p-1 shadow-subtle dark:border-white/10 dark:bg-slate-950">
          {views.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setView(option.id)}
              className={clsx(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ease-out',
                view === option.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 hover:text-accent-blue dark:text-slate-300'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-black/5 bg-surface shadow-subtle dark:border-white/10 dark:bg-slate-950">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black/5 dark:divide-white/10">
            <thead className="bg-slate-50 dark:bg-slate-900/60">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th scope="col" className="px-4 py-3">Symbol</th>
                <th scope="col" className="px-4 py-3">Name</th>
                <th scope="col" className="px-4 py-3">Price</th>
                <th scope="col" className="px-4 py-3">24h %</th>
                <th scope="col" className="px-4 py-3">Volume</th>
                <th scope="col" className="px-4 py-3">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-sm dark:divide-white/10">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <tr key={`skeleton-${index}`} className="animate-pulse">
                      {Array.from({ length: 6 }).map((__, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-4">
                          <div className="h-4 rounded bg-slate-100 dark:bg-slate-800" />
                        </td>
                      ))}
                    </tr>
                  ))
                : tableRows.map((asset) => {
                    const positive = Number(asset.change24h) >= 0;
                    return (
                      <tr
                        key={`${asset.symbol}-${asset.name}`}
                        className="cursor-pointer transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-900"
                        onClick={() => handleRowClick(asset)}
                      >
                        <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">{asset.symbol}</td>
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{asset.name}</td>
                        <td className="px-4 py-4 text-slate-700 dark:text-slate-200">{formatCurrency(asset.price)}</td>
                        <td className={clsx('px-4 py-4 font-medium', positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
                          {formatPercent(asset.change24h)}
                        </td>
                        <td className="px-4 py-4 text-slate-500 dark:text-slate-400">
                          {asset.volume ? new Intl.NumberFormat('en', { notation: 'compact' }).format(asset.volume) : '—'}
                        </td>
                        <td className="px-4 py-4">
                          <div className="h-12 w-28">
                            <Sparkline points={asset.sparkline} positive={positive} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        {!loading && tableRows.length === 0 && (
          <div className="px-6 py-8 text-sm text-slate-500">No movers available. Try connecting API keys or switching segments.</div>
        )}
      </div>

      <Transition show={drawerOpen} as={Fragment}>
        <Dialog onClose={setDrawerOpen} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/50" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end justify-end p-4 sm:p-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="translate-y-8 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="ease-in duration-150"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="translate-y-4 opacity-0"
              >
                <Dialog.Panel className="w-full max-w-md rounded-xl border border-black/5 bg-surface p-6 shadow-overlay dark:border-white/10 dark:bg-slate-950">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="font-serif text-2xl text-slate-900 dark:text-slate-100">
                      {selectedAsset?.name ?? 'Asset detail'}
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={() => setDrawerOpen(false)}
                      className="rounded-full border border-black/5 px-3 py-1 text-xs font-medium text-slate-500 hover:text-accent-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40 dark:border-white/10 dark:text-slate-300"
                    >
                      Close
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{selectedAsset?.symbol}</p>
                  <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs uppercase tracking-wide text-slate-500">Price</span>
                      <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(selectedAsset?.price)}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs uppercase tracking-wide text-slate-500">24h Change</span>
                      <span className={clsx('text-lg font-semibold', Number(selectedAsset?.change24h) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
                        {formatPercent(selectedAsset?.change24h)}
                      </span>
                    </div>
                    {selectedAsset?.volume && (
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs uppercase tracking-wide text-slate-500">Volume</span>
                        <span>{new Intl.NumberFormat('en', { notation: 'compact' }).format(selectedAsset.volume)}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-6">
                    <Sparkline points={selectedAsset?.sparkline ?? []} positive={Number(selectedAsset?.change24h) >= 0} />
                  </div>
                  <div className="mt-6 space-y-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Related headlines</h2>
                    {drawerLoading && <div className="h-20 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-900" />}
                    {drawerError && <p className="text-xs text-amber-600 dark:text-amber-300">{drawerError}</p>}
                    {!drawerLoading && !drawerError && drawerHeadlines.length === 0 && (
                      <p className="text-sm text-slate-500">No recent headlines for this symbol.</p>
                    )}
                    <ul className="space-y-3">
                      {drawerHeadlines.map((headline) => (
                        <li key={headline.url} className="space-y-1">
                          <a
                            href={headline.url}
                            className="font-medium text-slate-900 hover:text-accent-blue dark:text-slate-100"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {headline.title}
                          </a>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{headline.summary}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default MarketMovers;
