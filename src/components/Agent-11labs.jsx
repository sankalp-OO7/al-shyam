"use client";
import { useEffect, useState } from "react";
import { MessageCircle, X, Mic } from "lucide-react";

export default function ResponsiveElevenLabs() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingPermission, setIsLoadingPermission] = useState(false);
  const [hasAskedThisSession, setHasAskedThisSession] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.onload = () => {
      console.log("✅ ElevenLabs script loaded");
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const requestPermissions = async () => {
    setIsLoadingPermission(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      console.log("✅ Microphone permission granted");

      stream.getTracks().forEach((track) => {
        track.stop();
      });

      setIsLoadingPermission(false);
      setHasAskedThisSession(true);
    } catch (error) {
      setIsLoadingPermission(false);
      setHasAskedThisSession(true);
      console.warn("⚠️ Microphone permission denied:", error.name);
    }
  };

  const handleButtonClick = async () => {
    if (isOpen) {
      setIsOpen(false);
      setHasAskedThisSession(false);
      return;
    }

    // Open widget
    setIsOpen(true);

    // Request mic permission after a short delay
    if (!hasAskedThisSession && window.isSecureContext) {
      setTimeout(() => {
        requestPermissions();
      }, 500);
    }
  };

  return (
    <>
      {/* Loading Overlay - Small, non-intrusive */}
      {isLoadingPermission && (
        <div className="fixed bottom-[110px] left-6 z-[25000] pointer-events-none">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-cyan-500/30 shadow-2xl max-w-xs">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping"></div>
                <div className="relative bg-gradient-to-br from-cyan-400 to-cyan-600 p-2 rounded-full">
                  <Mic className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  Enable Voice?
                </p>
                <p className="text-gray-400 text-xs">Click Allow or Block</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ElevenLabs Widget - Controlled by custom element attribute */}
      <div style={{ display: isOpen ? "block" : "none" }}>
        <elevenlabs-convai agent-id="agent_8501kem2h5h4ed3vttatwx9b5fxh"></elevenlabs-convai>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={handleButtonClick}
        disabled={isLoadingPermission}
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
        className={`
          fixed bottom-6 left-6 z-[20000]
          flex items-center justify-center
          h-16 w-16 rounded-full
          shadow-2xl transition-all duration-300
          disabled:opacity-70 disabled:cursor-wait
          hover:scale-105 active:scale-95
          ${
            isOpen
              ? "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              : "bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-500 hover:from-cyan-500 hover:via-cyan-600 hover:to-blue-600"
          }
        `}
      >
        {isOpen ? (
          <X size={32} className="text-white" strokeWidth={2.5} />
        ) : (
          <MessageCircle size={32} className="text-white" strokeWidth={2.5} />
        )}

        {!isOpen && !isLoadingPermission && (
          <>
            <span className="absolute inset-0 rounded-full bg-cyan-300 animate-ping opacity-30"></span>
            <span className="absolute inset-0 rounded-full bg-cyan-400 animate-pulse opacity-40"></span>
          </>
        )}
      </button>

      <style jsx global>{`
        /* HIDE the default ElevenLabs launcher completely */
        #elevenlabs-convai-widget {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /* Position the actual chat widget at BOTTOM LEFT */
        elevenlabs-convai {
          position: fixed !important;
          bottom: 100px !important;
          left: 24px !important;
          right: auto !important;
          top: auto !important;
          width: 400px !important;
          max-width: calc(100vw - 48px) !important;
          height: 600px !important;
          max-height: calc(100vh - 140px) !important;
          z-index: 15000 !important;
          border-radius: 20px !important;
          overflow: hidden !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4) !important;
          background: transparent !important;
          border: none !important;
        }

        /* Mobile responsive */
        @media (max-width: 767px) {
          elevenlabs-convai {
            left: 12px !important;
            right: 12px !important;
            width: calc(100vw - 24px) !important;
            max-width: 100% !important;
            height: 500px !important;
            max-height: calc(100vh - 140px) !important;
          }
        }

        /* Make sure the iframe inside is visible */
        elevenlabs-convai iframe {
          width: 100% !important;
          height: 100% !important;
          border: none !important;
          border-radius: 20px !important;
        }

        /* Remove any forced backgrounds */
        elevenlabs-convai,
        elevenlabs-convai > *,
        elevenlabs-convai iframe {
          background: transparent !important;
        }
      `}</style>
    </>
  );
}
