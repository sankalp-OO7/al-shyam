import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

// ULTRA SEO-OPTIMIZED METADATA FOR SHAMS GLOBAL SYSTEMS
export const metadata = {
  // Primary Meta Tags - Keyword Heavy for Top Rankings
  title: {
    default:
      "ShamsGS - Shams Global Systems | #1 AI Forex Trading Robot & Expert Advisor MT4/MT5",
    template: "%s | ShamsGS - AI Forex Trading Robots Dubai",
  },
  description:
    "ShamsGS (Shams Global Systems) - Leading AI-powered automated Forex trading robots & Expert Advisors for MT4/MT5. Based in Dubai, UAE. 24/7 algorithmic trading with hyper-speed execution. 10-Day Free Trial. Trusted by traders worldwide. License from 2000 AUD/year. MQL4/MQL5 development experts.",

  // Comprehensive Keywords - Target Multiple Search Queries
  keywords: [
    // Brand Keywords
    "ShamsGS",
    "Shams Global Systems",
    "shamsgs",
    "SHAMSGS",
    "Shams GS",
    // Primary Service Keywords
    "AI Forex trading robot",
    "automated Forex trading",
    "Expert Advisor MT4",
    "Expert Advisor MT5",
    "Forex trading bot",
    "algorithmic trading AI",
    "automated trading system",
    // Technical Keywords
    "MQL4 Expert Advisor",
    "MQL5 Expert Advisor",
    "MT4 robot",
    "MT5 robot",
    "Forex EA development",
    "custom trading bot",
    "algorithmic trading Dubai",
    // Feature Keywords
    "24/7 automated trading",
    "emotion-free trading",
    "high frequency trading bot",
    "Forex signal automation",
    "trading algorithm optimization",
    // Location Keywords
    "Forex trading Dubai",
    "UAE trading systems",
    "Dubai AI trading",
    // Action Keywords
    "buy Forex robot",
    "best Forex EA",
    "top trading bot",
    "professional trading AI",
  ].join(", "),

  // Author and Ownership
  author: "Shams Global Systems (ShamsGS)",
  publisher: "Shams Global Systems Dubai, UAE",
  creator: "ShamsGS Development Team",

  // Application Metadata
  applicationName: "ShamsGS AI Trading Platform",

  // Geo-Targeting for UAE & Global
  "geo.region": "AE-DU",
  "geo.placename": "Dubai, United Arab Emirates",
  "geo.position": "25.2048;55.2708",
  ICBM: "25.2048, 55.2708",

  // Language Support
  "content-language": "en-US",
  locale: "en_US",

  // Classification
  classification: "Financial Technology, Trading Automation, AI Services",
  category: "Finance, Technology, Forex Trading",

  // Enhanced Robots - Maximum Crawlability
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Verification Tags (Add your verification codes)
  verification: {
    google: "your-google-verification-code", // Add from Google Search Console
    yandex: "your-yandex-verification-code",
    bing: "your-bing-verification-code",
  },

  // Enhanced Open Graph
  openGraph: {
    title:
      "ShamsGS | AI-Powered Forex Trading Robots & Expert Advisors - Dubai UAE",
    description:
      "Shams Global Systems (ShamsGS) delivers cutting-edge AI Forex trading robots & MT4/MT5 Expert Advisors. Automated, 24/7, emotion-free trading from Dubai. Start your 10-day free trial today!",
    url: "https://www.shamsgs.com/",
    type: "website",
    locale: "en_US",
    siteName: "ShamsGS - Shams Global Systems",
    images: [
      {
        url: "https://www.shamsgs.com/banner.png",
        secureUrl: "https://www.shamsgs.com/banner.png",
        width: 1200,
        height: 630,
        alt: "ShamsGS - AI Forex Trading Robot & Expert Advisor by Shams Global Systems",
        type: "image/png",
      },
    ],
    emails: ["support@shamsgs.com"],
    phoneNumbers: ["+971586354242"],
  },

  // Enhanced Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@shamsgs",
    creator: "@shamsgs",
    title:
      "ShamsGS | AI Forex Trading Robots - Automated Expert Advisors Dubai",
    description:
      "Leading AI-powered Forex trading bots & MT4/MT5 Expert Advisors by Shams Global Systems. 24/7 automated trading from Dubai, UAE. 10-Day Free Trial Available.",
    images: {
      url: "https://www.shamsgs.com/banner.png",
      alt: "ShamsGS AI Forex Trading Robot",
    },
  },

  // Icons & Manifests
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",

  // Additional Meta Tags
  other: {
    // Business Contact Information
    "business:contact_data:street_address":
      "The Metropolis Tower, Business Bay",
    "business:contact_data:locality": "Dubai",
    "business:contact_data:region": "Dubai",
    "business:contact_data:country_name": "United Arab Emirates",
    "business:contact_data:email": "support@shamsgs.com",
    "business:contact_data:phone_number": "+971586354242",
    "business:contact_data:website": "https://www.shamsgs.com/",

    // Mobile Optimization
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "ShamsGS",

    // Content Classification
    rating: "general",
    distribution: "global",
    "revisit-after": "3 days",
    coverage: "Worldwide",

    // Format Detection
    "format-detection": "telephone=yes, address=yes, email=yes",

    // Theme Colors
    "theme-color": "#0066cc",
    "msapplication-TileColor": "#0066cc",
    "msapplication-navbutton-color": "#0066cc",

    // Additional SEO Signals
    referrer: "origin-when-cross-origin",
    "color-scheme": "light dark",
  },

  // Alternates
  alternates: {
    canonical: "https://www.shamsgs.com/",
    languages: {
      "en-US": "https://www.shamsgs.com/",
      "x-default": "https://www.shamsgs.com/",
    },
  },
};

export default function RootLayout({ children }) {
  // Structured Data - Comprehensive Schema.org Implementation
  const structuredData = [
    // 1. Organization Schema - Brand Identity
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "FinancialService", "Corporation"],
      "@id": "https://www.shamsgs.com/#organization",
      name: "Shams Global Systems",
      alternateName: ["ShamsGS", "SHAMSGS", "Shams GS"],
      legalName: "Shams Global Systems",
      url: "https://www.shamsgs.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.shamsgs.com/banner.png",
        width: 1200,
        height: 630,
      },
      image: "https://www.shamsgs.com/banner.png",
      description:
        "Leading provider of AI-powered Forex trading robots and Expert Advisors for MT4/MT5. Specializing in automated algorithmic trading solutions.",
      slogan: "Automate your trading strategy with 24/7 precision.  ",
      foundingDate: "2020", // Update with actual date
      telephone: "+971586354242",
      email: "support@shamsgs.com",
      faxNumber: "+971586354242",

      // Social Media Profiles - CRITICAL for Brand Recognition
      sameAs: [
        "https://www.facebook.com/people/Shamsgs/61584701334310/",
        "https://www.instagram.com/shamsgs_/",
        "https://www.youtube.com/@shamsgs",
        "https://x.com/shamsgs",
        "https://www.linkedin.com/company/shamsgs", // Add if exists
      ],

      // Address
      address: {
        "@type": "PostalAddress",
        streetAddress: "The Metropolis Tower, Business Bay",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        postalCode: "00000",
        addressCountry: {
          "@type": "Country",
          name: "United Arab Emirates",
        },
      },

      // Geographic Coverage
      areaServed: [
        {
          "@type": "Country",
          name: "Global",
        },
        {
          "@type": "Country",
          name: "United Arab Emirates",
        },
      ],

      // Contact Points
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+971586354242",
          contactType: "Customer Service",
          email: "support@shamsgs.com",
          areaServed: "Global",
          availableLanguage: ["English", "Arabic"],
          contactOption: "TollFree",
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        },
        {
          "@type": "ContactPoint",
          telephone: "+971586354242",
          contactType: "Sales",
          email: "support@shamsgs.com",
          areaServed: "Global",
          availableLanguage: ["English", "Arabic"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+971586354242",
          contactType: "Technical Support",
          email: "support@shamsgs.com",
          areaServed: "Global",
          availableLanguage: ["English"],
        },
      ],

      // Services Offered
      knowsAbout: [
        "Forex Trading",
        "Algorithmic Trading",
        "Expert Advisors",
        "MQL4 Development",
        "MQL5 Development",
        "Trading Automation",
        "MetaTrader 4",
        "MetaTrader 5",
        "Artificial Intelligence Trading",
      ],

      // Brand
      brand: {
        "@type": "Brand",
        name: "ShamsGS",
        logo: "https://www.shamsgs.com/banner.png",
      },
    },

    // 2. LocalBusiness Schema - Critical for Dubai searches
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.shamsgs.com/#localbusiness",
      name: "Shams Global Systems - ShamsGS",
      image: "https://www.shamsgs.com/banner.png",
      url: "https://www.shamsgs.com/",
      telephone: "+971586354242",
      email: "support@shamsgs.com",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "The Metropolis Tower, Business Bay",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        postalCode: "00000",
        addressCountry: "AE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.2048,
        longitude: 55.2708,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    },

    // 3. WebSite Schema with SearchAction
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.shamsgs.com/#website",
      url: "https://www.shamsgs.com/",
      name: "ShamsGS - Shams Global Systems Official Website",
      description:
        "Official website of Shams Global Systems (ShamsGS) - Premier AI-powered Forex trading robots and Expert Advisors for MT4/MT5 platforms.",
      publisher: {
        "@id": "https://www.shamsgs.com/#organization",
      },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.shamsgs.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },

    // 4. Professional Service Schema
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": "https://www.shamsgs.com/#service",
      name: "AI Forex Trading Robot Development Services",
      description:
        "Expert development of automated Forex trading systems, Expert Advisors (EA), and custom MQL4/MQL5 trading bots for MetaTrader platforms.",
      provider: {
        "@id": "https://www.shamsgs.com/#organization",
      },
      serviceType: "Financial Technology Services",
      areaServed: {
        "@type": "Country",
        name: "Global",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "ShamsGS Trading AI License Modes",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "FAST Mode AI Trading License",
              description:
                "High Risk/High Reward aggressive AI trading strategy for maximum profit potential. High-frequency trading with advanced algorithms.",
              category: "Trading Software",
              brand: {
                "@type": "Brand",
                name: "ShamsGS",
              },
            },
            price: "600.00",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "https://www.shamsgs.com/pricing",
            priceValidUntil: new Date(
              new Date().setFullYear(new Date().getFullYear() + 1)
            )
              .toISOString()
              .split("T")[0],
            seller: {
              "@id": "https://www.shamsgs.com/#organization",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "SLOW Mode AI Trading License",
              description:
                "Low Risk/Long-term growth conservative AI trading strategy for stable, consistent returns.",
              category: "Trading Software",
              brand: {
                "@type": "Brand",
                name: "ShamsGS",
              },
            },
            price: "600.00",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "https://www.shamsgs.com/pricing",
            priceValidUntil: new Date(
              new Date().setFullYear(new Date().getFullYear() + 1)
            )
              .toISOString()
              .split("T")[0],
            seller: {
              "@id": "https://www.shamsgs.com/#organization",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "MODERATE Mode AI Trading License",
              description:
                "Medium Risk/Balanced returns - Recommended optimized AI trading strategy balancing risk and reward.",
              category: "Trading Software",
              brand: {
                "@type": "Brand",
                name: "ShamsGS",
              },
            },
            price: "600.00",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "https://www.shamsgs.com/pricing",
            priceValidUntil: new Date(
              new Date().setFullYear(new Date().getFullYear() + 1)
            )
              .toISOString()
              .split("T")[0],
            seller: {
              "@id": "https://www.shamsgs.com/#organization",
            },
          },
        ],
      },
    },

    // 5. BreadcrumbList Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.shamsgs.com/",
        },
      ],
    },

    // 6. FAQPage Schema - Boosts Rich Results
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is ShamsGS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ShamsGS (Shams Global Systems) is a leading provider of AI-powered automated Forex trading robots and Expert Advisors for MT4 and MT5 platforms. We develop cutting-edge algorithmic trading solutions that execute trades 24/7 with emotion-free precision.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a ShamsGS trading license cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ShamsGS AI trading licenses start at 2000 AUD per year. We offer a 10-day free trial so you can test our trading robots before committing. All license modes (FAST, SLOW, MODERATE) are available at the same competitive price.",
          },
        },
        {
          "@type": "Question",
          name: "Does ShamsGS work with MetaTrader 4 and MetaTrader 5?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, ShamsGS Expert Advisors are compatible with both MetaTrader 4 (MT4) and MetaTrader 5 (MT5) platforms. Our MQL4 and MQL5 development ensures seamless integration with your preferred trading platform.",
          },
        },
        {
          "@type": "Question",
          name: "Where is ShamsGS located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Shams Global Systems is headquartered in Dubai, United Arab Emirates, at The Metropolis Tower, Business Bay. We serve traders globally with 24/7 customer support.",
          },
        },
      ],
    },
  ];

  return (
    <html lang="en" dir="ltr" itemScope itemType="https://schema.org/WebPage">
      <head>
        {/* Primary Canonical */}
        <link rel="canonical" href="https://www.shamsgs.com/" />

        {/* Language Alternates */}
        <link rel="alternate" hrefLang="en" href="https://www.shamsgs.com/" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.shamsgs.com/"
        />

        {/* DNS Prefetch & Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Preload Critical Assets */}
        <link rel="preload" href="/banner.png" as="image" type="image/png" />
        <link
          rel="preload"
          href="/fonts/geist-sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Additional Meta for SEO */}
        <meta
          name="title"
          content="ShamsGS - AI Forex Trading Robot & Expert Advisor MT4/MT5 | Shams Global Systems Dubai"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <script async src="https://js.stripe.com/v3/buy-button.js"></script>
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
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>

        {/* Main Content Area */}
        <main id="main-content" itemProp="mainContentOfPage" role="main">
          {children}
        </main>

        {/* Comprehensive Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Additional SEO Script - Dynamic Content Marker */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Corporation",
              name: "ShamsGS",
              description: "AI-Powered Forex Trading Robots",
              foundingLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Dubai",
                  addressCountry: "AE",
                },
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
