'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Crown } from 'lucide-react'

interface TopGainersProps {
  timeframe?: '24h' | '7d' | '30d'
}

interface Coin {
  symbol: string
  name: string
  price: number
  change: number
  volume: number
  marketCap: number
}

export function TopGainers({ timeframe = '24h' }: TopGainersProps) {
  const [coins, setCoins] = useState<Coin[]>([])

  useEffect(() => {
    const generateCoins = (): Coin[] => {
      const coinData = [
        { symbol: 'PEPE', name: 'Pepe', basePrice: 0.00000123 },
        { symbol: 'SHIB', name: 'Shiba Inu', basePrice: 0.000008 },
        { symbol: 'DOGE', name: 'Dogecoin', basePrice: 0.08 },
        { symbol: 'WIF', name: 'Dogwifhat', basePrice: 2.45 },
        { symbol: 'FLOKI', name: 'Floki', basePrice: 0.00015 },
        { symbol: 'BONK', name: 'Bonk', basePrice: 0.000012 },
        { symbol: 'MEME', name: 'Memecoin', basePrice: 0.025 },
        { symbol: 'POPCAT', name: 'Popcat', basePrice: 1.2 }
      ]

      return coinData.map(coin => ({
        ...coin,
        price: coin.basePrice * (0.8 + Math.random() * 0.4),
        change: 5 + Math.random() * 45, // 5-50% gains
        volume: Math.random() * 500000000 + 100000000,
        marketCap: Math.random() * 5000000000 + 1000000000
      })).sort((a, b) => b.change - a.change)
    }

    setCoins(generateCoins())
    const interval = setInterval(() => setCoins(generateCoins()), 8000)
    return () => clearInterval(interval)
  }, [timeframe])

  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return `$${price.toFixed(8)}`
    } else if (price < 1) {
      return `$${price.toFixed(6)}`
    } else {
      return `$${price.toFixed(2)}`
    }
  }

  const formatVolume = (volume: number) => {
    if (volume > 1000000000) {
      return `$${(volume / 1000000000).toFixed(1)}B`
    } else if (volume > 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`
    } else {
      return `$${(volume / 1000).toFixed(1)}K`
    }
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap > 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(1)}B`
    } else {
      return `$${(marketCap / 1000000).toFixed(0)}M`
    }
  }

  const getRankBadge = (index: number) => {
    if (index === 0) return 'bg-yellow-600 text-white'
    if (index === 1) return 'bg-gray-500 text-white'
    if (index === 2) return 'bg-orange-600 text-white'
    return 'bg-gray-400 text-white'
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `#${index + 1}`
  }

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-900 dark:text-gray-100">Top Gainers</span>
            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
              {timeframe}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {coins.map((coin, index) => (
            <Card
              key={coin.symbol}
              className="border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getRankBadge(index)}`}>
                        {index < 3 ? getRankIcon(index) : `#${index + 1}`}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium text-gray-900 dark:text-gray-100">{coin.symbol}</span>
                        <span className="text-gray-600 dark:text-gray-400">{coin.name}</span>
                        {index < 3 && (
                          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 text-xs">
                            Hot
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <span>Vol:</span>
                          <span className="font-medium">{formatVolume(coin.volume)}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <span>Cap:</span>
                          <span className="font-medium">{formatMarketCap(coin.marketCap)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {formatPrice(coin.price)}
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{coin.change.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-green-600 text-white">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Market Analysis
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                  These are the top performing cryptocurrencies in the last {timeframe}.
                  High gains often indicate strong momentum but can also suggest increased volatility.
                  The current market shows {coins.filter(c => c.change > 20).length} coins with 20%+ gains, indicating strong bullish sentiment.
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Avg Gain: </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      +{((coins.reduce((acc, coin) => acc + coin.change, 0) / coins.length) || 0).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Best Performer: </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {coins[0]?.symbol} (+{coins[0]?.change.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Disclaimer:</strong> Always do your own research before making investment decisions. Past performance doesn't guarantee future results.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 