"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  TrendingUp,
  Twitter,
  Youtube,
  Facebook,
  Instagram,
} from "lucide-react";

// --- Nav items updated with new structure ---
const navItems = [
  { label: "About", to: "about-us" },
  { label: "Services", to: "services" },
  { label: "Pricing", to: "pricing" },
  { label: "Technology", to: "technology" },
  { label: "Contact", to: "contact-us" },
];

// --- Legal pages (separate routes, not scroll anchors) ---
const legalItems = [
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

// Social media links with brand colors
const socialLinks = [
  {
    name: "Twitter",
    href: "https://x.com/shamsgs",
    icon: Twitter,
    color: "hover:text-[#1DA1F2]",
    bgColor: "hover:bg-[#1DA1F2]/10",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@shamsgs",
    icon: Youtube,
    color: "hover:text-[#FF0000]",
    bgColor: "hover:bg-[#FF0000]/10",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Shamsgs/61584701334310/",
    icon: Facebook,
    color: "hover:text-[#1877F2]",
    bgColor: "hover:bg-[#1877F2]/10",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/shamsgs_",
    icon: Instagram,
    color: "hover:text-[#E4405F]",
    bgColor: "hover:bg-[#E4405F]/10",
  },
];

// --- Utility: Smooth scroll ---
function scrollToSection(id) {
  if (typeof window !== "undefined") {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// --- Variants ---
const navbarVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.8,
    },
  },
};

const navItemVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.95 },
};

// --- Component ---
function NavbarComponent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const observerRef = useRef(null);
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mounting and responsive behavior
  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024 && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isDrawerOpen]);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, [mounted, isDesktop]);

  // Active section logic
  useEffect(() => {
    if (!mounted || navbarHeight === 0) return;

    const rootMarginTop = `-${navbarHeight + 10}px`;
    const options = {
      root: null,
      rootMargin: `${rootMarginTop} 0px -70% 0px`,
      threshold: 0,
    };
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    observerRef.current = new IntersectionObserver(callback, options);
    const sections = ["hero", ...navItems.map((item) => item.to)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    sections.forEach((sec) => observerRef.current?.observe(sec));

    return () => {
      if (observerRef.current) {
        sections.forEach((sec) => observerRef.current?.unobserve(sec));
        observerRef.current.disconnect();
      }
    };
  }, [mounted, navbarHeight]);

  // Propagate navbar height to a CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--navbar-height",
      `${navbarHeight}px`
    );
  }, [navbarHeight]);

  // Pre-mount rendering
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Main Navbar - Only shows when scrolled */}
      <AnimatePresence>
        {scrolled && (
          <motion.nav
            ref={navbarRef}
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl"
          >
            <div className="mx-auto flex items-center justify-between px-6 lg:px-12 py-4 max-w-7xl relative z-10">
              {/* LOGO - Stacked Design */}
              <motion.button
                onClick={() => scrollToSection("hero")}
                className="flex flex-col items-start group"
                aria-label="Scroll to Home section"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="text-3xl lg:text-4xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  SHAMS
                </motion.div>

                <motion.div
                  className="text-[10px] lg:text-xs font-semibold tracking-[0.3em] text-amber-400/90"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  GLOBAL SYSTEMS
                </motion.div>

                <motion.div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-300 mt-1" />
              </motion.button>

              {/* Desktop Navigation */}
              {isDesktop && (
                <div className="flex items-center gap-6">
                  <motion.ul
                    className="flex gap-2 lg:gap-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, staggerChildren: 0.05 }}
                  >
                    {navItems.map(({ label, to }, idx) => (
                      <motion.li
                        key={to}
                        variants={navItemVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        custom={idx}
                      >
                        <motion.button
                          onClick={() => scrollToSection(to)}
                          className={`
                            px-5 py-2.5 rounded-lg font-semibold text-sm lg:text-base relative transition-all duration-200
                            ${
                              activeSection === to
                                ? "text-cyan-400 bg-cyan-500/10 border border-cyan-400/30"
                                : "text-gray-300 hover:text-white hover:bg-white/5"
                            }
                          `}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                        >
                          {label}

                          {activeSection === to && (
                            <motion.div
                              layoutId="nav-indicator"
                              className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-3/4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              }}
                            />
                          )}
                        </motion.button>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Legal Links - Desktop */}
                  <motion.div
                    className="flex items-center gap-2 pl-6 border-l border-cyan-500/20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {legalItems.map((item, idx) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.05 }}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </motion.div>

                  {/* Social Links - Desktop */}
                  <motion.div
                    className="flex items-center gap-2 pl-4 border-l border-cyan-500/20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {socialLinks.map((social, idx) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className={`p-2 rounded-lg text-gray-400 transition-all duration-200 ${social.color} ${social.bgColor}`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + idx * 0.05 }}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.a>
                      );
                    })}
                  </motion.div>
                </div>
              )}

              {/* Hamburger Menu (Mobile) */}
              {!isDesktop && (
                <motion.button
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                  whileTap={{ scale: 0.9 }}
                  aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {isDrawerOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && !isDesktop && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-80 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-l border-cyan-500/20 shadow-2xl overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
                <div className="flex flex-col">
                  <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    SHAMS
                  </div>
                  <div className="text-[10px] tracking-[0.3em] text-amber-400/90 font-semibold">
                    GLOBAL SYSTEMS
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Items */}
              <ul className="flex flex-col gap-2 p-6">
                {navItems.map(({ label, to }, idx) => (
                  <motion.li
                    key={to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <motion.button
                      onClick={() => {
                        scrollToSection(to);
                        setIsDrawerOpen(false);
                      }}
                      className={`
                        w-full text-left px-6 py-4 rounded-lg font-semibold transition-all duration-200
                        ${
                          activeSection === to
                            ? "text-cyan-400 bg-cyan-500/10 border border-cyan-400/30"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }
                      `}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{label}</span>
                        {activeSection === to && (
                          <TrendingUp className="w-4 h-4 text-cyan-400" />
                        )}
                      </div>
                    </motion.button>
                  </motion.li>
                ))}
              </ul>

              {/* Legal Links - Mobile */}
              <div className="px-6 pb-4">
                <div className="text-xs font-semibold text-gray-400 mb-3 tracking-wider">
                  LEGAL
                </div>
                <div className="flex flex-col gap-2">
                  {legalItems.map((item, idx) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className="px-4 py-3 rounded-lg bg-gray-800/50 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 text-sm font-medium"
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links - Mobile */}
              <div className="px-6 pb-6">
                <div className="text-xs font-semibold text-gray-400 mb-3 tracking-wider">
                  CONNECT WITH US
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className={`flex items-center justify-center p-4 rounded-xl bg-gray-800/50 text-gray-400 transition-all duration-200 ${social.color} ${social.bgColor}`}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + idx * 0.05 }}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-cyan-500/20 bg-black/50">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span>SYSTEMS ONLINE</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavbarComponent;
