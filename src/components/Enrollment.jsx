import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, UserPlus } from "lucide-react";

// Sample data for generating realistic-looking enrollment notifications
const ENROLLMENT_DATA = [
  { name: "A. Sharma", country: "India", flag: "🇮🇳" },
  { name: "J. Smith", country: "United States", flag: "🇺🇸" },
  { name: "C. Chen", country: "China", flag: "🇨🇳" },
  { name: "M. Gauthier", country: "France", flag: "🇫🇷" },
  { name: "R. Silva", country: "Brazil", flag: "🇧🇷" },
  { name: "D. Kim", country: "South Korea", flag: "🇰🇷" },
  { name: "O. Adebayo", country: "Nigeria", flag: "🇳🇬" },
  { name: "Y. Tanaka", country: "Japan", flag: "🇯🇵" },
  { name: "L. Petrov", country: "Russia", flag: "🇷🇺" },
  { name: "S. Al-Farsi", country: "Saudi Arabia", flag: "🇸🇦" },
];

const MIN_DELAY_MS = 30000; // 30 seconds
const MAX_DELAY_MS = 120000; // 120 seconds (2 minutes)
const VISIBILITY_DURATION_MS = 5000; // 5 seconds

// Animation variants for entering from the bottom left
const toastVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.5 },
  },
  exit: { x: -300, opacity: 0, transition: { duration: 0.4 } },
};

export default function EnrollmentToast() {
  const [currentEnrollment, setCurrentEnrollment] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Function to generate a random delay between MIN_DELAY and MAX_DELAY
  const getRandomDelay = () => {
    return Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS) + MIN_DELAY_MS;
  };

  // Function to schedule the next toast appearance
  const scheduleNextToast = useCallback(() => {
    const delay = getRandomDelay();

    const timeoutId = setTimeout(() => {
      // 1. Select a random enrollment
      const randomIndex = Math.floor(Math.random() * ENROLLMENT_DATA.length);
      setCurrentEnrollment(ENROLLMENT_DATA[randomIndex]);

      // 2. Make the toast visible
      setIsVisible(true);

      // 3. Schedule the toast to disappear
      const hideTimeoutId = setTimeout(() => {
        setIsVisible(false);
      }, VISIBILITY_DURATION_MS);

      // 4. Recursively schedule the next appearance after it has disappeared
      const nextScheduleTimeoutId = setTimeout(() => {
        scheduleNextToast();
      }, VISIBILITY_DURATION_MS + 500); // 500ms buffer after exit transition

      return () => {
        clearTimeout(hideTimeoutId);
        clearTimeout(nextScheduleTimeoutId);
      };
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);

  // Effect to start the scheduling process on component mount
  useEffect(() => {
    return scheduleNextToast();
  }, [scheduleNextToast]);

  return (
    <div className="fixed top-4 right-4 z-[100] pointer-events-none">
      <AnimatePresence>
        {isVisible && currentEnrollment && (
          <motion.div
            key="enrollment-toast"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={toastVariants}
            className="bg-gray-800 border-l-4 border-cyan-500 rounded-lg shadow-xl p-4 flex items-center space-x-3 max-w-xs pointer-events-auto"
          >
            <UserPlus className="w-6 h-6 text-green-400 flex-shrink-0" />

            <div className="flex flex-col">
              <p className="text-sm font-semibold text-white">
                New Enrollment!
              </p>
              <p className="text-xs text-gray-300">
                {currentEnrollment.flag}{" "}
                <span className="font-medium">{currentEnrollment.name}</span>{" "}
                from {currentEnrollment.country} just joined!
              </p>
              <div className="flex items-center text-cyan-400 text-xs mt-1">
                <Zap className="w-3 h-3 mr-1" /> Activated AI Trading
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
