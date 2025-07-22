export interface ComponentResult {
  component: string | null
  props: any
}

export function processNaturalLanguage(input: string): ComponentResult {
  const lowercaseInput = input.toLowerCase()

  // Chart patterns
  if (lowercaseInput.includes('chart') || lowercaseInput.includes('price') || lowercaseInput.includes('show me')) {
    const symbol = extractCryptoSymbol(lowercaseInput)
    return {
      component: 'price-chart',
      props: { symbol: symbol || 'BTC' }
    }
  }

  // Market indicator patterns
  if (lowercaseInput.includes('altseason') || lowercaseInput.includes('market') || lowercaseInput.includes('bull') || lowercaseInput.includes('bear')) {
    return {
      component: 'market-indicator',
      props: {}
    }
  }

  // Top gainers patterns
  if (lowercaseInput.includes('gainer') || lowercaseInput.includes('top') || lowercaseInput.includes('best') || lowercaseInput.includes('winner')) {
    const timeframe = extractTimeframe(lowercaseInput)
    return {
      component: 'top-gainers',
      props: { timeframe }
    }
  }

  // Default fallback
  return {
    component: 'price-chart',
    props: { symbol: 'BTC' }
  }
}

function extractCryptoSymbol(input: string): string | null {
  // Common crypto symbols and their variations
  const cryptoMap: { [key: string]: string } = {
    'bitcoin': 'BTC',
    'btc': 'BTC',
    'ethereum': 'ETH',
    'eth': 'ETH',
    'pepe': 'PEPE',
    'dogecoin': 'DOGE',
    'doge': 'DOGE',
    'shiba': 'SHIB',
    'shib': 'SHIB',
    'solana': 'SOL',
    'sol': 'SOL',
    'cardano': 'ADA',
    'ada': 'ADA',
    'polygon': 'MATIC',
    'matic': 'MATIC',
    'avalanche': 'AVAX',
    'avax': 'AVAX'
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
  if (input.includes('today') || input.includes('24h') || input.includes('daily')) {
    return '24h'
  }
  if (input.includes('week') || input.includes('7d')) {
    return '7d'
  }
  if (input.includes('month') || input.includes('30d')) {
    return '30d'
  }
  return '24h' // default
} 