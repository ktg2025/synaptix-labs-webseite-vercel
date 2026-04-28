import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Zap, Shield, Brain, BarChart3, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Brain,
    title: "Claude AI Engine",
    description: "Powered by Claude AI for intelligent market analysis and adaptive trading strategies"
  },
  {
    icon: TrendingUp,
    title: "Multi-Strategy",
    description: "HFT scalping and swing trading strategies with MACD, EMA50, ADX, and ATR indicators"
  },
  {
    icon: Zap,
    title: "Real-time Execution",
    description: "Live trading on Alpaca platform with sub-second order execution"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Advanced stop-loss, position sizing, and market regime detection"
  },
  {
    icon: BarChart3,
    title: "Live Dashboard",
    description: "Real-time portfolio tracking, trade feed, and performance analytics"
  },
  {
    icon: CheckCircle,
    title: "Multi-Symbol Support",
    description: "Trade 20+ symbols including stocks, ETFs, and crypto-related assets"
  }
];

const caseStudies = [
  {
    title: "HFT Scalping Strategy",
    description: "High-frequency trading using MACD crossover signals with EMA50 filter and ADX regime detection",
    metrics: [
      { label: "Strategy", value: "MACD + EMA50 + ADX" },
      { label: "Timeframes", value: "1m, 5m, 15m" },
      { label: "Symbols", value: "16 stocks" },
      { label: "Risk Control", value: "ATR-based stops" }
    ],
    highlights: ["Cooldown periods to prevent over-trading", "Market regime awareness", "Adaptive position sizing"]
  },
  {
    title: "Swing Trading",
    description: "Medium-term positions capturing larger price movements with technical analysis",
    metrics: [
      { label: "Holding Period", value: "Hours to Days" },
      { label: "Symbols", value: "16 stocks" },
      { label: "Entry Signal", value: "Technical Patterns" },
      { label: "Exit Strategy", value: "Profit Target + Stop Loss" }
    ],
    highlights: ["Trend following approach", "Support/resistance levels", "Volume confirmation"]
  },
  {
    title: "Portfolio Management",
    description: "Integrated portfolio tracking with real-time P&L monitoring and position management",
    metrics: [
      { label: "Real-time Updates", value: "Sub-second" },
      { label: "Portfolio Tracking", value: "Live" },
      { label: "Trade Logging", value: "Complete" },
      { label: "Data Accuracy", value: "100%" }
    ],
    highlights: ["Live trade feed", "Position tracking", "Performance analytics"]
  }
];

const performanceMetrics = [
  { label: "Supported Symbols", value: "20+", icon: "📊" },
  { label: "Trading Strategies", value: "2", icon: "🎯" },
  { label: "Timeframes", value: "4", icon: "⏱️" },
  { label: "Market Coverage", value: "24/5", icon: "🌍" },
  { label: "Execution Speed", value: "<1s", icon: "⚡" },
  { label: "Uptime", value: "99.9%", icon: "✅" }
];

export default function TradingBot() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 tech-grid">
          <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-20" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-6">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">AI-Powered Trading</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-display font-bold text-foreground mb-6">
                Trading Bot
              </h1>
              <p className="text-xl text-foreground/70 mb-8 max-w-2xl">
                Claude AI-powered algorithmic trading bot with real-time execution on Alpaca. 
                Combines advanced technical analysis with intelligent risk management for consistent returns.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="https://aitradingdash-67khvrrb.manus.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  View Live Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <Link href="/contact">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border border-accent/30 text-foreground font-semibold rounded-lg hover:bg-accent/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Get Custom Bot
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background/50 backdrop-blur-xl border-t border-accent/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Everything you need for intelligent algorithmic trading
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glasmorph-card p-8 group hover:border-accent/50 transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform glow-cyan">
                    <feature.icon className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-20 bg-background border-t border-accent/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Performance Metrics
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Optimized for speed, reliability, and profitability
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {performanceMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="glasmorph-card p-6 text-center group hover:border-accent/50 transition-all"
                >
                  <div className="text-3xl mb-3">{metric.icon}</div>
                  <div className="text-2xl font-display font-bold text-accent mb-2">
                    {metric.value}
                  </div>
                  <p className="text-sm text-foreground/60">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-background/50 backdrop-blur-xl border-t border-accent/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Trading Strategies
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Proven strategies deployed in live trading environments
              </p>
            </motion.div>

            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glasmorph-card p-8 md:p-12 group hover:border-accent/50 transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                        {study.title}
                      </h3>
                      <p className="text-foreground/70 mb-6">
                        {study.description}
                      </p>

                      <div className="space-y-2">
                        {study.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-foreground/60">
                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {study.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-background/50 border border-accent/10 rounded-lg p-4">
                          <p className="text-sm text-foreground/60 mb-1">
                            {metric.label}
                          </p>
                          <p className="text-lg font-semibold text-accent">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="py-20 bg-background border-t border-accent/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Technical Stack
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Built on cutting-edge technology for reliability and performance
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="glasmorph-card p-8"
              >
                <h3 className="text-xl font-display font-bold text-foreground mb-4">AI Engine</h3>
                <ul className="space-y-2 text-foreground/60">
                  <li>Claude AI</li>
                  <li>Market Analysis</li>
                  <li>Signal Generation</li>
                  <li>Adaptive Learning</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="glasmorph-card p-8"
              >
                <h3 className="text-xl font-display font-bold text-foreground mb-4">Trading Platform</h3>
                <ul className="space-y-2 text-foreground/60">
                  <li>Alpaca API</li>
                  <li>Real-time Data</li>
                  <li>Live Execution</li>
                  <li>Portfolio Tracking</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="glasmorph-card p-8"
              >
                <h3 className="text-xl font-display font-bold text-foreground mb-4">Analysis Tools</h3>
                <ul className="space-y-2 text-foreground/60">
                  <li>MACD Indicator</li>
                  <li>EMA Filters</li>
                  <li>ADX Regime</li>
                  <li>ATR Stops</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background/50 backdrop-blur-xl border-t border-accent/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glasmorph-card p-12 md:p-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Ready to Automate Your Trading?
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
                Get a custom trading bot tailored to your specific strategy and risk profile
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-semibold rounded-lg hover:shadow-glow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Link>
                <Link href="/synaps">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border border-accent/30 text-foreground font-semibold rounded-lg hover:bg-accent/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Ask Synaps AI
                    <Brain className="w-5 h-5" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
