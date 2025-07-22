# NL Dashboard - Natural Language Powered UI Dashboard

A Next.js 15 dashboard that transforms natural language input into visual cryptocurrency data components. Instead of traditional chat interfaces, this dashboard renders visual components directly based on user queries.

## ✨ Features

- **Natural Language Processing**: Transform text queries into visual components
- **Dynamic Component Rendering**: No chat interface - directly renders charts, indicators, and lists
- **Cryptocurrency Focus**: Built for crypto market data and analysis
- **Modern UI**: Built with Next.js 15, React 19, TypeScript, Tailwind CSS, and shadcn/ui
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Mock data with realistic fluctuations

## 🎯 Example Queries

| Query | Result |
|-------|--------|
| "Show me a chart for PEPE" | Renders an interactive price chart for PEPE |
| "Are we in altseason?" | Displays market indicators and altseason analysis |
| "Top gainers today?" | Shows a list of best performing cryptocurrencies |
| "Chart for Bitcoin" | Renders BTC price chart with trend indicators |
| "Market sentiment" | Displays comprehensive market analysis |

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
│   │   └── page.tsx         # Main dashboard page
│   ├── components/
│   │   ├── dashboard/       # Dashboard-specific components
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

## 🧠 How It Works

### Natural Language Processing

The `src/lib/nl-processor.ts` file contains the logic that maps natural language queries to specific dashboard components:

1. **Pattern Matching**: Analyzes input for keywords and patterns
2. **Component Selection**: Determines which component to render
3. **Parameter Extraction**: Extracts relevant parameters (crypto symbols, timeframes, etc.)
4. **Component Rendering**: Returns component type and props for rendering

### Component Types

1. **Price Chart** (`price-chart`)
   - Interactive line charts using Recharts
   - Real-time price display with trend indicators
   - Supports multiple cryptocurrency symbols
   - Mock data with realistic price movements

2. **Market Indicator** (`market-indicator`)
   - Bitcoin dominance tracking
   - Altseason detection algorithm
   - Fear & Greed Index simulation
   - Market sentiment analysis
   - Visual progress indicators

3. **Top Gainers** (`top-gainers`)
   - Lists best performing cryptocurrencies
   - Configurable timeframes (24h, 7d, 30d)
   - Volume and market cap data
   - Ranking system with visual indicators

## 🔧 Customization

### Adding New Components

1. Create a new component in `src/components/dashboard/`
2. Add pattern matching logic in `src/lib/nl-processor.ts`
3. Update the component rendering logic in `src/app/page.tsx`

### Extending Natural Language Processing

The NL processor uses simple pattern matching. You can extend it by:

- Adding more keyword patterns
- Implementing fuzzy matching
- Integrating with external NLP services (OpenAI, etc.)
- Adding context awareness
- Supporting multi-language queries

### Data Sources

Currently uses mock data. To integrate real data:

1. Replace mock data generators with API calls
2. Add API route handlers in `src/app/api/`
3. Implement data caching and error handling
4. Consider rate limiting for external APIs
5. Popular crypto APIs: CoinGecko, CoinMarketCap, Binance

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) components:

- **Consistent Design System**: All components follow the same design language
- **Dark Mode Support**: Built-in dark mode capabilities
- **Accessibility**: ARIA compliant components
- **Customizable**: Easy to theme and customize
- **Modern Animations**: Smooth transitions and micro-interactions

## 📱 Responsive Design

The dashboard is fully responsive:

- **Mobile First**: Optimized for mobile devices
- **Flexible Layouts**: Components adapt to different screen sizes
- **Touch Friendly**: Interactive elements sized for touch interfaces
- **Progressive Enhancement**: Works without JavaScript

## 🔮 Future Enhancements

- **Real API Integration**: Connect to live cryptocurrency APIs
- **Advanced NLP**: Implement LLM-powered natural language understanding
- **Voice Input**: Add speech-to-text capabilities
- **More Visualizations**: Additional chart types and data representations
- **User Preferences**: Save user settings and favorite queries
- **Real-time Updates**: WebSocket connections for live data
- **Export Features**: Save charts and data as images/PDFs
- **Portfolio Tracking**: Personal portfolio management
- **Alerts System**: Price and market alerts
- **Historical Analysis**: Deep historical data analysis

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

MIT License - feel free to use this project as a starting point for your own applications.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test components in different screen sizes
4. Update documentation for new features
5. Use semantic commit messages
6. Follow the src/ directory structure # tool-base-analytics
