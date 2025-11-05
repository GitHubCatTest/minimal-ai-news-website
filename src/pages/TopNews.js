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

  const heroArticle = articles[0];
  const supportingArticles = articles.slice(1);
  const spotlight = supportingArticles.slice(0, 3);
  const remaining = supportingArticles.slice(3);

  return (
    <section className="space-y-12">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 shadow-inner backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <NewspaperIcon className="h-4 w-4" />
          Top Picks
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Today&apos;s Top Stories
          </h1>
          <p className="max-w-3xl text-lg text-slate-600">
            The biggest headlines, curated with calm clarity. Explore the stories shaping markets, politics, science, and culture across the globe.
          </p>
        </div>
      </header>

      {heroArticle && (
        <section className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
          <article className="relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/30 p-10 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur-3xl transition-all duration-500 ease-in-out hover:border-white/60 hover:shadow-[0_45px_90px_-36px_rgba(15,23,42,0.42)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-white/10" />
            <div className="relative z-10 flex h-full flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-600">Top Story</span>
              <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                {heroArticle.headline || heroArticle.title || 'Breaking news around the globe'}
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                {heroArticle.summary || heroArticle.description || 'Get caught up with the most impactful development of the day and understand why it matters right now.'}
              </p>
              <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  {heroArticle.source?.name || heroArticle.source || 'Simply News'}
                </span>
                <a
                  href={heroArticle.link || heroArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/50"
                >
                  Read full story
                </a>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-4 rounded-[2.5rem] border border-white/40 bg-white/25 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.15)] backdrop-blur-2xl">
            <h3 className="text-lg font-semibold text-slate-900">Spotlight Briefing</h3>
            <div className="flex flex-col gap-4">
              {spotlight.map((article, index) => (
                <a
                  key={`${article.title}-${index}`}
                  href={article.link || article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-white/40 bg-white/40 p-4 transition-all duration-300 ease-in-out hover:border-white/70 hover:bg-white/60 hover:shadow-[0_16px_30px_rgba(15,23,42,0.15)]"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{article.source?.name || article.source || 'Simply News'}</p>
                  <h4 className="mt-2 text-base font-semibold text-slate-900 group-hover:text-slate-950">
                    {article.headline || article.title || 'Latest development'}
                  </h4>
                  <p className="mt-2 text-sm text-slate-600">
                    {article.summary || article.description || 'A concise look at the trend everyone is watching.'}
                  </p>
                </a>
              ))}
            </div>
          </aside>
        </section>
      )}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {(heroArticle ? remaining : articles).map((article, index) => {
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
