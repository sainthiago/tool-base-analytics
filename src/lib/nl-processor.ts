export interface ComponentResult {
  component: string | null
  props: any
}

export function processNaturalLanguage(input: string): ComponentResult {
  const lowercaseInput = input.toLowerCase()

  // Portfolio holdings patterns
  if (lowercaseInput.includes('holdings') || lowercaseInput.includes('portfolio') || lowercaseInput.includes('my coins') || lowercaseInput.includes('what do i own')) {
    return {
      component: 'portfolio-holdings',
      props: {}
    }
  }

  // Portfolio valuation patterns
  if (lowercaseInput.includes('valuation') || lowercaseInput.includes('portfolio value') || lowercaseInput.includes('worth') || lowercaseInput.includes('total value')) {
    const timeframe = extractTimeframe(lowercaseInput)
    return {
      component: 'portfolio-valuation',
      props: { timeframe }
    }
  }

  // Portfolio performance patterns
  if (lowercaseInput.includes('performance') || lowercaseInput.includes('gains') || lowercaseInput.includes('losses') || lowercaseInput.includes('profit') || lowercaseInput.includes('pnl')) {
    const timeframe = extractTimeframe(lowercaseInput)
    return {
      component: 'portfolio-performance',
      props: { timeframe }
    }
  }

  // Chart patterns (for individual coins in portfolio)
  if (lowercaseInput.includes('chart') || lowercaseInput.includes('price') || lowercaseInput.includes('show me')) {
    const symbol = extractCryptoSymbol(lowercaseInput)
    return {
      component: 'price-chart',
      props: { symbol: symbol || 'BTC' }
    }
  }

  // Market indicator patterns
  if (lowercaseInput.includes('altseason') || lowercaseInput.includes('market') || lowercaseInput.includes('bull') || lowercaseInput.includes('bear') || lowercaseInput.includes('sentiment')) {
    return {
      component: 'market-indicator',
      props: {}
    }
  }

  // Default fallback
  return {
    component: null,
    props: {}
  }
}

function extractCryptoSymbol(input: string): string | null {
  // Common crypto symbols and their variations
  const cryptoMap: { [key: string]: string } = {
    'bitcoin': 'BTC',
    'btc': 'BTC',
    'ethereum': 'ETH',
    'eth': 'ETH',
    'solana': 'SOL',
    'sol': 'SOL',
    'cardano': 'ADA',
    'ada': 'ADA',
    'polygon': 'MATIC',
    'matic': 'MATIC',
    'chainlink': 'LINK',
    'link': 'LINK',
    'avalanche': 'AVAX',
    'avax': 'AVAX',
    'polkadot': 'DOT',
    'dot': 'DOT'
  }

  for (const [key, symbol] of Object.entries(cryptoMap)) {
    if (input.includes(key)) {
      return symbol
    }
  }

  // Try to extract uppercase symbols (like BTC, ETH, etc.)
  const upperMatch = input.match(/\b[A-Z]{2,5}\b/)
  if (upperMatch) {
    return upperMatch[0]
  }

  return null
}

function extractTimeframe(input: string): string {
  if (input.includes('hour') || input.includes('1h') || input.includes('hourly')) {
    return '1h'
  }
  if (input.includes('today') || input.includes('24h') || input.includes('daily') || input.includes('day')) {
    return '24h'
  }
  if (input.includes('week') || input.includes('7d') || input.includes('weekly')) {
    return '7d'
  }
  if (input.includes('month') || input.includes('30d') || input.includes('monthly')) {
    return '30d'
  }
  return '24h' // default
} 