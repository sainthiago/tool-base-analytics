'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

interface PriceChartProps {
  symbol?: string
}

export function PriceChart({ symbol = 'BTC' }: PriceChartProps) {
  const [data, setData] = useState<any[]>([])
  const [currentPrice, setCurrentPrice] = useState(0)
  const [priceChange, setPriceChange] = useState(0)

  useEffect(() => {
    // Generate mock data
    const generateData = () => {
      const basePrice = symbol === 'PEPE' ? 0.00000123 : symbol === 'ETH' ? 2450 : 43250
      const points = 48
      const newData = []
      
      for (let i = 0; i < points; i++) {
        const variation = (Math.random() - 0.5) * 0.1
        const price = basePrice * (1 + variation + (Math.sin(i / 10) * 0.05))
        newData.push({
          time: new Date(Date.now() - (points - i) * 30 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          price: price,
        })
      }
      
      setData(newData)
      setCurrentPrice(newData[newData.length - 1].price)
      
      const startPrice = newData[0].price
      const endPrice = newData[newData.length - 1].price
      setPriceChange(((endPrice - startPrice) / startPrice) * 100)
    }

    generateData()
    const interval = setInterval(generateData, 5000)
    return () => clearInterval(interval)
  }, [symbol])

  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return `$${price.toFixed(8)}`
    } else if (price < 1) {
      return `$${price.toFixed(4)}`
    } else if (price < 100) {
      return `$${price.toFixed(2)}`
    } else {
      return `$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    }
  }

  const isPositive = priceChange >= 0

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-900 dark:text-gray-100">
              {symbol} Price Chart
            </span>
          </CardTitle>
          <div className="text-right">
            <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {formatPrice(currentPrice)}
            </div>
            <Badge className={`${
              isPositive 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
              <XAxis
                dataKey="time"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6b7280' }}
                interval="preserveStartEnd"
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6b7280' }}
                tickFormatter={(value) => formatPrice(value)}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3 shadow-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {formatPrice(payload[0].value as number)}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#16a34a" : "#dc2626"}
                strokeWidth={2}
                fill={isPositive ? "#dcfce7" : "#fee2e2"}
                className={isPositive ? "dark:fill-green-900/20" : "dark:fill-red-900/20"}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">24h High</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {formatPrice(Math.max(...data.map(d => d.price)))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">24h Low</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {formatPrice(Math.min(...data.map(d => d.price)))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Volume</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              ${(Math.random() * 10 + 5).toFixed(1)}B
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 