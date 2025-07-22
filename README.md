# Tool-Based Analytics - AI-Powered Crypto Analytics Tools

A Next.js 15 analytics platform that provides instant access to crypto market insights through both natural language queries and quick-select analytics tools. Instead of traditional chat interfaces, this platform renders visual analytics components directly based on user input.

## ✨ Features

- **Dual Input Methods**: Natural language processing + Quick-select analytics tools
- **Tool-Based Architecture**: Select from predefined analytics tools or describe what you need
- **Dynamic Component Rendering**: No chat interface - directly renders charts, indicators, and lists
- **Cryptocurrency Focus**: Built for crypto market data and analysis
- **Modern UI**: Built with Next.js 15, React 19, TypeScript, Tailwind CSS, and shadcn/ui
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Mock data with realistic fluctuations
- **AI-Powered Processing**: Intelligent query understanding and tool selection

## 🎯 How It Works

### Dual Interaction Methods

**1. Natural Language Input**
- Type any crypto-related query in plain English
- AI processes your request and selects the appropriate analytics tool
- Instant visual results without conversation

**2. Quick Analytics Tools**
- Three main analytics tools always available
- One-click access to common analysis types
- Visual indicators show which tool is currently active

### Example Queries & Tools

| Input Method | Query/Tool | Result |
|--------------|------------|--------|
| **Natural Language** | "Show me a chart for PEPE" | Renders an interactive price chart for PEPE |
| **Quick Tool** | Price Chart Tool | Displays default crypto price analysis |
| **Natural Language** | "Are we in altseason?" | Shows market indicators and altseason analysis |
| **Quick Tool** | Market Indicators Tool | Displays comprehensive market sentiment |
| **Natural Language** | "Top gainers today?" | Lists best performing cryptocurrencies |
| **Quick Tool** | Top Gainers Tool | Shows current market leaders |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ (required for Next.js 15)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tool-call-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
├── src/                     # Source directory (Next.js 15 convention)
│   ├── app/                 # Next.js 15 App Router
│   │   ├── globals.css      # Global styles with shadcn/ui variables
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Main analytics dashboard
│   ├── components/
│   │   ├── dashboard/       # Analytics tool components
│   │   │   ├── price-chart.tsx      # Interactive price charts
│   │   │   ├── market-indicator.tsx # Market sentiment & altseason detection
│   │   │   └── top-gainers.tsx      # Top performing cryptocurrencies
│   │   └── ui/              # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── badge.tsx
│   └── lib/
│       ├── utils.ts         # Utility functions
│       └── nl-processor.ts  # Natural language processing logic
├── public/                  # Static assets
├── next.config.js           # Next.js 15 configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🧠 Architecture Overview

### Tool-Based Approach

The platform is built around the concept of **analytics tools** rather than conversational AI:

1. **Tool Selection**: Users choose tools via quick-select cards or natural language
2. **Instant Results**: No back-and-forth - immediate visual analytics
3. **Always Available**: Core tools always visible for quick access
4. **AI Enhancement**: Natural language processing enhances tool selection

### Natural Language Processing

The `src/lib/nl-processor.ts` file maps natural language queries to analytics tools:

1. **Pattern Matching**: Analyzes input for keywords and patterns
2. **Tool Selection**: Determines which analytics tool to activate
3. **Parameter Extraction**: Extracts relevant parameters (crypto symbols, timeframes, etc.)
4. **Component Rendering**: Returns tool type and configuration for rendering

### Analytics Tools

**1. Price Chart Tool** (`price-chart`)
- Interactive price charts using Recharts
- Real-time price display with trend indicators
- Supports multiple cryptocurrency symbols
- 24h high/low and volume statistics

**2. Market Indicator Tool** (`market-indicator`)
- Bitcoin dominance tracking
- Altseason detection algorithm
- Fear & Greed Index simulation
- Market sentiment analysis
- Visual progress indicators and insights

**3. Top Gainers Tool** (`top-gainers`)
- Lists best performing cryptocurrencies
- Configurable timeframes (24h, 7d, 30d)
- Volume and market cap data
- Ranking system with visual indicators

## 🔧 Customization

### Adding New Analytics Tools

1. Create a new tool component in `src/components/dashboard/`
2. Add pattern matching logic in `src/lib/nl-processor.ts`
3. Update the tool rendering logic in `src/app/page.tsx`
4. Add a quick-select card to the tools section

### Extending Natural Language Processing

The NL processor uses pattern matching that can be extended by:

- Adding more keyword patterns for tool selection
- Implementing fuzzy matching algorithms
- Integrating with external NLP services (OpenAI, etc.)
- Adding context awareness between queries
- Supporting multi-language tool requests

### Data Sources

Currently uses mock data. To integrate real data:

1. Replace mock data generators with API calls
2. Add API route handlers in `src/app/api/`
3. Implement data caching and error handling
4. Consider rate limiting for external APIs
5. Popular crypto APIs: CoinGecko, CoinMarketCap, Binance

## 🎨 User Interface

### Design Philosophy
- **Tool-First**: Analytics tools are the primary interface
- **Instant Access**: No learning curve - tools are immediately accessible
- **Visual Feedback**: Clear indicators show which tool is active
- **Progressive Enhancement**: Works with or without natural language input

### UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) components:

- **Consistent Design System**: All tools follow the same design language
- **Dark Mode Support**: Built-in dark mode capabilities
- **Accessibility**: ARIA compliant components
- **Customizable**: Easy to theme and customize
- **Modern Animations**: Smooth transitions and micro-interactions

## 📱 Responsive Design

The analytics platform is fully responsive:

- **Mobile First**: Optimized for mobile devices
- **Flexible Layouts**: Tools adapt to different screen sizes
- **Touch Friendly**: Interactive elements sized for touch interfaces
- **Progressive Enhancement**: Works without JavaScript

## 🔮 Future Enhancements

- **Real API Integration**: Connect to live cryptocurrency APIs
- **Advanced AI**: LLM-powered natural language understanding
- **Voice Input**: Add speech-to-text capabilities for tool selection
- **More Analytics Tools**: Additional analysis types and data representations
- **User Preferences**: Save favorite tools and configurations
- **Real-time Updates**: WebSocket connections for live data
- **Export Features**: Save analytics results as images/PDFs
- **Portfolio Tools**: Personal portfolio analysis tools
- **Alert Tools**: Price and market alert systems
- **Historical Analysis**: Deep historical data analysis tools

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19
- **Language**: TypeScript 5.5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui + Radix UI
- **Charts**: Recharts 2.12
- **Icons**: Lucide React
- **Animations**: Tailwind CSS Animate

## 🌟 Next.js 15 Features Used

- **App Router**: Latest routing system with src/ directory structure
- **React 19 Support**: Cutting-edge React features
- **Improved Performance**: Faster builds and runtime
- **Enhanced TypeScript**: Better type safety
- **Modern ESLint**: Latest linting rules
- **Optimized Font Loading**: Automatic font optimization

## 📄 License

MIT License - feel free to use this project as a starting point for your own analytics applications.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test tools in different screen sizes
4. Update documentation for new tools
5. Use semantic commit messages
6. Follow the src/ directory structure
7. Maintain the tool-based architecture philosophy
