"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Bot, Mic, Shield, Zap } from "lucide-react";

/* Animations */
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ElevenLabsAgentPage() {
  useEffect(() => {
    // Load ElevenLabs script ONCE
    if (!document.getElementById("elevenlabs-script")) {
      const script = document.createElement("script");
      script.id = "elevenlabs-script";
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white ">
      {/* Header */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="border-b border-cyan-500/20 bg-gradient-to-br from-slate-900 via-black to-slate-950 "
      >
        <div className="max-w-5xl mx-auto px-4 py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
              <Bot className="w-9 h-9 text-cyan-400" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">
              SHAMSGS <span className="text-cyan-400">AI</span>
            </h1>
          </div>

          <p className="max-w-2xl text-gray-400 text-lg">
            Official AI voice & chat assistant representing{" "}
            <span className="text-cyan-400">shamsgs.com</span>. Get instant
            guidance on services, pricing, and solutions.
          </p>
        </div>
      </motion.section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
        {/* Capabilities */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Capability
            icon={Mic}
            title="Sales & Onboarding"
            text="Explains SHAMSGS services, plans, and next steps."
          />
          <Capability
            icon={Shield}
            title="Secure Conversations"
            text="Encrypted voice and text communication."
          />
          <Capability
            icon={Zap}
            title="Instant Response"
            text="Real-time answers with ultra-low latency."
          />
        </section>

        {/* AI Agent */}
        <section className="flex justify-center">
          <div className="relative w-full max-w-xl bg-slate-900 border border-cyan-500/30 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Talk to SHAMSGS AI</h2>
              <p className="text-xs text-cyan-400 mt-1 uppercase tracking-widest">
                Status: Online
              </p>
            </div>

            <div className="flex justify-center min-h-[380px]">
              <elevenlabs-convai
                agent-id="agent_8501kem2h5h4ed3vttatwx9b5fxh"
                action-text="Start Conversation"
              ></elevenlabs-convai>
            </div>
          </div>
        </section>
      </div>

      {/* Global styling for ElevenLabs */}
      <style jsx global>{`
        elevenlabs-convai::part(launcher) {
          display: none !important;
        }

        elevenlabs-convai {
          width: 100% !important;
          max-width: 380px !important;
          margin: 0 auto !important;
          background: transparent !important;
        }
      `}</style>
    </main>
  );
}

/* Small helper component */
function Capability({ icon: Icon, title, text }) {
  return (
    <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors">
      <Icon className="w-7 h-7 text-cyan-400 mb-3" />
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-sm text-gray-400">{text}</p>
    </div>
  );
}
