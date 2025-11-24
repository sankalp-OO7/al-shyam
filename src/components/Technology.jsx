// components/Technology.jsx
import React from "react";
import { motion } from "framer-motion";
import { Zap, Clock, Shield, ChartBar, Server, ArrowRight } from "lucide-react";

// --- Animation Variants ---
const sectionHeaderVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.15 + 0.3,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// --- Reusable Benefit Card Component (Enhanced) ---
const BenefitCard = ({ icon: Icon, title, description, customDelay }) => (
  <motion.div
    custom={customDelay}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className="relative p-6 rounded-xl bg-gray-900/70 shadow-2xl transition-all duration-300 
               border border-blue-500/20 hover:border-violet-400/50 hover:shadow-violet-500/30 backdrop-blur-sm group"
  >
    {/* Gradient border effect on hover */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-700/0 to-violet-700/0 group-hover:from-blue-700/30 group-hover:to-violet-700/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />

    <div className="relative z-10">
      <Icon className="w-8 h-8 text-violet-400 mb-4 group-hover:text-cyan-400 transition-colors duration-300" />
      <h4 className="text-xl font-semibold mb-2 text-white">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </motion.div>
);

export default function Technology() {
  const benefits = [
    {
      icon: Zap,
      title: "Faster Execution",
      description:
        "Execute trades in milliseconds, capturing opportunities human traders inevitably miss.",
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description:
        "The system monitors markets round-the-clock, ensuring you never miss a trading opportunity.",
    },
    {
      icon: Shield,
      title: "Emotion-Free",
      description:
        "Completely removes psychological factors like fear or greed from critical trading decisions.",
    },
    {
      icon: ChartBar,
      title: "Rigororous Backtesting",
      description:
        "Allows strategies to be tested rigorously on historical data before committing real capital.",
    },
  ];

  const features = [
    "Real-time market data and charts",
    "Automated trading capabilities (EAs)",
    "Robust risk management tools",
    "User-friendly interface & detailed reports",
  ];

  return (
    <section
      id="technology"
      className="py-24 lg:py-40 bg-gray-900 relative overflow-hidden border-b border-cyan-500/10"
    >
      {/* Background Radial Gradient Effect - Same as Services */}
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          background:
            "radial-gradient(circle at top right, #370665 0%, #0D1117 70%)",
        }}
      />

      {/* Subtle Horizontal Blur Line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 0.8, scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm z-0"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* --- Header --- */}
        <motion.h2
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-5xl lg:text-7xl font-black text-center mb-6 tracking-tighter"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Technology & Platform
          </span>
        </motion.h2>

        <motion.p
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-center text-2xl text-gray-300 max-w-4xl mx-auto mb-20 font-light"
        >
          Discover the powerful foundation of our automated trading systems and
          the advantages of professional-grade execution.
        </motion.p>

        {/* --- Key Benefits of Automation --- */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-10 text-white text-center tracking-tight border-b-2 border-violet-500/30 inline-block px-4 pb-2 mx-auto"
          >
            The Five Pillars of Automation
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <BenefitCard key={i} {...b} customDelay={i} />
            ))}
          </div>
        </div>

        {/* --- MT4 vs MT5 Comparison --- */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-10 text-white text-center tracking-tight"
          >
            Platform Comparison: MT4 vs MT5
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1 }}
            className="overflow-x-auto border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-900/50"
          >
            <table className="min-w-full bg-gray-800/90 rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-900/80 to-violet-900/80 text-cyan-400 text-lg font-bold">
                  <th className="py-4 px-6 text-left border-r border-gray-700">
                    Key Feature
                  </th>
                  <th className="py-4 px-6 border-r border-gray-700">
                    MetaTrader 4 (MT4)
                  </th>
                  <th className="py-4 px-6">MetaTrader 5 (MT5)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr className="hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    Primary Focus
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    Forex-only trading (Simpler)
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    Multi-Asset Trading (Advanced)
                  </td>
                </tr>
                <tr className="hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    Advanced Tools
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    Established community, compatible with most brokers.
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    More timeframes, better backtesting, advanced orders.
                  </td>
                </tr>
                <tr className="hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    Recommendation
                  </td>
                  <td className="py-4 px-6 text-violet-400 font-medium">
                    Best for beginners and pure Forex trading.
                  </td>
                  <td className="py-4 px-6 text-cyan-400 font-medium">
                    Best for multi-asset trading and experienced users.
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>

        {/* --- Key Features to Look For --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20 p-10 bg-gray-900/90 border border-violet-500/30 rounded-2xl max-w-3xl mx-auto shadow-2xl shadow-violet-900/50"
        >
          <h3 className="text-3xl font-bold mb-6 text-white flex items-center justify-center">
            <Server className="w-6 h-6 mr-3 text-violet-400" />
            Core AI Features
          </h3>
          <ul className="inline-block text-left text-gray-300 space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start"
              >
                <ArrowRight className="w-5 h-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
