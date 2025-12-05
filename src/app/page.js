"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// --- Component Imports ---
import ShamsgsFloatingWidget from "@/components/SocialMedia";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LoadingOverlay from "@/components/LoadingOverlay";

// New Component Imports
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing"; // Maps to former Projects slot
import Technology from "@/components/Technology"; // Maps to former Career/Gallery slot
import ContactUs from "@/components/ContactUs";

// --- CONTENT Animation Variants ---
const contentFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 1.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const sectionSlideIn = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const LOADING_DURATION_MS = 3500; // Define the duration here for state management

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Always hide scrollbar when loading
    document.body.style.overflow = "hidden";

    // Timer to finish loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset"; // Re-enable scroll after animation
    }, LOADING_DURATION_MS);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset"; // Clean up on unmount
    };
  }, []); // Runs once on mount

  return (
    <>
      {/* 1. Render the separate LoadingOverlay component */}
      <LoadingOverlay isLoading={isLoading} />
      {/* <ShamsgsFloatingWidget /> */}

      {/* 2. Main Content Wrapper */}
      <motion.div
        initial={isLoading ? "hidden" : "visible"}
        animate={!isLoading ? "visible" : "hidden"} // Animate when not loading
        variants={contentFadeIn}
        className="min-h-screen text-gray-100"
      >
        <motion.section
          id="navbar"
          variants={sectionSlideIn}
          initial="hidden"
          animate={!isLoading ? "visible" : "hidden"}
          transition={!isLoading ? { delay: 0.2 } : { duration: 0 }}
        >
          <Navbar />
        </motion.section>

        <main>
          <motion.section
            id="hero"
            variants={sectionSlideIn}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            transition={!isLoading ? { delay: 0.4 } : { duration: 0 }}
          >
            <HeroSection />
          </motion.section>

          <motion.section
            id="about-us"
            variants={sectionSlideIn}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            transition={!isLoading ? { delay: 0.6 } : { duration: 0 }}
          >
            <AboutUs />
          </motion.section>

          <motion.section
            id="services"
            variants={sectionSlideIn}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            transition={!isLoading ? { delay: 0.8 } : { duration: 0 }}
          >
            <Services />
          </motion.section>

          {/* Mapped former 'projects' slot to 'pricing' */}
          <motion.section
            id="pricing"
            variants={sectionSlideIn}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            transition={!isLoading ? { delay: 1.0 } : { duration: 0 }}
          >
            <Pricing />
          </motion.section>

          {/* Mapped former 'career' slot to 'technology' */}
          <motion.section
            id="technology"
            variants={sectionSlideIn}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            transition={!isLoading ? { delay: 1.2 } : { duration: 0 }}
          >
            <Technology />
          </motion.section>

          <motion.section
            id="contact-us"
            variants={sectionSlideIn}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            transition={!isLoading ? { delay: 1.4 } : { duration: 0 }}
          >
            <ContactUs />
          </motion.section>
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
