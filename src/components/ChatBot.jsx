import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  TrendingUp,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Welcome to **Shams Global System**! I'm your AI Trading Analyst.\n\nI can help you with:\n• Trading strategies and AI modes\n• Platform setup (MT4/MT5)\n• Pricing and subscription details\n• Technical support\n\nHow can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Knowledge base for intelligent responses
  const knowledgeBase = {
    pricing: {
      keywords: [
        "price",
        "cost",
        "how much",
        "subscription",
        "payment",
        "fee",
        "yearly",
        "pricing",
        "plan",
        "license",
      ],
      response:
        "💰 **Shams AI License Pricing**\n\nAll AI modes are priced at **$600/year** (billed annually) with a **10-day free trial** to test before you commit!\n\n**What's Included:**\n✅ 1 Live Account License\n✅ 24/7 Elite Technical Support\n✅ All Software Updates\n✅ Risk Management Tools\n✅ Performance Analytics\n\n**6 Available Trading Modes:**\n\n🔥 **FAST Mode** - High Risk (5/5) / High Reward (5/5)\nAggressive high-frequency trading for maximum returns\n\n🛡️ **SLOW Mode** - Low Risk (2/5) / Steady Growth (2/5)\nConservative strategy with minimal drawdown\n\n⭐ **MODERATE Mode** - Balanced (3/5) Risk/Reward\nRecommended for most traders, optimized consistency\n\n📰 **HEADING Mode** - Event-Based (4/5 Risk)\nSpecialized for high-impact news and market events\n\n🔀 **ADVANCE HEDGE Mode** - Advanced (5/5 Risk)\nSophisticated hedging with full customization\n\n⚡ **SCALPING Mode** - Fast Trades (4/5 Risk)\nHigh-precision 15-minute ultra-fast strategy\n\n**Special Offers:**\n• 10-Day Free Trial (No Credit Card)\n• Money-Back Guarantee Available\n• All modes same price: $600/year\n\nWhich trading style matches your goals?",
    },
    modes: {
      keywords: [
        "mode",
        "strategy",
        "risk",
        "fast",
        "slow",
        "moderate",
        "scalping",
        "hedge",
        "heading",
        "which mode",
        "recommend mode",
        "best mode",
      ],
      response:
        "🎯 **AI Trading Modes - Detailed Breakdown**\n\n**1. FAST Mode** ⚡\n• Risk Level: 5/5 (Highest)\n• Reward Potential: 5/5 (Highest)\n• Style: Aggressive, high-frequency trading\n• Best For: Experienced traders seeking maximum returns\n• Features: Weekly optimization, high volatility tolerance\n\n**2. SLOW Mode** 🛡️\n• Risk Level: 2/5 (Low)\n• Reward Potential: 2/5 (Steady)\n• Style: Conservative, long-term growth\n• Best For: Risk-averse traders, retirement accounts\n• Features: Minimal drawdown, stable performance\n\n**3. MODERATE Mode** ⭐ (RECOMMENDED)\n• Risk Level: 3/5 (Balanced)\n• Reward Potential: 3/5 (Consistent)\n• Style: Optimized risk/reward balance\n• Best For: Most traders, especially beginners\n• Features: Monthly performance checks, strategy presets\n\n**4. HEADING Mode** 📰\n• Risk Level: 4/5 (High)\n• Reward Potential: 3/5 (Event-Based)\n• Style: News and market event focused\n• Best For: Traders who follow economic calendars\n• Features: Dedicated account manager, exclusive insights\n\n**5. ADVANCE HEDGE Mode** 🔀\n• Risk Level: 5/5 (Highest)\n• Reward Potential: 4/5 (Advanced)\n• Style: Sophisticated hedging techniques\n• Best For: Professional traders\n• Features: Full customization, free yearly AI optimization\n\n**6. SCALPING Mode** ⚡\n• Risk Level: 4/5 (High)\n• Reward Potential: 4/5 (Quick Profits)\n• Style: Ultra-fast 15-minute trades\n• Best For: Active traders, low-spread brokers\n• Features: Dedicated server setup, high precision\n\n**All modes: $600/year • 10-day free trial**\n\nNeed help choosing? Tell me your:\n• Experience level\n• Risk tolerance\n• Trading goals",
    },
    setup: {
      keywords: [
        "setup",
        "install",
        "start",
        "begin",
        "how to",
        "download",
        "mt4",
        "mt5",
      ],
      response:
        "🚀 **Quick Setup Guide**\n\n**Step 1:** Download MT5 (free platform)\n**Step 2:** Choose your AI mode and get license key\n**Step 3:** Install Expert Advisor with your key\n**Step 4:** Start 10-day free trial!\n\n[DOWNLOAD_MT5]\n\nNeed help after downloading? Just ask!",
    },
    benefits: {
      keywords: ["benefit", "advantage", "why", "feature", "what can"],
      response:
        "⚡ **Why Choose Shams AI?**\n\n✅ **Hyper-Speed Execution** - Millisecond trade execution\n✅ **24/7 Automated Trading** - Never miss opportunities\n✅ **Emotion-Free** - No fear or greed, pure logic\n✅ **99.9% Uptime** - Reliable & secure\n✅ **Elite Support** - Round-the-clock expert assistance\n\n🌍 Trusted by 50K+ active traders with $2.4B daily volume!",
    },
    platform: {
      keywords: ["mt4", "mt5", "metatrader", "platform", "difference"],
      response:
        "🖥️ **MT4 vs MT5 Platform**\n\n**MT4:** Best for beginners, Forex-focused, simpler interface\n**MT5:** Advanced tools, multi-asset trading, better backtesting\n\n**Recommendation:** MT5 for most users due to superior features and optimization capabilities.\n\n[DOWNLOAD_MT5]\n\nOur AI works seamlessly with both platforms!",
    },
    contact: {
      keywords: ["contact", "support", "help", "phone", "email", "whatsapp"],
      response:
        "📞 **Contact Shams Global System**\n\n**WhatsApp/Call:** +971 58 635 4242\n**Email:** shamsgs.work@gmail.com\n**Location:** Dubai, UAE\n\nOur team is ready to assist you 24/7! Would you like me to connect you with a human expert?",
    },
    demo: {
      keywords: ["demo", "trial", "test", "free"],
      response:
        "🎁 **Free 10-Day Trial Available!**\n\nTest any AI mode risk-free for 10 days. No credit card required!\n\n**What you get:**\n• Full access to your chosen AI mode\n• Real-time market execution\n• Complete feature set\n• 24/7 technical support\n\nReady to start your free trial? Choose your preferred mode!",
    },
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Check knowledge base
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return data.response;
      }
    }

    // Greetings
    if (
      ["hi", "hello", "hey", "good morning", "good evening"].some((greet) =>
        lowerMessage.includes(greet)
      )
    ) {
      return "👋 Hello! I'm your Shams AI Trading Analyst. How can I help you maximize your trading potential today?";
    }

    // Default response with quick access buttons
    return "I'm not sure about that, but I'm here to help! Choose a topic below:\n\n[QUICK_TOPICS]";
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newUserMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate realistic typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const QuickAction = ({ icon: Icon, text, message }) => {
    const handleClick = () => {
      if (!message) return;

      const newUserMessage = {
        id: Date.now(),
        text: message,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newUserMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: getBotResponse(message),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 800 + Math.random() * 700);
    };

    return (
      <motion.button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-medium hover:from-cyan-600/30 hover:to-blue-600/30 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className="w-3 h-3" />
        {text}
      </motion.button>
    );
  };

  const MessageBubble = ({ message }) => {
    const isBot = message.sender === "bot";
    const hasDownloadButton = message.text.includes("[DOWNLOAD_MT5]");
    const hasQuickTopics = message.text.includes("[QUICK_TOPICS]");

    // Remove markers from display text
    let displayText = message.text
      .replace("[DOWNLOAD_MT5]", "")
      .replace("[QUICK_TOPICS]", "")
      .trim();

    const handleQuickTopicClick = (topic) => {
      const newUserMessage = {
        id: Date.now(),
        text: topic,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newUserMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: getBotResponse(topic),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 800 + Math.random() * 700);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex gap-2 mb-4 ${isBot ? "" : "flex-row-reverse"}`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isBot
              ? "bg-gradient-to-br from-cyan-500 to-blue-600"
              : "bg-gradient-to-br from-purple-500 to-pink-600"
          }`}
        >
          {isBot ? (
            <Bot className="w-5 h-5 text-white" />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div
          className={`flex flex-col max-w-[75%] ${isBot ? "" : "items-end"}`}
        >
          <div
            className={`p-3 rounded-2xl shadow-lg ${
              isBot
                ? "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 rounded-tl-none border border-cyan-500/20"
                : "bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-br-none"
            }`}
          >
            <div className="text-sm leading-relaxed whitespace-pre-line">
              {displayText.split("\n").map((line, i) => {
                // Bold text
                if (line.includes("**")) {
                  const parts = line.split("**");
                  return (
                    <p key={i} className="mb-1">
                      {parts.map((part, j) =>
                        j % 2 === 1 ? (
                          <strong key={j} className="font-bold text-cyan-300">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  );
                }
                return (
                  <p key={i} className="mb-1">
                    {line}
                  </p>
                );
              })}
            </div>

            {/* MT5 Download Button */}
            {hasDownloadButton && (
              <motion.a
                href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Download MT5 on Google Play
              </motion.a>
            )}

            {/* Quick Topic Buttons */}
            {hasQuickTopics && (
              <div className="mt-3 space-y-2">
                <motion.button
                  onClick={() => handleQuickTopicClick("What's the pricing?")}
                  className="w-full px-4 py-2 bg-cyan-600/30 hover:bg-cyan-600/50 rounded-lg text-left text-sm border border-cyan-500/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  💰 Pricing & Subscription
                </motion.button>
                <motion.button
                  onClick={() =>
                    handleQuickTopicClick("Tell me about AI modes")
                  }
                  className="w-full px-4 py-2 bg-cyan-600/30 hover:bg-cyan-600/50 rounded-lg text-left text-sm border border-cyan-500/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🎯 AI Trading Modes
                </motion.button>
                <motion.button
                  onClick={() => handleQuickTopicClick("How do I get started?")}
                  className="w-full px-4 py-2 bg-cyan-600/30 hover:bg-cyan-600/50 rounded-lg text-left text-sm border border-cyan-500/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🚀 Setup Guide
                </motion.button>
                <motion.button
                  onClick={() =>
                    handleQuickTopicClick("What are the benefits?")
                  }
                  className="w-full px-4 py-2 bg-cyan-600/30 hover:bg-cyan-600/50 rounded-lg text-left text-sm border border-cyan-500/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ⚡ Benefits & Features
                </motion.button>
                <motion.button
                  onClick={() => handleQuickTopicClick("Contact support")}
                  className="w-full px-4 py-2 bg-cyan-600/30 hover:bg-cyan-600/50 rounded-lg text-left text-sm border border-cyan-500/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  📞 Contact & Support
                </motion.button>
              </div>
            )}
          </div>
          <span className="text-[10px] text-gray-500 mt-1 px-1">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </motion.div>
    );
  };

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex gap-2 mb-4"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-2xl rounded-tl-none border border-cyan-500/20">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-[380px] h-[600px] bg-gradient-to-br from-black via-gray-900 to-black border border-cyan-500/30 rounded-2xl shadow-2xl backdrop-blur-md mb-4 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative p-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 text-white shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
              <div className="relative flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-cyan-600"></div>
                  </div>
                  <div>
                    <div className="font-extrabold tracking-wider text-sm">
                      SHAMS AI ANALYST
                    </div>
                    <div className="text-xs text-cyan-100 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      Online • Ready to assist
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-3 py-3 bg-black/40 border-b border-cyan-500/10 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 min-w-max">
                <QuickAction
                  icon={TrendingUp}
                  text="AI Modes"
                  message="Tell me about AI modes"
                />
                <QuickAction
                  icon={Zap}
                  text="Pricing"
                  message="What's the pricing?"
                />
                <QuickAction
                  icon={Shield}
                  text="Benefits"
                  message="What are the benefits?"
                />
                <QuickAction
                  icon={Clock}
                  text="Setup"
                  message="How do I get started?"
                />
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 border-t border-cyan-500/20 bg-black/40 backdrop-blur-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about trading, pricing, setup..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 p-3 rounded-xl bg-gray-800/80 text-white border border-cyan-500/20 focus:border-cyan-500/50 focus:outline-none placeholder-gray-400 text-sm transition-colors"
                />
                <motion.button
                  onClick={handleSend}
                  className="w-11 h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={input.trim() === ""}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="text-[10px] text-gray-500 mt-2 text-center">
                Powered by Shams AI • Instant responses
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center group overflow-hidden"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20"></div>

        {/* Icon */}
        <motion.div
          animate={
            isOpen ? { rotate: 90, scale: 0.9 } : { rotate: 0, scale: 1 }
          }
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-7 h-7 relative z-10" />
          ) : (
            <MessageSquare className="w-7 h-7 relative z-10" />
          )}
        </motion.div>

        {/* Notification badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white"
          >
            1
          </motion.div>
        )}
      </motion.button>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
