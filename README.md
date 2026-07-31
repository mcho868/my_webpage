# Brendan Manseung Choi

### AI Engineer · Full-Stack Developer · Product Builder

[Portfolio](https://manseungchoi.com) ·
[LinkedIn](https://linkedin.com/in/manseung-choi-0447b4223) ·
[GitHub](https://github.com/mcho868) ·
[Email](mailto:brendanchoi0626@gmail.com)

Hi, I’m Brendan, an Auckland-based engineer who builds AI-powered products from
architecture through to production. My work sits at the intersection of applied
AI, backend engineering, and practical product development—especially where
software can make complex workflows simpler and more accessible.

I graduated from the University of Auckland with a Bachelor of Science
(Honours) in Computer Science, earning First Class Honours with a GPA of 8/9.
Since then, I have worked across healthcare AI, voice automation, local language
models, developer tools, and research.

## A few highlights

- Co-founded **Align Health Tech** and built clinical workflow automation used
  in an urgent care pilot, achieving an average patient satisfaction score of
  **8/10 across 120 patients**.
- Co-founded **AIvolve**, an AI voice agent for inbound calls, lead
  qualification, and automated job booking, and converted the product into a
  live paid subscription.
- Built an on-device medical triage system that achieved **70.4% accuracy** with
  **2.4-second end-to-end latency** using compact, quantized language models.
- Won **1st place** at the University of Auckland Legal Tech Hackathon with
  Plain Rights, a privacy-conscious RAG system that simplifies legal documents.
- Published two developer tools—**LOCAI** and **File Star**—on the VS Code
  Marketplace.

## Selected work

| Project | What it does | Technologies |
| --- | --- | --- |
| [AIvolve](https://aivolve.co.nz) | Answers inbound calls, qualifies leads, and books jobs automatically | Vapi, Twilio, n8n, GoHighLevel, Stripe |
| [CodeType](https://codetype.manseungchoi.com) | Helps programmers improve typing speed and accuracy with realistic code snippets | Next.js, TypeScript |
| Plain Rights | Converts complex legal contracts into verified plain-English summaries | Python, RAG, Tinfoil API |
| On-Device Medical Triage | Explores private, offline-capable clinical decision support with compact LLMs | Python, SmolLM2, LoRA, RAG |
| LOCAI | Provides privacy-first AI coding assistance through local Ollama models | TypeScript, Ollama, SQLite |
| Project Sofia | Replaces static course pages with a conversational, voice-enabled assistant | React, Django, MySQL, AWS, OpenAI |

## What I work with

**Languages:** Python, TypeScript, SQL  
**AI/ML:** RAG, LoRA/PEFT fine-tuning, LangChain, LangGraph, local LLMs, LLM APIs  
**Web:** Next.js, React, React Native, FastAPI, Flask, Django, Express  
**Data and cloud:** PostgreSQL, MySQL, SQLite, Firebase, Supabase, AWS, Azure  
**Automation and tooling:** n8n, Vapi, Git, Jira, Cursor, Claude Code, Gemini CLI,
OpenAI Codex

## About this portfolio

This repository contains my personal portfolio: a terminal-inspired, responsive
site that presents my experience, projects, technical skills, and interests. It
also includes an AI Q&A assistant that answers questions about my background
using a curated professional profile.

The site is built with:

- Next.js 16 and React 19
- TypeScript
- Custom responsive CSS
- A server-side Gemini API proxy
- Vercel deployment in the Sydney region

### Run it locally

You will need Node.js 24 and npm.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

The portfolio works without an API key, but the Q&A assistant requires a
`GEMINI_API_KEY` in `.env.local`:

```dotenv
GEMINI_API_KEY=your_api_key
```

For a production check, run:

```bash
npm run build
npm start
```

## Beyond software

Outside engineering, I’m a NASM-certified personal trainer, an electric
guitarist, and a home-barista-level coffee enthusiast. Those interests keep me
curious, disciplined, and grounded—and shape the way I approach building useful
technology.

If you’re working on an ambitious AI product or simply want to talk about
applied AI and product engineering, feel free to
[get in touch](mailto:brendanchoi0626@gmail.com).
