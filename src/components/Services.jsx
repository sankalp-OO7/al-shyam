// components/Services.jsx
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Code, Settings, Terminal, TrendingUp } from "lucide-react";

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
  hidden: { y: 50, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.2 + 0.3,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// --- Reusable Service Card Component ---
const ServiceCard = ({ icon: Icon, title, description, customDelay }) => (
  <motion.div
    custom={customDelay}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className="p-8 rounded-2xl border border-blue-500/20 bg-gray-900/80 shadow-2xl transition-all duration-500 
               hover:bg-gray-800/90 hover:border-blue-400/50 hover:shadow-blue-500/30 relative overflow-hidden backdrop-blur-md"
  >
    {/* Inner background glow on hover */}
    <motion.div
      className="absolute inset-0 bg-blue-500 opacity-0 transition-opacity duration-300"
      whileHover={{ opacity: 0.05 }}
    />

    <div className="relative z-10">
      {/* Changed icon styling slightly */}
      <Icon className="w-10 h-10 text-blue-400 mb-5 p-1 border-2 border-blue-400 rounded-lg transform rotate-45" />
      <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">
        {title}
      </h3>
      <p className="text-gray-400 text-base">{description}</p>
    </div>
  </motion.div>
);

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 lg:py-40 bg-gray-900 relative overflow-hidden border-b border-cyan-500/10"
    >
      {/* Updated Background Radial Gradient Effect - More Blue/Violet Focus */}
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
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Core Development Solutions
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
          ShamsGS specializes in the full lifecycle development of comprehensive
          automated trading systems using{" "}
          <strong className="text-white">MQL4 and MQL5</strong> for MetaTrader
          platforms.
        </motion.p>

        {/* --- Service Cards --- */}
        <div className="grid md:grid-cols-3 gap-10">
          <ServiceCard
            icon={Code}
            title="Expert Advisor (EA) Development"
            description="Custom engineering of high-performance MT4 and MT5 Expert Advisors (trading robots), precisely calibrated to your unique trading logic and risk profile."
            customDelay={0}
          />

          <ServiceCard
            icon={Terminal}
            title="Custom Indicators & Trading Bots"
            description="We build bespoke technical indicators for advanced analysis and specialized automated trading bots to give you a definitive execution edge in the market."
            customDelay={1}
          />

          <ServiceCard
            icon={Settings}
            title="AI Optimization & Enhancement"
            description="Dedicated modification and rigorous optimization services to continuously enhance AI performance, backtest strategies, and seamlessly adapt to evolving market dynamics."
            customDelay={2}
          />
        </div>

        {/* --- Callout Section --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 p-10 bg-gradient-to-r from-blue-900/60 to-violet-900/60 rounded-2xl border border-blue-500/50 text-center shadow-2xl shadow-blue-900/50"
        >
          <h3 className="text-3xl font-bold text-white mb-3 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 mr-3 text-blue-400 animate-pulse" />
            Precision Automation Guaranteed
          </h3>
          <p className="text-lg text-gray-300">
            Turn your manual trading insight into a precise, emotion-free
            machine. Our code guarantees consistency and reliability across all
            markets.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
