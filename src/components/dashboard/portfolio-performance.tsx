'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Target, AlertTriangle, Star } from 'lucide-react'

interface PortfolioPerformanceProps {
  timeframe?: '1h' | '24h' | '7d' | '30d'
}

interface PerformanceData {
  symbol: string
  name: string
  value: number
  change: number
  changeValue: number
  allocation: number
}

interface OverallMetrics {
  totalValue: number
  totalChange: number
  totalChangeValue: number
  bestPerformer: PerformanceData | null
  worstPerformer: PerformanceData | null
  positiveAssets: number
  totalAssets: number
}

export function PortfolioPerformance({ timeframe = '24h' }: PortfolioPerformanceProps) {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [metrics, setMetrics] = useState<OverallMetrics>({
    totalValue: 0,
    totalChange: 0,
    totalChangeValue: 0,
    bestPerformer: null,
    worstPerformer: null,
    positiveAssets: 0,
    totalAssets: 0
  })

  useEffect(() => {
    const generatePerformanceData = () => {
      const holdings = [
        { symbol: 'BTC', name: 'Bitcoin', value: 21625, allocation: 66.5 },
        { symbol: 'ETH', name: 'Ethereum', value: 6860, allocation: 21.1 },
        { symbol: 'SOL', name: 'Solana', value: 1425, allocation: 4.4 },
        { symbol: 'ADA', name: 'Cardano', value: 540, allocation: 1.7 },
        { symbol: 'MATIC', name: 'Polygon', value: 680, allocation: 2.1 },
        { symbol: 'LINK', name: 'Chainlink', value: 697.5, allocation: 2.1 }
      ]

      const performance = holdings.map(holding => {
        // Generate different change ranges based on timeframe
        let changeRange = 0.1 // 10% for 24h
        if (timeframe === '1h') changeRange = 0.03 // 3% for 1h
        if (timeframe === '7d') changeRange = 0.25 // 25% for 7d
        if (timeframe === '30d') changeRange = 0.5 // 50% for 30d

        const change = (Math.random() - 0.5) * changeRange * 2
        const changeValue = holding.value * change

        return {
          ...holding,
          change: change * 100,
          changeValue
        }
      })

      const totalValue = performance.reduce((sum, p) => sum + p.value, 0)
      const totalChangeValue = performance.reduce((sum, p) => sum + p.changeValue, 0)
      const totalChange = (totalChangeValue / (totalValue - totalChangeValue)) * 100

      const positiveAssets = performance.filter(p => p.change > 0).length
      const sortedByChange = [...performance].sort((a, b) => b.change - a.change)

      setPerformanceData(performance)
      setMetrics({
        totalValue,
        totalChange,
        totalChangeValue,
        bestPerformer: sortedByChange[0],
        worstPerformer: sortedByChange[sortedByChange.length - 1],
        positiveAssets,
        totalAssets: performance.length
      })
    }

    generatePerformanceData()
    const interval = setInterval(generatePerformanceData, 10000)
    return () => clearInterval(interval)
  }, [timeframe])

  const formatValue = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const getTimeframeLabel = () => {
    switch (timeframe) {
      case '1h': return 'Last Hour'
      case '24h': return 'Last 24 Hours'
      case '7d': return 'Last 7 Days'
      case '30d': return 'Last 30 Days'
      default: return 'Last 24 Hours'
    }
  }

  const getPerformanceLevel = () => {
    if (metrics.totalChange > 5) return { label: 'Excellent', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/20' }
    if (metrics.totalChange > 0) return { label: 'Good', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/20' }
    if (metrics.totalChange > -5) return { label: 'Fair', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/20' }
    return { label: 'Needs Attention', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/20' }
  }

  const performance = getPerformanceLevel()

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <Target className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-900 dark:text-gray-100">Portfolio Performance</span>
            <Badge variant="secondary" className="text-xs">
              {getTimeframeLabel()}
            </Badge>
          </CardTitle>
          <div className="text-right">
            <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {formatValue(metrics.totalValue)}
            </div>
            <Badge className={`${
              metrics.totalChange >= 0 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {metrics.totalChange >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {metrics.totalChange >= 0 ? '+' : ''}{metrics.totalChange.toFixed(2)}%
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className={`border ${performance.bg} border-gray-200 dark:border-gray-700`}>
            <CardContent className="p-4 text-center">
              <div className="mb-2">
                <Target className={`h-8 w-8 mx-auto ${performance.color}`} />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                Overall Performance
              </h4>
              <p className={`text-sm font-medium ${performance.color}`}>
                {performance.label}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="mb-2">
                <Star className="h-8 w-8 mx-auto text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                Assets in Profit
              </h4>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                {metrics.positiveAssets} of {metrics.totalAssets}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="mb-2">
                <AlertTriangle className="h-8 w-8 mx-auto text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                Total P&L
              </h4>
              <p className={`text-sm font-medium ${
                metrics.totalChangeValue >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {metrics.totalChangeValue >= 0 ? '+' : ''}{formatValue(metrics.totalChangeValue)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Individual Asset Performance */}
        <div className="space-y-3 mb-6">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">Asset Performance</h4>
          {performanceData
            .sort((a, b) => b.change - a.change)
            .map((asset) => (
              <Card
                key={asset.symbol}
                className="border border-gray-200 dark:border-gray-700"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          asset.change >= 0 
                            ? 'bg-green-100 dark:bg-green-900/20' 
                            : 'bg-red-100 dark:bg-red-900/20'
                        }`}>
                          <span className={`font-medium text-sm ${
                            asset.change >= 0 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {asset.symbol.substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {asset.symbol}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                              {asset.name}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {asset.allocation.toFixed(1)}%
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Value: {formatValue(asset.value)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`font-medium mb-1 ${
                        asset.changeValue >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {asset.changeValue >= 0 ? '+' : ''}{formatValue(asset.changeValue)}
                      </div>
                      <Badge className={`${
                        asset.change >= 0 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {asset.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Performance Summary */}
        {metrics.bestPerformer && metrics.worstPerformer && (
          <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-blue-600 text-white">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Performance Analysis
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    Your portfolio has {metrics.totalChange >= 0 ? 'gained' : 'lost'} {formatValue(Math.abs(metrics.totalChangeValue))} 
                    over the {getTimeframeLabel().toLowerCase()}. 
                    Your best performer is {metrics.bestPerformer.symbol} (+{metrics.bestPerformer.change.toFixed(2)}%) 
                    while {metrics.worstPerformer.symbol} is down {Math.abs(metrics.worstPerformer.change).toFixed(2)}%.
                  </p>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Best: </span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {metrics.bestPerformer.symbol} (+{metrics.bestPerformer.change.toFixed(2)}%)
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Worst: </span>
                      <span className="font-medium text-red-600 dark:text-red-400">
                        {metrics.worstPerformer.symbol} ({metrics.worstPerformer.change.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
} 