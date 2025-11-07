export const sampleNewsArticles = [
  {
    id: 'ai-earnings-beat',
    title: 'AI Earnings Beat Expectations as Enterprise Adoption Accelerates',
    summary:
      'Enterprise demand for applied AI services accelerated this quarter, lifting major cloud platforms above Wall Street expectations and signaling a resilient AI investment cycle.',
    url: 'https://example.com/ai-earnings',
    source: 'MarketPulse',
    publishedAt: '2024-03-18T12:00:00Z',
    category: 'ai',
  },
  {
    id: 'crypto-liquidity-rotation',
    title: 'Crypto Liquidity Rotates Into Layer-2 Projects Amid Regulatory Clarity',
    summary:
      'Capital continues to flow from mega-cap tokens into scaling-focused layer-2 projects after regulators offered guidance on staking rules, boosting developer momentum and token valuations.',
    url: 'https://example.com/crypto-liquidity',
    source: 'ChainSignals',
    publishedAt: '2024-03-18T11:15:00Z',
    category: 'crypto',
  },
  {
    id: 'chips-capex',
    title: 'Chipmakers Lift Capital Spending on AI Servers Despite Macro Headwinds',
    summary:
      'Leading semiconductor manufacturers lifted their capex guidance for AI accelerators, emphasizing long-term backlog visibility from hyperscale clients even as consumer demand softens.',
    url: 'https://example.com/chip-capex',
    source: 'SiliconDaily',
    publishedAt: '2024-03-18T10:40:00Z',
    category: 'semiconductors',
  },
  {
    id: 'fintech-mna',
    title: 'Fintech Consolidation Accelerates as AI Personalization Drives Premiums',
    summary:
      'A wave of fintech M&A is unfolding as incumbents acquire AI-native startups to modernize personalization engines, pushing deal multiples to their highest level in two years.',
    url: 'https://example.com/fintech-mna',
    source: 'DealDesk',
    publishedAt: '2024-03-18T09:20:00Z',
    category: 'fintech',
  },
  {
    id: 'green-ai',
    title: 'Data Centers Chase Green Power as AI Training Energy Costs Surge',
    summary:
      'Hyperscalers are signing record clean-energy PPAs to offset AI training footprints, with long-duration storage emerging as a differentiator for net-zero-aligned infrastructure.',
    url: 'https://example.com/green-ai',
    source: 'EnergyLedger',
    publishedAt: '2024-03-18T08:55:00Z',
    category: 'sustainability',
  },
];

export const sampleMarketMovers = {
  crypto: {
    gainers: [
      {
        symbol: 'SOL',
        name: 'Solana',
        price: 142.32,
        change24h: 12.4,
        volume: 1870000000,
        sparkline: [122, 124, 126, 129, 131, 134, 136, 139, 141, 142],
      },
      {
        symbol: 'ARB',
        name: 'Arbitrum',
        price: 2.18,
        change24h: 9.5,
        volume: 720000000,
        sparkline: [1.84, 1.88, 1.92, 1.98, 2.04, 2.1, 2.16, 2.18, 2.2, 2.18],
      },
      {
        symbol: 'SEI',
        name: 'Sei Network',
        price: 0.86,
        change24h: 8.2,
        volume: 220000000,
        sparkline: [0.7, 0.72, 0.74, 0.76, 0.8, 0.83, 0.85, 0.86, 0.88, 0.87],
      },
    ],
    losers: [
      {
        symbol: 'DOGE',
        name: 'Dogecoin',
        price: 0.082,
        change24h: -6.1,
        volume: 480000000,
        sparkline: [0.091, 0.089, 0.088, 0.086, 0.085, 0.084, 0.083, 0.082, 0.081, 0.082],
      },
      {
        symbol: 'APT',
        name: 'Aptos',
        price: 11.04,
        change24h: -5.4,
        volume: 360000000,
        sparkline: [12.8, 12.5, 12.2, 11.9, 11.6, 11.3, 11.1, 10.9, 10.8, 11.0],
      },
      {
        symbol: 'AVAX',
        name: 'Avalanche',
        price: 34.92,
        change24h: -4.8,
        volume: 650000000,
        sparkline: [39.3, 38.6, 37.8, 36.9, 36.1, 35.5, 35.0, 34.7, 34.6, 34.9],
      },
    ],
  },
  stocks: {
    gainers: [
      {
        symbol: 'NVDA',
        name: 'Nvidia',
        price: 872.36,
        change24h: 5.8,
        volume: 43000000,
        sparkline: [812, 818, 826, 834, 845, 856, 863, 870, 876, 872],
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft',
        price: 412.18,
        change24h: 3.7,
        volume: 31000000,
        sparkline: [392, 395, 398, 402, 406, 409, 411, 413, 414, 412],
      },
      {
        symbol: 'PATH',
        name: 'UiPath',
        price: 24.62,
        change24h: 3.1,
        volume: 9800000,
        sparkline: [22.8, 23.2, 23.5, 23.9, 24.1, 24.3, 24.6, 24.8, 24.7, 24.6],
      },
    ],
    losers: [
      {
        symbol: 'SQ',
        name: 'Block',
        price: 62.14,
        change24h: -4.3,
        volume: 18000000,
        sparkline: [68.5, 67.2, 66.1, 65.1, 64.2, 63.4, 62.8, 62.1, 61.8, 62.1],
      },
      {
        symbol: 'COIN',
        name: 'Coinbase',
        price: 198.44,
        change24h: -3.9,
        volume: 9500000,
        sparkline: [214, 211, 207, 204, 202, 200, 198, 197, 196, 198],
      },
      {
        symbol: 'ADBE',
        name: 'Adobe',
        price: 498.21,
        change24h: -3.4,
        volume: 6700000,
        sparkline: [532, 528, 523, 518, 512, 507, 503, 500, 498, 498],
      },
    ],
  },
};

export const sampleTrends = [
  {
    term: 'SOLANA',
    momentum: 48.2,
    direction: 'up',
    frequency: 7,
    headlines: [
      'Solana DeFi incentives extend rally as TVL jumps 15% week-over-week',
      'Layer-2 capital rotation continues with SOL and ecosystem tokens leading gains',
    ],
    insight: [
      '4 mentions in the latest cycle versus 1 previously.',
      'Key coverage: Solana DeFi incentives extend rally as TVL jumps 15% week-over-week',
    ],
  },
  {
    term: 'AI INFRASTRUCTURE',
    momentum: 35.6,
    direction: 'up',
    frequency: 6,
    headlines: [
      'Chipmakers lift capex guidance on accelerating AI server demand',
      'Hyperscalers lock in next-gen accelerators ahead of supply constraints',
    ],
    insight: [
      '3 mentions in the latest cycle versus 1 previously.',
      'Key coverage: Chipmakers lift capex guidance on accelerating AI server demand',
    ],
  },
  {
    term: 'RATE CUTS',
    momentum: 14.0,
    direction: 'flat',
    frequency: 5,
    headlines: [
      'Bond markets price in two cuts after dovish central bank remarks',
      'Tech valuations extend gains as yields cool on macro outlook',
    ],
    insight: [
      '2 mentions in the latest cycle versus 1 previously.',
      'Key coverage: Bond markets price in two cuts after dovish central bank remarks',
    ],
  },
  {
    term: 'BITCOIN ETF',
    momentum: 27.3,
    direction: 'up',
    frequency: 6,
    headlines: [
      'Spot bitcoin ETF inflows hit a weekly record as advisors rotate exposure',
      'Institutional demand for BTC-linked funds offsets miner selling pressure',
    ],
    insight: [
      '3 mentions in the latest cycle versus 1 previously.',
      'Key coverage: Spot bitcoin ETF inflows hit a weekly record as advisors rotate exposure',
    ],
  },
  {
    term: 'AI SAFETY',
    momentum: 18.1,
    direction: 'up',
    frequency: 4,
    headlines: [
      'US and EU regulators preview new guardrails for AI safety testing',
      'Model providers outline disclosure frameworks ahead of compliance deadlines',
    ],
    insight: [
      '2 mentions in the latest cycle versus 1 previously.',
      'Key coverage: US and EU regulators preview new guardrails for AI safety testing',
    ],
  },
];

export const sampleLookupSnapshots = {
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67342,
    change24h: 2.7,
    marketCap: '1.32T',
    summary:
      'Bitcoin extended gains above $67K as ETF inflows offset miner selling and implied volatility cooled across the curve.',
    sparkline: [64800, 65210, 65700, 66320, 66880, 67050, 67210, 67440, 67500, 67342],
  },
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3485,
    change24h: 1.9,
    marketCap: '418B',
    summary:
      'Ethereum tracked higher alongside L2 volumes with validators preparing for the next proto-danksharding upgrade.',
    sparkline: [3320, 3345, 3380, 3410, 3440, 3465, 3488, 3499, 3505, 3485],
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla',
    price: 198.12,
    change24h: -1.6,
    marketCap: '631B',
    summary:
      'Tesla eased after cautious delivery commentary, though AI driving initiatives and Dojo expansion remain central.',
    sparkline: [206, 204, 202, 201, 199, 198, 197, 196, 198, 198.12],
  },
};

export const sampleDigest = {
  wrapUp:
    'Markets stabilized as AI-heavy equities outperformed broader indices on renewed infrastructure spending guidance. Crypto rotation favored high-throughput chains while traders monitored macro catalysts.',
  highlights: [
    {
      title: 'Top Story',
      text: 'AI infrastructure leaders guided double-digit growth for accelerator sales, citing resilient multi-cloud demand.',
    },
    {
      title: 'Macro Pulse',
      text: 'Central bank speakers signaled flexibility on mid-year rate cuts, keeping volatility anchored across risk assets.',
    },
    {
      title: 'Deal Watch',
      text: 'Fintech incumbents continued an acquisition streak targeting AI-native personalization engines.',
    },
  ],
};
