import React from 'react';

function Footer() {
  const footerLinks = [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  return (
    <footer className="relative z-10 mt-20 border-t border-white/40 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:text-slate-300">
        <p className="text-sm tracking-wide text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Simply News. Crafted for clarity.
        </p>
        <nav className="flex gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative font-medium text-slate-700 transition-colors duration-300 ease-in-out hover:text-ink dark:text-slate-200 dark:hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
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
