"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ResponsiveElevenLabs() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
    <>
      {/* 1. DESKTOP & TABLET VIEW (md and up) */}
      <div className="hidden md:block">
        <elevenlabs-convai agent-id="agent_8501kem2h5h4ed3vttatwx9b5fxh"></elevenlabs-convai>
      </div>

      {/* 2. MOBILE VIEW (below md) */}
      <div className={`md:hidden ${isMobileOpen ? "block" : "hidden"}`}>
        <elevenlabs-convai agent-id="agent_8501kem2h5h4ed3vttatwx9b5fxh"></elevenlabs-convai>
      </div>

      {/* 3. MOBILE TOGGLE BUTTON */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed bottom-6 left-6 z-[10001] flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-black shadow-2xl md:hidden transition-transform active:scale-90"
      >
        {isMobileOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      <style jsx global>{`
        /* Hide default launcher */
        #elevenlabs-convai-widget {
          display: none !important;
        }

        /* Desktop Positioning: Tucked tighter to the left-bottom corner */
        @media (min-width: 768px) {
          elevenlabs-convai {
            position: fixed !important;
            bottom: 10px !important; /* Moved from 30px to 10px */
            left: 10px !important; /* Moved from 30px to 10px */
            width: 400px !important;
            z-index: 9999 !important;
          }
        }

        /* Mobile Positioning: stays standard for better finger spacing */
        @media (max-width: 767px) {
          elevenlabs-convai {
            position: fixed !important;
            bottom: 85px !important;
            left: 15px !important;
            width: calc(100vw - 30px) !important;
            z-index: 10000 !important;
          }
        }
      `}</style>
    </>
  );
}
