'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

interface MarketData {
  altseasonScore: number
  bitcoinDominance: number
  marketSentiment: 'bullish' | 'bearish' | 'neutral'
  totalMarketCap: number
  fear_greed_index: number
}

export function MarketIndicator() {
  const [marketData, setMarketData] = useState<MarketData>({
    altseasonScore: 0,
    bitcoinDominance: 0,
    marketSentiment: 'neutral',
    totalMarketCap: 0,
    fear_greed_index: 0
  })

  useEffect(() => {
    const generateMarketData = (): MarketData => {
      const btcDominance = 40 + Math.random() * 25 // 40-65%
      const altseasonScore = Math.max(0, Math.min(100, (70 - btcDominance) * 2 + (Math.random() - 0.5) * 20))
      const fearGreedIndex = Math.random() * 100
      
      let sentiment: 'bullish' | 'bearish' | 'neutral' = 'neutral'
      if (fearGreedIndex > 60) sentiment = 'bullish'
      else if (fearGreedIndex < 40) sentiment = 'bearish'
      
      return {
        altseasonScore,
        bitcoinDominance: btcDominance,
        marketSentiment: sentiment,
        totalMarketCap: 2.1 + Math.random() * 0.8, // 2.1-2.9T
        fear_greed_index: fearGreedIndex
      }
    }

    setMarketData(generateMarketData())
    const interval = setInterval(() => setMarketData(generateMarketData()), 10000)
    return () => clearInterval(interval)
  }, [])

  const isAltseason = marketData.altseasonScore > 50

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <CardTitle className="flex items-center gap-3">
          <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="text-gray-900 dark:text-gray-100">Market Indicators</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Altseason Indicator */}
          <Card className={`${
            isAltseason 
              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20' 
              : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Altseason</span>
                <Badge className={`${
                  isAltseason 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {isAltseason ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Score</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {marketData.altseasonScore.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      isAltseason ? 'bg-green-600' : 'bg-gray-400'
                    }`}
                    style={{ width: `${marketData.altseasonScore}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bitcoin Dominance */}
          <Card className="border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">BTC Dominance</span>
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                  {marketData.bitcoinDominance.toFixed(1)}%
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-orange-600"
                    style={{ width: `${(marketData.bitcoinDominance / 70) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {marketData.bitcoinDominance < 45 ? 'Low dominance favors alts' : 'High dominance'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Market Sentiment */}
          <Card className="border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Sentiment</span>
                <Badge className={`${
                  marketData.marketSentiment === 'bullish' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : marketData.marketSentiment === 'bearish'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {marketData.marketSentiment === 'bullish' && <TrendingUp className="h-3 w-3 mr-1" />}
                  {marketData.marketSentiment === 'bearish' && <TrendingDown className="h-3 w-3 mr-1" />}
                  {marketData.marketSentiment.charAt(0).toUpperCase() + marketData.marketSentiment.slice(1)}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Market Cap</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    ${marketData.totalMarketCap.toFixed(1)}T
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fear & Greed Index */}
          <Card className="border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Fear & Greed</span>
                <Badge className={`${
                  marketData.fear_greed_index > 60
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : marketData.fear_greed_index < 40
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}>
                  {marketData.fear_greed_index > 60 ? 'Greed' : marketData.fear_greed_index < 40 ? 'Fear' : 'Neutral'}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Index</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {marketData.fear_greed_index.toFixed(0)}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      marketData.fear_greed_index > 60
                        ? 'bg-green-600'
                        : marketData.fear_greed_index < 40
                        ? 'bg-red-600'
                        : 'bg-yellow-600'
                    }`}
                    style={{ width: `${marketData.fear_greed_index}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Summary */}
        <Card className={`${
          isAltseason 
            ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20' 
            : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded ${
                isAltseason ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
              }`}>
                {isAltseason ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <Activity className="h-4 w-4" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {isAltseason ? 'Altseason is Active!' : 'Waiting for Altseason'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {isAltseason
                    ? 'Altcoins are outperforming Bitcoin significantly. This typically indicates strong momentum for alternative cryptocurrencies.'
                    : 'Bitcoin is maintaining strong market dominance. Altseason typically occurs when BTC dominance drops below 45% and altcoins start showing sustained outperformance.'
                  }
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Score: </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {marketData.altseasonScore.toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">BTC Dominance: </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {marketData.bitcoinDominance.toFixed(1)}%
                    </span>
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