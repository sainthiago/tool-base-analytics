'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { TrendingUp, Activity, Crown, Send, BarChart3 } from 'lucide-react'

import { PriceChart } from '@/components/dashboard/price-chart'
import { MarketIndicator } from '@/components/dashboard/market-indicator'
import { TopGainers } from '@/components/dashboard/top-gainers'
import { processNaturalLanguage } from '@/lib/nl-processor'

export default function Dashboard() {
  const [currentComponent, setCurrentComponent] = useState<string | null>(null)
  const [componentProps, setComponentProps] = useState<any>({})
  const [inputValue, setInputValue] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isProcessing) return

    setIsProcessing(true)
    
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const result = processNaturalLanguage(inputValue)
    setCurrentComponent(result.component)
    setComponentProps(result.props)
    setInputValue('')
    setIsProcessing(false)
  }

  const handleOptionSelect = (queryText: string) => {
    const result = processNaturalLanguage(queryText)
    setCurrentComponent(result.component)
    setComponentProps(result.props)
  }

  const exampleQueries = [
    { 
      id: 'price-chart',
      text: "Show me a chart for PEPE", 
      icon: TrendingUp, 
      description: "Price Chart",
      subtitle: "Crypto price analysis"
    },
    { 
      id: 'market-indicator',
      text: "Are we in altseason?", 
      icon: Activity, 
      description: "Market Indicators",
      subtitle: "Sentiment & altseason"
    },
    { 
      id: 'top-gainers',
      text: "Top gainers today?", 
      icon: Crown, 
      description: "Top Gainers",
      subtitle: "Best performers"
    }
  ]

  const renderComponent = () => {
    switch (currentComponent) {
      case 'price-chart':
        return (
          <div className="mt-6">
            <PriceChart {...componentProps} />
          </div>
        )
      case 'market-indicator':
        return (
          <div className="mt-6">
            <MarketIndicator {...componentProps} />
          </div>
        )
      case 'top-gainers':
        return (
          <div className="mt-6">
            <TopGainers {...componentProps} />
          </div>
        )
      default:
        return (
          <div className="mt-6">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Welcome to Tool-Based Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Type your request above or select an analytics tool to get started.
                </p>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Tool-Based Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                AI-powered crypto analytics tools
              </p>
            </div>
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Natural Language Input */}
        <Card className="mb-6 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <form onSubmit={handleInputSubmit} className="flex gap-3">
              <Input
                type="text"
                placeholder="Ask for any crypto analysis..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border-gray-200 dark:border-gray-700"
                disabled={isProcessing}
              />
              <Button 
                type="submit" 
                disabled={!inputValue.trim() || isProcessing}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Analyze
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Tools */}
        <Card className="mb-6 border border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Quick Analytics Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {exampleQueries.map((query, index) => {
                const isSelected = currentComponent === query.id
                return (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-colors ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-500' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleOptionSelect(query.text)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${
                          isSelected 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                          <query.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className={`font-medium text-sm ${
                            isSelected 
                              ? 'text-blue-700 dark:text-blue-300' 
                              : 'text-gray-900 dark:text-gray-100'
                          }`}>
                            {query.description}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {query.subtitle}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {renderComponent()}
      </div>
    </div>
  )
} 