import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import News from './pages/News.js';
import MarketMovers from './pages/MarketMovers.js';
import Trends from './pages/Trends.js';
import Lookup from './pages/Lookup.js';
import Digest from './pages/Digest.js';
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
      <div className="relative min-h-screen bg-background text-slate-900 transition-colors duration-300 ease-out dark:bg-slate-950 dark:text-slate-100">
        <Navbar isDarkMode={theme === 'dark'} onToggleTheme={toggleTheme} />

        <main className="relative z-10 mx-auto flex w-full flex-col gap-16 pb-24 pt-28">
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/market-movers" element={<MarketMovers />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/lookup" element={<Lookup />} />
            <Route path="/digest" element={<Digest />} />
            <Route path="*" element={<News />} />
          </Routes>
        </main>

        <ChatAssistant isDarkMode={theme === 'dark'} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
