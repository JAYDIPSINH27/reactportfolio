import { useEffect, useMemo, useRef, useState } from "react";

const welcomeLines = [
  { type: "sys", text: "Welcome! Type 'help' to see available commands." },
];

export default function InteractiveTerminal({
  projects = [],
  skills = [],
  experience = [],
  education = [],
  resumeUrl = "/resume.pdf",
  sectionIds = [],
}) {
  const [lines, setLines] = useState(welcomeLines);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);

  const viewRef = useRef(null);
  const inputRef = useRef(null);

  const commands = useMemo(
    () => [
      "help",
      "clear",
      "ls",
      "projects",
      "skills",
      "experience",
      "education",
      "whoami",
      "resume",
      "contact",
      "social",
      "theme",
      "time",
      "goto",
      "open",
      "echo",
    ],
    []
  );

  useEffect(() => {
    const el = viewRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const getOutput = (command) => {
    const [name, ...rest] = command.trim().split(" ");
    const arg = rest.join(" ").trim();

    switch (name.toLowerCase()) {
      case "help":
        return [
          "Available commands:",
          "  help              Show commands",
          "  clear             Reset terminal",
          "  ls                List files",
          "  projects          List projects",
          "  skills            List skills",
          "  experience        List experience",
          "  education         List education",
          "  whoami            About me",
          "  resume            Open resume",
          "  contact           Show email",
          "  social            Show links",
          "  theme             Toggle theme",
          "  time              Show current time",
          "  goto <section>    Scroll to section",
          "  open <url>        Open URL",
          "  echo <text>       Print text",
        ];

      case "clear":
        return "CLEAR";

      case "ls":
        return [
          "skills.txt",
          "projects.txt",
          "experience.txt",
          "education.txt",
          "social.md",
          "resume.pdf",
        ];

      case "projects":
        return projects.map((p, i) => `${i + 1}. ${p.title} — ${p.stack || "No stack listed"}`);

      case "skills":
        return skills.map((s) => `- ${s.category}: ${s.details}`);

      case "experience":
        return experience.map((e) => `${e.role} @ ${e.company} — ${e.period}`);

      case "education":
        return education.map((ed) => `${ed.institution} — ${ed.degree} (${ed.year})`);

      case "whoami":
        return [
          "Jaydipsinh Padhiyar — Full-Stack Developer",
          "Focused on React, backend systems, cloud, DevOps, and automation.",
        ];

      case "resume":
        window.open(resumeUrl, "_blank", "noopener,noreferrer");
        return ["Opening resume..."];

      case "contact":
        return ["Email: jaydipadhiyar27@gmail.com"];

      case "social":
        return [
          "GitHub:   https://github.com/JAYDIPSINH27",
          "LinkedIn: https://www.linkedin.com/in/jaydipsinh-padhiyar/",
          "Portfolio: https://jaydipsinh.netlify.app",
        ];

      case "theme": {
        const root = document.documentElement;
        const next = !root.classList.contains("dark");
        root.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
        return [`Theme changed to ${next ? "dark" : "light"}.`];
      }

      case "time":
        return [new Date().toLocaleString()];

      case "goto": {
        if (!arg) return ["Usage: goto <section>"];

        const id = sectionIds.find((s) =>
          s.toLowerCase().includes(arg.toLowerCase())
        );

        if (!id) return [`No section matches '${arg}'.`];

        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        return [`Scrolling to ${id}...`];
      }

      case "open":
        if (!arg) return ["Usage: open <url>"];
        window.open(arg.startsWith("http") ? arg : `https://${arg}`, "_blank");
        return [`Opening ${arg}...`];

      case "echo":
        return [arg];

      default:
        return [`Command not found: ${name}. Try 'help'.`];
    }
  };

  const runCommand = () => {
    const command = input.trim();
    if (!command) return;

    const output = getOutput(command);

    if (output === "CLEAR") {
      setLines(welcomeLines);
    } else {
      setLines((prev) => [
        ...prev,
        { type: "in", text: command },
        ...output.map((text) => ({ type: "out", text })),
      ]);
    }

    setHistory((prev) => [command, ...prev]);
    setHistIdx(-1);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand();
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const match = commands.find((cmd) => cmd.startsWith(input.trim()));
      if (match) setInput(match);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx((idx) => {
        const next = Math.min(idx + 1, history.length - 1);
        setInput(history[next] || "");
        return next;
      });
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx((idx) => {
        const next = Math.max(idx - 1, -1);
        setInput(next === -1 ? "" : history[next]);
        return next;
      });
    }
  };

  return (
    <div className="px-5 sm:px-6 py-5">
      <div
        ref={viewRef}
        onClick={() => inputRef.current?.focus()}
        className="font-mono text-[13px] md:text-[14px] leading-relaxed text-green-400 bg-gray-950 rounded-2xl border border-gray-800 h-72 sm:h-64 md:h-72 lg:h-80 overflow-auto p-4 cursor-text shadow-inner"
      >
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {line.type === "in" ? (
              <span className="text-gray-400">
                <span className="text-orange-400">jp</span>
                <span>@</span>
                <span className="text-sky-400">portfolio</span>
                <span> ~ $ </span>
                <span className="text-green-300">{line.text}</span>
              </span>
            ) : (
              <span>{line.text}</span>
            )}
          </div>
        ))}

        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-gray-400">
            <span className="text-orange-400">jp</span>@<span className="text-sky-400">portfolio</span> ~ $
          </span>

          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-green-300"
            placeholder="type help..."
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
          />
        </div>
      </div>

      <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
        Tips: Tab autocomplete · ↑/↓ history
      </p>
    </div>
  );
}