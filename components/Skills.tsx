type SkillCard = {
  icon: string;
  title: string;
  badges: string[];
};

const SKILL_CARDS: SkillCard[] = [
  {
    icon: "fas fa-bolt",
    title: "Core Strengths",
    badges: [
      "Building and shipping AI Powered Applications",
      "Team Leading",
      "Project Management",
      "Fullstack Shipping",
      "Building AI Frameworks",
    ],
  },
  {
    icon: "fas fa-code",
    title: "Programming Languages",
    badges: ["Python", "TypeScript", "JavaScript", "HTML/CSS", "Java", "C#", "SQL"],
  },
  {
    icon: "fas fa-brain",
    title: "AI tools I use",
    badges: [
      "Cursor",
      "Claude Code",
      "Gemini CLI",
      "OpenAI Codex",
      "Claude MCP",
      "LOCAI",
      "Ollama",
      "LM Studio",
      "Vapi",
      "n8n",
    ],
  },
  {
    icon: "fas fa-brain",
    title: "Artificial Intelligence",
    badges: [
      "RAG framework building",
      "LLM fine-tuning (LoRA / PEFT)",
      "LangChain / LangGraph",
      "Local LLM integration",
      "LLM API integration",
    ],
  },
  {
    icon: "fas fa-server",
    title: "Web2 Framework & Database",
    badges: [
      "Next.js",
      "React",
      "React Native",
      "Vite",
      "FastAPI",
      "Flask",
      "Django",
      "Express.js",
      "PostgreSQL (Supabase)",
      "MySQL",
      "SQLite",
      "Firebase",
      "AWS",
      "Azure",
      "Tailwind CSS",
    ],
  },
  {
    icon: "fas fa-cube",
    title: "Web3 Framework",
    badges: ["Solidity", "web3.py", "Ethereum (Sepolia)", "Hardhat"],
  },
  {
    icon: "fas fa-language",
    title: "Languages",
    badges: ["Korean (Full Professional)", "English (Full Professional)"],
  },
  {
    icon: "fas fa-project-diagram",
    title: "Project Management",
    badges: ["Git", "Jira", "Miro", "GitHub", "MS Teams", "Team Lead", "Agile / Project Management"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section alternating-section">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <p className="section-subtitle">
          A comprehensive look at my technical expertise — with clear core strengths up front
        </p>

        <div className="skills-grid">
          {SKILL_CARDS.map((card) => (
            <div key={card.title} className="skill-card">
              <h3 className="skill-title">
                <i className={card.icon}></i> {card.title}
              </h3>
              <div>
                {card.badges.map((badge) => (
                  <div key={badge} className="tech-badge">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
