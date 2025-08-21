/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";

// Icons
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillMail,
} from "react-icons/ai";
import {
  FaGithub,
  FaGraduationCap,
  FaBriefcase,
  FaLaptopCode,
  FaQuoteLeft,
  FaCloud,
  FaCode,
  FaTools,
  FaDatabase,
  FaDownload,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

// Data
import educationData from "../Data/educationData.json";
import experienceData from "../Data/experienceData.json";
import projectsData from "../Data/projectsData.json";
import recommendations from "../Data/recommendationData.json";
import skillsData from "../Data/skillsData.json";

// Components (already in your repo)
import CustomCursor from "../Components/CustomCursor";
import BackToTopButton from "../Components/BackToTopButton";

/* --------------------------------------------
   Small utilities + components
---------------------------------------------*/

// Counter: animates from 0 to target over given duration (ms)
function Counter({ target = 0, duration = 1500 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 30)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count}</span>;
}

/* ---- inline component ---- */
function MarqueeRow({ direction = "left", speed = 36 }) {
  // Duplicate so the loop looks seamless
  const items = useMemo(() => [...recommendations, ...recommendations], []);

  const xFrom = direction === "left" ? "0%" : "-50%";
  const xTo = direction === "left" ? "-50%" : "0%";

  return (
    <motion.div
      className="flex gap-6 will-change-transform"
      animate={{ x: [xFrom, xTo] }}
      transition={{ duration: speed, ease: "linear", repeat: Infinity }}
    >
      {items.map((t, i) => (
        <article
          key={`${t.name}-${i}`}
          className="min-w-[300px] max-w-[360px] shrink-0 rounded-2xl p-[1px] bg-gradient-to-r from-orange-400/40 to-amber-500/40 shadow"
        >
          <div className="relative h-full rounded-2xl p-5 bg-white/80 dark:bg-gray-800/60 backdrop-blur border border-gray-200/70 dark:border-gray-700/70 transition hover:-translate-y-1 hover:shadow-md">
            {/* decorative quote */}
            <FaQuoteLeft
              className="absolute -top-3 -left-3 text-orange-500/30 text-3xl"
              aria-hidden
            />

            {/* header */}
            <div className="flex items-center gap-3">
              <Avatar name={t.name} />
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {t.name}
                </p>
                {t.title && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.title}
                  </p>
                )}
              </div>
            </div>

            {/* quote (clamped to keep heights tidy; no expanding) */}
            <p
              className="mt-3 text-gray-800 dark:text-gray-200 leading-relaxed"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 6,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              “{t.text}”
            </p>
          </div>
        </article>
      ))}
    </motion.div>
  );
}

/* small helper for initials avatar */
function Avatar({ name = "" }) {
  const initials = useMemo(
    () =>
      name
        .split(" ")
        .map((n) => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase(),
    [name]
  );

  return (
    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white grid place-items-center font-semibold shadow-sm">
      {initials || "★"}
    </div>
  );
}

// TiltCard: subtle 3D tilt on hover
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `rotateX(${py * -6}deg) rotateY(${px * 6}deg) translateZ(0)`,
    });
  };
  const onLeave = () => setStyle({ transform: "rotateX(0) rotateY(0)" });
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

// Section heading
function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <h3 className="text-4xl font-bold">
        <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
          <span className="inline-flex items-center justify-center gap-2">
            {icon} {title}
          </span>
        </span>
      </h3>
      {subtitle && (
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-3">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Theme toggle (dark <-> light)
function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    const prefersDark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    root.classList.toggle("dark", prefersDark);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !isDark;
    setIsDark(next);
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return null;
  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="p-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-gray-200 dark:border-gray-700 hover:scale-105 transition"
      title={isDark ? "Switch to light" : "Switch to dark"}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
}

/* --------------------------------------------
   Main Page
---------------------------------------------*/

export default function Home() {
  // UI state
  const [index, setIndex] = useState(0); // testimonials index
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [projectQuery, setProjectQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  // Sections for scrollspy
  const sections = [
    "hero",
    "stats",
    "about",
    "skills",
    "education",
    "experience",
    "projects",
    "testimonials",
  ];

  // Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Scroll progress + scrollspy
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const winScroll = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setScrollProgress((winScroll / height) * 100);

      // Active section detection
      let curr = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.33) curr = id;
      }
      setActiveSection(curr);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // eslint-disable-line

  // Testimonials auto-rotate
  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % recommendations.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  // Projects: derive tags from stack tokens
  const tags = useMemo(() => {
    const set = new Set();
    projectsData.forEach((p) => {
      if (!p.stack) return;
      p.stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((s) => set.add(s));
    });
    return ["All", ...Array.from(set)];
  }, []);

  const filteredProjects = useMemo(() => {
    const q = projectQuery.trim().toLowerCase();
    return projectsData.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.details || []).some((d) => d.toLowerCase().includes(q)) ||
        (p.stack || "").toLowerCase().includes(q);
      const matchesTag =
        activeTag === "All" ||
        (p.stack || "")
          .split(",")
          .map((s) => s.trim())
          .includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [projectQuery, activeTag]);

  // Helper: icons for skill categories
  const getSkillIcon = (category) => {
    const c = category.toLowerCase();
    if (c.includes("cloud") || c.includes("devops"))
      return <FaCloud className="inline mr-2 text-orange-500" />;
    if (c.includes("programming") || c.includes("web"))
      return <FaCode className="inline mr-2 text-orange-500" />;
    if (c.includes("tools") || c.includes("development"))
      return <FaTools className="inline mr-2 text-orange-500" />;
    if (c.includes("database"))
      return <FaDatabase className="inline mr-2 text-orange-500" />;
    return null;
  };

  const openProjectModal = (proj) => setSelectedProject(proj);
  const closeProjectModal = () => setSelectedProject(null);

  // Inline SVG texture
  const svgTexture = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <line x1="0" y1="20" x2="20" y2="0" stroke="gray" stroke-width="0.5" opacity="0.25"/>
    </svg>
  `);

  // Navbar shrink on scroll
  const [navBg, setNavBg] = useState(false);
  useEffect(() => {
    const onScroll = () => setNavBg(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function InteractiveTerminal({
    projects = [],
    skills = [],
    experience = [],
    education = [],
    resumeUrl,
    sectionIds = [],
    persistKey = "term.v1", // unique key so state survives remounts
  }) {
    // --- SSR-safe initial state ---
    const [lines, setLines] = useState([
      { type: "sys", text: "Welcome! Type 'help' to see available commands." },
    ]);
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState("");
    const [histIdx, setHistIdx] = useState(-1);

    // --- Refs ---
    const viewRef = useRef(null);
    const inputRef = useRef(null);
    const didFocusRef = useRef(false);
    const hydratedRef = useRef(false); // ensure we only hydrate once

    // --- Constants (declare ONCE) ---
    const fileNames = useMemo(
      () => [
        "skills.txt",
        "projects.txt",
        "experience.txt",
        "education.txt",
        "social.md",
        "resume.pdf",
      ],
      []
    );
    const knownCommands = useMemo(
      () => [
        "help",
        "clear",
        "ls",
        "cat",
        "projects",
        "skills",
        "experience",
        "education",
        "whoami",
        "echo",
        "open",
        "resume",
        "contact",
        "social",
        "theme",
        "time",
        "goto",
      ],
      []
    );

    // --- Helpers for storage ---
    const loadState = () => {
      try {
        const raw = sessionStorage.getItem(persistKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return null;
        return parsed;
      } catch {
        return null;
      }
    };
    const saveState = (state) => {
      try {
        sessionStorage.setItem(persistKey, JSON.stringify(state));
      } catch {}
    };

    // --- Hydrate after mount (no SSR read) ---
    useEffect(() => {
      if (hydratedRef.current) return;
      hydratedRef.current = true;
      const s = loadState();
      if (s) {
        if (Array.isArray(s.lines)) setLines(s.lines);
        if (Array.isArray(s.history)) setHistory(s.history);
        if (typeof s.input === "string") setInput(s.input);
      }
    }, []); // run once

    // --- Persist changes (debounced to avoid thrash) ---
    useEffect(() => {
      const id = setTimeout(() => {
        saveState({ lines, history, input });
      }, 80);
      return () => clearTimeout(id);
    }, [lines, history, input]);

    // Also persist on tab close / visibility changes
    useEffect(() => {
      const h = () => saveState({ lines, history, input });
      window.addEventListener("beforeunload", h);
      document.addEventListener("visibilitychange", h);
      return () => {
        window.removeEventListener("beforeunload", h);
        document.removeEventListener("visibilitychange", h);
      };
    }, [lines, history, input]);

    // --- Scroll to bottom on new lines ---
    useEffect(() => {
      const el = viewRef.current;
      if (!el) return;
      const raf = requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
      return () => cancelAnimationFrame(raf);
    }, [lines]);

    // --- Focus once when visible ---
    useEffect(() => {
      const el = viewRef.current;
      if (!el || didFocusRef.current) return;
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            didFocusRef.current = true;
            inputRef.current?.focus();
            io.disconnect();
          }
        },
        { root: null, rootMargin: "-10% 0px -80% 0px", threshold: 0.1 }
      );
      io.observe(el);
      return () => io.disconnect();
    }, []);

    // --- Helpers ---
    const prompt = (
      <span className="select-none">
        <span className="text-emerald-400">jp</span>
        <span className="text-gray-400">@</span>
        <span className="text-sky-400">portfolio</span>
        <span className="text-gray-500"> ~ </span>
        <span className="text-gray-300">$</span>
      </span>
    );

    const println = (...outs) =>
      setLines((prev) => [
        ...prev,
        ...outs.map((t) => ({ type: "out", text: t })),
      ]);
    const printlnList = (arr) => arr.forEach((t) => println(t));

    const openUrl = (url) => {
      try {
        window.open(url, "_blank", "noopener,noreferrer");
      } catch {}
    };

    const setTheme = (modeOrToggle) => {
      const root = document.documentElement;
      if (!modeOrToggle || modeOrToggle === "toggle") {
        const next = !root.classList.contains("dark");
        root.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
        println(`theme: ${next ? "dark" : "light"}`);
        return;
      }
      if (modeOrToggle === "dark" || modeOrToggle === "light") {
        const next = modeOrToggle === "dark";
        root.classList.toggle("dark", next);
        localStorage.setItem("theme", modeOrToggle);
        println(`theme: ${modeOrToggle}`);
        return;
      }
      println("Usage: theme [light|dark|toggle]");
    };

    const gotoSection = (idLike) => {
      if (!idLike) return println("Usage: goto <section>");
      const id = sectionIds.find((s) =>
        s.toLowerCase().includes(idLike.toLowerCase())
      );
      if (!id) return println(`No section matches '${idLike}'.`);
      const el = document.getElementById(id);
      if (!el) return println(`Section '${id}' not found.`);
      el.scrollIntoView({ behavior: "smooth" });
    };

    // --- Command handler ---
    const handleCommand = (raw) => {
      const command = raw.trim();
      if (!command) return;

      setLines((prev) => [...prev, { type: "in", text: command }]);
      setHistory((h) => [command, ...h]);
      setHistIdx(-1);
      setInput("");

      const [name, ...rest] = command.split(" ");
      const argStr = rest.join(" ").trim();

      switch (name) {
        case "help":
          printlnList([
            "Available commands:",
            "  help                      Show this help",
            "  clear                     Clear the terminal",
            "  ls                        List files",
            "  cat <file>                Show (skills.txt | projects.txt | experience.txt | education.txt | social.md | resume.pdf)",
            "  projects [term]           List projects (filter by term)",
            "  skills                    List skills",
            "  experience                List roles",
            "  education                 List schools",
            "  whoami                    About me",
            "  echo <text>               Print text",
            "  open <url>                Open a link",
            "  resume                    Open resume",
            "  contact                   Show email",
            "  social                    Show social links",
            "  theme [light|dark|toggle] Switch theme",
            "  time                      Current time",
            "  goto <section>            Scroll to a section (e.g. 'about')",
          ]);
          break;

        case "clear":
          setLines([]);
          break;

        case "ls":
          println(
            "skills.txt  projects.txt  experience.txt  education.txt  social.md  resume.pdf"
          );
          break;

        case "cat": {
          const file = argStr.toLowerCase();
          if (!file) return println("cat: missing file");
          if (file === "skills.txt") {
            skills.forEach((s) => println(`- ${s.category}: ${s.details}`));
          } else if (file === "projects.txt") {
            projects.forEach((p, i) =>
              println(`${i + 1}. ${p.title} (${p.stack || "—"})`)
            );
          } else if (file === "experience.txt") {
            experience.forEach((e) =>
              println(`${e.role} @ ${e.company} — ${e.period}`)
            );
          } else if (file === "education.txt") {
            education.forEach((ed) =>
              println(`${ed.institution} — ${ed.degree} (${ed.year})`)
            );
          } else if (file === "social.md") {
            println("GitHub:   https://github.com/JAYDIPSINH27");
            println(
              "LinkedIn: https://www.linkedin.com/in/jaydipsinh-padhiyar/"
            );
            println("Twitter:  https://twitter.com/jpsinh27");
            println("Email:    mailto:jaydipadhiyar27@gmail.com");
          } else if (file === "resume.pdf") {
            println("Use: resume  (opens in new tab)");
          } else {
            println(`cat: ${file}: No such file`);
          }
          break;
        }

        case "projects": {
          const q = argStr.toLowerCase();
          const list = projects
            .filter(
              (p) =>
                !q ||
                p.title.toLowerCase().includes(q) ||
                (p.stack || "").toLowerCase().includes(q) ||
                (p.details || []).some((d) => d.toLowerCase().includes(q))
            )
            .slice(0, 12);
          if (!list.length) return println("No matching projects.");
          list.forEach((p, i) => {
            println(`${i + 1}. ${p.title} — ${p.stack || "—"}`);
            if (p.githubLink) println(`    repo: ${p.githubLink}`);
          });
          println("Tip: use open <url> to open a repo.");
          break;
        }

        case "skills":
          skills.forEach((s) => println(`- ${s.category}: ${s.details}`));
          break;

        case "experience":
          experience.forEach((e) =>
            println(`${e.role} @ ${e.company} — ${e.period}`)
          );
          break;

        case "education":
          education.forEach((ed) =>
            println(`${ed.institution} — ${ed.degree} (${ed.year})`)
          );
          break;

        case "whoami":
          println("Jaydipsinh Padhiyar — Full-Stack Developer");
          break;

        case "echo":
          println(argStr);
          break;

        case "open":
          if (!argStr) println("Usage: open <url>");
          else
            openUrl(argStr.startsWith("http") ? argStr : `https://${argStr}`);
          break;

        case "resume":
          println("Opening resume...");
          openUrl(resumeUrl);
          break;

        case "contact":
          println("Email: jaydipadhiyar27@gmail.com");
          break;

        case "social":
          println("GitHub   https://github.com/JAYDIPSINH27");
          println("LinkedIn https://www.linkedin.com/in/jaydipsinh-padhiyar/");
          println("Twitter  https://twitter.com/jpsinh27");
          break;

        case "theme":
          setTheme(argStr || "toggle");
          break;

        case "time":
          println(new Date().toString());
          break;

        case "goto":
          gotoSection(argStr);
          break;

        default:
          println(`command not found: ${name}. Try 'help'.`);
      }
    };

    // --- Tab autocomplete ---
    const onTabComplete = () => {
      const tokens = input.trim().split(/\s+/);
      if (!tokens.length || input === "") return;

      if (tokens.length === 1) {
        const prefix = tokens[0];
        const match = knownCommands.find((c) => c.startsWith(prefix));
        if (match) setInput(match + (input.endsWith(" ") ? "" : " "));
        return;
      }
      if (tokens[0] === "cat") {
        const partial = tokens[1] || "";
        const match = fileNames.find((f) =>
          f.startsWith(partial.toLowerCase())
        );
        if (match) {
          const rest = tokens.slice(2).join(" ");
          setInput(`cat ${match}${rest ? " " + rest : ""}`);
        }
      }
    };

    // --- Keyboard handling ---
    const onKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleCommand(input);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
        e.preventDefault();
        setLines([]);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
        setLines((p) => [...p, { type: "out", text: "^C" }]);
        setInput("");
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistIdx((idx) => {
          const next = Math.min(idx + 1, history.length - 1);
          setInput(history[next] ?? "");
          return next;
        });
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistIdx((idx) => {
          const next = Math.max(idx - 1, -1);
          setInput(next === -1 ? "" : history[next]);
          return next;
        });
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        onTabComplete();
      }
    };

    // --- UI ---
    return (
      <div className="px-5 sm:px-6 py-5">
        <div
          ref={viewRef}
          onClick={() => inputRef.current?.focus()}
          role="log"
          aria-live="polite"
          className="font-mono text-[13px] md:text-[14px] leading-relaxed text-green-500 dark:text-green-400
                   bg-gray-950/90 dark:bg-gray-950/90 rounded-2xl border border-gray-800/70
                   h-72 sm:h-64 md:h-72 lg:h-80 overflow-auto p-4 cursor-text"
        >
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {line.type === "in" ? (
                <span className="text-gray-400">
                  {prompt} <span className="text-green-300">{line.text}</span>
                </span>
              ) : (
                <span>{line.text}</span>
              )}
            </div>
          ))}

          {/* Prompt row */}
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-gray-400">{prompt}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-green-300 placeholder:text-green-800/60"
              placeholder="type a command… (try: help)"
              aria-label="Terminal input"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
            />
            {!input && (
              <span className="inline-block w-2 h-4 bg-green-400 animate-pulse opacity-80 rounded-sm" />
            )}
          </div>
        </div>

        <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
          Tips:{" "}
          <kbd className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800">
            Tab
          </kbd>{" "}
          autocomplete ·{" "}
          <kbd className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800">
            ↑
          </kbd>
          /
          <kbd className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800">
            ↓
          </kbd>{" "}
          history ·{" "}
          <kbd className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800">
            Ctrl
          </kbd>
          +
          <kbd className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800">
            L
          </kbd>{" "}
          clear
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100
  dark:from-[#0b1220] dark:via-[#0f172a] dark:to-[#111827]
  selection:bg-orange-500/30 dark:selection:bg-sky-400/25"
    >
      <CustomCursor />

      <Head>
        <title>Jaydipsinh Padhiyar • Portfolio</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Portfolio of Jaydipsinh Padhiyar - Full-Stack Developer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f97316" />
        <link rel="icon" href="/favicon.ico" />
        {/* OpenGraph */}
        <meta property="og:title" content="Jaydipsinh Padhiyar • Portfolio" />
        <meta
          property="og:description"
          content="Full-Stack Developer • Cloud • DevOps • Projects & Experience"
        />
        <meta property="og:image" content="/og-cover.jpg" />
      </Head>

      {/* 3rd-party widgets (lazy) */}
      <Script
        src="//cdn.jsdelivr.net/github-cards/latest/widget.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://www.twilik.com/assets/retainable/rss-embed/retainable-rss-embed.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://unpkg.com/@rocktimsaikia/github-card@latest?module"
        strategy="lazyOnload"
      />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60]">
        <div
          className="h-full bg-orange-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="pt-16 md:pt-20">
        {/* Fancy gradient blobs in background */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full blur-3xl opacity-25 bg-orange-400 dark:opacity-30" />
          <div className="absolute top-40 -left-16 h-72 w-72 rounded-full blur-3xl opacity-20 bg-amber-400 dark:opacity-25" />
        </div>

        {/* RIGHT Scrollspy dots */}
        <div className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3">
          {sections.map((id) => (
            <button
              key={id}
              onClick={() =>
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`h-2.5 w-2.5 rounded-full transition ${
                activeSection === id
                  ? "bg-orange-500 scale-125"
                  : "bg-gray-400/40 dark:bg-gray-600/60 hover:bg-orange-400"
              }`}
              aria-label={`Scroll to ${id}`}
              title={id}
            />
          ))}
        </div>

        {/* HERO */}
        <section
          id="hero"
          className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-cover bg-center md:bg-fixed"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
          {/* Overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/20 dark:to-black/40" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,${svgTexture}")`,
              backgroundRepeat: "repeat",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Parallax lights */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-white/20 dark:bg-white/10 blur-2xl"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-16 right-1/4 h-56 w-56 rounded-full bg-orange-400/30 blur-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Card frame */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6"
          >
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-orange-400/40 to-amber-500/40 shadow-2xl">
              <div className="rounded-3xl bg-white/80 dark:bg-gray-900/85 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60">
                {/* Terminal header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200/60 dark:border-gray-700/60 select-none">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">
                    jp@portfolio — bash
                  </span>
                </div>

                {/* Interactive terminal */}
                <InteractiveTerminal
                  projects={projectsData}
                  skills={skillsData.skills}
                  experience={experienceData}
                  education={educationData}
                  resumeUrl="https://drive.google.com/file/d/1Qnkz8tM8R5gZ7tKlJO0h-Y0x2q1nns1x/view?usp=sharing"
                  sectionIds={[
                    "hero",
                    "stats",
                    "about",
                    "skills",
                    "education",
                    "experience",
                    "projects",
                    "testimonials",
                  ]}
                />

                {/* CTAs + Socials */}
                <div className="px-5 sm:px-6 pb-6">
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="px-6 py-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition"
                      onClick={() =>
                        document
                          .getElementById("about")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Explore My Work
                    </motion.button>

                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      href="https://drive.google.com/file/d/1Qnkz8tM8R5gZ7tKlJO0h-Y0x2q1nns1x/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <FaDownload className="mr-2 h-4 w-4" /> Download Resume
                    </motion.a>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href="https://github.com/JAYDIPSINH27"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      title="GitHub"
                      className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-800 hover:text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-200 transition"
                    >
                      <FaGithub className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jaydipsinh-padhiyar/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      title="LinkedIn"
                      className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-800 hover:text-white hover:bg-[#0A66C2] dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-200 transition"
                    >
                      <AiFillLinkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:jaydipadhiyar27@gmail.com"
                      aria-label="Email"
                      title="Email"
                      className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-800 hover:text-white hover:bg-orange-500 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-200 transition"
                    >
                      <AiFillMail className="h-5 w-5" />
                    </a>
                    <a
                      href="https://twitter.com/jpsinh27"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter / X"
                      title="Twitter / X"
                      className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-800 hover:text-white hover:bg-[#1DA1F2] dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-200 transition"
                    >
                      <AiFillTwitterCircle className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* STATS */}
        <section id="stats" className="py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionVariants}
            className="max-w-5xl mx-auto px-6"
          >
            <SectionHeader
              title="Statistics"
              subtitle="Quick snapshot of impact."
              icon={<span className="sr-only">Stats</span>}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Years of Experience", value: 6 },
                { label: "Projects Completed", value: 10 },
                { label: "Certifications", value: 5 },
              ].map((s, i) => (
                <TiltCard
                  key={i}
                  className="rounded-2xl p-6 bg-white/70 dark:bg-gray-800/60 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-md"
                >
                  <p className="text-3xl font-extrabold text-orange-600">
                    <Counter target={s.value} duration={1800} />
                    <span>+</span>
                  </p>
                  <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
                    {s.label}
                  </p>
                </TiltCard>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-6"
          >
            <SectionHeader
              title="About Me"
              icon={<FaLaptopCode className="text-orange-500" />}
            />
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 to-amber-500 blur-2xl opacity-20 -z-10" />
              <Image
                src="/Logo.png"
                alt="Jaydipsinh"
                width={208}
                height={208}
                className="rounded-full shadow-xl border-4 border-orange-500 object-cover"
                priority
              />
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
              I’m a passionate full-stack developer with a strong foundation in
              computer science. I craft scalable, elegant web apps and ship them
              on reliable cloud infra. I love turning product ideas into
              polished, performant experiences.
            </p>
          </motion.div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-900/40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-6"
          >
            <SectionHeader
              title="Skills"
              subtitle="What I bring to the table."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl p-6 bg-white/70 dark:bg-gray-800/60 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-md"
                >
                  <h4 className="text-xl font-bold text-orange-600 mb-2">
                    {getSkillIcon(skill.category)}
                    {skill.category}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {skill.details}
                  </p>
                  {/* Animated underline */}
                  <div className="mt-3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* EDUCATION (timeline) */}
        <section id="education" className="py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="max-w-6xl mx-auto px-6"
          >
            <SectionHeader
              title="Education"
              subtitle="My academic journey"
              icon={<FaGraduationCap className="text-orange-500" />}
            />

            <div className="relative">
              {/* Vertical rail (mobile: left, desktop: center) */}
              <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-orange-400 to-amber-500 rounded-full lg:left-1/2 lg:-translate-x-1/2" />

              <div className="space-y-10">
                {educationData.map((edu, idx) => {
                  const leftSide = idx % 2 === 0; // alternate on desktop

                  return (
                    <div
                      key={idx}
                      className="relative lg:grid lg:grid-cols-9 lg:gap-6"
                    >
                      {/* Dot (mobile absolute on left rail; desktop centered on rail) */}
                      <span className="lg:hidden absolute left-6 -translate-x-1/2 top-3 h-3.5 w-3.5 rounded-full bg-orange-500 shadow ring-4 ring-orange-500/20" />
                      <div className="hidden lg:flex col-span-9 items-start justify-center">
                        <span className="h-3.5 w-3.5 rounded-full bg-orange-500 shadow ring-4 ring-orange-500/20" />
                      </div>

                      {/* Card */}
                      <div
                        className={[
                          // Mobile: padding-left so card clears left rail
                          "pl-10 lg:pl-0",
                          // Desktop: place card left or right of center rail
                          leftSide
                            ? "lg:col-start-1 lg:col-end-5 lg:justify-self-end"
                            : "lg:col-start-6 lg:col-end-10 lg:justify-self-start",
                        ].join(" ")}
                      >
                        <div className="rounded-2xl p-6 bg-white/70 dark:bg-gray-800/60 backdrop-blur border border-gray-200 dark:border-gray-700 shadow">
                          <h4 className="text-2xl font-bold text-orange-600">
                            {edu.institution}{" "}
                            <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                              ({edu.year})
                            </span>
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            {edu.degree} {edu.gpa ? `| GPA: ${edu.gpa}` : ""}
                          </p>

                          {edu.courses?.length > 0 && (
                            <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
                              {edu.courses.map((course, i) => (
                                <li key={i}>{course}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </section>

        {/* EXPERIENCE (timeline cards) */}
        <section
          id="experience"
          className="py-16 bg-gray-50 dark:bg-gray-900/40"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="max-w-6xl mx-auto px-6"
          >
            <SectionHeader
              title="Experience"
              subtitle="Where I've honed my skills"
              icon={<FaBriefcase className="text-orange-500" />}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {experienceData.map((exp, idx) => (
                <TiltCard
                  key={idx}
                  className="rounded-2xl p-6 bg-white/70 dark:bg-gray-800/60 backdrop-blur border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition"
                >
                  <h4 className="text-2xl font-bold text-orange-600">
                    {exp.company}{" "}
                    <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      ({exp.period})
                    </span>
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">
                    {exp.role}
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300 space-y-1">
                    {exp.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                  {exp.certificateLink && (
                    <a
                      href={exp.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline mt-3 inline-block"
                    >
                      View Certificate
                    </a>
                  )}
                </TiltCard>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECTS (filters + search + modal) */}
        <section id="projects" className="py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-6"
          >
            <SectionHeader
              title="Projects"
              subtitle="My recent work"
              icon={<FaLaptopCode className="text-orange-500" />}
            />
            {/* Controls (two rows: search on top, tags below) */}
            <div className="mb-6 space-y-3 md:space-y-4">
              {/* Search */}
              <div className="relative w-full">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 md:h-6 md:w-6" />
                <input
                  type="search"
                  value={projectQuery}
                  onChange={(e) => setProjectQuery(e.target.value)}
                  placeholder="Search projects, stacks, or details…"
                  aria-label="Search projects"
                  className="w-full pl-12 pr-4 h-12 md:h-14 rounded-2xl
                 text-[15px] md:text-base
                 bg-white/80 dark:bg-gray-800/70
                 border border-gray-200 dark:border-gray-700
                 outline-none shadow-sm placeholder:text-gray-400
                 focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t)}
                    className={`px-3.5 py-2 rounded-full text-sm border transition
          ${
            activeTag === t
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white/70 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-orange-300"
          }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="cursor-pointer rounded-2xl p-6 bg-white/70 dark:bg-gray-800/60 backdrop-blur border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition"
                  onClick={() => openProjectModal(proj)}
                >
                  <h4 className="text-2xl font-bold text-orange-600">
                    {proj.title}{" "}
                    {proj.stack && (
                      <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                        ({proj.stack})
                      </span>
                    )}
                  </h4>
                  <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300 space-y-1">
                    {(proj.details || []).slice(0, 3).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                    {proj.details?.length > 3 && <li>...more</li>}
                  </ul>
                  {proj.githubLink && (
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline mt-3 inline-block"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on GitHub
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeProjectModal}
              >
                <motion.div
                  className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-200 dark:border-gray-800"
                  initial={{ scale: 0.9, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 10 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h4 className="text-2xl font-bold text-orange-600 mb-3">
                    {selectedProject.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Tech Stack:</strong> {selectedProject.stack || "—"}
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    {(selectedProject.details || []).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline inline-block mt-4"
                    >
                      View on GitHub
                    </a>
                  )}
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={closeProjectModal}
                      className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* TESTIMONIALS (dual-row marquee, no expand) */}
        <section
          id="testimonials"
          className="py-16 bg-gray-50 dark:bg-gray-900/40"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-6"
          >
            <SectionHeader
              title="Testimonials"
              icon={<FaQuoteLeft className="text-orange-500" />}
            />

            <div className="relative space-y-6 overflow-hidden">
              {/* subtle edge fade */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                  maskImage:
                    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }}
              />

              <MarqueeRow direction="left" speed={45} />
              {/* <MarqueeRow direction="right" speed={42} /> */}
            </div>
          </motion.div>
        </section>

        <BackToTopButton />
      </main>
    </div>
  );
}
