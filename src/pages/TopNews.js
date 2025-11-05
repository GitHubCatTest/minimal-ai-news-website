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

  if (articles.length === 0) {
    return (
      <section className="rounded-3xl border border-white/20 bg-white/70 p-8 text-center text-slate-600 shadow-frosted backdrop-blur-2xl dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
        <p>No headlines available right now. Please check back shortly.</p>
      </section>
    );
  }

  const [topStory, ...restStories] = articles;
  const showBriefings = restStories.length > 3;
  const briefings = showBriefings ? restStories.slice(0, 3) : [];
  const cardStories = showBriefings ? restStories.slice(3) : restStories;

  return (
    <section className="space-y-14">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 shadow-inner backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <NewspaperIcon className="h-4 w-4" />
          Top Desk
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl dark:text-white">
            Today&apos;s Top Stories
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            A curated front page of the moments shaping business, policy, science, and sport worldwide — refreshed in real time.
          </p>
        </div>
      </header>

      {topStory && (
        <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
          <article className="relative overflow-hidden rounded-[2.75rem] border border-white/35 bg-white/30 shadow-frosted backdrop-blur-3xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(143,183,255,0.25),_transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/10" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8 p-8 sm:p-12">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-600 shadow-inner">
                  Top Story
                </span>
                <div className="space-y-4">
                  <h2 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl dark:text-white">
                    {topStory.headline || topStory.title || 'Breaking story'}
                  </h2>
                  <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-200">
                    {topStory.summary ||
                      topStory.description ||
                      'Stay informed with a concise view of the developments driving today’s agenda.'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {topStory.source && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-500">
                    {topStory.source?.name || topStory.source}
                  </span>
                )}
                {(topStory.link || topStory.url) && (
                  <a
                    href={topStory.link || topStory.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 ease-in-out hover:border-white/60 hover:bg-white hover:text-midnight"
                  >
                    Read full story
                  </a>
                )}
              </div>
            </div>
          </article>

          {showBriefings && briefings.length > 0 && (
            <aside className="flex h-full flex-col gap-4 rounded-[2rem] border border-white/30 bg-white/40 p-6 shadow-frosted backdrop-blur-2xl sm:p-8 dark:border-white/10 dark:bg-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-ink dark:text-white">In Brief</h3>
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Updates</span>
              </div>
              <ul className="flex flex-col gap-4">
                {briefings.map((article, index) => {
                  const title = article.headline || article.title || 'Latest update';
                  const link = article.link || article.url;
                  const source = article.source?.name || article.source || 'Simply News';

                  return (
                    <li
                      key={`${title}-${index}`}
                      className="group rounded-2xl border border-transparent bg-white/40 p-4 transition-all duration-300 ease-in-out hover:border-white/50 hover:bg-white/60 dark:bg-white/10"
                    >
                      <p className="text-sm font-medium text-ink dark:text-slate-100">{title}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                        <span>{source}</span>
                        {link && (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-600 transition-all duration-300 ease-in-out group-hover:text-ink"
                          >
                            Read
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </aside>
          )}
        </div>
      )}

      {cardStories.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {cardStories.map((article, index) => {
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
      )}
    </section>
  );
}

export default TopNews;
