'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Crown, Star, Sparkles, BarChart3, Clock } from 'lucide-react'

interface TopGainersProps {
  timeframe?: string
}

interface CoinData {
  symbol: string
  name: string
  price: number
  change: number
  volume: number
  marketCap: number
  rank: number
}

export function TopGainers({ timeframe = '24h' }: TopGainersProps) {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data generator - in a real app, this would fetch from an API
    const generateMockCoins = (): CoinData[] => {
      const coinList = [
        { symbol: 'PEPE', name: 'Pepe', basePrice: 0.000001, emoji: '🐸' },
        { symbol: 'SHIB', name: 'Shiba Inu', basePrice: 0.000008, emoji: '🐕' },
        { symbol: 'DOGE', name: 'Dogecoin', basePrice: 0.08, emoji: '🐕' },
        { symbol: 'SOL', name: 'Solana', basePrice: 95, emoji: '☀️' },
        { symbol: 'ADA', name: 'Cardano', basePrice: 0.45, emoji: '🔷' },
        { symbol: 'MATIC', name: 'Polygon', basePrice: 0.85, emoji: '🔮' },
        { symbol: 'AVAX', name: 'Avalanche', basePrice: 38, emoji: '🏔️' },
        { symbol: 'DOT', name: 'Polkadot', basePrice: 7.2, emoji: '⚪' },
        { symbol: 'LINK', name: 'Chainlink', basePrice: 15.5, emoji: '🔗' },
        { symbol: 'UNI', name: 'Uniswap', basePrice: 6.8, emoji: '🦄' }
      ]

      return coinList
        .map((coin, index) => {
          // Generate higher gains for demonstration
          const change = 5 + Math.random() * 45 // 5-50% gains
          const price = coin.basePrice * (1 + (Math.random() - 0.3) * 0.1)
          const volume = Math.floor(Math.random() * 500000000) + 10000000
          const marketCap = Math.floor(Math.random() * 50000000000) + 1000000000

          return {
            symbol: coin.symbol,
            name: coin.name,
            price,
            change,
            volume,
            marketCap,
            rank: index + 1,
            emoji: coin.emoji
          }
        })
        .sort((a, b) => b.change - a.change) // Sort by highest gains
        .slice(0, 10) // Top 10
    }

    setTimeout(() => {
      setCoins(generateMockCoins())
      setLoading(false)
    }, 1000)
  }, [timeframe])

  const formatPrice = (price: number): string => {
    if (price < 0.01) {
      return `$${price.toFixed(8)}`
    } else if (price < 1) {
      return `$${price.toFixed(6)}`
    } else {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }

  const formatMarketCap = (marketCap: number): string => {
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(1)}B`
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(1)}M`
    } else {
      return `$${(marketCap / 1e3).toFixed(1)}K`
    }
  }

  const formatVolume = (volume: number): string => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(1)}B`
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(1)}M`
    } else {
      return `$${(volume / 1e3).toFixed(1)}K`
    }
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="h-5 w-5 text-yellow-500" />
      case 1: return <Star className="h-5 w-5 text-gray-400" />
      case 2: return <Star className="h-5 w-5 text-amber-600" />
      default: return null
    }
  }

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-yellow-500 to-amber-600'
      case 1: return 'bg-gradient-to-r from-gray-400 to-gray-500'
      case 2: return 'bg-gradient-to-r from-amber-600 to-orange-600'
      default: return 'bg-gradient-to-r from-blue-500 to-purple-600'
    }
  }

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600">
              <Crown className="h-5 w-5 text-white" />
            </div>
            Top Gainers ({timeframe})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 mb-4 animate-pulse">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">Loading top gainers...</p>
              <p className="text-sm text-muted-foreground">Scanning the markets</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-b">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              Top Gainers
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {timeframe}
              </Badge>
            </div>
          </div>
          <Badge className="ml-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <Sparkles className="h-3 w-3 mr-1" />
            Hot Picks
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {coins.map((coin, index) => (
            <Card 
              key={coin.symbol}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:scale-[1.02]"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getRankBadge(index)} flex items-center justify-center text-white font-bold shadow-lg`}>
                        {index < 3 ? getRankIcon(index) : `#${index + 1}`}
                      </div>
                      <div className="text-2xl">
                        {(coin as any).emoji}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-lg font-bold">{coin.symbol}</span>
                        <span className="text-muted-foreground">{coin.name}</span>
                        {index < 3 && (
                          <Badge variant="outline" className="text-xs">
                            🔥 Trending
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                    <div className="text-xl font-bold mb-2">{formatPrice(coin.price)}</div>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +{coin.change.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Market Analysis
                </h4>
                <p className="text-white/90 leading-relaxed mb-4">
                  These are the top performing cryptocurrencies in the last {timeframe}. 
                  High gains often indicate strong momentum but can also suggest increased volatility. 
                  The current market shows {coins.filter(c => c.change > 20).length} coins with 20%+ gains, indicating strong bullish sentiment.
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="opacity-75">Avg Gain: </span>
                    <span className="font-bold">+{(coins.reduce((acc, coin) => acc + coin.change, 0) / coins.length).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="opacity-75">Best Performer: </span>
                    <span className="font-bold">{coins[0]?.symbol} (+{coins[0]?.change.toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <strong>Disclaimer:</strong> Always do your own research before making investment decisions. Past performance doesn't guarantee future results.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 