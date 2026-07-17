import Image from "next/image";
import profilePic from "@/public/assets/Profile.jpeg";

const SKILL_LANES: { id: string; skills: string[] }[] = [
  {
    id: "a",
    skills: [
      "Python", "JavaScript", "TypeScript", "React", "Next.js", "FastAPI",
      "Django", "Flask", "Supabase", "PostgreSQL", "AWS", "Azure", "Ollama",
      "LM Studio", "Codex", "Vapi", "Gemini CLI", "Claude Code", "RAG", "LLM APIs",
    ],
  },
  {
    id: "b",
    skills: [
      "Machine Learning", "AI Automation", "Fullstack", "Express.js", "MySQL",
      "SQLite", "Tailwind CSS", "React Native", "Solidity", "web3.py",
      "Claude MCP", "Cursor", "LOCAI", "PEFT", "Local LLMs", "n8n",
      "LangChain", "LangGraph", "Team Lead", "MS Teams", "Jira",
    ],
  },
  {
    id: "c",
    skills: [
      "Java", "C#", "SQL", "HTML/CSS", "Tailwind CSS", "AWS", "Firebase",
      "Supabase", "React Native", "Next.js", "Vite", "Django", "Flask",
      "Jira", "Miro", "GitHub", "MS Teams",
    ],
  },
  {
    id: "d",
    skills: [
      "Ollama", "LM Studio", "Codex", "Vapi", "Claude Code", "Gemini CLI",
      "Claude MCP", "Cursor", "LOCAI", "RAG", "PEFT", "Local LLMs",
      "LLM APIs", "AI Automation", "Machine Learning",
    ],
  },
  {
    id: "e",
    skills: [
      "Python", "Fullstack", "React", "Express.js", "MySQL", "SQLite",
      "Solidity", "web3.py", "Team Lead", "Agile", "Project Management",
      "Programming Tutor", "Maths Tutor",
    ],
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-skill-stream" aria-hidden="true">
        {SKILL_LANES.map((lane) => (
          <div key={lane.id} className={`hero-skill-lane hero-skill-lane-${lane.id}`}>
            {/* Skills are rendered twice for a seamless marquee loop */}
            {[...lane.skills, ...lane.skills].map((skill, index) => (
              <span key={`${skill}-${index}`} className="hero-skill-chip">
                {skill}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-prompt">~/manseung $ whoami</p>
            <h1>I build AI-powered applications that turn complex problems into real-world solutions.</h1>
            <p>
              Hi, I&apos;m Brendan Manseung Choi. An AI/full-stack engineer who takes
              products from architecture to production — currently building and
              deploying a clinical AI system used by real patients.
            </p>
            <div>
              <span className="tech-badge">Python</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">Machine Learning</span>
              <span className="tech-badge">AI</span>
              <span className="tech-badge">Fullstack Web Development</span>
            </div>
            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#contact" className="btn">Let&apos;s Connect</a>
              <a href="#projects" className="btn-outline">View My Work</a>
            </div>
          </div>
          <div className="hero-image">
            <Image
              src={profilePic}
              alt="Brendan Choi - AI Developer"
              priority
              placeholder="blur"
              sizes="(max-width: 768px) 90vw, 45vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
