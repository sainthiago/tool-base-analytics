'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, LineChart, DollarSign } from 'lucide-react'

interface PortfolioValuationProps {
  timeframe?: '1h' | '24h' | '7d' | '30d'
}

interface ValuationPoint {
  time: string
  value: number
  change: number
}

export function PortfolioValuation({ timeframe = '24h' }: PortfolioValuationProps) {
  const [data, setData] = useState<ValuationPoint[]>([])
  const [currentValue, setCurrentValue] = useState(0)
  const [totalChange, setTotalChange] = useState(0)
  const [totalChangeValue, setTotalChangeValue] = useState(0)

  useEffect(() => {
    const generateValuationData = () => {
      const baseValue = 32500 // Base portfolio value
      const points = timeframe === '1h' ? 12 : timeframe === '24h' ? 48 : timeframe === '7d' ? 168 : 720
      const interval = timeframe === '1h' ? 5 : timeframe === '24h' ? 30 : timeframe === '7d' ? 60 : 60
      const newData: ValuationPoint[] = []
      
      let currentVal = baseValue
      
      for (let i = 0; i < points; i++) {
        const volatility = 0.02 // 2% volatility
        const trend = Math.sin(i / 20) * 0.01 // Slight upward trend with waves
        const randomChange = (Math.random() - 0.5) * volatility
        
        currentVal = currentVal * (1 + trend + randomChange)
        
        const timeAgo = points - i
        let timeLabel: string
        
        if (timeframe === '1h') {
          timeLabel = new Date(Date.now() - timeAgo * interval * 60 * 1000).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        } else if (timeframe === '24h') {
          timeLabel = new Date(Date.now() - timeAgo * interval * 60 * 1000).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        } else if (timeframe === '7d') {
          const date = new Date(Date.now() - timeAgo * interval * 60 * 1000)
          timeLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        } else { // 30d
          const date = new Date(Date.now() - timeAgo * interval * 60 * 1000)
          timeLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }
        
        newData.push({
          time: timeLabel,
          value: Math.round(currentVal * 100) / 100,
          change: ((currentVal - baseValue) / baseValue) * 100
        })
      }
      
      setData(newData)
      setCurrentValue(newData[newData.length - 1].value)
      
      const startValue = newData[0].value
      const endValue = newData[newData.length - 1].value
      const changePercent = ((endValue - startValue) / startValue) * 100
      const changeValue = endValue - startValue
      
      setTotalChange(changePercent)
      setTotalChangeValue(changeValue)
    }

    generateValuationData()
    const interval = setInterval(generateValuationData, 5000)
    return () => clearInterval(interval)
  }, [timeframe])

  const formatValue = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const isPositive = totalChange >= 0

  const getTimeframeLabel = () => {
    switch (timeframe) {
      case '1h': return 'Last Hour'
      case '24h': return 'Last 24 Hours'
      case '7d': return 'Last 7 Days'
      case '30d': return 'Last 30 Days'
      default: return 'Last 24 Hours'
    }
  }

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <LineChart className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-900 dark:text-gray-100">
              Portfolio Valuation
            </span>
            <Badge variant="secondary" className="text-xs">
              {getTimeframeLabel()}
            </Badge>
          </CardTitle>
          <div className="text-right">
            <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {formatValue(currentValue)}
            </div>
            <div className="flex items-center gap-2">
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
                {isPositive ? '+' : ''}{totalChange.toFixed(2)}%
              </Badge>
              <span className={`text-sm font-medium ${
                isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {isPositive ? '+' : ''}{formatValue(totalChangeValue)}
              </span>
            </div>
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
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3 shadow-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {formatValue(payload[0].value as number)}
                        </p>
                        <p className={`text-sm ${
                          (payload[0].payload.change as number) >= 0 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {(payload[0].payload.change as number) >= 0 ? '+' : ''}
                          {(payload[0].payload.change as number).toFixed(2)}%
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
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
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Highest Value</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {formatValue(Math.max(...data.map(d => d.value)))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lowest Value</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {formatValue(Math.min(...data.map(d => d.value)))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Volatility</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {((Math.max(...data.map(d => d.value)) - Math.min(...data.map(d => d.value))) / Math.min(...data.map(d => d.value)) * 100).toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Analysis Summary */}
        <Card className={`mt-6 ${
          isPositive 
            ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20' 
            : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded ${
                isPositive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Portfolio Performance
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                  Over the {getTimeframeLabel().toLowerCase()}, your portfolio has {isPositive ? 'gained' : 'lost'} {formatValue(Math.abs(totalChangeValue))} 
                  ({Math.abs(totalChange).toFixed(2)}%). {isPositive 
                    ? 'This positive performance indicates strong market conditions for your holdings.'
                    : 'This temporary decline is normal in crypto markets and your diversified portfolio should recover.'
                  }
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Current: </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatValue(currentValue)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Change: </span>
                    <span className={`font-medium ${
                      isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {isPositive ? '+' : ''}{formatValue(totalChangeValue)}
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