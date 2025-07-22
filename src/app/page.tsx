'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sparkles, TrendingUp, Activity, Crown, Zap, Brain, ChevronRight, Send, Lightbulb } from 'lucide-react'

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
      gradient: "from-green-500 to-emerald-600",
      description: "Price Chart",
      subtitle: "Crypto price analysis"
    },
    { 
      id: 'market-indicator',
      text: "Are we in altseason?", 
      icon: Activity, 
      gradient: "from-blue-500 to-cyan-600",
      description: "Market Indicators",
      subtitle: "Sentiment & altseason"
    },
    { 
      id: 'top-gainers',
      text: "Top gainers today?", 
      icon: Crown, 
      gradient: "from-amber-500 to-orange-600",
      description: "Top Gainers",
      subtitle: "Best performers"
    }
  ]

  const renderComponent = () => {
    switch (currentComponent) {
      case 'price-chart':
        return (
          <div className="animate-slide-up">
            <PriceChart {...componentProps} />
          </div>
        )
      case 'market-indicator':
        return (
          <div className="animate-slide-up">
            <MarketIndicator {...componentProps} />
          </div>
        )
      case 'top-gainers':
        return (
          <div className="animate-slide-up">
            <TopGainers {...componentProps} />
          </div>
        )
      default:
        return (
          <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center max-w-xl mx-auto">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-3">
                  Welcome to Tool-Based Analytics
                </h3>
                <p className="text-muted-foreground mb-6">
                  Type your request above or select an analytics tool to explore real-time crypto market data and insights.
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { icon: Zap, label: "Instant", color: "text-yellow-500" },
                    { icon: Brain, label: "AI Powered", color: "text-purple-500" },
                    { icon: TrendingUp, label: "Real-time", color: "text-green-500" },
                    { icon: Activity, label: "Insights", color: "text-blue-500" }
                  ].map((feature, index) => (
                    <div key={index} className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-700/50 border">
                      <feature.icon className={`h-5 w-5 ${feature.color} mb-1`} />
                      <span className="text-xs font-medium text-muted-foreground">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] pointer-events-none" />
      
      <div className="relative container mx-auto p-4">
        {/* Compact Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 mb-3 shadow-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
            Tool-Based Analytics
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-powered crypto analytics tools
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse" />
              Live
            </Badge>
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              <Sparkles className="h-3 w-3 mr-1" />
              AI
            </Badge>
          </div>
        </div>

        {/* Natural Language Input */}
        <Card className="mb-4 border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <form onSubmit={handleInputSubmit} className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Ask for any crypto analysis... (e.g., 'Show me Bitcoin trends' or 'What's happening with DeFi?')"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="pr-12 h-12 text-base border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800"
                  disabled={isProcessing}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Brain className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={!inputValue.trim() || isProcessing}
                className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg disabled:opacity-50"
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

        {/* Quick Suggestions */}
        <Card className="mb-4 border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-lg text-center flex items-center justify-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Quick Analytics Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {exampleQueries.map((query, index) => {
                const isSelected = currentComponent === query.id
                return (
                  <Card 
                    key={index}
                    className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border relative overflow-hidden ${
                      isSelected 
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 shadow-md' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900'
                    }`}
                    onClick={() => handleOptionSelect(query.text)}
                  >
                    {/* Selected indicator */}
                    {isSelected && (
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${query.gradient}`} />
                    )}
                    
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r ${query.gradient} shadow-sm transition-transform duration-300 ${
                          isSelected ? 'scale-110' : 'group-hover:scale-105'
                        }`}>
                          <query.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-sm transition-colors duration-300 ${
                            isSelected 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
                          }`}>
                            {query.description}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {query.subtitle}
                          </p>
                        </div>
                        <div className={`text-blue-600 dark:text-blue-400 transition-transform duration-300 ${
                          isSelected ? 'translate-x-0.5' : 'group-hover:translate-x-0.5'
                        }`}>
                          <ChevronRight className="h-3 w-3" />
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
        <div className="space-y-4">
          {renderComponent()}
        </div>
      </div>
    </div>
  )
} 