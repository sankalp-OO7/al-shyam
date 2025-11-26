// components/Pricing.js

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Repeat,
  Zap,
  Shield,
  DollarSign,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Scale,
  Target,
  GitMerge,
  Award,
  ThumbsUp,
  Info,
} from "lucide-react";
import ContactFormPopup from "./ContactFormPopup";

// --- Deep Link Constant ---
const MT5_FAST_MODE_LINK =
  "metatrader5://account?credentials=I71QMRMHmCrjQokaBGMz3uvFijOQbuiwkgHwTwiblIvVoCYMNsDB9NaJTFjtua9WJw==";

// --- Link Placeholder Constant (New) ---
const PENDING_LINK_PLACEHOLDER = "#pricing";
// const PENDING_LINK_PLACEHOLDER =
//   "metatrader5://account?credentials=I71QMRMHmCrjQokaBGMz3uvFijOQbuiwkgHwTwiblIvVoCYMNsDB9NaJTFjtua9WJw==";

// --- Animation Variants ---
const sectionHeaderVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1 + 0.5,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// --- Data Structure for Paid Tiers (Updated finalLink) ---
const pricingTiers = [
  {
    title: "FAST Mode",
    duration: "High Risk / High Reward",
    gradient: "from-red-500 to-orange-500",
    riskReward: "High Risk / High Reward",
    isFree: false,
    riskLevel: 5,
    rewardLevel: 5,
    pros: [
      "Highest Potential Returns",
      "Aggressive, High-Frequency Trading",
      "Premium 24/7 Support",
    ],
    cons: ["High Drawdown Risk", "High Volatility Tolerance"],
    features: [
      "1 Live Account License",
      "Aggressive Trading Strategy",
      "Weekly Optimization Check",
      "High Volatility Tolerance",
    ],
    finalLink: MT5_FAST_MODE_LINK,
  },
  {
    title: "SLOW Mode",
    duration: "Low Risk / Long-Term Growth",
    gradient: "from-green-600 to-emerald-700",
    riskReward: "Low Risk / Low Reward",
    isFree: false,
    riskLevel: 2,
    rewardLevel: 2,
    pros: [
      "Conservative & Stable Strategy",
      "Minimal Drawdown Profile",
      "Designed for long-term growth",
    ],
    cons: ["Lower Return Potential", "Max 2 Trades Per Day"],
    features: [
      "1 Live Account License",
      "Conservative Trading Strategy",
      "Standard 24/7 Support",
      "All updates included",
    ],
    finalLink: PENDING_LINK_PLACEHOLDER, // Placeholder
  },
  {
    title: "MODERATE Mode",
    duration: "Medium Risk / Balanced (Recommended)",
    gradient: "from-cyan-500 to-blue-500",
    riskReward: "Balanced",
    isFree: false,
    riskLevel: 3,
    rewardLevel: 3,
    pros: [
      "Optimized Balance Strategy",
      "Higher Consistency",
      "Priority 24/7 Support",
    ],
    cons: ["Moderate Drawdown Potential", "Requires Regular Monitoring"],
    features: [
      "1 Live Account License",
      "Balanced Risk/Reward Strategy",
      "Monthly Performance Check",
      "Access to Strategy Presets",
    ],
    finalLink: PENDING_LINK_PLACEHOLDER, // Placeholder
  },
  {
    title: "HEADING Mode",
    duration: "Specialized Trading Market Work",
    gradient: "from-yellow-500 to-orange-600",
    riskReward: "Specialized",
    isFree: false,
    riskLevel: 4,
    rewardLevel: 3,
    pros: [
      "AI for Specific Market Events",
      "Focus on High-Impact News",
      "Specialized Event Trading",
    ],
    cons: ["Less Frequent Trades", "Requires Careful Monitoring"],
    features: [
      "1 Live Account License",
      "AI designed for specific market events",
      "Dedicated Account Manager",
      "Exclusive Strategy Insights",
    ],
    finalLink: PENDING_LINK_PLACEHOLDER, // Placeholder
  },
  {
    title: "ADVANCE HEADGE Mode",
    duration: "Trading & Fast Movements",
    gradient: "from-violet-600 to-fuchsia-600",
    riskReward: "Specialized",
    isFree: false,
    riskLevel: 5,
    rewardLevel: 4,
    pros: [
      "Advanced Hedging Techniques",
      "Full Risk Customization",
      "Optimized for quick market shifts",
    ],
    cons: ["Complex Setup", "Maximum Risk Exposure"],
    features: [
      "1 Live Account License",
      "Advanced Hedging Techniques",
      "Full Risk Management Customization",
      "Free AI Optimization Session (Yearly)",
    ],
    finalLink: PENDING_LINK_PLACEHOLDER, // Placeholder
  },
  {
    title: "SCALPING Mode",
    duration: "High Accuracy in 15 mins",
    gradient: "from-purple-500 to-pink-500",
    riskReward: "Scalping",
    isFree: false,
    riskLevel: 4,
    rewardLevel: 4,
    pros: [
      "High-Precision 15-Minute Trades",
      "Quick Profit Realization",
      "Suitable for volatile markets",
    ],
    cons: ["Requires Low Spread Broker", "High Execution Speed Required"],
    features: [
      "1 Live Account License",
      "Ultra-Fast, Short-Term Strategy",
      "Dedicated Server Setup Guide",
      "Low Spread Broker Priority",
    ],
    finalLink: PENDING_LINK_PLACEHOLDER, // Placeholder
  },
];

// --- Sub-Component for Risk/Reward Visualization (RESTORED) ---
const RiskRewardMeter = ({ riskLevel, rewardLevel }) => {
  const getLevelColor = (level) => {
    if (level === 5) return "bg-red-500";
    if (level === 4) return "bg-orange-500";
    if (level === 3) return "bg-yellow-500";
    if (level === 2) return "bg-green-500";
    return "bg-gray-500";
  };

  return (
    <div className="space-y-2 mb-6 text-xs font-semibold">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Risk Level</span>
        <span
          className={`${getLevelColor(
            riskLevel
          )} text-white px-2 py-0.5 rounded-full`}
        >
          {riskLevel}/5
        </span>
      </div>
      <div className="flex w-full h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`${getLevelColor(riskLevel)} transition-all duration-500`}
          style={{ width: `${(riskLevel / 5) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-gray-400">Reward Potential</span>
        <span
          className={`${getLevelColor(
            rewardLevel
          )} text-white px-2 py-0.5 rounded-full`}
        >
          {rewardLevel}/5
        </span>
      </div>
      <div className="flex w-full h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`${getLevelColor(
            rewardLevel
          )} transition-all duration-500`}
          style={{ width: `${(rewardLevel / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
// --- END RiskRewardMeter ---

// --- Reusable Pricing Card Component ---
const PricingCard = ({
  title,
  duration,
  features,
  gradient,
  riskReward,
  customDelay,
  riskLevel,
  rewardLevel,
  pros,
  finalLink,
  onOpenPopup,
}) => {
  const isRecommended = riskReward === "Balanced";
  const isFastMode = title === "FAST Mode";

  const primaryButtonText = isFastMode
    ? "Start Trading (Fast Login)"
    : "Get Live Demo";

  const primaryButtonStyle = isFastMode
    ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-red-500/50 hover:shadow-lg hover:from-red-700 hover:to-orange-700"
    : "bg-gray-700/70 border border-blue-500/30 text-white hover:bg-gray-600";

  return (
    <motion.div
      custom={customDelay}
      variants={stepVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative p-5 sm:p-6 rounded-xl shadow-2xl transition-all duration-500 h-full w-full max-w-lg min-w-[300px] mx-auto flex flex-col justify-between min-h-[700px]
                  ${
                    isRecommended
                      ? "bg-gray-800/90 border-2 border-cyan-500 shadow-cyan-900/70 z-20"
                      : "bg-gray-900/80 border border-gray-700/50 hover:border-violet-500/50 z-10"
                  }
                  hover:shadow-xl group overflow-hidden`}
    >
      {/* Ribbons/Badges */}
      {isRecommended && (
        <div className="absolute top-0 right-0 px-4 py-1 bg-cyan-500 text-gray-900 font-bold rounded-bl-lg text-xs tracking-wider flex items-center">
          <Award className="w-3 h-3 mr-1" /> RECOMMENDED
        </div>
      )}
      {isFastMode && (
        <div className="absolute top-0 right-0 px-4 py-1 bg-red-600 text-white font-bold rounded-bl-lg text-xs tracking-wider">
          HIGH REWARD
        </div>
      )}

      {/* Gradient Background Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      />

      <div className="relative z-10 flex flex-col flex-grow">
        <h3 className="text-2xl font-extrabold mb-1 text-white">{title}</h3>

        {/* Duration/Risk Tag */}
        <p className="text-gray-400 text-sm mb-6 flex items-center font-medium">
          {isFastMode && <TrendingUp className="w-4 h-4 mr-1 text-red-500" />}
          {riskReward === "Low Risk / Low Reward" && (
            <TrendingDown className="w-4 h-4 mr-1 text-green-500" />
          )}
          {riskReward === "Balanced" && (
            <Scale className="w-4 h-4 mr-1 text-cyan-500" />
          )}
          {riskReward === "Specialized" && (
            <GitMerge className="w-4 h-4 mr-1 text-yellow-500" />
          )}
          {riskReward === "Scalping" && (
            <Target className="w-4 h-4 mr-1 text-purple-500" />
          )}
          {duration}
        </p>

        {/* Risk/Reward Visualizations */}
        <RiskRewardMeter riskLevel={riskLevel} rewardLevel={rewardLevel} />

        {/* Price (Simplified - Removed "Full License Required") */}
        <div className="my-4 border-b border-gray-700 pb-4">
          <p className="text-3xl font-extrabold text-white">
            $600{" "}
            <span className="text-gray-500 text-sm font-medium">
              / Billed Annually
            </span>
          </p>
        </div>

        {/* Pros (Cons removed, Pros takes full width) */}
        <div className="mb-6 pt-2">
          <div>
            <p className="text-sm font-bold text-green-400 flex items-center mb-1">
              <ThumbsUp className="w-4 h-4 mr-1" /> Pros
            </p>
            <ul className="space-y-1">
              {pros.slice(0, 2).map((p, i) => (
                <li key={i} className="text-xs text-gray-300 flex items-start">
                  <span className="text-green-500 mr-2 flex-shrink-0">•</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features List */}
        <p className="text-sm font-bold text-white mt-4 mb-3">Key Features:</p>
        <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-4 h-4 mt-1 mr-3 flex-shrink-0 text-cyan-400" />
              <span className="text-xs">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Fill space */}
        <div className="flex-grow min-h-[1rem]"></div>

        {/* Action Button */}
        <motion.button
          onClick={() => onOpenPopup(title, finalLink)}
          className={`w-full py-3 font-bold rounded-lg shadow-lg relative overflow-hidden transition-all duration-300 flex items-center justify-center text-lg
                      ${
                        isRecommended
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/50 hover:shadow-lg"
                          : primaryButtonStyle
                      }`}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 text-base">{primaryButtonText}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function Pricing() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({
    buttonId: "",
    link: "",
    modeTitle: "",
  });

  const handleOpenPopup = (title, link) => {
    setPopupData({
      buttonId: title,
      link: link,
      modeTitle: title,
    });
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handle3StepClick = (title) => {
    // For step 3, we treat it as a general "contact" action
    if (title === "Deployment") {
      setPopupData({
        buttonId: "3-Step-Deployment",
        // Use the generic placeholder here
        link: PENDING_LINK_PLACEHOLDER,
        modeTitle: "General Inquiry (Trial)",
      });
      setIsPopupOpen(true);
    }
  };

  return (
    <section
      id="pricing"
      className="relative py-24 lg:py-40 bg-gray-950 border-b border-blue-500/10 overflow-hidden"
    >
      <ContactFormPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        buttonId={popupData.buttonId}
        link={popupData.link}
        modeTitle={popupData.modeTitle}
        linkPlaceholder={PENDING_LINK_PLACEHOLDER} // Pass the placeholder string
      />

      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          background:
            "radial-gradient(circle at top right, #001f3f 0%, transparent 50%), radial-gradient(circle at bottom left, #370665 0%, #0D1117 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.h2
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-6xl lg:text-7xl font-extrabold text-center mb-4 tracking-tighter"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Power Your Trading.
          </span>
        </motion.h2>

        {/* General Pricing Heading - FONT SIZE INCREASED */}
        <motion.h3
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="text-5xl lg:text-6xl font-extrabold text-white text-center mb-4 tracking-tight"
        >
          <span className="text-white">600 DOLLER YEARLY MEMBERSHIP</span>
        </motion.h3>

        <motion.p
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-center text-xl text-gray-400 max-w-4xl mx-auto mb-12 font-light"
        >
          Select the AI Mode that matches your risk tolerance and trading
          frequency. All licenses start at $600 / Year.
        </motion.p>

        {/* Step-by-Step Setup Guide */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-12 text-white text-center">
            Your 3-Step Automation Setup
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1: Download MT5 */}
            <motion.div
              custom={0}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="p-6 rounded-xl bg-gray-900/70 border border-cyan-500/30 shadow-lg text-center"
            >
              <div className="text-5xl font-black text-cyan-400 mb-4">1</div>
              <Download className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-3">
                Download MT5
              </h4>
              <p className="text-gray-400 mb-4 text-sm">
                Our AI runs on the free MT5 platform. Download the app to begin
                the process.
              </p>
              <motion.a
                href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5"
                target="_blank"
                className="inline-flex items-center justify-center w-full py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:from-green-600 hover:to-emerald-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download MT5 App
              </motion.a>
            </motion.div>

            {/* Step 2: Choose License */}
            <motion.div
              custom={1}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="p-6 rounded-xl bg-gray-900/70 border border-blue-500/30 shadow-lg text-center"
            >
              <div className="text-5xl font-black text-blue-400 mb-4">2</div>
              <DollarSign className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-3">
                Select AI Mode
              </h4>
              <p className="text-gray-400 mb-4 text-sm">
                Select your preferred risk mode from the tiers below to obtain
                your license key.
              </p>
              <motion.a
                href="#license-tiers"
                className="inline-flex items-center justify-center w-full py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("license-tiers")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Repeat className="w-4 h-4 mr-2" />
                View Modes Below
              </motion.a>
            </motion.div>

            {/* Step 3: Deployment */}
            <motion.div
              custom={2}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="p-6 rounded-xl bg-gray-900/70 border border-violet-500/30 shadow-lg text-center"
            >
              <div className="text-5xl font-black text-violet-400 mb-4">3</div>
              <Zap className="w-10 h-10 text-violet-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-3">
                Start with 10-Day Free Trial
              </h4>
              <p className="text-gray-400 mb-4 text-sm">
                Install the Expert Advisor file with your license key to start
                automated trading.
              </p>
              <motion.button
                onClick={() => handle3StepClick("Deployment")}
                className="inline-flex items-center justify-center w-full py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-violet-500 to-fuchsia-600 shadow-md hover:from-violet-600 hover:to-fuchsia-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-4 h-4 mr-2" />
                Start Your Journey
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Pricing Tiers - Reordered */}
        <div id="license-tiers">
          <h3 className="text-4xl font-bold mb-12 text-white text-center">
            SHAMSGS AI License Modes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div key={tier.title} className="flex">
                <PricingCard
                  {...tier}
                  customDelay={index * 0.1}
                  finalLink={tier.finalLink}
                  onOpenPopup={handleOpenPopup}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
