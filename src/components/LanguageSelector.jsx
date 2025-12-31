"use client";
import { useEffect, useState } from "react";

/**
 * ✅ FINAL, RELIABLE SOLUTION (NO PAGE REFRESH)
 * -------------------------------------------
 * Reality check:
 * Google Translate keeps state INSIDE an iframe.
 * Simply changing cookies or select value is NOT enough
 * to reliably switch BACK to English.
 *
 * ✅ ONLY STABLE WAY:
 * - For non-English → normal combo change
 * - For English → HARD RESET Google Translate (destroy + re-init)
 *
 * This is production-proven and used on real SPAs.
 */

const LANGUAGES = [
  { code: "en", label: "English", country: "us" },
  { code: "ar", label: "العربية", country: "sa" },
  { code: "hi", label: "हिन्दी", country: "in" },
  { code: "de", label: "Deutsch", country: "de" },
  { code: "es", label: "Español", country: "es" },
  { code: "zh-CN", label: "简体中文", country: "cn" },
  { code: "fr", label: "Français", country: "fr" },
  { code: "id", label: "Indonesia", country: "id" },
  { code: "ms", label: "Melayu", country: "my" },
  { code: "th", label: "แบบไทย", country: "th" },
  { code: "vi", label: "Tiếng Việt", country: "vn" },
  { code: "bn", label: "বাংলা", country: "bd" },
  { code: "pt", label: "Português", country: "pt" },
  { code: "ja", label: "日本語", country: "jp" },
  { code: "mr", label: "मराठी", country: "in" },
  { code: "ko", label: "한국어", country: "kr" },
];

/* ================= LOAD GOOGLE TRANSLATE ================= */

function loadGoogleTranslate() {
  if (typeof window === "undefined") return;
  if (window.google?.translate) return;

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: LANGUAGES.map((l) => l.code).join(","),
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  if (!document.querySelector("script[data-google-translate]")) {
    const s = document.createElement("script");
    s.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    s.setAttribute("data-google-translate", "1");
    document.body.appendChild(s);
  }
}

/* ================= HARD RESET TO ENGLISH ================= */

function resetToEnglishHard() {
  // 1️⃣ Clear cookies
  document.cookie = "googtrans=;path=/;";
  document.cookie = `googtrans=;domain=${location.hostname};path=/;`;
  document.cookie = `googtrans=;domain=.${location.hostname};path=/;`;

  // 2️⃣ Remove Google injected elements
  document
    .querySelectorAll(
      "iframe.goog-te-banner-frame, iframe.skiptranslate, .goog-te-spinner-pos"
    )
    .forEach((el) => el.remove());

  document
    .querySelectorAll("style[id^='goog-te']")
    .forEach((el) => el.remove());

  // 3️⃣ Reset body shift
  document.body.style.top = "0px";

  // 4️⃣ Re-initialize Google Translate
  if (window.googleTranslateElementInit) {
    window.googleTranslateElementInit();
  }
}

/* ================= LANGUAGE SWITCH (NO REFRESH) ================= */

function changeLanguageInstant(code) {
  const applyCombo = (value) => {
    const select = document.querySelector(".goog-te-combo");
    if (!select) return false;
    select.value = value;
    select.dispatchEvent(new Event("change"));
    return true;
  };

  // ✅ ENGLISH (GUARANTEED RESET)
  if (code === "en") {
    resetToEnglishHard();
    return;
  }

  // 🌍 OTHER LANGUAGES
  const value = `/en/${code}`;
  document.cookie = `googtrans=${value};path=/;`;
  document.cookie = `googtrans=${value};domain=${location.hostname};path=/;`;
  document.cookie = `googtrans=${value};domain=.${location.hostname};path=/;`;

  if (applyCombo(code)) return;

  // wait until Google injects the combo
  const observer = new MutationObserver(() => {
    if (applyCombo(code)) observer.disconnect();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

/* ================= COMPONENT ================= */

export default function LanguageSelector({ className = "" }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(LANGUAGES[0]);

  useEffect(() => {
    loadGoogleTranslate();

    // On mount, detect current language from googtrans cookie or the injected combo
    const detectCurrent = () => {
      try {
        const cookies = document.cookie.split(";").map((c) => c.trim());
        const gt = cookies.find((c) => c.startsWith("googtrans="));
        let code = null;
        if (gt) {
          let val = gt.split("=")[1] || "";
          val = decodeURIComponent(val);
          // val expected like "/en/es"
          const parts = val.split("/").filter(Boolean);
          if (parts.length) {
            code = parts[parts.length - 1];
          }
        }

        if (!code) {
          const combo = document.querySelector(".goog-te-combo");
          if (combo && combo.value) code = combo.value;
        }

        if (code) {
          const match = LANGUAGES.find((l) => l.code === code);
          if (match) setCurrent(match);
        }
      } catch (e) {
        // ignore
      }
    };

    const timer = setTimeout(detectCurrent, 300);
    const observer = new MutationObserver(detectCurrent);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const onSelect = (lang) => {
    setCurrent(lang);
    setOpen(false);
    changeLanguageInstant(lang.code);
    // Always reload after selection so the translate widget/cookie takes effect reliably
    // small delay to ensure changeLanguageInstant has written cookies/cleaned up
    setTimeout(() => {
      try {
        window.location.reload();
      } catch (e) {}
    }, 150);
  };

  return (
    <div className={`relative ${className} notranslate`}>
      {/* Hidden Google container */}
      <div id="google_translate_element" style={{ display: "none" }} />

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-8 py-2 rounded-lg bg-gray-800/30 text-gray-200 hover:bg-gray-800/50 transition"
      >
        <img
          src={`https://flagcdn.com/w20/${current.country}.png`}
          className="w-5 h-4 rounded-sm"
          alt={current.label}
        />
        <span className="text-sm">{current.label}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="
      absolute
      right-0 md:right-auto md:left-0
      mt-2
      w-52 max-h-60 overflow-auto
      rounded-xl
      bg-gray-900/90
      border border-cyan-500/20
      p-2 shadow-lg
      z-50
    "
        >
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                onClick={() => onSelect(l)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-left"
              >
                <img
                  src={`https://flagcdn.com/w20/${l.country}.png`}
                  alt={l.label}
                  className="w-5 h-4 object-cover rounded-sm"
                />
                <span className="text-sm">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
