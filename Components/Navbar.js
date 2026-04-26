import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

/**
 * Improved Navbar:
 * - Glassy sticky header with backdrop-blur + border when scrolled
 * - Mobile menu (hamburger)
 * - Active section highlight (scrollspy)
 * - Smooth scroll to sections
 * - Theme toggle with localStorage persistence + prefers-color-scheme fallback
 */
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // IDs of sections on your homepage in the order they appear
  const sections = useMemo(
    () => [
      "hero",
      "stats",
      "about",
      "skills",
      "education",
      "experience",
      "projects",
      "testimonials",
    ],
    []
  );

  // ---- Theme setup (persist + OS fallback) ----
  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    const storedLegacy = localStorage.getItem("darkMode"); // backward-compat with your old key
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const isDark = stored
      ? stored === "dark"
      : storedLegacy
      ? storedLegacy === "true"
      : prefersDark;

    setDarkMode(isDark);
    root.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next);
    // store in both keys for compatibility
    localStorage.setItem("theme", next ? "dark" : "light");
    localStorage.setItem("darkMode", next ? "true" : "false");
  };

  // ---- Nav background on scroll (shrink effect) ----
  useEffect(() => {
    const onScroll = () => setNavBg(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- Scrollspy: figure out which section is active ----
  useEffect(() => {
    const onScroll = () => {
      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // If section top is within upper 40% of viewport, consider it active
        if (rect.top <= window.innerHeight * 0.4) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  // ---- Smooth scroll helper (falls back to /#id if element is missing) ----
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // if we're on a different page, let Next.js handle hash navigation
      window.location.href = `/#${id}`;
    }
  };

  // Brand click: go to hero if present, else navigate home
  const onBrandClick = (e) => {
    const hero = document.getElementById("hero");
    if (hero) {
      e.preventDefault();
      hero.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        navBg
          ? "backdrop-blur bg-white/70 dark:bg-slate-900/60 border-b border-gray-200/60 dark:border-gray-800/60"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Brand */}
          <Link
            href="/"
            onClick={onBrandClick}
            className="text-lg md:text-xl font-semibold tracking-tight text-orange-500 dark:text-orange-500  hover:text-white transition"
            aria-label="Home"
          >
            Jaydipsinh Padhiyar
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {sections.slice(1).map((id) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                className={`uppercase tracking-wide transition ${
                  activeSection === id
                    ? "text-orange-600 dark:text-orange-400 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                }`}
                aria-current={activeSection === id ? "page" : undefined}
              >
                {id}
              </button>
            ))}

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
                className="p-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-gray-200 dark:border-gray-700 hover:scale-105 transition"
                title={darkMode ? "Switch to light" : "Switch to dark"}
              >
                {darkMode ? (
                  // Light-on-dark: bright sun
                  <FaSun className="h-5 w-5 text-amber-300 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                ) : (
                  // Dark-on-light: subtle moon
                  <FaMoon className="h-5 w-5 text-slate-700 group-hover:text-slate-900 transition-colors" />
                )}
              </button>
            )}

            {/* Resume (kept from your original, restyled to match) */}
            <a
              href="https://drive.google.com/file/d/1UIxb8HC4efm3YDymN3AGr3dep9BiNI40/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2 rounded-full shadow hover:shadow-md hover:opacity-95 transition"
            >
              Resume
            </a>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            {mounted && (
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
                className="p-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-gray-200 dark:border-gray-700"
                title={darkMode ? "Switch to light" : "Switch to dark"}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            )}
            <button
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-in fade-in-0 zoom-in-95">
            <div className="grid gap-2">
              {sections.slice(1).map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setMobileOpen(false);
                    goTo(id);
                  }}
                  className={`rounded-md px-3 py-2 text-left transition ${
                    activeSection === id
                      ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {id}
                </button>
              ))}

              <a
                href="https://drive.google.com/file/d/1UIxb8HC4efm3YDymN3AGr3dep9BiNI40/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 rounded-md px-3 py-2 text-left bg-gradient-to-r from-orange-500 to-amber-600 text-white"
                onClick={() => setMobileOpen(false)}
              >
                Resume
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
