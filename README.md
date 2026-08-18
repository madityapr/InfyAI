<div align="center">

<img src="public/nav-logo.png" alt="infyAI logo" width="80" />

# infyAI

**The internet's smartest AI tools directory — auto-updated by AI, forever free.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-infy--ai.vercel.app-00d2ff?style=for-the-badge&logo=vercel&logoColor=white)](https://infy-ai.vercel.app)
[![Made with React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20AI-8B5CF6?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)

</div>

---

## 🚀 Live Demo

🌐 **[https://infy-ai.vercel.app](https://infy-ai.vercel.app)**

---

## 📌 What is infyAI?

**infyAI** is a fully automated, real-time AI tools discovery platform. It continuously scans the web, uses Google Gemini AI to identify and extract new AI tools, and adds them directly to a live database — no manual curation required.

Visitors can explore, filter, and subscribe to weekly newsletters about the best new AI tools across **23+ categories** like Coding, Design, Video & Audio, Agents, Research, and more.

---

## ✨ Features

- 🤖 **Autonomous AI Tool Discovery** — Scrapes 7 live sources (Product Hunt, HackerNews, TechCrunch, VentureBeat, Reddit r/LocalLLaMA, r/ArtificialIntelligence) via Google Gemini AI
- ⚡ **Real-Time Live Feed** — New tools appear live across all open browser tabs using Supabase Realtime + BroadcastChannel
- 📧 **Newsletter System** — Full subscriber management with branded welcome emails and HTML newsletter broadcasts via Brevo API
- 🎛️ **Admin Dashboard** — Full CRUD for tools catalog, subscriber list, and one-click newsletter composer with live HTML preview
- 🔍 **Smart Filtering** — Filter by category, pricing (Free / Freemium / Paid), and full-text search
- 🌙 **Premium Dark UI** — Glassmorphism design with electric cyan/black aesthetic, smooth animations, and responsive layout

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript 5.7, Tailwind CSS v4, Vite 8 |
| **Backend / API** | Vercel Serverless Functions (Edge Runtime) |
| **Database** | Supabase (PostgreSQL) with Realtime subscriptions |
| **AI Engine** | Google Gemini API (`gemini-flash-latest`) |
| **Email** | Brevo SMTP API (welcome emails + newsletter broadcasts) |
| **Hosting** | Vercel (CI/CD from GitHub) |

---

## 🧠 How the AI Engine Works

```
Every API call to /api/auto-fetch-tools:

  [7 RSS Feeds] ──► Fetch raw article titles + descriptions
       │
       ▼
  [Gemini AI] ──► Parse unstructured text → structured JSON
       │              { name, category, pricing, url, description }
       ▼
  [Deduplication] ──► Compare against existing names + URLs in Supabase
       │
       ▼
  [Supabase INSERT] ──► New tools saved + broadcast live to all users
```

---

## 📁 Project Structure

```
├── api/                        # Serverless edge functions (Vercel)
│   ├── auto-fetch-tools.ts     # AI-powered autonomous tool discovery
│   ├── subscribe.ts            # Email subscription + welcome email
│   ├── send-update.ts          # Admin newsletter broadcast
│   └── tools.ts                # REST CRUD API for tools catalog
│
├── src/
│   ├── App.tsx                 # Main application & routing
│   ├── pages/Admin.tsx         # Admin dashboard
│   ├── lib/
│   │   ├── autoDiscovery.ts    # Candidate pool & discovery logic
│   │   ├── newsletterTemplates.ts  # Email HTML templates
│   │   └── welcomeEmail.ts     # Welcome email template
│   └── index.css               # Global design system & animations
│
├── public/email-templates/     # Standalone HTML email templates
└── supabase-schema.sql         # Database schema
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 22+
- pnpm (or npm)
- A free [Supabase](https://supabase.com) project

### 1. Clone & Install

```bash
git clone https://github.com/madityapr/InfyAI.git
cd InfyAI
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_PASSWORD=your_admin_password
GEMINI_API_KEY=your_google_gemini_api_key
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_sender_email@example.com
```

### 3. Set Up the Database

Run the SQL schema in your Supabase SQL editor:

```bash
# Copy the contents of supabase-schema.sql into Supabase SQL Editor and run it
```

### 4. Start the Dev Server

```bash
pnpm dev
```

Open [http://localhost:8443](http://localhost:8443)

---

## 🌐 Deploying to Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add all environment variables from your `.env` file in the Vercel dashboard
4. Deploy — Vercel auto-detects Vite and deploys serverless API functions from `/api`

---

## 🔗 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/auto-fetch-tools` | `GET` / `POST` | Triggers AI-powered tool discovery from RSS feeds |
| `/api/subscribe` | `POST` | Subscribes a user and sends a branded welcome email |
| `/api/send-update` | `POST` | Broadcasts a newsletter HTML email to all subscribers (admin only) |
| `/api/tools` | `GET`, `POST`, `PUT`, `DELETE` | Full CRUD REST API for the tools catalog |

---

## 📸 Screenshots

> Live at **[https://infy-ai.vercel.app](https://infy-ai.vercel.app)**

---

## 📜 License

MIT — feel free to use, fork, and build on top of this project.

---

<div align="center">

Built with ❤️ by **[@madityapr](https://github.com/madityapr)**

⭐ Star this repo if you found it useful!

</div>
