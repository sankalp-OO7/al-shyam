"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Bot, Sparkles, MessageCircle } from "lucide-react";
import { useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.6 },
  }),
};

export default function ElevenLabsAgentPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white notranslate">
      {/* Header */}
      <motion.div
        className="relative border-b border-cyan-500/20 bg-gradient-to-br from-slate-900/80 via-black/90 to-slate-950/90"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <Bot className="w-10 h-10 text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              AI Sales Assistant
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl">
            Experience real-time voice and text conversations powered by
            ElevenLabs Conversational AI. Our intelligent agent is ready to
            answer questions, guide customers, and boost conversions 24/7.
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="space-y-14"
        >
          {/* Features */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 shadow-lg">
              <Sparkles className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-xl font-bold mb-2">Human-like Voice</h3>
              <p className="text-gray-300">
                Natural, expressive speech powered by ElevenLabs
                state-of-the-art voice models.
              </p>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 shadow-lg">
              <MessageCircle className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-xl font-bold mb-2">
                Real-time Conversations
              </h3>
              <p className="text-gray-300">
                Instantly engage visitors with low-latency, interactive AI
                conversations.
              </p>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 shadow-lg">
              <Bot className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-xl font-bold mb-2">24/7 Sales Agent</h3>
              <p className="text-gray-300">
                Always-on assistant that qualifies leads, answers FAQs, and
                supports customers automatically.
              </p>
            </div>
          </section>

          {/* Agent Embed */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl rounded-3xl" />
            <div className="relative bg-slate-900/80 border border-cyan-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
                Talk to Our AI Agent
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl">
                Click below to start a live conversation with our ElevenLabs AI
                Sales Assistant. You can speak or type your questions and get
                instant responses.
              </p>

              <div className="flex justify-center">
                <elevenlabs-convai agent-id="agent_8501kem2h5h4ed3vttatwx9b5fxh"></elevenlabs-convai>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Integrate This Agent?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-6">
              This AI agent can be embedded on landing pages, dashboards, and
              support portals to dramatically improve customer engagement.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Contact Our Team
            </Link>
          </section>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home
        </Link>
      </div>
    </main>
  );
}
