// components/AlshyamHeroSection.js
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, TrendingUp, Activity, BarChart3 } from "lucide-react";
import { useMemo, useRef } from "react";

// Smooth entrance animations
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1 + 0.2,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function AlshyamHeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // FIXED: Generate stable values with useMemo to prevent hydration errors
  const chartElements = useMemo(() => {
    const candlesticks = Array.from({ length: 50 }, (_, i) => {
      // Using deterministic calculations instead of Math.random()
      const phase = (i * 0.3) % (Math.PI * 2);
      const baseHeight = 35 + Math.sin(phase) * 15;
      const volatility = Math.abs(Math.sin(i * 0.7)) * 12;

      // Round all decimal values to avoid floating point precision differences
      return {
        id: `candle-${i}`,
        height: Math.round((baseHeight + volatility) * 100) / 100,
        isGreen: Math.sin(i * 0.5) > 0,
        delay: Math.round(i * 0.02 * 100) / 100,
        wickTop: Math.round((8 + Math.abs(Math.cos(i * 0.4)) * 8) * 100) / 100,
        wickBottom:
          Math.round((8 + Math.abs(Math.sin(i * 0.6)) * 8) * 100) / 100,
      };
    });

    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: `particle-${i}`,
      x: Math.round((15 + ((i * 6.5) % 70)) * 100) / 100,
      y: Math.round((20 + ((i * 4.3) % 50)) * 100) / 100,
      size: 2 + (i % 2),
      duration: Math.round((4 + (i % 3) * 1.5) * 100) / 100,
      delay: Math.round(i * 0.25 * 100) / 100,
    }));

    return { candlesticks, particles };
  }, []); // Empty dependency array ensures this runs once

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-black"
    >
      {/* Video Background - Fully Visible with Parallax */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/dubai-skyline.mp4"
        style={{ y, scale }}
      >
        Your browser does not support the video tag.
      </motion.video>

      {/* Gradient Overlays - More breathing room in center */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {chartElements.particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background:
                "radial-gradient(circle, rgba(6, 182, 212, 0.8), transparent)",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Content Area - Better spacing on all devices */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            {/* Desktop/Tablet: Side by side, Mobile: Stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT SIDE - Content (takes more space on desktop) */}
              <motion.div
                className="lg:col-span-7 space-y-6 lg:space-y-8"
                initial="hidden"
                animate="visible"
              >
                {/* Badge */}
                <motion.div
                  custom={0}
                  variants={fadeInLeft}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-md"
                >
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide">
                    LIVE MARKET DATA
                  </span>
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Main Headline - Responsive text sizes */}
                <motion.div
                  custom={1}
                  variants={fadeInLeft}
                  className="space-y-2 lg:space-y-3"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05]">
                    <span className="block text-white">AI-Powered</span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      Trading Precision
                    </span>
                  </h1>
                </motion.div>

                {/* Subheadline */}
                <motion.div
                  custom={2}
                  variants={fadeInLeft}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-[2px] w-8 sm:w-12 bg-gradient-to-r from-amber-400 to-transparent" />
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-400 tracking-[0.15em] sm:tracking-[0.2em]">
                      SHAMS GLOBAL SYSTEM
                    </h2>
                  </div>
                  <p className="text-cyan-300/70 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] font-mono ml-11 sm:ml-[60px]">
                    DUBAI, UAE
                  </p>
                </motion.div>

                {/* Description */}
                <motion.p
                  custom={3}
                  variants={fadeInLeft}
                  className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl"
                >
                  Execute your global trading strategy with{" "}
                  <span className="text-cyan-400 font-semibold">
                    unprecedented algorithmic speed
                  </span>{" "}
                  and{" "}
                  <span className="text-purple-400 font-semibold">
                    localized financial expertise
                  </span>{" "}
                  from the heart of Dubai.
                </motion.p>

                {/* CTA Group */}
                <motion.div
                  custom={4}
                  variants={fadeInLeft}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
                >
                  {/* Primary CTA */}
                  <motion.button
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <span className="relative flex items-center justify-center gap-2 text-base sm:text-lg font-bold text-white">
                      Start Trading Now
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>

                  {/* Secondary CTA */}
                  <motion.button
                    className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 rounded-full backdrop-blur-sm hover:bg-white/5 transition-all"
                    whileHover={{
                      scale: 1.02,
                      borderColor: "rgba(255,255,255,0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2 text-base sm:text-lg font-semibold text-white">
                      Watch Demo
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </motion.button>
                </motion.div>

                {/* Stats - Responsive grid */}
                <motion.div
                  custom={5}
                  variants={fadeInLeft}
                  className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6 max-w-xl"
                >
                  {[
                    { label: "Active Traders", value: "50K+" },
                    { label: "Daily Volume", value: "$2.4B" },
                    { label: "Uptime", value: "99.9%" },
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* RIGHT SIDE - Mini Chart Preview with Parallax & Pulsing Border */}
              <motion.div
                className="hidden md:block lg:col-span-5"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
              >
                {/* Animated Border Glow Container */}
                <div className="relative">
                  {/* Pulsing Border Effect */}
                  <motion.div
                    className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-75"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Rotating Border Gradient */}
                  <motion.div
                    className="absolute -inset-[2px] rounded-2xl opacity-60 blur-sm"
                    style={{
                      background:
                        "conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)",
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Main Card */}
                  <div className="relative h-64 lg:h-80 rounded-2xl bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-xl border border-white/20 p-4 lg:p-6 shadow-2xl overflow-hidden">
                    {/* Animated Grid Lines Background */}
                    <div className="absolute inset-0 opacity-10">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={`h-${i}`}
                          className="absolute left-0 right-0 h-px bg-cyan-400"
                          style={{ top: `${(i + 1) * 20}%` }}
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={`v-${i}`}
                          className="absolute top-0 bottom-0 w-px bg-cyan-400"
                          style={{ left: `${(i + 1) * 15}%` }}
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>

                    {/* Floating Orbs */}
                    <motion.div
                      className="absolute top-10 right-10 w-32 h-32 rounded-full bg-cyan-400/10 blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-purple-400/10 blur-3xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    />

                    {/* Chart Header */}
                    <div className="relative flex items-center justify-between mb-4 z-10">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <BarChart3 className="w-4 h-4 text-cyan-400" />
                        </motion.div>
                        <div>
                          <div className="text-white font-bold text-sm lg:text-base">
                            BTC/USD
                          </div>
                          <div className="text-gray-400 text-[10px]">
                            Real-time
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <motion.div
                          className="text-lg lg:text-xl font-black text-white"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          $67,432
                        </motion.div>
                        <motion.div
                          className="text-green-400 text-xs font-semibold flex items-center justify-end gap-1"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <TrendingUp className="w-3 h-3" />
                          +3.24%
                        </motion.div>
                      </div>
                    </div>

                    {/* Mini Candlesticks */}
                    <div className="absolute inset-x-4 lg:inset-x-6 bottom-16 top-20 flex items-end justify-between gap-[2px] z-10">
                      {chartElements.candlesticks.slice(0, 30).map((candle) => (
                        <motion.div
                          key={candle.id}
                          className="relative flex flex-col items-center justify-end flex-1"
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={{ scaleY: 1, opacity: 1 }}
                          transition={{
                            delay: candle.delay,
                            duration: 0.5,
                            ease: "easeOut",
                          }}
                        >
                          {/* Simplified candle for mini view */}
                          <motion.div
                            className={`w-full ${
                              candle.isGreen
                                ? "bg-gradient-to-t from-green-500 to-green-400"
                                : "bg-gradient-to-t from-red-500 to-red-400"
                            } rounded-sm`}
                            style={{
                              height: `${candle.height * 0.8}px`,
                            }}
                            animate={{
                              scaleY: [1, 1.05, 1],
                              opacity: [0.9, 1, 0.9],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: candle.delay,
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* AI Indicator with Pulse */}
                    <motion.div
                      className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/30 backdrop-blur-sm z-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        boxShadow: [
                          "0 0 20px rgba(6, 182, 212, 0.3)",
                          "0 0 30px rgba(6, 182, 212, 0.6)",
                          "0 0 20px rgba(6, 182, 212, 0.3)",
                        ],
                      }}
                      transition={{
                        opacity: { delay: 2, duration: 0.5 },
                        y: { delay: 2, duration: 0.5 },
                        boxShadow: { duration: 2, repeat: Infinity },
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                          animate={{
                            opacity: [1, 0.3, 1],
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 5px rgba(6, 182, 212, 0.5)",
                              "0 0 15px rgba(6, 182, 212, 0.8)",
                              "0 0 5px rgba(6, 182, 212, 0.5)",
                            ],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-cyan-400 text-[10px] font-bold">
                          AI: BULLISH
                        </span>
                      </div>
                    </motion.div>

                    {/* Data Points Overlay */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400/20 font-mono text-xs font-bold z-0"
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      LIVE DATA
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* BOTTOM - Heartbeat Candlestick Chart (Full Width) - NO PULSE ON DESKTOP */}
        <motion.div
          className="relative w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-sm border-t border-white/5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            {/* Chart Label */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 font-mono text-xs sm:text-sm">
                  LIVE MARKET PULSE
                </span>
              </div>
              <div className="text-gray-400 font-mono text-[10px] sm:text-xs">
                REAL-TIME DATA
              </div>
            </div>

            {/* Heartbeat Candlestick Display */}
            <div className="relative h-32 sm:h-40 lg:h-48 flex items-end justify-between gap-[1px] sm:gap-[2px]">
              {chartElements.candlesticks.map((candle) => (
                <motion.div
                  key={candle.id}
                  className="relative flex flex-col items-center justify-end flex-1"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{
                    delay: candle.delay,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  {/* Top Wick */}
                  <div
                    className={`w-[2px] ${
                      candle.isGreen ? "bg-green-400/70" : "bg-red-400/70"
                    }`}
                    style={{ height: `${candle.wickTop.toFixed(2)}px` }}
                  />

                  {/* Candle Body - Heartbeat Animation (Mobile/Tablet Only) */}
                  <motion.div
                    className={`w-full ${
                      candle.isGreen
                        ? "bg-gradient-to-t from-green-500 to-green-400"
                        : "bg-gradient-to-t from-red-500 to-red-400"
                    } rounded-sm`}
                    style={{
                      height: `${candle.height.toFixed(2)}px`,
                      boxShadow: candle.isGreen
                        ? "0 0 10px rgba(34, 197, 94, 0.3)"
                        : "0 0 10px rgba(239, 68, 68, 0.3)",
                    }}
                    animate={{
                      // No animation on desktop, heartbeat on mobile/tablet
                      scaleY: 1,
                      opacity: 0.9,
                    }}
                    whileInView={{
                      // Only animate when in viewport
                      scaleY:
                        typeof window !== "undefined" &&
                        window.innerWidth < 1024
                          ? [1, 1.15, 0.95, 1.08, 1]
                          : 1,
                      opacity:
                        typeof window !== "undefined" &&
                        window.innerWidth < 1024
                          ? [0.9, 1, 0.85, 1, 0.9]
                          : 0.9,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: candle.delay,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Bottom Wick */}
                  <div
                    className={`w-[2px] ${
                      candle.isGreen ? "bg-green-400/70" : "bg-red-400/70"
                    }`}
                    style={{ height: `${candle.wickBottom.toFixed(2)}px` }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Status Bar (Mobile: Bottom fixed, Desktop: Absolute) */}
        <motion.div
          className="relative lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 mx-4 mb-4 lg:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-green-400 font-semibold">ONLINE</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <span className="text-cyan-400 font-semibold">ACTIVE</span>
          </div>
        </motion.div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-t border-l border-cyan-400/20" />
      <div className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-b border-r border-purple-400/20" />
    </section>
  );
}
