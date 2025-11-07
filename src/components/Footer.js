import React from 'react';

function Footer() {
  const footerLinks = [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  return (
    <footer className="border-t border-black/5 bg-surface py-10 text-sm text-slate-500 dark:border-white/10 dark:bg-slate-950">
      <div className="container flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Simply News – AI-Powered Finance &amp; Tech Intelligence.
        </p>
        <nav className="flex gap-6" aria-label="Footer">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative font-medium text-slate-600 transition-colors duration-200 ease-out hover:text-accent-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40 dark:text-slate-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
