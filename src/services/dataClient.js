import {
  sampleDigest,
  sampleLookupSnapshots,
  sampleMarketMovers,
  sampleNewsArticles,
  sampleTrends,
} from '../data/sampleData.js';

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || process.env.REACT_APP_GNEWS_API_KEY;
const NEWS_ENDPOINT = process.env.REACT_APP_NEWS_API_ENDPOINT;
const OPENROUTER_KEY = process.env.REACT_APP_OPENROUTER_KEY;
const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
const ALPHA_VANTAGE_KEY = process.env.REACT_APP_ALPHA_VANTAGE_KEY;

const MARKET_CACHE = new Map();

const supportsLLMSummarization = Boolean(OPENAI_KEY || OPENROUTER_KEY);

const summarizeLocally = (text, maxLength = 200) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
};

async function callLLM(prompt) {
  const body = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You condense financial and technology headlines into crisp 2 sentence summaries.' },
      { role: 'user', content: prompt },
    ],
    max_tokens: 140,
    temperature: 0.3,
  };

  const headers = { 'Content-Type': 'application/json' };
  let url;

  if (OPENAI_KEY) {
    headers.Authorization = `Bearer ${OPENAI_KEY}`;
    url = 'https://api.openai.com/v1/chat/completions';
  } else if (OPENROUTER_KEY) {
    headers.Authorization = `Bearer ${OPENROUTER_KEY}`;
    const referer = typeof window !== 'undefined' && window.location ? window.location.origin : 'https://simply.news';
    headers['HTTP-Referer'] = referer;
    headers['X-Title'] = 'Simply News';
    url = 'https://openrouter.ai/api/v1/chat/completions';
  }

  if (!url) return null;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() ?? null;
  } catch (error) {
    console.error('LLM summary error', error);
    return null;
  }
}

export async function getNewsArticles(topic = 'business,technology,crypto') {
  try {
    const params = new URLSearchParams({
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: '12',
    });

    if (NEWS_ENDPOINT) {
      params.set('query', topic);
      const response = await fetch(`${NEWS_ENDPOINT}?${params.toString()}`);
      if (!response.ok) throw new Error('Custom endpoint failed');
      const payload = await response.json();
      return payload;
    }

    if (!NEWS_API_KEY) {
      return { articles: sampleNewsArticles, isFallback: true };
    }

    let url;
    if (process.env.REACT_APP_NEWS_API_KEY) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&${params.toString()}`;
    } else {
      params.set('topic', 'business');
      params.set('token', NEWS_API_KEY);
      params.set('max', '12');
      url = `https://gnews.io/api/v4/top-headlines?${params.toString()}`;
    }

    const response = await fetch(url, {
      headers: process.env.REACT_APP_NEWS_API_KEY
        ? { Authorization: NEWS_API_KEY ? `Bearer ${NEWS_API_KEY}` : undefined, 'X-Api-Key': NEWS_API_KEY }
        : undefined,
    });

    if (!response.ok) throw new Error('News request failed');
    const data = await response.json();

    const articles = (data.articles || []).map((article, index) => ({
      id: article.url ?? `article-${index}`,
      title: article.title,
      summary:
        article.description || article.content || summarizeLocally(article.title),
      url: article.url,
      source: article.source?.name ?? article.publisher ?? 'Newswire',
      publishedAt: article.publishedAt || article.published_at,
      category: topic,
    }));

    if (supportsLLMSummarization) {
      const prompts = articles.slice(0, 5).map((article) =>
        callLLM(
          `Headline: ${article.title}\nSource: ${article.source}\nSummary the reader wants: 2 sentences capturing why this matters for investors.`
        )
      );
      const aiSummaries = await Promise.allSettled(prompts);
      aiSummaries.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
          articles[index].summary = result.value;
        }
      });
    }

    return { articles };
  } catch (error) {
    console.error('News fetch failed, using sample data', error);
    return { articles: sampleNewsArticles, isFallback: true };
  }
}

export async function getMarketMovers() {
  if (MARKET_CACHE.has('marketMovers')) {
    return MARKET_CACHE.get('marketMovers');
  }

  try {
    const [cryptoRes, stocksRes] = await Promise.allSettled([
      fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=true&price_change_percentage=24h&per_page=50&page=1'
      ),
      ALPHA_VANTAGE_KEY
        ? fetch(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${ALPHA_VANTAGE_KEY}`)
        : Promise.reject(new Error('Missing Alpha Vantage key')),
    ]);

    const movers = { ...sampleMarketMovers };

    if (cryptoRes.status === 'fulfilled' && cryptoRes.value.ok) {
      const payload = await cryptoRes.value.json();
      const sorted = payload
        .filter((asset) => typeof asset.price_change_percentage_24h === 'number')
        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      movers.crypto = {
        gainers: sorted.slice(0, 5).map((asset) => ({
          symbol: asset.symbol.toUpperCase(),
          name: asset.name,
          price: asset.current_price,
          change24h: asset.price_change_percentage_24h,
          volume: asset.total_volume,
          sparkline: asset.sparkline_in_7d?.price?.slice(-10) ?? [],
        })),
        losers: sorted
          .slice(-5)
          .reverse()
          .map((asset) => ({
            symbol: asset.symbol.toUpperCase(),
            name: asset.name,
            price: asset.current_price,
            change24h: asset.price_change_percentage_24h,
            volume: asset.total_volume,
            sparkline: asset.sparkline_in_7d?.price?.slice(-10) ?? [],
          })),
      };
    }

    if (stocksRes.status === 'fulfilled' && stocksRes.value.ok) {
      const payload = await stocksRes.value.json();
      const { top_gainers = [], top_losers = [] } = payload;
      movers.stocks = {
        gainers: top_gainers.slice(0, 5).map((asset) => ({
          symbol: asset.ticker,
          name: asset.ticker,
          price: Number(asset.price),
          change24h: Number(asset.change_percentage?.replace('%', '') ?? 0),
          volume: Number(asset.volume) || null,
          sparkline: [],
        })),
        losers: top_losers.slice(0, 5).map((asset) => ({
          symbol: asset.ticker,
          name: asset.ticker,
          price: Number(asset.price),
          change24h: Number(asset.change_percentage?.replace('%', '') ?? 0),
          volume: Number(asset.volume) || null,
          sparkline: [],
        })),
      };
    }

    MARKET_CACHE.set('marketMovers', movers);
    return movers;
  } catch (error) {
    console.error('Market movers fetch failed', error);
    return sampleMarketMovers;
  }
}

export async function getTrends() {
  try {
    const news = await getNewsArticles();
    const articles = news.articles ?? [];
    if (!articles.length) {
      return sampleTrends;
    }

    const stopwords = new Set(
      [
        'the',
        'and',
        'for',
        'with',
        'into',
        'amid',
        'from',
        'this',
        'that',
        'over',
        'after',
        'under',
        'about',
        'across',
        'today',
        'update',
        'breaking',
        'reports',
        'launches',
      ].map((word) => word.toLowerCase())
    );

    const sorted = [...articles].sort((a, b) => {
      const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bTime - aTime;
    });

    const midpoint = Math.max(1, Math.floor(sorted.length / 2));
    const recentWindow = sorted.slice(0, midpoint);
    const previousWindow = sorted.slice(midpoint);

    const trends = new Map();

    const registerTerm = (term, bucket, article) => {
      const key = term.toUpperCase();
      if (!trends.has(key)) {
        trends.set(key, {
          term: key,
          recent: 0,
          previous: 0,
          total: 0,
          headlines: [],
        });
      }
      const entry = trends.get(key);
      entry.total += 1;
      if (bucket === 'recent') {
        entry.recent += 1;
      } else {
        entry.previous += 1;
      }
      if (entry.headlines.length < 4 && article?.title) {
        entry.headlines.push(article.title);
      }
    };

    const extractTerms = (article, bucket) => {
      const text = `${article.title ?? ''} ${article.summary ?? ''}`;
      const tokens = new Set();

      const tickerMatches = text.match(/\b[A-Z]{2,5}\b/g) ?? [];
      tickerMatches.forEach((token) => {
        const normalized = token.replace(/[^A-Z]/g, '');
        if (normalized.length >= 2 && normalized.length <= 5) {
          tokens.add(normalized);
        }
      });

      const capitalized = text.match(/\b([A-Z][a-zA-Z0-9&-]*(?:\s+[A-Z][a-zA-Z0-9&-]*){0,2})\b/g) ?? [];
      capitalized.forEach((phrase) => {
        const normalized = phrase.trim();
        const lower = normalized.toLowerCase();
        if (lower.length <= 2 || stopwords.has(lower)) return;
        if (/^[A-Z]{2,}$/.test(normalized)) return;
        tokens.add(normalized);
      });

      ['artificial intelligence', 'machine learning', 'gen ai', 'large language model', 'rate cuts', 'spot etf', 'semiconductor']
        .filter((keyword) => text.toLowerCase().includes(keyword))
        .forEach((keyword) => tokens.add(keyword.toUpperCase()));

      tokens.forEach((term) => registerTerm(term, bucket, article));
    };

    recentWindow.forEach((article) => extractTerms(article, 'recent'));
    previousWindow.forEach((article) => extractTerms(article, 'previous'));

    const ranked = Array.from(trends.values())
      .filter((entry) => entry.recent > 0)
      .map((entry) => {
        const momentumRaw = entry.previous
          ? ((entry.recent - entry.previous) / Math.max(entry.previous, 1)) * 100
          : entry.recent * 100;
        const direction = momentumRaw > 15 ? 'up' : momentumRaw < -15 ? 'down' : 'flat';
        const insight = [
          `${entry.recent} mentions in the latest cycle versus ${entry.previous || 0} previously.`,
        ];
        if (entry.headlines[0]) {
          insight.push(`Key coverage: ${entry.headlines[0]}`);
        }
        return {
          term: entry.term,
          momentum: Number(momentumRaw.toFixed(1)),
          direction,
          frequency: entry.total,
          headlines: entry.headlines,
          insight,
        };
      })
      .sort((a, b) => {
        if (b.momentum !== a.momentum) return b.momentum - a.momentum;
        return b.frequency - a.frequency;
      })
      .slice(0, 6);

    if (!ranked.length) {
      return sampleTrends;
    }

    return ranked;
  } catch (error) {
    console.error('Trend detection failed', error);
    return sampleTrends;
  }
}

export async function lookupSymbol(rawSymbol = '') {
  const symbol = rawSymbol.trim().toUpperCase();
  if (!symbol) {
    return null;
  }

  try {
    const cached = MARKET_CACHE.get(`lookup-${symbol}`);
    if (cached) return cached;

    if (sampleLookupSnapshots[symbol]) {
      MARKET_CACHE.set(`lookup-${symbol}`, sampleLookupSnapshots[symbol]);
      return sampleLookupSnapshots[symbol];
    }

    const [coinRes, stockRes] = await Promise.allSettled([
      fetch(`https://api.coingecko.com/api/v3/search?query=${symbol}`),
      ALPHA_VANTAGE_KEY
        ? fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`)
        : Promise.reject(new Error('Missing Alpha Vantage key')),
    ]);

    if (coinRes.status === 'fulfilled' && coinRes.value.ok) {
      const payload = await coinRes.value.json();
      const match = payload.coins?.find((coin) => coin.symbol.toUpperCase() === symbol);
      if (match) {
        const marketRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${match.id}?localization=false&sparkline=true`
        );
        if (marketRes.ok) {
          const market = await marketRes.json();
          const snapshot = {
            symbol,
            name: market.name,
            price: market.market_data?.current_price?.usd,
            change24h: market.market_data?.price_change_percentage_24h,
            marketCap: new Intl.NumberFormat('en', { notation: 'compact' }).format(
              market.market_data?.market_cap?.usd ?? 0
            ),
            summary: summarizeLocally(market.description?.en ?? market.name, 220),
            sparkline: market.market_data?.sparkline_7d?.price?.slice(-10) ?? [],
          };
          MARKET_CACHE.set(`lookup-${symbol}`, snapshot);
          return snapshot;
        }
      }
    }

    if (stockRes.status === 'fulfilled' && stockRes.value.ok) {
      const payload = await stockRes.value.json();
      const quote = payload['Global Quote'];
      if (quote) {
        const snapshot = {
          symbol,
          name: quote['01. symbol'] ?? symbol,
          price: Number(quote['05. price']),
          change24h: Number(quote['10. change percent']?.replace('%', '') ?? 0),
          marketCap: quote['06. volume'] ? `${quote['06. volume']} vol` : '—',
          summary: 'Real-time quote sourced via Alpha Vantage.',
          sparkline: [],
        };
        MARKET_CACHE.set(`lookup-${symbol}`, snapshot);
        return snapshot;
      }
    }

    return sampleLookupSnapshots[symbol] ?? null;
  } catch (error) {
    console.error('Lookup failed', error);
    return sampleLookupSnapshots[symbol] ?? null;
  }
}

export async function getDigest() {
  try {
    const [news, markets, trends] = await Promise.all([
      getNewsArticles(),
      getMarketMovers(),
      getTrends(),
    ]);

    const topHeadlines = news.articles.slice(0, 3).map((article) => ({
      title: article.title,
      summary: summarizeLocally(article.summary, 180),
      url: article.url,
      source: article.source,
    }));

    return {
      wrapUp: sampleDigest.wrapUp,
      highlights: sampleDigest.highlights,
      headlines: topHeadlines,
      movers: {
        crypto: markets.crypto.gainers.slice(0, 3),
        stocks: markets.stocks.gainers.slice(0, 3),
      },
      trends: Array.isArray(trends) ? trends : sampleTrends,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Digest fetch failed', error);
    return {
      wrapUp: sampleDigest.wrapUp,
      highlights: sampleDigest.highlights,
      headlines: sampleNewsArticles.slice(0, 3).map((article) => ({
        title: article.title,
        summary: summarizeLocally(article.summary, 180),
        url: article.url,
        source: article.source,
      })),
      movers: {
        crypto: sampleMarketMovers.crypto.gainers.slice(0, 3),
        stocks: sampleMarketMovers.stocks.gainers.slice(0, 3),
      },
      trends: sampleTrends,
      generatedAt: new Date().toISOString(),
      isFallback: true,
    };
  }
}
