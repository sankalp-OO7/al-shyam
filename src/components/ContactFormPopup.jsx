import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Info, Download, Repeat, Zap } from "lucide-react";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95 },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function ContactFormPopup({
  isOpen,
  onClose,
  buttonId,
  link,
  modeTitle,
}) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isAgeChecked, setIsAgeChecked] = useState(false);
  // New state for MT5 download confirmation
  const [hasDownloadedMT5, setHasDownloadedMT5] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when opened or closed
  useEffect(() => {
    if (isOpen) {
      setName("");
      setMobile("");
      setEmail("");
      setIsAgeChecked(false);
      setHasDownloadedMT5(false); // Reset new state
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Basic form validation
  const validate = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";

    // Simple mobile validation: 7-15 digits
    const mobileRegex = /^\d{7,15}$/;
    if (!mobile.trim() || !mobileRegex.test(mobile.trim()))
      newErrors.mobile = "Valid mobile number is required.";

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim()))
      newErrors.email = "Valid email is required.";

    if (!isAgeChecked) newErrors.age = "You must be 18+ to proceed.";

    // New validation for MT5 download
    if (!hasDownloadedMT5)
      newErrors.mt5 = "Please confirm you have downloaded MetaTrader 5 (MT5).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // --- STEP 1: Process and Send Data (API call mock) ---
    console.log("Submitting Data:", {
      buttonId,
      modeTitle,
      link,
      name,
      mobile,
      email,
      hasDownloadedMT5, // Log new data point
    });

    // Simulate API delay for better UX
    setTimeout(() => {
      setIsSubmitting(false);

      // --- STEP 2: Close popup and Redirect ---
      onClose(); // Close the modal first

      // If the link is the special MT5 fast link, use _self to launch the app/open the deep link
      if (modeTitle === "FAST Mode") {
        window.location.href = link;
      } else {
        // For all other legitimate links, open in the same tab, as requested
        window.open(link, "_self");
      }
    }, 1000); // 1 second delay
  };

  if (!isOpen) return null;

  // Icon for the selected mode
  const ModeIcon = modeTitle === "FAST Mode" ? Download : Repeat;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-gray-900 border border-cyan-500/50 rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 z-50"
            variants={modalVariants}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center">
              <ModeIcon className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Start Your AI Trading Journey
              </h2>
              <p className="text-lg font-semibold text-amber-400">
                Mode: {modeTitle}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Please complete the form to access your **{modeTitle}**
                activation link.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Checkboxes */}
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                  <span className="font-semibold">Mode Selected:</span>{" "}
                  {modeTitle}
                </div>
                <div className="flex items-center">
                  <Download className="w-5 h-5 mr-3 text-cyan-500 flex-shrink-0" />
                  <span className="font-semibold">Requires MT5:</span> Yes
                </div>

                {/* MT5 Download Checkbox (New) */}
                <label className="flex items-center space-x-3 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={hasDownloadedMT5}
                    onChange={(e) => setHasDownloadedMT5(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                  />
                  <span className="text-base font-semibold">
                    I have already downloaded the MetaTrader 5 (MT5) APK.
                  </span>
                </label>
                {errors.mt5 && (
                  <p className="text-red-400 text-xs italic mt-1">
                    {errors.mt5}
                  </p>
                )}

                {/* Age Checkbox (Moved after MT5 for visual grouping) */}
                <label className="flex items-center space-x-3 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={isAgeChecked}
                    onChange={(e) => setIsAgeChecked(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                  />
                  <span className="text-base font-semibold">
                    I confirm I am 18 years or older.
                  </span>
                </label>
                {errors.age && (
                  <p className="text-red-400 text-xs italic mt-1">
                    {errors.age}
                  </p>
                )}
              </div>

              {/* Name Input */}
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs italic mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Mobile Input */}
              <div>
                <input
                  type="tel"
                  placeholder="Mobile Number (e.g., 919876543210)"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
                {errors.mobile && (
                  <p className="text-red-400 text-xs italic mt-1">
                    {errors.mobile}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs italic mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center text-lg"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Proceed to {modeTitle} Link
                  </>
                )}
              </motion.button>

              <p className="text-xs text-gray-500 text-center flex items-center justify-center pt-2">
                <Info className="w-3 h-3 mr-1" /> Your data is safe and will
                only be used to provide access.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
