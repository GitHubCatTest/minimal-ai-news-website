import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BanknotesIcon,
  BuildingLibraryIcon,
  CpuChipIcon,
  MagnifierIcon,
  MoonIcon,
  NewspaperIcon,
  SunIcon,
  TrophyIcon,
} from './icons.js';

function Navbar({ isDarkMode, onToggleTheme }) {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Top News', path: '/', icon: NewspaperIcon },
    { name: 'Finance', path: '/finance', icon: BanknotesIcon },
    { name: 'Politics', path: '/politics', icon: BuildingLibraryIcon },
    { name: 'Tech', path: '/tech', icon: CpuChipIcon },
    { name: 'Sports', path: '/sports', icon: TrophyIcon },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-6 sm:px-6 lg:px-8">
      <nav className="w-full max-w-6xl rounded-4xl border border-white/30 bg-white/60 px-5 py-4 shadow-frosted backdrop-blur-2xl transition-all duration-500 ease-in-out dark:border-white/10 dark:bg-white/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="group flex items-center gap-3 text-ink transition-colors duration-300 ease-in-out hover:text-midnight dark:text-white"
          >
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-glow backdrop-blur-xl transition-transform duration-300 ease-in-out group-hover:scale-105 dark:border-white/10 dark:bg-white/10">
              <span
                aria-hidden="true"
                className="h-9 w-9 rounded-2xl bg-gradient-to-br from-accent/70 via-white/40 to-transparent"
              />
            </span>
            <span className="text-2xl font-semibold tracking-tight">Simply News</span>
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
            <div className="no-scrollbar flex items-center gap-1 overflow-x-auto rounded-full border border-white/40 bg-white/45 px-1 py-1 text-sm font-medium backdrop-blur-xl transition-all duration-300 ease-in-out dark:border-white/10 dark:bg-white/5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ease-in-out ${
                      isActive
                        ? 'bg-white/80 text-ink shadow-glow dark:bg-white/20 dark:text-white'
                        : 'text-slate-600 hover:bg-white/70 hover:text-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-300 ease-in-out ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="relative inline-flex items-center">
                      {item.name}
                      <span className={`absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 bg-current transition-transform duration-300 ease-in-out ${isActive ? 'scale-x-100' : 'group-hover:scale-x-100'}`} />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="simply-news-search"
                className="hidden items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm shadow-inner backdrop-blur-xl transition-all duration-300 ease-in-out focus-within:border-accent/70 focus-within:shadow-glow dark:border-white/10 dark:bg-white/5 md:flex"
              >
                <MagnifierIcon className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                <input
                  id="simply-news-search"
                  type="search"
                  placeholder="Search headlines"
                  className="w-40 bg-transparent text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-400"
                />
              </label>

              <button
                type="button"
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                aria-pressed={isDarkMode}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 bg-white/70 text-slate-700 shadow-inner transition-all duration-300 ease-in-out hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
              >
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
