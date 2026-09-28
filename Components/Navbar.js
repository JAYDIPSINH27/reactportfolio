"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaExternalLinkAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

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

  /* =========================================================
     THEME
  ========================================================= */

  useEffect(() => {
    const root = document.documentElement;

    const savedTheme = localStorage.getItem("theme");

    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldBeDark =
      savedTheme === "dark" ||
      (!savedTheme && systemDark);

    root.classList.toggle("dark", shouldBeDark);

    setDarkMode(shouldBeDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextDarkMode = !darkMode;

    setDarkMode(nextDarkMode);

    const root = document.documentElement;

    if (nextDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  /* =========================================================
     SCROLL STATE
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     SCROLLSPY
  ========================================================= */

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 140;

      let current = "hero";

      for (const id of sections) {
        const element = document.getElementById(id);

        if (!element) continue;

        if (element.offsetTop <= scrollPosition) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    handleScrollSpy();

    window.addEventListener("scroll", handleScrollSpy, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
    };
  }, [sections]);

  /* =========================================================
     CLOSE MOBILE MENU ON DESKTOP
  ========================================================= */

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

  /* =========================================================
     CLOSE WITH ESC
  ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =========================================================
     SECTION NAVIGATION
  ========================================================= */

  const goTo = (id) => {
    setMobileOpen(false);

    const element = document.getElementById(id);

    if (!element) {
      window.location.href = `/#${id}`;
      return;
    }

    const navbarHeight = window.innerWidth >= 768 ? 64 : 56;

    const top =
      element.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight -
      12;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${id}`);
  };

  const handleHomeClick = (event) => {
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

  /* =========================================================
     THEME BUTTON
  ========================================================= */

  const ThemeButton = () => {
    if (!mounted) {
      return <div className="h-10 w-10" />;
    }

    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={
          darkMode ? "Switch to light mode" : "Switch to dark mode"
        }
        title={
          darkMode ? "Switch to light mode" : "Switch to dark mode"
        }
        className="
          group
          relative

          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center

          rounded-full

          border
          border-black/10
          dark:border-white/10

          bg-white/70
          dark:bg-white/10

          text-slate-800
          dark:text-slate-100

          backdrop-blur-md

          transition-all
          duration-200

          hover:scale-105
          hover:bg-white
          dark:hover:bg-white/15

          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-orange-500
        "
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
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className={`
          fixed
          inset-x-0
          top-0
          z-50

          transition-all
          duration-300
          ease-out

          ${
            scrolled
              ? `
                bg-white/85
                dark:bg-slate-950/85

                backdrop-blur-xl
                backdrop-saturate-150

                border-b
                border-black/5
                dark:border-white/10

                shadow-sm
                dark:shadow-black/30
              `
              : `
                bg-white/55
                dark:bg-slate-950/55

                backdrop-blur-lg

                border-b
                border-transparent
              `
          }
        `}
      >
        <nav
          className="
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
          aria-label="Main navigation"
        >
          {/* =================================================
              NAVBAR ROW
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
            {/* =================================================
                LOGO / NAME
            ================================================= */}

            <Link
              href="/"
              onClick={handleHomeClick}
              aria-label="Go to homepage"
              className="
                relative
                z-10

                shrink-0

                text-lg
                md:text-xl

                font-bold
                tracking-tight

                text-orange-500
                dark:text-orange-400

                transition-colors
                duration-200

                hover:text-orange-600
                dark:hover:text-orange-300

                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-orange-500
                focus-visible:ring-offset-2

                rounded-md
              "
            >
              Jaydipsinh Padhiyar
            </Link>

            {/* =================================================
                DESKTOP
            ================================================= */}

            <div className="hidden md:flex items-center gap-3 lg:gap-5">
              {/* NAV LINKS */}

              <div className="flex items-center gap-1 lg:gap-2">
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

                        rounded-lg

                        px-2
                        lg:px-3
                        py-2

                        text-xs
                        lg:text-sm

                        font-medium
                        capitalize

                        transition-all
                        duration-200

                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-orange-500

                        ${
                          active
                            ? `
                              text-orange-600
                              dark:text-orange-400

                              bg-orange-500/5
                              dark:bg-orange-400/5
                            `
                            : `
                              text-slate-600
                              dark:text-slate-300

                              hover:text-slate-950
                              dark:hover:text-white

                              hover:bg-black/5
                              dark:hover:bg-white/5
                            `
                        }
                      `}
                    >
                      {id}

                      {/* Active indicator */}

                      <span
                        className={`
                          absolute
                          bottom-0
                          left-1/2

                          h-0.5

                          -translate-x-1/2

                          rounded-full

                          bg-orange-500

                          transition-all
                          duration-300

                          ${
                            active
                              ? "w-5 opacity-100"
                              : "w-0 opacity-0"
                          }
                        `}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Separator */}

              <div
                className="
                  mx-1
                  h-6
                  w-px
                  bg-black/10
                  dark:bg-white/10
                "
              />

              {/* THEME */}

              <ThemeButton />

              {/* RESUME */}

              <a
                href="/Jaydipsinh_Padhiyar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group

                  inline-flex
                  items-center
                  gap-2

                  rounded-full

                  bg-orange-500

                  px-4
                  py-2

                  text-sm
                  font-semibold
                  text-white

                  shadow-sm

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:bg-orange-600
                  hover:shadow-md

                  active:translate-y-0

                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-orange-500
                  focus-visible:ring-offset-2
                  dark:focus-visible:ring-offset-slate-950
                "
              >
                Resume

                <FaExternalLinkAlt
                  className="
                    h-2.5
                    w-2.5

                    opacity-70

                    transition-transform
                    duration-200

                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </a>
            </div>

            {/* =================================================
                MOBILE CONTROLS
            ================================================= */}

            <div className="flex md:hidden items-center gap-1">
              <ThemeButton />

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={
                  mobileOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-full

                  text-slate-800
                  dark:text-slate-100

                  transition-all
                  duration-200

                  hover:bg-black/5
                  dark:hover:bg-white/10

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
        </nav>
      </header>

      {/* =====================================================
          MOBILE MENU

          Separate from the header so the header itself doesn't
          grow vertically.
      ===================================================== */}

      <div
        id="mobile-menu"
        className={`
          fixed
          left-3
          right-3
          top-[64px]

          z-50

          md:hidden

          origin-top

          transition-all
          duration-200
          ease-out

          ${
            mobileOpen
              ? `
                visible
                translate-y-0
                scale-100
                opacity-100
              `
              : `
                invisible
                -translate-y-2
                scale-[0.98]
                opacity-0
                pointer-events-none
              `
          }
        `}
      >
        <div
          className="
            overflow-hidden

            rounded-2xl

            border
            border-black/10
            dark:border-white/10

            bg-white/95
            dark:bg-slate-950/95

            backdrop-blur-2xl

            shadow-2xl
            shadow-black/15
            dark:shadow-black/50

            p-2
          "
        >
          {/* NAV LINKS */}

          <div className="space-y-1">
            {sections.slice(1).map((id) => {
              const active = activeSection === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => goTo(id)}
                  aria-current={active ? "page" : undefined}
                  className={`
                    group

                    flex
                    w-full
                    items-center
                    justify-between

                    rounded-xl

                    px-4
                    py-3

                    text-left
                    text-sm
                    font-medium
                    capitalize

                    transition-all
                    duration-150

                    ${
                      active
                        ? `
                          bg-orange-500/10
                          dark:bg-orange-400/10

                          text-orange-600
                          dark:text-orange-400
                        `
                        : `
                          text-slate-900
                          dark:shadow-black/50

                          hover:bg-slate-100
                          dark:hover:bg-white/5
                        `
                    }
                  `}
                >
                  <span>{id}</span>

                  {active && (
                    <span
                      className="
                        h-1.5
                        w-1.5

                        rounded-full

                        bg-orange-500
                        dark:bg-orange-400
                      "
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Divider */}

          <div
            className="
              my-2
              h-px
              bg-black/5
              dark:bg-white/10
            "
          />

          {/* Resume */}

          <a
            href="/Jaydipsinh_Padhiyar.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="
              flex
              w-full
              items-center
              justify-between

              rounded-xl

              bg-orange-500

              px-4
              py-3

              text-sm
              font-semibold
              text-white

              transition-colors
              duration-200

              hover:bg-orange-600
            "
          >
            <span>View Resume</span>

            <FaExternalLinkAlt className="h-3 w-3 opacity-80" />
          </a>
        </div>
      </div>

      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setMobileOpen(false)}
        className={`
          fixed
          inset-0

          z-40

          md:hidden

          bg-black/10
          dark:bg-black/30

          backdrop-blur-[1px]

          transition-opacity
          duration-200

          ${
            mobileOpen
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />
    </>
  );
};

export default Navbar;