"use client";

import { useState, type ReactNode } from "react";

type TimelineItem = {
  title: string;
  company: ReactNode;
  date: string;
  description: ReactNode;
};

const TECH_ITEMS: TimelineItem[] = [
  {
    title: "Founding Engineer & CTO",
    company: (
      <a
        href="https://aivolve.co.nz"
        target="_blank"
        rel="noreferrer"
        style={{ color: "var(--primary-color)", textDecoration: "none" }}
      >
        aivolve.co.nz
      </a>
    ),
    date: "December 2025 - Present",
    description: (
      <>
        Building an end-to-end AI voice agent for inbound calls, lead qualification, and
        automated job booking — VAPI and Twilio for call agents, n8n for workflow
        automation, GoHighLevel for CRM/scheduling sync, and Stripe for subscriptions.
        Sold a live subscription to a real user.
      </>
    ),
  },
  {
    title: "Founding Engineer & CTO",
    company: (
      <a
        href="https://alignhealthtech.com"
        target="_blank"
        rel="noreferrer"
        style={{ color: "var(--primary-color)", textDecoration: "none" }}
      >
        alignhealthtech.com
      </a>
    ),
    date: "October 2025 - July 2026",
    description: (
      <>
        Designed and implemented AI-driven clinical workflow automation for urgent care
        clinics, built as a Next.js / TypeScript application on Azure. Secured NZD $15K
        Velocity Challenge funding. <b>Ongoing pilot at an Urgent Care Clinic</b> with an
        average patient satisfaction score of 8/10 across 120 pilot patients.
      </>
    ),
  },
  {
    title: "Research Assistant (AI Based Web Development)",
    company: "University of Auckland",
    date: "December 2024 - 2025",
    description: (
      <>
        Built an AI-powered course assistant using GPT-based NLP, TTS voice synthesis,
        and an avatar-based React frontend. Designed conversational interfaces to
        replace static course information pages.
      </>
    ),
  },
  {
    title: "Bachelor of Science (Honours) in Computer Science",
    company: "University of Auckland",
    date: "February 2022 - December 2025",
    description: (
      <>
        Studied Machine Learning, AI, and large-scale software development with a GPA of
        8.063/9. Graduated with First Class Honours and awarded the University of
        Auckland Postgraduate Honours/PG Diploma Scholarship.
      </>
    ),
  },
];

const NON_TECH_ITEMS: TimelineItem[] = [
  {
    title: "Maths/Programming Tutor",
    company: "Self-Employed",
    date: "2026 - Present",
    description:
      "Teaching students maths and programming through a learning platform focused on clear explanations, problem solving, and practical coding skills.",
  },
  {
    title: "Personal Trainer",
    company: "CityFitness",
    date: "September 2024 - 2025",
    description:
      "NASM certified personal trainer, helping clients achieve fitness goals through personalized workout programs and nutrition guidance.",
  },
  {
    title: "Math Tutor",
    company: "Self-Employed",
    date: "May 2023 - 2024",
    description:
      "Provided one-on-one mathematics tutoring to high school and university students, focusing on calculus and algebra.",
  },
  {
    title: "Cashier",
    company: "Coin Singing Booth Karaoke",
    date: "May 2022 - 2025",
    description:
      "Managed customer transactions and provided excellent customer service in a fast-paced entertainment environment.",
  },
  {
    title: "Hall/Kitchen Staff",
    company: "Katsubi",
    date: "2019 - 2021",
    description:
      "Supported restaurant operations through food service and kitchen assistance, developed strong teamwork and time management skills.",
  },
];

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div key={index} className="timeline-item">
          <h3 className="experience-title">{item.title}</h3>
          <p className="experience-company">{item.company}</p>
          <p className="experience-date">{item.date}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState<"tech" | "non-tech">("tech");

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">My Roadmap</h2>
        <p className="section-subtitle">My professional journey and academic background</p>

        <div
          className="experience-toggle-mobile"
          style={{ display: "none", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}
        >
          <button
            className={`experience-toggle-btn${activeTab === "tech" ? " active" : ""}`}
            onClick={() => setActiveTab("tech")}
            id="tech-btn"
          >
            <i className="fas fa-laptop-code"></i> Tech
          </button>
          <button
            className={`experience-toggle-btn${activeTab === "non-tech" ? " active" : ""}`}
            onClick={() => setActiveTab("non-tech")}
            id="non-tech-btn"
          >
            <i className="fas fa-briefcase"></i> Beyond Tech
          </button>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="experience-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              marginBottom: "2rem",
            }}
          >
            <div
              id="tech-experience"
              className={`experience-column${activeTab === "tech" ? " active" : ""}`}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "2rem",
                  color: "var(--primary-color)",
                  textAlign: "center",
                }}
              >
                <i className="fas fa-laptop-code"></i> Software &amp; Tech
              </h3>
              <Timeline items={TECH_ITEMS} />
            </div>

            <div
              id="non-tech-experience"
              className={`experience-column${activeTab === "non-tech" ? " active" : ""}`}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "2rem",
                  color: "var(--primary-color)",
                  textAlign: "center",
                }}
              >
                <i className="fas fa-briefcase"></i> Beyond Tech
              </h3>
              <Timeline items={NON_TECH_ITEMS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
