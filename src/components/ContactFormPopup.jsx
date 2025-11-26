import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  CheckCircle,
  Info,
  Download,
  Repeat,
  Zap,
  ChevronDown,
  Search,
} from "lucide-react";

// Assuming commonCountryCodes is imported correctly from "../utils/countryCode"
import { commonCountryCodes } from "../utils/countryCode";

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
  const defaultCountryCode = "+971";
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [isCustomCode, setIsCustomCode] = useState(false);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isAgeChecked, setIsAgeChecked] = useState(false);
  const [hasDownloadedMT5, setHasDownloadedMT5] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- New States for Searchable Dropdown ---
  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const countrySelectRef = useRef(null);

  // Filtered country list based on search query
  const filteredCountryCodes = commonCountryCodes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery)
  );

  // Custom hook/function to handle clicks outside the country select
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countrySelectRef.current &&
        !countrySelectRef.current.contains(event.target)
      ) {
        setIsCountrySelectOpen(false);
        setSearchQuery(""); // Clear search when closing
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [countrySelectRef]);

  // Reset form when opened or closed
  useEffect(() => {
    if (isOpen) {
      setName("");
      setCountryCode(defaultCountryCode);
      setIsCustomCode(false);
      setMobile("");
      setEmail("");
      setIsAgeChecked(false);
      setHasDownloadedMT5(false);
      setErrors({});
      setIsSubmitting(false);
      setIsCountrySelectOpen(false); // Ensure dropdown is closed
      setSearchQuery("");
    }
  }, [isOpen]);

  // Handle selection from the search list
  const handleCountrySelect = (code) => {
    if (code === "custom") {
      setIsCustomCode(true);
      setCountryCode("");
    } else {
      setIsCustomCode(false);
      setCountryCode(code);
    }
    setIsCountrySelectOpen(false);
    setSearchQuery("");
  };

  // Basic form validation (kept the same)
  const validate = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";

    // Validation for Country Code
    const codeRegex = /^\+\d{1,4}$/;
    if (!countryCode.trim() || !codeRegex.test(countryCode.trim()))
      newErrors.countryCode = isCustomCode
        ? "Please enter a valid code (e.g., +971)."
        : "Country Code is required.";

    // Simple mobile validation: 7-15 digits
    const mobileRegex = /^\d{7,15}$/;
    if (!mobile.trim() || !mobileRegex.test(mobile.trim()))
      newErrors.mobile = "Valid mobile number (7-15 digits) is required.";

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim()))
      newErrors.email = "Valid email is required.";

    if (!isAgeChecked) newErrors.age = "You must be 18+ to proceed.";

    // Validation for MT5 download
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

    const fullMobileNumber = `${countryCode.trim()}${mobile.trim()}`;

    // --- STEP 1: Process and Send Data (API call mock) ---
    console.log("Submitting Data:", {
      buttonId,
      modeTitle,
      link,
      name,
      fullMobileNumber,
      countryCode,
      email,
      hasDownloadedMT5,
    });

    // Simulate API delay for better UX
    setTimeout(() => {
      setIsSubmitting(false);

      // --- STEP 2: Close popup and Redirect ---
      onClose();
      window.open(link, "_self");
    }, 1000);
  };

  if (!isOpen) return null;

  // Icon for the selected mode
  const ModeIcon = modeTitle === "FAST Mode" ? Zap : Repeat;

  // Get the display name for the selected country code
  const selectedCountry = commonCountryCodes.find(
    (c) => c.code === countryCode
  );
  const selectedCountryName = selectedCountry
    ? selectedCountry.name
    : isCustomCode
    ? countryCode
    : "Select Code";

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

          {/* Modal Content (Responsive: max-w-lg works well for mobile/desktop) */}
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
              {/* Checkboxes Section */}
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                  <span className="font-semibold">Mode Selected:</span>{" "}
                  {modeTitle}
                </div>
                {/* MT5 Download Checkbox */}
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
                {/* Age Checkbox */}
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

              {/* Mobile Input with Country Code Split (Searchable) */}
              <div className="flex space-x-3">
                {/* Country Code Input/Dropdown */}
                <div
                  className="w-1/3 sm:w-1/4 flex-shrink-0 relative"
                  ref={countrySelectRef}
                >
                  {isCustomCode ? (
                    // Custom Code Input Field
                    <input
                      type="tel"
                      placeholder="+XX"
                      value={countryCode}
                      onChange={(e) =>
                        setCountryCode(e.target.value.replace(/[^+\d]/g, ""))
                      }
                      className="w-full px-3 py-3 rounded-lg bg-gray-800 border border-cyan-500 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  ) : (
                    // Dropdown/Search Trigger
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setIsCountrySelectOpen(!isCountrySelectOpen)
                        }
                        className={`w-full px-3 py-3 rounded-lg bg-gray-800 border ${
                          errors.countryCode
                            ? "border-red-500"
                            : "border-gray-700"
                        } text-left text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 flex justify-between items-center`}
                      >
                        <span className="truncate">{selectedCountryName}</span>
                        <ChevronDown
                          className={`w-4 h-4 ml-1 text-gray-400 transition-transform ${
                            isCountrySelectOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>

                      {/* Searchable Dropdown List */}
                      <AnimatePresence>
                        {isCountrySelectOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 mt-1 w-[200%] sm:w-[250%] max-h-60 overflow-y-auto rounded-lg shadow-xl bg-gray-800 border border-cyan-500/50"
                          >
                            <div className="p-2 sticky top-0 bg-gray-800 z-20 border-b border-gray-700">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                  type="text"
                                  placeholder="Search country or code..."
                                  value={searchQuery}
                                  onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                  }
                                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
                                  autoFocus
                                />
                              </div>
                            </div>

                            {filteredCountryCodes.length > 0 ? (
                              filteredCountryCodes.map((c) => (
                                <div
                                  key={`${c.code}-${c.name}`}
                                  onClick={() => handleCountrySelect(c.code)}
                                  className={`px-4 py-2 cursor-pointer text-sm transition-colors ${
                                    c.code === countryCode
                                      ? "bg-cyan-600 text-white font-semibold"
                                      : "text-gray-200 hover:bg-gray-700"
                                  }`}
                                >
                                  {c.name}{" "}
                                  {c.code !== "custom" && `(${c.code})`}
                                </div>
                              ))
                            ) : (
                              <p className="px-4 py-4 text-gray-400 text-sm text-center">
                                No countries found.
                              </p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                  {errors.countryCode && (
                    <p className="text-red-400 text-xs italic absolute bottom-[-1.5rem] left-0 w-full">
                      {errors.countryCode}
                    </p>
                  )}
                </div>

                {/* Mobile Number Input */}
                <div className="flex-grow">
                  <input
                    type="tel"
                    placeholder="Mobile Number (e.g., 586354242)"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, ""))
                    } // Restrict to digits
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                  {errors.mobile && (
                    <p className="text-red-400 text-xs italic mt-1">
                      {errors.mobile}
                    </p>
                  )}
                </div>
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
