"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Mail, Phone, MapPin, ChevronUp, Link } from "lucide-react";

// --- Navigation Data (Copied from User's Navbar Structure) ---
const navItems = [
  { label: "About", to: "#about-us" },
  { label: "Services", to: "#services" },
  { label: "Pricing", to: "#pricing" },
  { label: "Technology", to: "#technology" },
  { label: "Contact", to: "#contact-us" },
];

// --- Company & Contact Info (Consistent Data) ---
const companyInfo = {
  shortName: "SHAMSGS",
  fullName: "AL-Shams AI",
  mission:
    "Empowering traders worldwide with automation tools that simplify trading and maximize performance in the dynamic world of Forex.",
  email: "shamsgs.work@gmail.com",
  phone: "+91 82628 71626",
  address: "Dubai, United Arab Emirates (Headquarters)",
};

// --- Footer Links (Updated based on user request) ---
const footerLinks = [
  {
    title: "Quick Navigation",
    links: navItems, // Using the Navbar structure
  },
  {
    title: "Key Resources",
    links: [
      // 🎯 MT5 Download: Must open in new tab (_blank)
      {
        name: "MT5 Download",
        href: "https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5",
        target: "_blank",
      },
      { name: "Automated Trading Benefits", href: "#benefits" },
      // 🎯 Removed Legal & FAQs links
    ],
  },
];

// --- Framer Motion Variants ---
const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 + 0.5 },
  }),
};

// --- Footer Component ---
export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Function to scroll the page to the top smoothly
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to handle smooth scrolling to internal sections
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const id = href.substring(1);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback for external links or if element is missing
      window.location.href = href;
    }
  };

  return (
    <motion.footer
      id="footer"
      className="relative w-full py-16 md:py-20 bg-gradient-to-br from-black via-gray-950 to-black text-white shadow-2xl overflow-hidden border-t border-blue-500/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerVariants}
    >
      {/* Background Layer: Subtle Radial Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full 
                   bg-radial-gradient from-cyan-400/5 via-blue-600/3 to-black 
                   filter blur-[100px] z-0"
      />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Section: Back to Top Button */}
        <div className="flex justify-center mb-10">
          <motion.a
            href="#top"
            onClick={scrollToTop}
            custom={0}
            variants={itemVariants}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold text-sm py-2 px-6 rounded-full border border-cyan-500/50 hover:border-cyan-400/80"
            whileHover={{ y: -2 }}
          >
            <ChevronUp className="w-4 h-4" />
            <span>Back to Top</span>
          </motion.a>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-700/50 pb-12 mb-8">
          {/* Column 1: Logo and Mission */}
          <motion.div
            custom={1}
            variants={itemVariants}
            className="col-span-2 lg:col-span-1 space-y-4"
          >
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="w-8 h-8 text-cyan-400" />
              <h3 className="text-3xl font-black text-white bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent">
                {companyInfo.shortName}
              </h3>
            </motion.div>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              {companyInfo.mission}
            </p>
          </motion.div>

          {/* Column 2 & 3: Navigation Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              custom={2 + sectionIndex}
              variants={itemVariants}
              key={section.title}
              className="space-y-4"
            >
              <h4 className="text-xl font-bold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label || link.name}>
                    <motion.a
                      // 🎯 Use 'to' for internal links (from navItems) and 'href' for others
                      href={link.to || link.href}
                      target={link.target || "_self"} // 🎯 Use target for MT5 to open in new tab
                      onClick={(e) =>
                        link.target
                          ? null
                          : scrollToSection(e, link.to || link.href)
                      } // Prevent smooth scroll on external links
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      {link.target === "_blank" && (
                        <Link className="w-4 h-4 mr-2" />
                      )}
                      {link.label || link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Column 4: Contact Info */}
          <motion.div
            custom={4}
            variants={itemVariants}
            className="col-span-2 lg:col-span-1 space-y-4"
          >
            <h4 className="text-xl font-bold mb-4 text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 flex-shrink-0 text-cyan-500 mt-1" />
                <p className="text-gray-400 text-sm">{companyInfo.address}</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 flex-shrink-0 text-cyan-500" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0 text-cyan-500" />
                <a
                  href={`https://wa.me/${companyInfo.phone.replace(
                    /[^0-9]/g,
                    ""
                  )}`}
                  target="_blank"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  {companyInfo.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex justify-center">
          <motion.span
            custom={5}
            variants={itemVariants}
            className="text-gray-500 text-xs font-light tracking-wider"
          >
            © {currentYear} {companyInfo.fullName}. All rights reserved.
          </motion.span>
        </div>
      </div>
    </motion.footer>
  );
}
