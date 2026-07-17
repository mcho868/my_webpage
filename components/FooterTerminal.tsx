"use client";

import { useEffect, useRef, useState } from "react";

const TERMINAL_SECTIONS = [
  { name: "about", selector: "#about", title: "About Me" },
  { name: "projects", selector: "#projects", title: "My Projects" },
  { name: "skills", selector: "#skills", title: "My Skills" },
  { name: "experience", selector: "#experience", title: "My Roadmap" },
  { name: "interests", selector: "#personal_interests", title: "Personal Interests" },
  { name: "contact", selector: "#contact", title: "Contact" },
];

const SECTION_MAP = new Map(TERMINAL_SECTIONS.map((section) => [section.name, section]));

type Line = { text: string; type: "output" | "command" | "error" };

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderMultiline(text: string) {
  return `<pre>${escapeHtml(text)}</pre>`;
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function collectSectionContent(section: (typeof TERMINAL_SECTIONS)[number]) {
  const element = document.querySelector(section.selector);
  if (!element) {
    return `${section.title}\nSection unavailable.`;
  }

  const lines: string[] = [];
  const title = element.querySelector(".section-title, h1, h2");
  const subtitle = element.querySelector(".section-subtitle");

  if (title) lines.push(normalizeWhitespace(title.textContent ?? ""));
  if (subtitle) lines.push(normalizeWhitespace(subtitle.textContent ?? ""));

  element.querySelectorAll("h3, h4, p").forEach((node) => {
    const text = normalizeWhitespace(node.textContent || "");
    if (!text || lines.includes(text)) return;
    lines.push(text);
  });

  const badges = Array.from(element.querySelectorAll(".tech-badge"))
    .map((node) => normalizeWhitespace(node.textContent || ""))
    .filter(Boolean)
    .slice(0, 12);

  if (badges.length) {
    lines.push(`Tech: ${badges.join(", ")}`);
  }

  const links = Array.from(element.querySelectorAll("a[href]"))
    .map((node) => normalizeWhitespace(node.textContent || ""))
    .filter(Boolean)
    .slice(0, 6);

  if (links.length) {
    lines.push(`Links: ${links.join(", ")}`);
  }

  return lines.join("\n").slice(0, 2200);
}

const README_TEXT = [
  "Portfolio terminal navigation",
  "",
  "Use `ls` to see sections, `cd <section>` to jump to one, and `cat` to read the content snapshot.",
  "Examples:",
  "  ls",
  "  cd projects",
  "  cat",
  "  cd /",
].join("\n");

const HELP_TEXT = [
  "Available commands:",
  "help            show this command list",
  "ls              list entries in the current directory",
  "pwd             print current path",
  "cd <section>    move into a section",
  "cd /            return to root",
  "cd ..           return to root",
  "cat             print current section content",
  "cat content.txt print current section content",
  "cat README.txt  print terminal usage from root",
  "clear           clear the terminal output",
].join("\n");

export default function FooterTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const [lines, setLines] = useState<Line[]>([
    { text: renderMultiline(README_TEXT), type: "output" },
    {
      text: renderMultiline("Shortcut: Cmd/Ctrl + J toggles the terminal. Drag the header to resize it."),
      type: "output",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const terminalRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const stateRef = useRef({
    height: 340,
    dragStartY: 0,
    dragStartHeight: 340,
    dragging: false,
    commandHistory: [] as string[],
    historyIndex: -1,
  });

  const prompt = `visitor@portfolio:${currentPath} $`;

  function clampHeight(height: number) {
    return Math.max(220, Math.min(Math.round(height), Math.floor(window.innerHeight * 0.85)));
  }

  function setTerminalHeight(height: number) {
    stateRef.current.height = clampHeight(height);
    terminalRef.current?.style.setProperty(
      "--footer-terminal-height",
      `${stateRef.current.height}px`
    );
  }

  function appendLine(text: string, type: Line["type"] = "output") {
    setLines((prev) => [...prev, { text, type }]);
  }

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [lines]);

  useEffect(() => {
    setTerminalHeight(stateRef.current.height);

    function onKeydown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "j") {
        event.preventDefault();
        setIsOpen((open) => !open);
      }
    }

    function onResize() {
      setTerminalHeight(stateRef.current.height);
    }

    document.addEventListener("keydown", onKeydown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeydown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  function getCurrentSection() {
    if (currentPath === "/") return null;
    return SECTION_MAP.get(currentPath.slice(1)) ?? null;
  }

  function scrollToSection(section: (typeof TERMINAL_SECTIONS)[number]) {
    const element = document.querySelector(section.selector);
    if (!element) return;

    const nav = document.querySelector(".navbar") as HTMLElement | null;
    const navHeight = nav ? nav.offsetHeight : 0;
    const top = element.getBoundingClientRect().top + window.scrollY - navHeight - 16;

    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  }

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim();
    if (!command) return;

    appendLine(
      `<span class="footer-terminal-command-prefix">${escapeHtml(prompt)}</span> ${escapeHtml(command)}`,
      "command"
    );
    stateRef.current.commandHistory.push(command);
    stateRef.current.historyIndex = stateRef.current.commandHistory.length;

    const [name, ...args] = command.split(/\s+/);
    const currentSection = getCurrentSection();

    switch (name) {
      case "help":
        appendLine(renderMultiline(HELP_TEXT));
        break;
      case "pwd":
        appendLine(renderMultiline(currentPath));
        break;
      case "ls":
        if (currentSection) {
          appendLine(renderMultiline("content.txt"));
        } else {
          const entries = ["README.txt", ...TERMINAL_SECTIONS.map((section) => `${section.name}/`)];
          appendLine(renderMultiline(entries.join("\n")));
        }
        break;
      case "cd": {
        const target = args[0];

        if (!target || target === "/" || target === "~" || target === "..") {
          setCurrentPath("/");
          appendLine(renderMultiline("/"));
          break;
        }

        const normalizedTarget = target.replace(/^\/+|\/+$/g, "");
        const nextSection = SECTION_MAP.get(normalizedTarget);
        if (!nextSection) {
          appendLine(renderMultiline(`cd: no such directory: ${target}`), "error");
          break;
        }

        setCurrentPath(`/${nextSection.name}`);
        appendLine(renderMultiline(`/${nextSection.name}`));
        scrollToSection(nextSection);
        break;
      }
      case "cat":
        if (!currentSection) {
          if (args[0] === "README.txt") {
            appendLine(renderMultiline(README_TEXT));
          } else {
            appendLine(
              renderMultiline("cat: enter a section first or use `cat README.txt` from root."),
              "error"
            );
          }
          break;
        }

        if (!args[0] || args[0] === "content.txt" || args[0] === ".") {
          appendLine(renderMultiline(collectSectionContent(currentSection)));
        } else {
          appendLine(renderMultiline(`cat: no such file: ${args[0]}`), "error");
        }
        break;
      case "clear":
        setLines([]);
        break;
      default:
        appendLine(renderMultiline(`${name}: command not found`), "error");
        break;
    }
  }

  function handleHistoryNavigation(direction: number) {
    const state = stateRef.current;
    if (!state.commandHistory.length) return;
    state.historyIndex = Math.max(
      0,
      Math.min(state.commandHistory.length, state.historyIndex + direction)
    );
    const nextValue =
      state.historyIndex === state.commandHistory.length
        ? ""
        : state.commandHistory[state.historyIndex];
    setInputValue(nextValue);
  }

  function startDrag(event: React.PointerEvent) {
    if (event.target instanceof HTMLElement && event.target.closest(".footer-terminal-toggle")) {
      return;
    }
    const state = stateRef.current;
    state.dragging = true;
    state.dragStartY = event.clientY;
    state.dragStartHeight = isOpen ? state.height : 320;
    setIsOpen(true);
    setTerminalHeight(state.dragStartHeight);
    terminalRef.current?.classList.add("is-dragging");
    headerRef.current?.setPointerCapture(event.pointerId);
  }

  function onDrag(event: React.PointerEvent) {
    const state = stateRef.current;
    if (!state.dragging) return;
    const delta = state.dragStartY - event.clientY;
    setTerminalHeight(state.dragStartHeight + delta);
  }

  function endDrag(event: React.PointerEvent) {
    const state = stateRef.current;
    if (!state.dragging) return;
    state.dragging = false;
    terminalRef.current?.classList.remove("is-dragging");
    if (headerRef.current?.hasPointerCapture(event.pointerId)) {
      headerRef.current.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div
      id="footer-terminal"
      ref={terminalRef}
      className={`footer-terminal${isOpen ? " is-open" : ""}`}
      aria-label="Terminal navigation"
    >
      <div
        id="footer-terminal-header"
        ref={headerRef}
        className="footer-terminal-header"
        onPointerDown={startDrag}
        onPointerMove={onDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="footer-terminal-grab" aria-hidden="true"></div>
        <div className="footer-terminal-meta">
          <span className="footer-terminal-title">portfolio-terminal</span>
          <span className="footer-terminal-hint">drag up or press Cmd/Ctrl + J</span>
        </div>
        <button
          className="footer-terminal-toggle"
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "CLOSE" : "OPEN"}
        </button>
      </div>
      <div className="footer-terminal-body">
        <div id="footer-terminal-output" className="footer-terminal-output" aria-live="polite">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`footer-terminal-line footer-terminal-line-${line.type}`}
              dangerouslySetInnerHTML={{ __html: line.text }}
            />
          ))}
        </div>
        <form
          className="footer-terminal-form"
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            const command = inputValue;
            setInputValue("");
            runCommand(command);
          }}
        >
          <span className="footer-terminal-path">{prompt}</span>
          <input
            ref={inputRef}
            className="footer-terminal-input"
            type="text"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal command input"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                handleHistoryNavigation(-1);
              } else if (event.key === "ArrowDown") {
                event.preventDefault();
                handleHistoryNavigation(1);
              }
            }}
          />
        </form>
      </div>
    </div>
  );
}
