import React, { useEffect, useState } from 'react';
import { NewspaperIcon } from '../components/icons.js';
import GlassCard from '../components/GlassCard.js';

function TopNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news?category=general');
        const data = await res.json();
        // data may be an object with articles array or the array itself
        const fetchedArticles = data.articles || data;
        setArticles(fetchedArticles);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load news');
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="flex items-center justify-center py-24">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/60 px-5 py-3 text-sm font-medium text-slate-600 shadow-inner backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
          <span className="h-2.5 w-2.5 animate-ping rounded-full bg-accent" />
          Loading the latest headlines...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-white/20 bg-white/70 p-8 text-center text-slate-600 shadow-frosted backdrop-blur-2xl dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 shadow-inner backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <NewspaperIcon className="h-4 w-4" />
          Top Picks
        </span>
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Today&apos;s Top Stories
          </h1>
          <p className="max-w-3xl text-base text-slate-600 dark:text-slate-300">
            Curated breaking news with crisp AI summaries so you can focus on what matters most around the globe.
          </p>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {articles.map((article, index) => {
          const title = article.headline || article.title || 'Untitled story';
          const summary =
            article.summary ||
            article.description ||
            'Stay informed with the latest developments from across the world.';
          const link = article.link || article.url;
          const source = article.source?.name || article.source || 'Simply News';

          return (
            <GlassCard
              key={`${title}-${index}`}
              title={title}
              summary={summary}
              link={link}
              meta={source}
              accent="Latest"
            />
          );
        })}
      </div>
    </section>
  );
}

export default TopNews;
