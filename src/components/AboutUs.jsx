// components/AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Eye,
  Zap,
  Lock,
  Headphones,
  TrendingUp,
} from "lucide-react";

// --- Animation Variants ---
const sectionHeaderVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const blockIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const pulseEffect = {
  initial: { boxShadow: "0 0 0px rgba(0,0,0,0)" },
  animate: {
    boxShadow: [
      "0 0 5px rgba(59,130,246,0.5)",
      "0 0 20px rgba(59,130,246,0.9)",
      "0 0 5px rgba(59,130,246,0.5)",
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// --- Reusable Components ---

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <motion.div
    variants={blockIn}
    className={`p-6 rounded-2xl border border-${color}-500/20 bg-gray-900/60 shadow-xl flex flex-col items-center text-center backdrop-blur-sm`}
    whileHover={{
      scale: 1.05,
      borderColor: `rgba(59,130,246,0.8)`,
      boxShadow: `0 10px 30px -5px rgba(59,130,246,0.3)`,
    }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className={`w-10 h-10 text-${color}-400 mb-4`} />
    <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
);

const GradientSeparator = () => (
  <motion.hr
    initial={{ width: "0%" }}
    whileInView={{ width: "60%" }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 1.8, ease: "easeOut" }}
    className="h-[4px] mx-auto my-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent border-none rounded-full"
  />
);

export default function AboutUs() {
  return (
    <section
      id="about-us"
      className="py-24 lg:py-40 bg-black relative overflow-hidden"
    >
      {/* Background Radial Gradient Effect */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          background: "radial-gradient(circle at top, #063753 0%, #000000 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* --- Header --- */}
        <motion.h2
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-5xl lg:text-7xl font-black text-center mb-16 pb-4 tracking-tighter"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Shams Global System
          </span>
        </motion.h2>

        {/* --- Company Overview --- */}
        <motion.div
          variants={blockIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center text-2xl text-gray-300 max-w-5xl mx-auto mb-16 border-b border-gray-700/50 pb-8 font-light"
        >
          <p>
            <strong className="text-cyan-400">ShamsGS</strong> is a
            forward-thinking technology firm specializing in the development of
            advanced,{" "}
            <strong className="text-white">
              autonomous trading AI for the Forex market
            </strong>
            . We fuse proprietary, cutting-edge algorithms with deep market
            expertise to engineer intelligent, highly efficient, and
            consistently profitable trading solutions.
          </p>
        </motion.div>

        <GradientSeparator />

        {/* --- Mission and Vision --- */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Mission */}
          <motion.div
            variants={blockIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="p-10 border border-cyan-500/30 rounded-3xl bg-gray-900/80 shadow-2xl shadow-cyan-900/30 transition-all duration-500 hover:shadow-cyan-500/50"
          >
            <Briefcase className="w-14 h-14 text-cyan-400 mb-6" />
            <h3 className="text-3xl font-bold mb-4 text-white">Our Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              To{" "}
              <strong className="text-cyan-300">
                democratize automated trading
              </strong>{" "}
              by equipping traders globally with tools that dramatically
              simplify operations and{" "}
              <strong className="text-white">maximize performance</strong> in
              the volatile Forex environment, prioritizing precision and client
              profitability.
            </p>
          </motion.div>

          {/* Vision - Enhanced Pulse Effect */}
          <motion.div
            variants={blockIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="p-10 border border-blue-500/50 rounded-3xl bg-gray-900/80 shadow-2xl relative overflow-hidden"
          >
            <motion.div
              variants={pulseEffect}
              initial="initial"
              animate="animate"
              className="absolute inset-0 rounded-3xl -z-10"
            />
            <Eye className="w-14 h-14 text-blue-400 mb-6" />
            <h3 className="text-3xl font-bold mb-4 text-white">Our Vision</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              To engineer the{" "}
              <strong className="text-blue-300">
                definitive Trading Robot
              </strong>
              , possessing the best features and advantages in the market. Our
              core promise is the ability to deliver flawless,{" "}
              <strong className="text-white">human-free trade execution</strong>
              .
            </p>
            <div className="absolute bottom-4 right-4 text-xs text-blue-500 font-mono flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" /> AI Powered
            </div>
          </motion.div>
        </div>

        <GradientSeparator />

        {/* --- Why Choose ShamsGS? Section --- */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-center mb-12 text-white tracking-tight"
          >
            Unparalleled Advantages
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title="Hyper-Speed Execution"
              description="Our optimized algorithms ensure lightning-fast trade execution, capitalizing on transient market shifts."
              color="cyan"
            />
            <FeatureCard
              icon={Lock}
              title="Ironclad Security"
              description="Built on robust code and comprehensive error handling for guaranteed reliability and secure operations."
              color="amber"
            />
            <FeatureCard
              icon={Headphones}
              title="Elite 24/7 Support"
              description="Round-the-clock technical support from experts, ensuring zero downtime and immediate assistance."
              color="blue"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
