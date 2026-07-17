"use client";

import { useState, type ReactNode } from "react";

type ProjectLink = { label: string; href: string; download?: string };

type Project = {
  title: string;
  content: ReactNode;
  badges: string[];
  links: ProjectLink[];
};

type Folder = {
  id: string;
  title: string;
  projects: Project[];
};

const FOLDERS: Folder[] = [
  {
    id: "startups",
    title: "Startups",
    projects: [
      {
        title: "Align Health Tech - Clinical AI for Urgent Care",
        content: (
          <>
            Co-founded healthtech startup building clinical AI used by real patients.
            <br />• <b>Founding Engineer &amp; CTO</b> — designed and implemented AI-driven clinical workflow automation
            <br />• Built automated <b>patient summarisation and referral generation</b> pipelines to reduce clinician admin workload
            <br />• Shipped as a <b>Next.js / TypeScript application on Azure</b> — full-stack delivery, cloud deployment, clinical systems integration
            <br />• Secured <b>NZD $15K Velocity Challenge funding</b>
            <br />• <b>8/10 average patient satisfaction across 120 pilot patients</b> at a live Urgent Care Clinic deployment
          </>
        ),
        badges: ["Healthcare AI", "Next.js", "TypeScript", "Azure", "CTO", "Live Pilot"],
        links: [{ label: "Visit Site →", href: "https://alignhealthtech.com" }],
      },
      {
        title: "AIvolve - AI Voice Agent for Job Booking",
        content: (
          <>
            Co-founded AI automation startup targeting tradies and solo business owners in NZ.
            <br />• <b>Founding Engineer &amp; CTO</b> building an end-to-end AI voice agent
            <br />• Handles <b>inbound calls, lead qualification, and automated job booking</b>
            <br />• <b>VAPI + Twilio</b> for call agents, <b>n8n</b> for workflow automation, <b>GoHighLevel</b> for CRM/scheduling sync, <b>Stripe</b> for subscriptions
            <br />• Sold a <b>live subscription to a real user</b>, with uptake still growing
          </>
        ),
        badges: ["VAPI", "Twilio", "n8n", "GoHighLevel", "Stripe", "CTO"],
        links: [{ label: "Visit Site →", href: "https://aivolve.co.nz" }],
      },
    ],
  },
  {
    id: "personal-projects",
    title: "Personal Projects",
    projects: [
      {
        title: "CodeType",
        content: (
          <>
            Typing practice for programmers, inspired by Monkeytype but focused on code.
            <br />• Improves coding fluency by typing <b>realistic code snippets</b>
            <br />• Designed for <b>speed + accuracy</b> with programming-focused tests
          </>
        ),
        badges: ["Typing", "Code Practice", "Web App", "Next.js"],
        links: [{ label: "Visit Site →", href: "https://codetype.manseungchoi.com" }],
      },
      {
        title: "Pomocoin (BETA – iOS)",
        content: (
          <>
            Productivity mobile app (React Native + Expo) designed around the Pomodoro technique.
            <br />• Implemented <b>Stripe IAP</b> + <b>RevenueCat</b> for subscription &amp; trial management
            <br />• Released <b>iOS beta</b> and onboarded <b>20+ testers</b> with retention feedback
            <br />• Built scalable <b>Firebase backend</b> and adaptive UI for iOS/Android
          </>
        ),
        badges: ["React Native", "Expo", "Typescript", "Firebase", "IOS/Android"],
        links: [{ label: "Download iOS Beta →", href: "https://testflight.apple.com/join/1H4De4yq" }],
      },
      {
        title: "⭐ File Star Extension ⭐",
        content: (
          <>
            Lightweight VS Code / Cursor extension to boost developer workflow.
            <br />• Enables quick <b>file prioritization</b> with a &quot;star&quot; marker
            <br />• Published on the <b>VS Code Marketplace</b>
            <br />• Built in <b>TypeScript</b> with minimal overhead for adoption
          </>
        ),
        badges: ["VS Code Extension", "JavaScript", "Typescript"],
        links: [
          {
            label: "View Marketplace →",
            href: "https://marketplace.visualstudio.com/items?itemName=BrendanChoi.file-star-extension&ssr=false#overview",
          },
        ],
      },
      {
        title: "LOCAI",
        content: (
          <>
            On-device <b>AI coding assistant</b> using Ollama API.
            <br />• Published on the <b>VS Code Marketplace</b>
            <br />• Integrated <b>local LLMs</b> for privacy-first developer support
            <br />• Easy to use and install, open source, and free to use
          </>
        ),
        badges: ["VS Code Extension", "Typescript", "LLM", "Sqlite", "Ollama"],
        links: [
          {
            label: "View Marketplace →",
            href: "https://marketplace.visualstudio.com/items?itemName=BrendanChoi.locai",
          },
        ],
      },
    ],
  },
  {
    id: "competitions",
    title: "Competitions",
    projects: [
      {
        title: "Plain Rights – Legal Tech Hackathon (1st Place)",
        content: (
          <>
            🏆 <b>1st Place out of 12 teams</b> at the University of Auckland Legal Tech Hackathon 2025.
            <br />• Built a <b>RAG pipeline translating complex legal contracts</b> into verified plain-English summaries
            <br />• Ensured <b>accuracy + personalized support</b> using RAG pipelines
            <br />• Integrated <b>Tinfoil API</b> to guarantee privacy-preserving AI usage
            <br />• Demoed to judges with positive feedback for real-world impact in legal accessibility
          </>
        ),
        badges: ["RAG", "Tinfoil API", "Python", "Hackathon"],
        links: [
          { label: "View GitHub →", href: "https://github.com/SkylerSG/legal-tech-hackathon" },
          { label: "Watch Demo Video →", href: "https://youtu.be/kvkk9diQUmM" },
        ],
      },
      {
        title: "CARBONKIWI – 2025 Web3 Hackathon",
        content: (
          <>
            Hackathon project addressing <b>sustainability with blockchain</b>.
            <br />• Designed tokenized incentives for <b>carbon offsets</b>
            <br />• Built smart contracts on <b>Ethereum Sepolia</b> with Solidity
            <br />• Delivered prototype + pitch deck in under <b>48 hours</b> with a team of 4
          </>
        ),
        badges: ["Solidity", "Blockchain", "React.js", "Express.js", "Hackathon"],
        links: [{ label: "Watch Demo Video →", href: "https://youtu.be/rvKK1kMYAyM" }],
      },
    ],
  },
  {
    id: "university",
    title: "University Projects",
    projects: [
      {
        title: "Honours Dissertation: On-Device Medical Triage with Compact LLMs",
        content: (
          <>
            Research investigating privacy-preserving, offline-capable clinical decision support for NZ healthcare.
            <br />• Built an on-device <b>RAG system</b> with quantized <b>SmolLM2</b> models (135M–360M parameters)
            <br />• Achieved <b>70.4% triage accuracy within 300 MB memory and 2.4s end-to-end latency</b> on a retail consumer device (iPhone 14 Pro)
            <br />• Trained <b>4 LoRA adapter configurations</b> on 13,825 synthetic triage cases
            <br />• Demonstrated <b>30–50× fewer parameters</b> than existing compact medical models
            <br />• Established foundations for <b>equitable, offline-capable AI-assisted healthcare</b>
          </>
        ),
        badges: ["RAG", "LoRA Fine-tuning", "Mobile AI", "Healthcare AI", "Python", "Research"],
        links: [
          {
            label: "Download Dissertation →",
            href: "/assets/Manseung Choi Dissertation Final.pdf",
            download: "Manseung_Choi_Dissertation.pdf",
          },
        ],
      },
      {
        title: "NLT – Natural Language Trader",
        content: (
          <>
            Prototype of an <b>LLM-powered crypto trading agent</b>.
            <br />• Built with <b>Flask + Web3.py + Gemini API</b>
            <br />• Enabled users to <b>execute trades in plain English</b> (e.g., &quot;Buy 0.1 ETH if BTC rises 2%&quot;)
            <br />• Produced <b>demo paper &amp; video</b> documenting feasibility of agentic finance workflows
          </>
        ),
        badges: ["Flask", "Web3", "Python", "Sqlite", "Gemini API"],
        links: [
          { label: "View Site →", href: "https://ai-trading-agent-6kpf.onrender.com" },
          { label: "Watch Demo Video →", href: "https://youtu.be/5b8WlLuia8g" },
          {
            label: "Download Paper →",
            href: "/assets/767_NLT___Natural_Language_Trader.pdf",
            download: "767_NLT___Natural_Language_Trader.pdf",
          },
        ],
      },
      {
        title: "Project Sofia",
        content: (
          <>
            AI-powered course assistant, awarded <b>2nd Place</b> in University of Auckland&apos;s 2024 COMP SCI 399 capstone.
            <br />• Built with <b>GPT-based NLP, TTS voice synthesis, and an avatar-based React frontend</b>
            <br />• Designed <b>conversational interfaces</b> to replace static course information pages
            <br />• Delivered in agile sprints with GitHub + JIRA; continued development as a Research Assistant
          </>
        ),
        badges: ["AI", "React.js", "Django", "MySQL", "AWS", "OpenAI"],
        links: [{ label: "Visit Site →", href: "https://www.projectsof1a.com" }],
      },
    ],
  },
];

export default function Projects() {
  const [expandedFolder, setExpandedFolder] = useState<string | null>(FOLDERS[0].id);

  function toggleFolder(id: string) {
    setExpandedFolder((current) => (current === id ? null : id));
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          A selection of my work in AI, fullstack, and applied software development
        </p>

        <div className="projects-container">
          {FOLDERS.map((folder) => (
            <div
              key={folder.id}
              className={`project-folder${expandedFolder === folder.id ? " expanded" : ""}`}
            >
              <div className="folder-header" onClick={() => toggleFolder(folder.id)}>
                <div className="folder-icon">
                  <i className="fas fa-folder"></i>
                  <i className="fas fa-folder-open"></i>
                </div>
                <h3 className="folder-title">{folder.title}</h3>
                <span className="folder-count">{folder.projects.length} projects</span>
                <div className="folder-toggle">
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div className="folder-content" id={folder.id}>
                <div className="grid">
                  {folder.projects.map((project) => (
                    <div key={project.title} className="card">
                      <h3 className="card-title">{project.title}</h3>
                      <p className="card-content">{project.content}</p>
                      {project.badges.map((badge) => (
                        <div key={badge} className="tech-badge">
                          {badge}
                        </div>
                      ))}
                      {project.links.map((link) => (
                        <div key={link.href} className="card-footer">
                          {link.download ? (
                            <a href={link.href} download={link.download}>
                              {link.label}
                            </a>
                          ) : (
                            <a href={link.href} target="_blank" rel="noreferrer">
                              {link.label}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
