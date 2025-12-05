"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ANIMATION VARIANTS (Tailored for AI/Finance Theme) ---

// LOADING OVERLAY VARIANTS
const loadingOverlayVariants = {
  initial: {
    opacity: 1,
    background:
      "linear-gradient(135deg, #05051a 0%, #100f2e 50%, #05051a 100%)", // Dark, deep space blue/black
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 1.5,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.4, // Longer exit for dramatic effect
    },
  },
};

// DATA PARTICLE/GRID VARIANTS
const dataParticleVariants = {
  initial: { opacity: 0, scale: 0, x: 0, y: 0 },
  animate: (i) => ({
    opacity: [0, 1, 0.5, 0],
    scale: [0.5, 1, 1, 0.5],
    x: [0, Math.cos(i) * 50, Math.sin(i) * 30, 0], // Subtle, controlled movement
    y: [0, Math.sin(i) * 40, Math.cos(i) * 20, 0],
    transition: {
      duration: 5 + Math.random() * 3,
      repeat: Infinity,
      ease: "linear",
      delay: Math.random() * 3,
    },
  }),
};

// LOGO/SPINNER CONTAINER (The "Core System")
const coreSystemVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    rotateX: 90,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
      duration: 1.5,
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    filter: "blur(10px)",
    transition: {
      duration: 0.7,
      ease: "easeIn",
    },
  },
};

// TEXT DECODING ANIMATIONS (Typing/Data Stream Effect)
const textContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 1.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const wordVariants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "tween",
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.9],
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.3,
    },
  },
};

// PROGRESS BAR (Data Loading)
const progressVariants = {
  initial: { width: "0%" },
  animate: {
    width: "100%",
    transition: {
      duration: 4, // Slightly longer progress to sync with the total loading time
      ease: "easeInOut",
    },
  },
};

const LOADING_DURATION_MS = 4000; // Total duration slightly increased for drama

export default function AlshyamLoadingOverlay({ isLoading }) {
  const [progress, setProgress] = useState(0);
  const [particleStyles, setParticleStyles] = useState([]);

  useEffect(() => {
    // Generate data particle styles
    const generateParticles = () => {
      const newParticleStyles = [...Array(30)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }));
      setParticleStyles(newParticleStyles);
    };

    generateParticles();

    // Progress bar animation
    const interval = 50; // 50ms interval
    const totalSteps = LOADING_DURATION_MS / interval;
    const stepIncrement = 100 / totalSteps;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.min(100, prev + stepIncrement);
      });
    }, interval);

    return () => {
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden"
          variants={loadingOverlayVariants}
          initial="initial"
          exit="exit"
        >
          {/* Data Grid Background Effect */}
          <div className="absolute inset-0 opacity-50">
            {/* Fine grid lines or subtle noise */}
            <div
              className="absolute inset-0 bg-repeat"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(45, 140, 255, 0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Animated Data Particles / Signal Blips */}
          <div className="absolute inset-0">
            {particleStyles.map((style, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_#22d3ee]"
                style={style}
                custom={i}
                variants={dataParticleVariants}
                initial="initial"
                animate="animate"
              />
            ))}
          </div>

          {/* Vignette Overlay for focus */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/80" />

          {/* Main Content Container */}
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div className="text-center max-w-4xl mx-auto">
              {/* Logo/System Core Animation */}
              <motion.div
                className="relative mb-8 sm:mb-12 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto"
                variants={coreSystemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Outer Ring: Financial Focus / Global Reach */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-cyan-500/50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  {/* Glowing highlight point (Global trading marker) */}
                  <div className="absolute top-0 left-1/2 -ml-[2px] w-1 h-3 bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
                  <div className="absolute bottom-0 left-1/2 -ml-[2px] w-1 h-3 bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
                </motion.div>

                {/* Inner Ring: AI Processing */}
                <motion.div
                  className="absolute inset-4 rounded-full border-2 border-gold-500/70"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  {/* Arabic/Geometric Pattern Cutout */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-1/2 h-1/2 border-2 border-gold-500/50 rounded-full"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.5, 0.8] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Center Core: The 'A' for Alshyam/AI */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-7xl font-extrabold text-white text-shadow-[0_0_10px_#fff] drop-shadow-lg"
                    style={{
                      textShadow:
                        "0 0 15px rgba(255, 255, 255, 0.8), 0 0 5px rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    S
                  </span>
                </div>
              </motion.div>

              {/* Business Name & Tagline Animation */}
              <motion.div
                variants={textContainerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4 sm:space-y-6 perspective-[1000px]"
              >
                {/* Business Name */}
                <motion.div variants={wordVariants} className="overflow-hidden">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none">
                    <span className="inline-block bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent">
                      SHAMSGS
                    </span>
                  </h1>
                </motion.div>

                {/* Subtitle - Shams Global System */}
                <motion.div variants={wordVariants} className="overflow-hidden">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-none">
                    <span className="inline-block bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-md">
                      SHAMS GLOBAL SYSTEMS
                    </span>
                  </h2>
                </motion.div>

                {/* Tagline - AI Focus */}
                <motion.div variants={wordVariants} className="overflow-hidden">
                  <p className="text-lg sm:text-xl md:text-2xl text-cyan-300/90 font-mono tracking-wider px-4 mt-2">
                    // Executing Trades with Data Precision
                  </p>
                </motion.div>

                {/* Location/Industry Tags */}
                <motion.div variants={wordVariants} className="overflow-hidden">
                  <div className="flex flex-wrap justify-center gap-3 mt-6 px-4">
                    <span className="px-3 py-1 bg-slate-800/60 border border-cyan-500/30 rounded-lg text-sm text-cyan-200 font-medium backdrop-blur-sm shadow-xl">
                      DUBAI
                    </span>
                    <span className="px-3 py-1 bg-slate-800/60 border border-amber-500/30 rounded-lg text-sm text-amber-200 font-medium backdrop-blur-sm shadow-xl">
                      ALGO TRADING
                    </span>
                    <span className="px-3 py-1 bg-slate-800/60 border border-cyan-500/30 rounded-lg text-sm text-cyan-200 font-medium backdrop-blur-sm shadow-xl">
                      AI DRIVEN
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Progress Bar (Loading Data Stream) */}
              <motion.div className="mt-12 sm:mt-16 max-w-lg mx-auto">
                <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden border border-cyan-600/20 shadow-inner shadow-cyan-900">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-cyan-400/80 to-cyan-700 rounded-full"
                    variants={progressVariants}
                    initial="initial"
                    animate="animate"
                    style={{ width: `${progress}%` }} // Ensure progress is driven by state/variants
                  />
                  {/* Scan line effect */}
                  <div className="absolute top-0 left-0 h-full w-1/4 bg-white/10 blur-sm animate-pulse" />
                </div>
                <p className="text-center text-cyan-300/70 text-sm mt-4 font-light tracking-wide font-mono">
                  Loading System Core & Financial Data...
                </p>
              </motion.div>
            </div>
          </div>

          {/* Border Code/Matrix Effects */}
          <div className="absolute top-4 left-4 text-xs text-cyan-600 font-mono opacity-20">
            {`// SYSTEM: READY_SEQ_01`}
          </div>
          <div className="absolute bottom-4 right-4 text-xs text-cyan-600 font-mono opacity-20 transform rotate-180">
            {`// INIT: ALGORITHM_START`}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
