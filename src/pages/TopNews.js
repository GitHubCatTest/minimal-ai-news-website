import React from 'react';

const sampleArticles = [
  {
    id: 1,
    headline: "Example Top News 1",
    summary: "This is a placeholder summary. Replace with AI‑generated content.",
    link: "#",
  },
  {
    id: 2,
    headline: "Example Top News 2",
    summary: "This is a placeholder summary. Replace with AI‑generated content.",
    link: "#",
  },
];

function TopNews() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Top News</h2>
      <ul className="space-y-4">
        {sampleArticles.map(article => (
          <li key={article.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">{article.headline}</h3>
            <p className="mt-2 text-sm text-gray-700">{article.summary}</p>
            <a
              href={article.link}
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              Read More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopNews;
