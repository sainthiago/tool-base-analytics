'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { TrendingUp, TrendingDown, BarChart3, Clock, DollarSign } from 'lucide-react'

interface PriceChartProps {
  symbol: string
}

interface PriceData {
  time: string
  price: number
  volume: number
}

export function PriceChart({ symbol }: PriceChartProps) {
  const [data, setData] = useState<PriceData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [priceChange, setPriceChange] = useState(0)

  // Mock data generator - in a real app, this would fetch from an API
  useEffect(() => {
    const generateMockData = () => {
      const basePrice = getBasePriceForSymbol(symbol)
      const mockData: PriceData[] = []
      let price = basePrice

      for (let i = 48; i >= 0; i--) {
        const date = new Date()
        date.setHours(date.getHours() - i)
        
        // More realistic price fluctuation
        const volatility = symbol === 'PEPE' ? 0.15 : symbol === 'BTC' ? 0.03 : 0.08
        price = price * (1 + (Math.random() - 0.5) * volatility)
        
        mockData.push({
          time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          price: Math.round(price * 1000000) / 1000000,
          volume: Math.floor(Math.random() * 1000000000) + 100000000
        })
      }

      setData(mockData)
      setCurrentPrice(mockData[mockData.length - 1].price)
      setPriceChange(((mockData[mockData.length - 1].price - mockData[0].price) / mockData[0].price) * 100)
      setLoading(false)
    }

    setTimeout(() => generateMockData(), 800)
  }, [symbol])

  const getBasePriceForSymbol = (symbol: string): number => {
    const prices: { [key: string]: number } = {
      'BTC': 45000,
      'ETH': 2800,
      'PEPE': 0.000001,
      'DOGE': 0.08,
      'SOL': 95,
      'ADA': 0.45,
      'MATIC': 0.85,
      'AVAX': 38
    }
    return prices[symbol] || 100
  }

  const formatPrice = (price: number): string => {
    if (price < 0.01) {
      return `$${price.toFixed(8)}`
    } else if (price < 1) {
      return `$${price.toFixed(6)}`
    } else {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            Price Chart - {symbol}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4 animate-pulse">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">Loading chart data...</p>
              <p className="text-sm text-muted-foreground">Fetching real-time prices</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isPositive = priceChange >= 0

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                Price Chart - {symbol}
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  48H
                </Badge>
              </div>
            </div>
          </CardTitle>
          <div className="text-right">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <span className="text-3xl font-bold">
                {formatPrice(currentPrice)}
              </span>
            </div>
            <Badge 
              className={`${
                isPositive 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                  : 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
              } shadow-lg`}
            >
              {isPositive ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={isPositive ? "#10b981" : "#ef4444"} 
                    stopOpacity={0.3}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={isPositive ? "#10b981" : "#ef4444"} 
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
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
                domain={['dataMin - dataMin * 0.001', 'dataMax + dataMax * 0.001']}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${isPositive ? 'from-green-500 to-emerald-600' : 'from-red-500 to-rose-600'}`} />
                          <span className="text-lg font-bold">
                            {formatPrice(payload[0].value as number)}
                          </span>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#10b981" : "#ef4444"}
                strokeWidth={3}
                fill={`url(#gradient-${symbol})`}
                dot={false}
                activeDot={{ 
                  r: 6, 
                  fill: isPositive ? "#10b981" : "#ef4444",
                  stroke: "#fff",
                  strokeWidth: 2
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">24h High</p>
            <p className="font-bold text-green-600">
              {formatPrice(Math.max(...data.map(d => d.price)))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">24h Low</p>
            <p className="font-bold text-red-600">
              {formatPrice(Math.min(...data.map(d => d.price)))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Volume</p>
            <p className="font-bold">
              ${(data[data.length - 1]?.volume / 1e9).toFixed(2)}B
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 