"use client";
import { useEffect, useState } from "react";
import { MessageCircle, X, Mic, AlertCircle } from "lucide-react";

export default function ResponsiveElevenLabs() {
  const [isOpen, setIsOpen] = useState(false);
  const [permissionState, setPermissionState] = useState("prompt"); // prompt, granted, denied, checking
  const [showPermissionUI, setShowPermissionUI] = useState(false);

  useEffect(() => {
    // Load ElevenLabs script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    document.body.appendChild(script);

    // Check current microphone permission status
    checkPermissionStatus();

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const checkPermissionStatus = async () => {
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const result = await navigator.permissions.query({
          name: "microphone",
        });
        setPermissionState(result.state);

        // Listen for permission changes
        result.onchange = () => {
          setPermissionState(result.state);
        };
      }
    } catch (err) {
      console.log("Permission API not supported, will request on interaction");
    }
  };

  const requestMicrophonePermission = async () => {
    setPermissionState("checking");
    setShowPermissionUI(true);

    try {
      // Request microphone access - this triggers the browser's permission popup
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Success! Stop the test stream immediately
      stream.getTracks().forEach((track) => track.stop());

      // Update state
      setPermissionState("granted");
      setShowPermissionUI(false);

      // Small delay to ensure permission is fully processed
      setTimeout(() => {
        setIsOpen(true);
      }, 300);
    } catch (err) {
      console.error("Microphone permission error:", err);

      if (err.name === "NotAllowedError") {
        setPermissionState("denied");
      } else if (err.name === "NotFoundError") {
        alert("No microphone found on your device.");
        setShowPermissionUI(false);
      } else {
        alert(
          "Unable to access microphone. Please check your browser settings."
        );
        setShowPermissionUI(false);
      }
    }
  };

  const handleButtonClick = () => {
    if (isOpen) {
      // Close the widget
      setIsOpen(false);
      return;
    }

    // Check if we're on a secure connection
    if (!window.isSecureContext) {
      alert(
        "Microphone access requires HTTPS or localhost. Please use a secure connection."
      );
      return;
    }

    // If permission already granted, open directly
    if (permissionState === "granted") {
      setIsOpen(true);
      return;
    }

    // Otherwise, request permission first
    requestMicrophonePermission();
  };

  const handleResetPermission = () => {
    setShowPermissionUI(false);
    alert(
      "To reset microphone permissions:\n\n" +
        "Chrome: Click the lock icon (🔒) in the address bar → Site settings → Reset permissions\n\n" +
        "Safari: Safari menu → Settings for this website → Microphone → Allow\n\n" +
        "Firefox: Click the site information icon → More information → Permissions → Use the Microphone"
    );
  };

  return (
    <>
      {/* Permission Request Overlay */}
      {showPermissionUI && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[25000] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 max-w-md w-full border-2 border-cyan-500/30 shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
              {permissionState === "checking" && (
                <>
                  <div className="relative">
                    <Mic className="w-16 h-16 text-cyan-400" />
                    <div className="absolute inset-0 animate-ping">
                      <Mic className="w-16 h-16 text-cyan-400/50" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Microphone Access Required
                  </h3>
                  <p className="text-gray-300">
                    Please click{" "}
                    <strong className="text-cyan-400">"Allow"</strong> when your
                    browser asks for microphone permission.
                  </p>
                  <div className="flex gap-2">
                    <div
                      className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </>
              )}

              {permissionState === "denied" && (
                <>
                  <AlertCircle className="w-16 h-16 text-red-400" />
                  <h3 className="text-2xl font-bold text-white">
                    Permission Blocked
                  </h3>
                  <p className="text-gray-300">
                    You've blocked microphone access. To use voice chat, you'll
                    need to enable it in your browser settings.
                  </p>
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={handleResetPermission}
                      className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 px-4 rounded-lg transition-all"
                    >
                      How to Fix
                    </button>
                    <button
                      onClick={() => setShowPermissionUI(false)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ElevenLabs Widget Container */}
      <div
        className="elevenlabs-container"
        style={{
          display: isOpen ? "block" : "none",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <elevenlabs-convai agent-id="agent_8501kem2h5h4ed3vttatwx9b5fxh"></elevenlabs-convai>
      </div>

      {/* Toggle Button */}
      <button
        onClick={handleButtonClick}
        className={`fixed bottom-6 left-6 z-[20000] flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all active:scale-90 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : permissionState === "granted"
            ? "bg-cyan-500 hover:bg-cyan-600"
            : "bg-cyan-500 hover:bg-cyan-600 animate-pulse"
        }`}
        aria-label={isOpen ? "Close voice assistant" : "Open voice assistant"}
      >
        {isOpen ? (
          <X size={30} className="text-white" />
        ) : (
          <MessageCircle size={30} className="text-black" />
        )}

        {/* Permission indicator */}
        {!isOpen && permissionState !== "granted" && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
          </span>
        )}
      </button>

      <style jsx global>{`
        /* Hide default ElevenLabs launcher */
        #elevenlabs-convai-widget {
          display: none !important;
        }

        /* Desktop positioning */
        @media (min-width: 768px) {
          elevenlabs-convai {
            position: fixed !important;
            bottom: 100px !important;
            left: 20px !important;
            width: 400px !important;
            max-height: 600px !important;
            z-index: 15000 !important;
          }
        }

        /* Mobile positioning */
        @media (max-width: 767px) {
          elevenlabs-convai {
            position: fixed !important;
            bottom: 100px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 90vw !important;
            max-width: 400px !important;
            max-height: 70vh !important;
            z-index: 15000 !important;
          }
        }

        /* Smooth transitions */
        .elevenlabs-container {
          transition: opacity 0.3s ease-in-out;
        }

        /* Ensure widget is accessible */
        elevenlabs-convai {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
