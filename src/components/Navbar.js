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
      <nav className="w-full max-w-6xl rounded-4xl border border-white/30 bg-white/60 p-4 shadow-frosted backdrop-blur-2xl transition-all duration-500 ease-in-out dark:border-white/10 dark:bg-white/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center gap-3 text-slate-900 transition-transform duration-300 ease-in-out hover:scale-[1.01] dark:text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-sm font-semibold uppercase tracking-[0.3em] text-slate-800 shadow-glow backdrop-blur-xl dark:border-white/20 dark:bg-white/10 dark:text-white">
              SN
            </span>
            <div className="leading-tight">
              <span className="block text-xs font-medium uppercase tracking-[0.5em] text-slate-600/70 dark:text-slate-300/70">Simply</span>
              <span className="block text-2xl font-semibold text-slate-900 drop-shadow-[0_0_22px_rgba(148,197,255,0.65)] dark:bg-gradient-to-r dark:from-white dark:via-accent dark:to-sky-200 dark:bg-clip-text dark:text-transparent">
                Simply News
              </span>
            </div>
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto rounded-full border border-white/40 bg-white/50 px-1 py-1 text-sm font-medium shadow-inner backdrop-blur-xl transition-all duration-300 ease-in-out dark:border-white/10 dark:bg-white/5 sm:px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ease-in-out ${
                      isActive
                        ? 'bg-white/80 text-slate-900 shadow-glow dark:bg-white/20 dark:text-white'
                        : 'text-slate-600 hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-300 ease-in-out ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>{item.name}</span>
                    <span className="pointer-events-none absolute inset-0 rounded-full border border-white/40 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50 dark:border-white/10" />
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm shadow-inner backdrop-blur-xl transition-all duration-300 ease-in-out focus-within:border-accent/70 focus-within:shadow-glow dark:border-white/10 dark:bg-white/5 md:flex">
                <MagnifierIcon className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                <input
                  type="search"
                  placeholder="Search stories"
                  className="w-40 bg-transparent text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-400"
                />
              </div>

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
