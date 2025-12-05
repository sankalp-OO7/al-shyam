import React from "react";
import { motion } from "framer-motion";
import {
  Twitter as TwitterIcon,
  Youtube as YoutubeIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Globe as GlobeIcon,
} from "lucide-react";

// Simple floating social links widget (no chatbot, no popover)
// Appears bottom-right above existing chatbot
// Circular icons + handles deprecated icons via updated lucide-react set

export default function ShamsgsFloatingWidget() {
  const social = [
    {
      name: "Twitter",
      href: "https://x.com/shamsgs",
      icon: <TwitterIcon size={22} />,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@shamsgs",
      icon: <YoutubeIcon size={22} />,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/people/Shamsgs/61584701334310/",
      icon: <FacebookIcon size={22} />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/shamsgs_",
      icon: <InstagramIcon size={22} />,
    },
  ];

  return (
    <div
      className="fixed bottom-26 right-4 z-[99999] flex flex-col items-end gap-3"
      aria-label="SHAMSGS floating social links"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="flex flex-col gap-3 bg-neutral-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-neutral-700"
      >
        {social.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            title={s.name}
            className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-neutral-800 text-white shadow-lg hover:bg-neutral-700 transition-all hover:scale-110 active:scale-95"
          >
            {s.icon}
          </a>
        ))}
      </motion.div>
    </div>
  );
}
