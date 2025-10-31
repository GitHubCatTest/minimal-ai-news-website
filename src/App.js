import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import TopNews from './pages/TopNews.js';
import Finance from './pages/Finance.js';
import Politics from './pages/Politics.js';
import Tech from './pages/Tech.js';
import Sports from './pages/Sports.js';
import ChatAssistant from './components/ChatAssistant.js';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    root.style.setProperty('color-scheme', isDark ? 'dark' : 'light');
    return () => {
      root.style.removeProperty('color-scheme');
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden bg-alabaster text-slate-900 transition-colors duration-500 ease-in-out dark:bg-midnight dark:text-slate-100">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-48 left-16 h-80 w-80 rounded-full bg-sky-300/40 blur-[140px] dark:bg-sky-500/30" />
          <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-indigo-200/40 blur-[160px] dark:bg-indigo-500/30" />
          <div className="absolute top-1/3 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/40 blur-[200px] opacity-70 dark:bg-slate-700/40" />
        </div>

        <Navbar isDarkMode={theme === 'dark'} onToggleTheme={toggleTheme} />

        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<TopNews />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/politics" element={<Politics />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="*" element={<TopNews />} />
          </Routes>
        </main>

        <ChatAssistant isDarkMode={theme === 'dark'} />
      </div>
    </Router>
  );
}

export default App;
