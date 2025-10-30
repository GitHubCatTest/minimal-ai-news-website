export default async function handler(req, res) {
  const category = (req.query && req.query.category) || 'general';
  const apiKey = process.env.GNEWS_API_KEY;
  const url = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en&topic=${category}&max=8`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const articles = data.articles.map(article => ({
      headline: article.title,
      summary: article.description || '',
      link: article.url,
    }));
    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
