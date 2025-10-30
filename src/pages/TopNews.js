import React, { useEffect, useState } from 'react';

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
    return <div>Loading news...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Top News</h2>
      <ul className="space-y-4">
        {articles.map((article, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">{article.headline}</h3>
            <p className="mt-2 text-sm text-gray-700">{article.summary}</p>
            {article.link && (
              <a
                href={article.link}
                className="mt-2 inline-block text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopNews;
