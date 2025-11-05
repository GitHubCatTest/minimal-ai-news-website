import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import TopNews from './pages/TopNews.js';
import Finance from './pages/Finance.js';
import Politics from './pages/Politics.js';
import Tech from './pages/Tech.js';
import Sports from './pages/Sports.js';
import ChatAssistant from './components/ChatAssistant.js';
import Footer from './components/Footer.js';

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
      <div className="relative min-h-screen overflow-hidden bg-alabaster text-ink transition-colors duration-500 ease-in-out dark:bg-midnight dark:text-slate-100">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-12 h-80 w-80 rounded-full bg-white/50 blur-[160px] dark:bg-white/10" />
          <div className="absolute top-40 left-1/3 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-accent/30 blur-[220px] opacity-90 dark:bg-accent/20" />
          <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] translate-x-1/4 rounded-full bg-[#ffe7d6]/50 blur-[200px] dark:bg-slate-700/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_55%)]" />
        </div>

        <Navbar isDarkMode={theme === 'dark'} onToggleTheme={toggleTheme} />

        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-28 pt-32 sm:px-6 lg:px-8">
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
