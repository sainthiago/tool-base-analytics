'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Activity, AlertTriangle, Target, Gauge } from 'lucide-react'

interface MarketData {
  bitcoinDominance: number
  altcoinIndex: number
  marketSentiment: 'bullish' | 'bearish' | 'neutral'
  altseasonScore: number
  totalMarketCap: number
  fear_greed_index: number
}

export function MarketIndicator() {
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock market data - in a real app, this would fetch from an API
    const generateMockMarketData = (): MarketData => {
      const btcDominance = 40 + Math.random() * 20 // 40-60%
      const altcoinIndex = Math.random() * 100
      const fearGreedIndex = Math.random() * 100
      
      let sentiment: 'bullish' | 'bearish' | 'neutral' = 'neutral'
      if (fearGreedIndex > 70) sentiment = 'bullish'
      else if (fearGreedIndex < 30) sentiment = 'bearish'

      const altseasonScore = btcDominance < 45 ? 75 + Math.random() * 25 : Math.random() * 50

      return {
        bitcoinDominance: Math.round(btcDominance * 100) / 100,
        altcoinIndex: Math.round(altcoinIndex * 100) / 100,
        marketSentiment: sentiment,
        altseasonScore: Math.round(altseasonScore * 100) / 100,
        totalMarketCap: 1.8 + Math.random() * 0.5, // 1.8-2.3T
        fear_greed_index: Math.round(fearGreedIndex * 100) / 100
      }
    }

    setTimeout(() => {
      setMarketData(generateMockMarketData())
      setLoading(false)
    }, 1200)
  }, [])

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
              <Activity className="h-5 w-5 text-white" />
            </div>
            Market Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 mb-4 animate-pulse">
                <Gauge className="h-8 w-8 text-white" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">Analyzing market data...</p>
              <p className="text-sm text-muted-foreground">Processing sentiment signals</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!marketData) return null

  const isAltseason = marketData.altseasonScore > 60
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'from-green-500 to-emerald-600'
      case 'bearish': return 'from-red-500 to-rose-600'
      default: return 'from-yellow-500 to-amber-600'
    }
  }

  const getFearGreedLevel = (index: number) => {
    if (index < 25) return { label: 'Extreme Fear', color: 'from-red-600 to-red-700', bgColor: 'bg-red-50 dark:bg-red-900/20' }
    if (index < 45) return { label: 'Fear', color: 'from-red-400 to-red-500', bgColor: 'bg-red-50 dark:bg-red-900/20' }
    if (index < 55) return { label: 'Neutral', color: 'from-yellow-500 to-amber-600', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' }
    if (index < 75) return { label: 'Greed', color: 'from-green-400 to-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' }
    return { label: 'Extreme Greed', color: 'from-green-600 to-green-700', bgColor: 'bg-green-50 dark:bg-green-900/20' }
  }

  const fearGreed = getFearGreedLevel(marketData.fear_greed_index)

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg">
            <Activity className="h-6 w-6 text-white" />
          </div>
          Market Indicators
          <Badge variant="outline" className="ml-auto">
            <Target className="h-3 w-3 mr-1" />
            Live Analysis
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Altseason Indicator */}
          <Card className={`${isAltseason ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-800/50'} transition-all duration-300`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Altseason</span>
                <Badge className={`${isAltseason ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-500'} text-white shadow-lg`}>
                  {isAltseason ? '🚀 Active' : '⏳ Inactive'}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Score</span>
                  <span className="font-bold">{marketData.altseasonScore.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 bg-gradient-to-r ${
                      isAltseason ? 'from-green-500 to-emerald-600' : 'from-yellow-500 to-amber-600'
                    }`}
                    style={{ width: `${marketData.altseasonScore}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bitcoin Dominance */}
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">BTC Dominance</span>
                <Badge className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">
                  {marketData.bitcoinDominance.toFixed(1)}%
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 transition-all duration-1000"
                    style={{ width: `${(marketData.bitcoinDominance / 70) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {marketData.bitcoinDominance < 45 ? '📉 Low dominance favors alts' : '📈 High dominance'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Market Sentiment */}
          <Card className={`bg-gradient-to-br ${fearGreed.bgColor} transition-all duration-300`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Sentiment</span>
                <Badge className={`bg-gradient-to-r ${getSentimentColor(marketData.marketSentiment)} text-white shadow-lg`}>
                  {marketData.marketSentiment === 'bullish' && <TrendingUp className="h-3 w-3 mr-1" />}
                  {marketData.marketSentiment === 'bearish' && <TrendingDown className="h-3 w-3 mr-1" />}
                  {marketData.marketSentiment === 'neutral' && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {marketData.marketSentiment.charAt(0).toUpperCase() + marketData.marketSentiment.slice(1)}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Market Cap</span>
                  <span className="font-bold">${marketData.totalMarketCap.toFixed(1)}T</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fear & Greed Index */}
          <Card className={`bg-gradient-to-br ${fearGreed.bgColor} transition-all duration-300`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Fear & Greed</span>
                <Badge className={`bg-gradient-to-r ${fearGreed.color} text-white shadow-lg`}>
                  {fearGreed.label}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Index</span>
                  <span className="font-bold">{marketData.fear_greed_index.toFixed(0)}/100</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${fearGreed.color} transition-all duration-1000`}
                    style={{ width: `${marketData.fear_greed_index}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Altseason Analysis */}
        <Card className={`${isAltseason ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} text-white overflow-hidden relative`}>
          <div className="absolute inset-0 bg-black/10" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                {isAltseason ? (
                  <TrendingUp className="h-6 w-6" />
                ) : (
                  <AlertTriangle className="h-6 w-6" />
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">
                  {isAltseason ? '🚀 Altseason is Active!' : '⏳ Waiting for Altseason'}
                </h4>
                <p className="text-white/90 leading-relaxed">
                  {isAltseason 
                    ? 'Altcoins are outperforming Bitcoin significantly. This typically indicates strong momentum for alternative cryptocurrencies. Consider diversifying into promising altcoin projects.'
                    : 'Bitcoin is maintaining strong market dominance. Altseason typically occurs when BTC dominance drops below 45% and altcoins start showing sustained outperformance. Monitor the dominance trend closely.'
                  }
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="text-sm">
                    <span className="opacity-75">Current Score: </span>
                    <span className="font-bold">{marketData.altseasonScore.toFixed(1)}%</span>
                  </div>
                  <div className="text-sm">
                    <span className="opacity-75">BTC Dominance: </span>
                    <span className="font-bold">{marketData.bitcoinDominance.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
} 