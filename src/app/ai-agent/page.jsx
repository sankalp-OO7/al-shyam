"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  Mic,
  Shield,
  Zap,
  MessageSquare,
  Volume2,
  Sparkles,
  X,
} from "lucide-react";

/* Animations */
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  },
};

export default function ElevenLabsAgentPage() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (!document.getElementById("elevenlabs-script")) {
      const script = document.createElement("script");
      script.id = "elevenlabs-script";
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.onload = () => {
        console.log("✅ ElevenLabs script loaded");
        setScriptLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  const requestMicPermission = async () => {
    setIsRequestingPermission(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      console.log("✅ Microphone permission granted");
      stream.getTracks().forEach((track) => track.stop());

      setPermissionGranted(true);
      setIsRequestingPermission(false);
    } catch (error) {
      console.warn(
        "⚠️ Microphone denied, continuing with text chat:",
        error.name
      );
      setPermissionGranted(false);
      setIsRequestingPermission(false);
    }
  };

  const handleStartConversation = async () => {
    if (!scriptLoaded) {
      alert("AI is still loading, please wait a moment...");
      return;
    }

    // Request permission first
    await requestMicPermission();

    // Then show modal with widget
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPermissionGranted(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Permission Request Overlay */}
      <AnimatePresence>
        {isRequestingPermission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-cyan-500/30 shadow-2xl"
            >
              <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping"></div>
                  <div className="relative bg-gradient-to-br from-cyan-400 to-cyan-600 p-5 sm:p-6 rounded-full">
                    <Mic
                      className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                      strokeWidth={2}
                    />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Enable Voice Chat?
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm px-2">
                    Click{" "}
                    <span className="font-bold text-cyan-400">"Allow"</span> in
                    your browser popup for voice chat, or{" "}
                    <span className="font-bold text-gray-400">"Block"</span> to
                    use text only
                  </p>
                </div>
                <div className="flex gap-2">
                  <div
                    className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal with Widget */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>
              <motion.div
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
              ></motion.div>
              <motion.div
                animate={{
                  x: [0, -100, 0],
                  y: [0, 100, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
              ></motion.div>
              <motion.div
                animate={{
                  x: [0, 50, 0],
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-1/2 left-1/2 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
              ></motion.div>
            </div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={handleCloseModal}
              className="fixed top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 sm:p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-full text-red-400 hover:text-red-300 transition-all group"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            {/* Widget Container */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl my-auto"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-50 animate-pulse"></div>

              {/* Main Container */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-cyan-500/30 sm:border-2 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20 p-4 sm:p-6">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400" />
                    </motion.div>
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      SHAMSGS AI Assistant
                    </h2>
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400" />
                    </motion.div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-xs sm:text-sm text-cyan-400 uppercase tracking-wider">
                      {permissionGranted ? "Voice & Text" : "Text Chat"}
                    </p>
                  </div>
                </div>

                {/* Widget Area */}
                <div className="p-3 sm:p-6 md:p-8">
                  <div className="min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center">
                    <elevenlabs-convai agent-id="agent_8501kem2h5h4ed3vttatwx9b5fxh"></elevenlabs-convai>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-t border-cyan-500/20 p-3 sm:p-4">
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    <ModalBadge
                      icon={Mic}
                      text={permissionGranted ? "Voice" : "No Voice"}
                      active={permissionGranted}
                    />
                    <ModalBadge
                      icon={MessageSquare}
                      text="Text"
                      active={true}
                    />
                    <ModalBadge icon={Zap} text="AI" active={true} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative border-b border-cyan-500/20 bg-gradient-to-br from-slate-900/80 via-black/80 to-slate-950/80 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 mb-6 sm:mb-8 transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 shadow-lg">
              <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse border-2 border-black"></div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                SHAMSGS AI
              </h1>
              <p className="text-xs text-cyan-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live & Ready
              </p>
            </div>
          </div>

          <p className="max-w-2xl text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
            Your intelligent AI assistant for all{" "}
            <span className="text-cyan-400 font-semibold">
              Shams Global Systems
            </span>{" "}
            inquiries. Get instant guidance on automated trading, pricing, and
            technical support.
          </p>
        </div>
      </motion.section>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-8 sm:py-16 space-y-12 sm:space-y-20">
        {/* Capabilities Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <Capability
            icon={Mic}
            title="Voice & Text Support"
            text="Speak naturally or type - AI adapts to your preference instantly."
            index={0}
          />
          <Capability
            icon={Shield}
            title="Secure & Private"
            text="End-to-end encrypted conversations with enterprise-grade security."
            index={1}
          />
          <Capability
            icon={Zap}
            title="Lightning Fast"
            text="Sub-second response times powered by advanced AI infrastructure."
            index={2}
          />
        </section>

        {/* Start Button Section */}
        <section className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl sm:rounded-3xl blur-xl"></div>

            <div className="relative bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-cyan-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-pulse" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                    Talk to SHAMSGS AI
                  </h2>
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-pulse" />
                </div>
                <p className="text-xs sm:text-sm text-gray-400">
                  Available 24/7 • Voice & Text Enabled
                </p>
              </div>

              <div className="relative min-h-[150px] sm:min-h-[200px] flex items-center justify-center">
                <motion.button
                  onClick={handleStartConversation}
                  disabled={!scriptLoaded}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg text-white shadow-xl flex items-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                    {scriptLoaded ? (
                      <>
                        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        <span className="whitespace-nowrap">
                          Start Conversation
                        </span>
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Loading AI...</span>
                      </>
                    )}
                  </div>
                </motion.button>
              </div>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                <Badge icon={Mic} text="Voice" />
                <Badge icon={MessageSquare} text="Text" />
                <Badge icon={Zap} text="Instant" />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-3xl mx-auto text-center space-y-4 pb-8 sm:pb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 mt-6 sm:mt-8">
            <Step
              number="1"
              title="Start Chat"
              text="Click the button to activate the AI assistant"
            />
            <Step
              number="2"
              title="Ask Anything"
              text="Voice or text - ask about services, pricing, support"
            />
            <Step
              number="3"
              title="Get Answers"
              text="Receive instant, accurate responses from our AI"
            />
          </div>
        </section>
      </div>

      {/* Global styling */}
      <style jsx global>{`
        #elevenlabs-convai-widget,
        elevenlabs-convai::part(launcher) {
          display: none !important;
        }

        elevenlabs-convai {
          width: 100% !important;
          max-width: 100% !important;
          height: 100% !important;
          min-height: 400px !important;
          background: transparent !important;
          display: block !important;
        }

        elevenlabs-convai iframe {
          border-radius: 12px !important;
          width: 100% !important;
          height: 100% !important;
          min-height: 400px !important;
        }

        @media (min-width: 640px) {
          elevenlabs-convai {
            min-height: 500px !important;
          }

          elevenlabs-convai iframe {
            min-height: 500px !important;
            border-radius: 16px !important;
          }
        }

        @media (min-width: 768px) {
          elevenlabs-convai {
            min-height: 600px !important;
          }

          elevenlabs-convai iframe {
            min-height: 600px !important;
          }
        }
      `}</style>
    </main>
  );
}

/* Helper Components */
function Capability({ icon: Icon, title, text, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative bg-slate-900/80 border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-cyan-500/30 transition-all backdrop-blur-sm h-full">
        <div className="p-2 sm:p-3 bg-cyan-500/10 rounded-lg sm:rounded-xl w-fit mb-3 sm:mb-4">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
        </div>
        <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">{title}</h4>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

function Badge({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-800/50 border border-cyan-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
      <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
      <span className="text-gray-300">{text}</span>
    </div>
  );
}

function ModalBadge({ icon: Icon, text, active }) {
  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs transition-all ${
        active
          ? "bg-green-500/20 border border-green-500/30 text-green-400"
          : "bg-gray-500/20 border border-gray-500/30 text-gray-400"
      }`}
    >
      <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
      <span className="font-medium whitespace-nowrap">{text}</span>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="text-center space-y-2">
      <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl text-white shadow-lg">
        {number}
      </div>
      <h4 className="font-bold text-sm sm:text-base text-white">{title}</h4>
      <p className="text-xs sm:text-sm text-gray-400">{text}</p>
    </div>
  );
}
