import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const footerLinks = [
    { label: 'About', to: '#' },
    { label: 'Contact', to: '#' },
    { label: 'Terms', to: '#' },
    { label: 'Privacy', to: '#' },
  ];

  return (
    <footer className="relative z-10 mt-12 border-t border-white/40 bg-white/40 py-10 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center text-sm text-slate-600 sm:flex-row sm:text-left sm:text-base sm:px-6 lg:px-8 dark:text-slate-300">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-[0.45em] text-slate-500 dark:text-slate-400">Simply News</span>
          <p className="text-slate-700 dark:text-slate-200">Daily clarity in a world of noise.</p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="rounded-full border border-transparent bg-white/40 px-4 py-2 transition-all duration-300 ease-in-out hover:border-white/60 hover:bg-white/70 hover:text-slate-900 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
