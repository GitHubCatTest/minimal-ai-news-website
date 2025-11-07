import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, MagnifyingGlassIcon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

function Navbar({ isDarkMode, onToggleTheme }) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'News', path: '/' },
    { name: 'Market Movers', path: '/market-movers' },
    { name: 'Trends', path: '/trends' },
    { name: 'Lookup', path: '/lookup' },
    { name: 'Digest', path: '/digest' },
  ];

  const renderNavLink = (item) => {
    const isActive = pathname === item.path;
    return (
      <Link
        key={item.name}
        to={item.path}
        onClick={() => setMenuOpen(false)}
        className={clsx(
          'relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium transition-all duration-200 ease-out',
          'hover:text-accent-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60',
          isActive ? 'text-accent-blue' : 'text-slate-600 dark:text-slate-300'
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <span>{item.name}</span>
        <span
          className={clsx(
            'absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-accent-blue transition-transform duration-200 ease-out',
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          )}
        />
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-surface/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-slate-900 dark:text-slate-100">Simply News</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">AI Finance &amp; Tech Intelligence</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <div className="group" key={item.name}>
              {renderNavLink(item)}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <label
            htmlFor="global-search"
            className="flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1.5 text-sm shadow-subtle focus-within:border-accent-blue focus-within:ring-1 focus-within:ring-accent-blue/50 dark:border-white/10 dark:bg-slate-900"
          >
            <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <input
              id="global-search"
              type="search"
              placeholder="Search topics or tickers"
              className="w-44 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-500"
            />
          </label>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            aria-pressed={isDarkMode}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-slate-600 shadow-subtle transition-transform duration-200 ease-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
          >
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-black/5 bg-white p-2 text-slate-700 shadow-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-black/5 bg-surface/95 shadow-subtle dark:border-white/10 dark:bg-slate-900/95 lg:hidden">
          <div className="container flex flex-col gap-4 py-4">
            <nav className="flex flex-col" aria-label="Primary mobile">
              {navItems.map((item) => (
                <div key={item.name} className="group">
                  {renderNavLink(item)}
                </div>
              ))}
            </nav>
            <label
              htmlFor="global-search-mobile"
              className="flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-2 text-sm shadow-subtle focus-within:border-accent-blue focus-within:ring-1 focus-within:ring-accent-blue/50 dark:border-white/10 dark:bg-slate-900"
            >
              <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <input
                id="global-search-mobile"
                type="search"
                placeholder="Search topics or tickers"
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-500"
              />
            </label>
            <button
              type="button"
              onClick={() => {
                onToggleTheme();
                setMenuOpen(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
            >
              {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              <span>Toggle theme</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
