'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { TrendingUp, Activity, Crown, Send, BarChart3, ArrowLeft, Wallet, LineChart, Target } from 'lucide-react'

import { PriceChart } from '@/components/dashboard/price-chart'
import { MarketIndicator } from '@/components/dashboard/market-indicator'
import { TopGainers } from '@/components/dashboard/top-gainers'
import { PortfolioHoldings } from '@/components/dashboard/portfolio-holdings'
import { PortfolioValuation } from '@/components/dashboard/portfolio-valuation'
import { PortfolioPerformance } from '@/components/dashboard/portfolio-performance'
import { processNaturalLanguage } from '@/lib/nl-processor'

type ViewState = 'dashboard' | 'analysis'

export default function Dashboard() {
  const [viewState, setViewState] = useState<ViewState>('dashboard')
  const [currentComponent, setCurrentComponent] = useState<string | null>(null)
  const [componentProps, setComponentProps] = useState<any>({})
  const [inputValue, setInputValue] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastQuery, setLastQuery] = useState('')

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isProcessing) return

    setIsProcessing(true)
    setLastQuery(inputValue)
    
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const result = processNaturalLanguage(inputValue)
    setCurrentComponent(result.component)
    setComponentProps(result.props)
    setViewState('analysis')
    setInputValue('')
    setIsProcessing(false)
  }

  const handleOptionSelect = (queryText: string) => {
    setLastQuery(queryText)
    const result = processNaturalLanguage(queryText)
    setCurrentComponent(result.component)
    setComponentProps(result.props)
    setViewState('analysis')
  }

  const handleBackToDashboard = () => {
    setViewState('dashboard')
    setCurrentComponent(null)
    setLastQuery('')
  }

  const quickTools = [
    { 
      id: 'portfolio-holdings',
      text: "What are my current holdings?", 
      icon: Wallet, 
      title: "My Holdings",
      subtitle: "Current portfolio",
      description: "View your complete cryptocurrency portfolio with current values and allocations"
    },
    { 
      id: 'portfolio-valuation',
      text: "Show me my portfolio valuation over 24hrs", 
      icon: LineChart, 
      title: "Portfolio Valuation",
      subtitle: "Value over time",
      description: "Track how your total portfolio value has changed over different time periods"
    },
    { 
      id: 'portfolio-performance',
      text: "How is my portfolio performing?", 
      icon: Target, 
      title: "Portfolio Performance",
      subtitle: "Gains & losses",
      description: "Analyze your portfolio's performance with detailed profit/loss metrics"
    }
  ]

  const getComponentTitle = () => {
    switch (currentComponent) {
      case 'portfolio-holdings':
        return 'My Holdings'
      case 'portfolio-valuation':
        return `Portfolio Valuation${componentProps.timeframe ? ` (${componentProps.timeframe})` : ''}`
      case 'portfolio-performance':
        return `Portfolio Performance${componentProps.timeframe ? ` (${componentProps.timeframe})` : ''}`
      case 'price-chart':
        return `Price Chart${componentProps.symbol ? ` - ${componentProps.symbol}` : ''}`
      case 'market-indicator':
        return 'Market Indicators'
      case 'top-gainers':
        return `Top Gainers${componentProps.timeframe ? ` (${componentProps.timeframe})` : ''}`
      default:
        return 'Analysis'
    }
  }

  const renderAnalysisView = () => {
    switch (currentComponent) {
      case 'portfolio-holdings':
        return <PortfolioHoldings {...componentProps} />
      case 'portfolio-valuation':
        return <PortfolioValuation {...componentProps} />
      case 'portfolio-performance':
        return <PortfolioPerformance {...componentProps} />
      case 'price-chart':
        return <PriceChart {...componentProps} />
      case 'market-indicator':
        return <MarketIndicator {...componentProps} />
      case 'top-gainers':
        return <TopGainers {...componentProps} />
      default:
        return (
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <BarChart3 className="h-12 w-12 mx-auto text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Analysis Not Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sorry, I couldn't understand that request. Try asking about your portfolio holdings, valuation, or performance.
              </p>
            </CardContent>
          </Card>
        )
    }
  }

  if (viewState === 'analysis') {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto p-6">
          {/* Analysis Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleBackToDashboard}
                  className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {getComponentTitle()}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Query: "{lastQuery}"
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Analysis Content */}
          {renderAnalysisView()}
        </div>
      </div>
    )
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Wallet className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  My Crypto Dashboard
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Track and analyze your cryptocurrency portfolio
              </p>
            </div>
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
          </div>

          {/* Main Search */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-6">
              <form onSubmit={handleInputSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    What would you like to know about your portfolio?
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ask about your holdings, performance, or any specific crypto analysis
                  </p>
                </div>
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="e.g., 'What are my current holdings?' or 'How is my portfolio performing?'"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 h-12 text-base border-gray-200 dark:border-gray-700"
                    disabled={isProcessing}
                  />
                  <Button 
                    type="submit" 
                    disabled={!inputValue.trim() || isProcessing}
                    className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Analyze
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Quick Portfolio Tools */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
              Portfolio Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Quick access to your most important portfolio insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickTools.map((tool, index) => (
              <Card 
                key={index}
                className="border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer group hover:shadow-md"
                onClick={() => handleOptionSelect(tool.text)}
              >
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <tool.icon className="h-6 w-6 text-blue-600 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        {tool.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {tool.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {tool.subtitle}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Portfolio Stats Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">$32.5K</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Portfolio Value</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">6</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Assets Held</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-green-600 dark:text-green-400">+12.4%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">24h Performance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 