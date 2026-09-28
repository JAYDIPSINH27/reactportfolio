"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const mobileMenuRef = useRef(null);

  const sections = useMemo(
    () => [
      "hero",
      "about",
      "explanations",
      "skills",
      "education",
      "experience",
      "projects",
      "testimonials",
    ],
    []
  );

  /* -------------------------------------------------------
     THEME
  ------------------------------------------------------- */

  useEffect(() => {
    setMounted(true);

    const root = document.documentElement;

    const storedTheme = localStorage.getItem("theme");
    const legacyDarkMode = localStorage.getItem("darkMode");

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    let isDark;

    if (storedTheme) {
      isDark = storedTheme === "dark";
    } else if (legacyDarkMode !== null) {
      isDark = legacyDarkMode === "true";
    } else {
      isDark = prefersDark;
    }

    setDarkMode(isDark);
    root.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const nextTheme = !darkMode;

    setDarkMode(nextTheme);

    document.documentElement.classList.toggle("dark", nextTheme);

    localStorage.setItem("theme", nextTheme ? "dark" : "light");
    localStorage.setItem("darkMode", String(nextTheme));
  };

  /* -------------------------------------------------------
     NAVBAR SCROLL STATE
  ------------------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* -------------------------------------------------------
     SCROLLSPY
  ------------------------------------------------------- */

  useEffect(() => {
    const handleScrollSpy = () => {
      let currentSection = "hero";

      // Navbar height + a little breathing room
      const triggerPoint = 100;

      for (const id of sections) {
        const element = document.getElementById(id);

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= triggerPoint) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    };

    handleScrollSpy();

    window.addEventListener("scroll", handleScrollSpy, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
    };
  }, [sections]);

  /* -------------------------------------------------------
     LOCK PAGE SCROLL WHEN MOBILE MENU IS OPEN
  ------------------------------------------------------- */

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /* -------------------------------------------------------
     CLOSE MOBILE MENU WITH ESC
  ------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* -------------------------------------------------------
     CLOSE MOBILE MENU WHEN SCREEN BECOMES DESKTOP
  ------------------------------------------------------- */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* -------------------------------------------------------
     NAVIGATION
  ------------------------------------------------------- */

  const goTo = (id) => {
    setMobileOpen(false);

    const element = document.getElementById(id);

    if (element) {
      const navbarHeight = window.innerWidth >= 768 ? 64 : 56;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL without forcing navigation
      window.history.replaceState(null, "", `#${id}`);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const handleBrandClick = (event) => {
    const hero = document.getElementById("hero");

    if (!hero) return;

    event.preventDefault();

    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", "/");
  };

  /* -------------------------------------------------------
     THEME BUTTON
  ------------------------------------------------------- */

  const ThemeButton = ({ mobile = false }) => {
    if (!mounted) {
      return (
        <div
          className={`${
            mobile ? "h-10 w-10" : "h-9 w-9"
          } rounded-full`}
          aria-hidden="true"
        />
      );
    }

    return (
      <button
        type="button"
        onClick={toggleDarkMode}
        aria-label={
          darkMode ? "Switch to light mode" : "Switch to dark mode"
        }
        title={
          darkMode ? "Switch to light mode" : "Switch to dark mode"
        }
        className={`
          flex items-center justify-center
          rounded-full
          border border-gray-200 dark:border-gray-700
          bg-gray-50 dark:bg-gray-800
          text-gray-700 dark:text-gray-200
          transition-all duration-200
          hover:bg-gray-100 dark:hover:bg-gray-700
          hover:scale-105
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-orange-500
          focus-visible:ring-offset-2
          dark:focus-visible:ring-offset-slate-900
          ${mobile ? "h-10 w-10" : "h-9 w-9"}
        `}
      >
        {darkMode ? (
          <FaSun className="h-4 w-4 text-amber-400" />
        ) : (
          <FaMoon className="h-4 w-4 text-slate-800" />
        )}
      </button>
    );
  };

  return (
    <>
      {/* ===================================================
          NAVBAR
      =================================================== */}

      <header
        className={`
          fixed
          top-0
          inset-x-0
          z-50

          bg-white/95
          dark:bg-slate-950/95

          backdrop-blur-xl
          transition-all
          duration-300

          ${
            scrolled
              ? `
                border-b
                border-gray-200/80
                dark:border-gray-800
                shadow-sm
              `
              : `
                border-b
                border-gray-200/50
                dark:border-gray-800/50
              `
          }
        `}
        role="banner"
      >
        <nav
          className="
            mx-auto
            max-w-7xl
            px-4
            sm:px-5
            md:px-6
          "
          aria-label="Main navigation"
        >
          {/* =================================================
              MAIN NAVBAR ROW
          ================================================= */}

          <div
            className="
              flex
              h-14
              md:h-16
              items-center
              justify-between
            "
          >
            {/* BRAND */}

            <Link
              href="/"
              onClick={handleBrandClick}
              className="
                shrink-0

                text-lg
                md:text-xl

                font-semibold
                tracking-tight

                text-orange-500
                dark:text-orange-400

                transition-colors

                hover:text-orange-600
                dark:hover:text-orange-300

                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-orange-500
                rounded
              "
              aria-label="Jaydipsinh Padhiyar - Home"
            >
              Jaydipsinh Padhiyar
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <div className="hidden md:flex items-center gap-5 lg:gap-6">
              <div className="flex items-center gap-4 lg:gap-5">
                {sections.slice(1).map((id) => {
                  const active = activeSection === id;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => goTo(id)}
                      aria-current={active ? "page" : undefined}
                      className={`
                        relative
                        py-2

                        text-xs
                        lg:text-sm

                        uppercase
                        tracking-wide

                        transition-colors
                        duration-200

                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-orange-500
                        rounded

                        ${
                          active
                            ? `
                              text-orange-600
                              dark:text-orange-400
                              font-semibold
                            `
                            : `
                              text-gray-600
                              dark:text-gray-300

                              hover:text-orange-600
                              dark:hover:text-orange-400
                            `
                        }
                      `}
                    >
                      {id}

                      {/* ACTIVE UNDERLINE */}

                      <span
                        className={`
                          absolute
                          left-0
                          right-0
                          -bottom-0.5
                          mx-auto

                          h-0.5
                          rounded-full

                          bg-orange-500

                          transition-all
                          duration-200

                          ${
                            active
                              ? "w-full opacity-100"
                              : "w-0 opacity-0"
                          }
                        `}
                      />
                    </button>
                  );
                })}
              </div>

              {/* THEME */}

              <ThemeButton />

              {/* RESUME */}

              <a
                href="/Jaydipsinh_Padhiyar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center

                  rounded-full

                  bg-gradient-to-r
                  from-orange-500
                  to-amber-600

                  px-5
                  py-2

                  text-sm
                  font-medium
                  text-white

                  shadow-sm

                  transition-all
                  duration-200

                  hover:shadow-md
                  hover:-translate-y-0.5

                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-orange-500
                  focus-visible:ring-offset-2
                  dark:focus-visible:ring-offset-slate-900
                "
              >
                Resume
              </a>
            </div>

            {/* =================================================
                MOBILE CONTROLS
            ================================================= */}

            <div className="flex md:hidden items-center gap-2">
              <ThemeButton mobile />

              <button
                type="button"
                onClick={() => setMobileOpen((previous) => !previous)}
                aria-label={
                  mobileOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-full

                  text-gray-800
                  dark:text-gray-100

                  transition-all
                  duration-200

                  hover:bg-gray-100
                  dark:hover:bg-gray-800

                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-orange-500
                "
              >
                {mobileOpen ? (
                  <FaTimes className="h-5 w-5" />
                ) : (
                  <FaBars className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* =================================================
              MOBILE DROPDOWN
          ================================================= */}

          <div
            id="mobile-navigation"
            ref={mobileMenuRef}
            className={`
              md:hidden

              overflow-hidden

              transition-all
              duration-300
              ease-in-out

              ${
                mobileOpen
                  ? "max-h-[calc(100vh-56px)] opacity-100 pb-4"
                  : "max-h-0 opacity-0"
              }
            `}
          >
            <div
              className="
                max-h-[calc(100vh-80px)]
                overflow-y-auto

                rounded-2xl

                border
                border-gray-200
                dark:border-gray-800

                bg-white
                dark:bg-slate-900

                p-2

                shadow-xl
                shadow-black/10

                dark:shadow-black/30
              "
            >
              {sections.slice(1).map((id) => {
                const active = activeSection === id;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goTo(id)}
                    aria-current={active ? "page" : undefined}
                    className={`
                      flex
                      w-full
                      items-center
                      justify-between

                      rounded-xl

                      px-4
                      py-3

                      text-left
                      text-sm
                      capitalize

                      transition-all
                      duration-200

                      ${
                        active
                          ? `
                            bg-orange-50
                            dark:bg-orange-500/10

                            text-orange-600
                            dark:text-orange-400

                            font-semibold
                          `
                          : `
                            text-gray-700
                            dark:text-gray-200

                            hover:bg-gray-50
                            dark:hover:bg-gray-800
                          `
                      }
                    `}
                  >
                    <span>{id}</span>

                    {active && (
                      <span
                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-orange-500
                        "
                      />
                    )}
                  </button>
                );
              })}

              {/* DIVIDER */}

              <div className="my-2 border-t border-gray-100 dark:border-gray-800" />

              {/* MOBILE RESUME */}

              <a
                href="/Jaydipsinh_Padhiyar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="
                  flex
                  w-full
                  items-center
                  justify-center

                  rounded-xl

                  bg-gradient-to-r
                  from-orange-500
                  to-amber-600

                  px-4
                  py-3

                  text-sm
                  font-semibold
                  text-white

                  shadow-sm

                  transition-all
                  duration-200

                  hover:shadow-md
                  hover:opacity-95
                "
              >
                View Resume
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* ===================================================
          MOBILE BACKDROP
      =================================================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
          className="
            fixed
            inset-0
            z-40

            bg-black/20
            dark:bg-black/40

            backdrop-blur-[1px]

            md:hidden
          "
        />
      )}
    </>
  );
};

export default Navbar;