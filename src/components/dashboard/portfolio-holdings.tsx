'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react'

interface Holding {
  symbol: string
  name: string
  amount: number
  price: number
  value: number
  change24h: number
  allocation: number
}

export function PortfolioHoldings() {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const [totalChange, setTotalChange] = useState(0)

  useEffect(() => {
    const generateHoldings = (): Holding[] => {
      const mockHoldings = [
        { symbol: 'BTC', name: 'Bitcoin', amount: 0.5, basePrice: 43250 },
        { symbol: 'ETH', name: 'Ethereum', amount: 2.8, basePrice: 2450 },
        { symbol: 'SOL', name: 'Solana', amount: 15, basePrice: 95 },
        { symbol: 'ADA', name: 'Cardano', amount: 1200, basePrice: 0.45 },
        { symbol: 'MATIC', name: 'Polygon', amount: 800, basePrice: 0.85 },
        { symbol: 'LINK', name: 'Chainlink', amount: 45, basePrice: 15.5 }
      ]

      const holdings = mockHoldings.map(holding => {
        const priceVariation = (Math.random() - 0.5) * 0.1
        const price = holding.basePrice * (1 + priceVariation)
        const change24h = (Math.random() - 0.5) * 20 // -10% to +10%
        const value = holding.amount * price

        return {
          ...holding,
          price,
          value,
          change24h,
          allocation: 0 // Will calculate below
        }
      })

      const total = holdings.reduce((sum, h) => sum + h.value, 0)
      
      // Calculate allocations
      holdings.forEach(holding => {
        holding.allocation = (holding.value / total) * 100
      })

      return holdings.sort((a, b) => b.value - a.value)
    }

    const updateHoldings = () => {
      const newHoldings = generateHoldings()
      setHoldings(newHoldings)
      
      const total = newHoldings.reduce((sum, h) => sum + h.value, 0)
      setTotalValue(total)
      
      const weightedChange = newHoldings.reduce((sum, h) => sum + (h.change24h * (h.value / total)), 0)
      setTotalChange(weightedChange)
    }

    updateHoldings()
    const interval = setInterval(updateHoldings, 8000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(4)}`
    } else {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }

  const formatValue = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatAmount = (amount: number) => {
    if (amount < 1) {
      return amount.toFixed(6)
    } else if (amount < 100) {
      return amount.toFixed(2)
    } else {
      return amount.toLocaleString(undefined, { maximumFractionDigits: 0 })
    }
  }

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <Wallet className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-900 dark:text-gray-100">My Portfolio</span>
          </CardTitle>
          <div className="text-right">
            <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {formatValue(totalValue)}
            </div>
            <Badge className={`${
              totalChange >= 0 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {totalChange >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}%
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {holdings.map((holding) => (
            <Card
              key={holding.symbol}
              className="border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                          {holding.symbol.substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {holding.symbol}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {holding.name}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {holding.allocation.toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{formatAmount(holding.amount)} {holding.symbol}</span>
                          <span>•</span>
                          <span>{formatPrice(holding.price)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {formatValue(holding.value)}
                    </div>
                    <Badge className={`${
                      holding.change24h >= 0 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {holding.change24h >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {holding.change24h >= 0 ? '+' : ''}{holding.change24h.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Portfolio Summary */}
        <Card className="mt-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-blue-600 text-white">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Portfolio Summary
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                  Your portfolio is well-diversified across {holdings.length} different cryptocurrencies.
                  {totalChange >= 0 
                    ? ` Your holdings are up ${totalChange.toFixed(2)}% today, showing strong performance.`
                    : ` Your holdings are down ${Math.abs(totalChange).toFixed(2)}% today, but this is normal market volatility.`
                  }
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Total Value: </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatValue(totalValue)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Assets: </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {holdings.length} coins
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Top Holding: </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {holdings[0]?.symbol} ({holdings[0]?.allocation.toFixed(1)}%)
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