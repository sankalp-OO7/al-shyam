import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Assuming you still want to use Geist fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// --- UPDATED METADATA FOR SHAMS GLOBAL SYSTEM ---
export const metadata = {
  // Enhanced Primary Meta Tags for Better SEO
  title: "Shams Global Systems | AI-Powered Automated Forex Trading Robots",
  description:
    "Shams Global Systems offers advanced, autonomous trading AI (Expert Advisors) for the Forex market. Execute trades with hyper-speed, emotion-free precision. Based in Dubai, UAE. Start your 10-Day Free Trial. License starts at $600/Year.",

  // Comprehensive Keywords for Global Trading SEO
  keywords:
    "Shams Global Systems, Automated Trading AI, Forex Trading Robot, Expert Advisor MT4 MT5, MQL4 MQL5 Development, Algorithmic Trading Dubai, Autonomous Forex Trading, Trading AI License, High Frequency Trading, Forex EA, Custom Trading Bots, ShamsGS, Earn while sleeping, MT5 Expert Advisor, Trading Automation, Forex Signal Provider, Best Trading AI, Trading Algorithm Optimization, Dubai Financial Services",

  // Author and Publisher Information
  author: "Shams Global Systems",
  publisher: "Shams Global Systems Dubai",

  // Geo-targeting for UAE Market
  "geo.region": "AE-DU",
  "geo.placename": "Dubai, UAE",
  "geo.position": "25.2048;55.2708",
  ICBM: "25.2048, 55.2708",

  // Language and Content Specifications
  "content-language": "en-US, ar-AE",

  // Enhanced Robots Configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    bingBot: {
      index: true,
      follow: true,
      nocache: false,
    },
  },

  // Enhanced Open Graph using existing banner.png (assuming this is your main graphic)
  openGraph: {
    title:
      "Shams Global Systems | AI Forex Trading Bots & Expert Advisor Development",
    description:
      "Precision automation for Forex trading. Shams Global Systems provides MQL4/MQL5 Expert Advisors for hyper-speed, 24/7, emotion-free execution. Based in Dubai, UAE.",
    url: "https://shamsgs.com/", // Assuming shamsgs.com will be the final domain
    type: "website",
    locale: "en_US",
    siteName: "Shams Global Systems - Trading AI",
    images: [
      {
        url: "/banner.png", // Use relative path if the image is in /public
        width: 1200,
        height: 630,
        alt: "Shams Global Systems: AI-Powered Trading Robot - Forex Expert Advisor",
        type: "image/png",
      },
    ],
  },

  // Enhanced Twitter Card using existing banner.png
  twitter: {
    card: "summary_large_image",
    site: "@ShamsGlobalSys", // Placeholder, use your actual handle
    creator: "@ShamsGlobalSys",
    title: "AI Forex Trading Robots | Shams Global Systems",
    description:
      "Maximize performance in Forex with our autonomous Expert Advisors. Custom MQL4/MQL5 development services available. Start your 10-Day Free Trial.",
    images: [
      {
        url: "/banner.png",
        alt: "Shams Global Systems: Trading Precision and Automation",
        width: 1200,
        height: 630,
      },
    ],
  },

  // Using existing favicons
  icons: {
    icon: "/favicon.ico",
    apple: "/banner.png", // Or a dedicated Apple touch icon
  },

  // Additional Meta Tags for Enhanced SEO (no external assets required)
  other: {
    // Business Information
    "business.hours": "24/7 - Automated Trading Systems",
    "business.contact_data.street_address": "The Metropolis Tower",
    "business.contact_data.locality": "Dubai",
    "business.contact_data.region": "Dubai",
    "business.contact_data.postal_code": "N/A",
    "business.contact_data.country_name": "UAE",
    "business.contact_data.phone_number": "+971 58 635 4242",

    // Mobile and Performance
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Shams Global Systems",

    // Content Classification
    rating: "general",
    distribution: "global",
    "revisit-after": "7 days",

    // Format Detection
    "format-detection": "telephone=yes, address=yes, email=yes",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Canonical URL - IMPORTANT: This should be your final domain */}
        <link rel="canonical" href="https://shamsgs.com/" />

        {/* Alternate Language Versions (If applicable, you mentioned Arabic content) */}
        <link rel="alternate" hrefLang="en-US" href="https://shamsgs.com/" />
        {/* You may want to add an Arabic alternate if you have an Arabic version */}
        {/*
        <link
          rel="alternate"
          hrefLang="ar-AE"
          href="https://shamsgs.com/ar"
        />
        */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://shamsgs.com/"
        />

        {/* Performance Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* Preload existing banner image */}
        <link rel="preload" href="/banner.png" as="image" type="image/png" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        itemScope
        itemType="https://schema.org/WebPage"
        suppressHydrationWarning={true}
      >
        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>

        <main id="main-content" itemProp="mainContentOfPage">
          {children}
        </main>

        {/* Comprehensive Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              // Enhanced Organization Schema
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://shamsgs.com/#organization",
                name: "Shams Global Systems",
                alternateName: ["ShamsGS", "AI Trading System"],
                url: "https://shamsgs.com/",
                logo: "/banner.png",
                slogan: "AI-Powered Trading Precision",
                telephone: "+971 58 635 4242",
                email: "shamsgs.work@gmail.com",
                areaServed: { "@type": "Country", name: "Global" },
                sameAs: [
                  // IMPORTANT: Replace with your actual social media links
                  "https://www.facebook.com/your-shamsgs-page",
                  "https://www.instagram.com/your-shamsgs-page",
                  "https://www.linkedin.com/company/your-shamsgs-page",
                ],
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "The Metropolis Tower",
                  addressLocality: "Dubai",
                  addressRegion: "Dubai",
                  postalCode: "N/A",
                  addressCountry: "AE",
                },
              },
              // Professional Service Schema (Focused on Trading AI)
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "@id": "https://shamsgs.com/#professionalservice",
                name: "AI-Powered Forex Trading Systems Development",
                description:
                  "Specializing in the development, optimization, and deployment of autonomous MQL4/MQL5 Expert Advisors and custom trading bots for the Forex market.",
                provider: {
                  "@type": "Organization",
                  name: "Shams Global Systems",
                },
                serviceType: "Financial Technology Service",
                areaServed: "Global",
                availableChannel: [
                  {
                    "@type": "ServiceChannel",
                    serviceUrl: "https://shamsgs.com/contact",
                  },
                  {
                    "@type": "ServiceChannel",
                    servicePhone: "+971 58 635 4242",
                  },
                ],
              },
              // WebSite Schema
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://shamsgs.com/#website",
                url: "https://shamsgs.com/",
                name: "Shams Global Systems Official Website",
                description:
                  "Official website of Shams Global Systems - Leading developer of AI-Powered Forex Expert Advisors and trading automation tools.",
                publisher: {
                  "@type": "Organization",
                  name: "Shams Global Systems",
                },
                inLanguage: ["en", "ar"],
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://shamsgs.com/?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              },
              // Offer Catalog Schema (For License Modes)
              {
                "@context": "https://schema.org",
                "@type": "OfferCatalog",
                "@id": "https://shamsgs.com/#offers",
                name: "SHAMSGS AI License Modes",
                description:
                  "AI-Powered trading solutions with varying risk profiles.",
                itemListElement: [
                  // FAST Mode
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "FAST Mode AI License",
                      description:
                        "High Risk / High Reward, Aggressive, High-Frequency Trading AI for Forex.",
                    },
                    price: "600",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
                    url: "https://shamsgs.com/pricing#fast",
                    category: "Trading AI",
                    businessFunction: "https://schema.org/Sell",
                    validThrough: new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1)
                    ).toISOString(),
                  },
                  // SLOW Mode
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "SLOW Mode AI License",
                      description:
                        "Low Risk / Long-Term Growth, Conservative & Stable Strategy AI for Forex.",
                    },
                    price: "600",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
                    url: "https://shamsgs.com/pricing#slow",
                    category: "Trading AI",
                    businessFunction: "https://schema.org/Sell",
                    validThrough: new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1)
                    ).toISOString(),
                  },
                  // MODERATE Mode
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "MODERATE Mode AI License",
                      description:
                        "Medium Risk / Balanced, Recommended, Optimized Balance Strategy AI for Forex.",
                    },
                    price: "600",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
                    url: "https://shamsgs.com/pricing#moderate",
                    category: "Trading AI",
                    businessFunction: "https://schema.org/Sell",
                    validThrough: new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1)
                    ).toISOString(),
                  },
                  // ... (You can add the HEADING, ADVANCE HEADGE, and SCALPING modes here as additional Offer items)
                ],
              },
            ]),
          }}
        />
      </body>
    </html>
  );
}
