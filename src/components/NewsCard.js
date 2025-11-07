import React from 'react';
import GlassCard from './GlassCard.js';

function NewsCard({ article }) {
  if (!article) return null;
  const { title, summary, url, source, publishedAt, category } = article;
  const formatted = publishedAt
    ? new Intl.DateTimeFormat('en', {
        hour: 'numeric',
        minute: '2-digit',
        day: 'numeric',
        month: 'short',
      }).format(new Date(publishedAt))
    : null;

  return (
    <GlassCard
      title={title}
      summary={summary}
      link={url}
      meta={[source, formatted].filter(Boolean).join(' · ')}
      accent={category?.toUpperCase() ?? 'INTEL'}
      actionLabel="Read analysis"
    />
  );
}

export default NewsCard;
