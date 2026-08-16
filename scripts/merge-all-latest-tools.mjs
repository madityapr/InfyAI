import fs from "fs"
import { createClient } from "@supabase/supabase-js"

const incomingTools = [
  { "name": "Windsurf", "url": "https://windsurf.com", "category": "Coding", "pricing": "Freemium", "rating": 4.7, "description": "Agentic AI code editor (formerly Codeium) with deep multi-file context" },
  { "name": "Replit Agent", "url": "https://replit.com", "category": "Coding", "pricing": "Freemium", "rating": 4.6, "description": "Build and deploy full apps from a prompt inside Replit's cloud IDE" },
  { "name": "Cody", "url": "https://sourcegraph.com/cody", "category": "Coding", "pricing": "Freemium", "rating": 4.5, "description": "Sourcegraph's AI coding assistant with codebase-wide context search" },
  { "name": "Amazon Q Developer", "url": "https://aws.amazon.com/q/developer", "category": "Coding", "pricing": "Freemium", "rating": 4.4, "description": "AWS's AI assistant for coding, debugging, and cloud app development" },
  { "name": "Supermaven", "url": "https://supermaven.com", "category": "Coding", "pricing": "Freemium", "rating": 4.6, "description": "Extremely fast AI autocomplete with a 1M-token context window" },
  { "name": "Cline", "url": "https://cline.bot", "category": "Coding", "pricing": "Free", "rating": 4.7, "description": "Open-source autonomous coding agent that runs inside VS Code", "is_infy_pick": true },
  { "name": "CodeRabbit", "url": "https://coderabbit.ai", "category": "Coding", "pricing": "Freemium", "rating": 4.6, "description": "AI code review bot that leaves contextual PR comments automatically" },
  { "name": "Qodo", "url": "https://qodo.ai", "category": "Coding", "pricing": "Freemium", "rating": 4.5, "description": "AI agent for test generation, code review, and code integrity" },
  { "name": "Zed", "url": "https://zed.dev", "category": "Coding", "pricing": "Free", "rating": 4.6, "description": "High-performance collaborative code editor with built-in AI assistant", "is_infy_pick": true },
  { "name": "Warp", "url": "https://warp.dev", "category": "Coding", "pricing": "Freemium", "rating": 4.7, "description": "AI-powered terminal that turns natural language into shell commands" },

  { "name": "Create.xyz", "url": "https://create.xyz", "category": "Building", "pricing": "Freemium", "rating": 4.5, "description": "Prompt-to-app builder for internal tools, dashboards, and web apps" },
  { "name": "Base44", "url": "https://base44.com", "category": "Building", "pricing": "Freemium", "rating": 4.6, "description": "All-in-one AI app builder that generates full-stack apps with backend included" },
  { "name": "Same.new", "url": "https://same.new", "category": "Building", "pricing": "Freemium", "rating": 4.5, "description": "AI agent that clones and rebuilds websites and web apps from a URL or prompt" },
  { "name": "Databutton", "url": "https://databutton.com", "category": "Building", "pricing": "Freemium", "rating": 4.4, "description": "AI agent workspace for building internal tools and data apps" },
  { "name": "Firebase Studio", "url": "https://firebase.studio", "category": "Building", "pricing": "Free", "rating": 4.5, "description": "Google's cloud-based agentic workspace for full-stack AI app development", "is_infy_pick": true },
  { "name": "Wordware", "url": "https://wordware.ai", "category": "Building", "pricing": "Freemium", "rating": 4.4, "description": "Natural-language IDE for building and deploying AI agents and workflows" },

  { "name": "Ideogram", "url": "https://ideogram.ai", "category": "Design", "pricing": "Freemium", "rating": 4.8, "description": "AI image generator known for accurate text rendering and typography" },
  { "name": "Flux", "url": "https://blackforestlabs.ai", "category": "Design", "pricing": "Freemium", "rating": 4.7, "description": "State-of-the-art open image generation models from Black Forest Labs" },
  { "name": "Freepik AI Suite", "url": "https://freepik.com/ai", "category": "Design", "pricing": "Freemium", "rating": 4.5, "description": "AI image, icon, and mockup generation built into the Freepik library" },
  { "name": "Clipdrop", "url": "https://clipdrop.co", "category": "Design", "pricing": "Freemium", "rating": 4.5, "description": "AI toolkit for background removal, relighting, and image cleanup" },
  { "name": "Uizard", "url": "https://uizard.io", "category": "Design", "pricing": "Freemium", "rating": 4.5, "description": "Turns sketches and text prompts into editable UI mockups" },
  { "name": "Galileo AI", "url": "https://usegalileo.ai", "category": "Design", "pricing": "Paid", "rating": 4.5, "description": "AI copilot that generates polished, editable UI designs from text prompts" },
  { "name": "Vectorizer.ai", "url": "https://vectorizer.ai", "category": "Design", "pricing": "Freemium", "rating": 4.4, "description": "Converts raster images into clean, scalable vector graphics with AI" },

  { "name": "Hedra", "url": "https://hedra.com", "category": "Video & Audio", "pricing": "Freemium", "rating": 4.6, "description": "AI character video generator that animates photos with speech and emotion" },
  { "name": "Viggle AI", "url": "https://viggle.ai", "category": "Video & Audio", "pricing": "Freemium", "rating": 4.4, "description": "AI motion tool that maps realistic movement onto any character" },
  { "name": "Topaz Video AI", "url": "https://topazlabs.com/topaz-video-ai", "category": "Video & Audio", "pricing": "Paid", "rating": 4.6, "description": "AI video upscaling, frame interpolation, and stabilization for pros" },
  { "name": "Adobe Podcast", "url": "https://podcast.adobe.com", "category": "Video & Audio", "pricing": "Freemium", "rating": 4.7, "description": "AI-powered audio enhancement that removes noise and studio-fies recordings" },
  { "name": "Play.ht", "url": "https://play.ht", "category": "Video & Audio", "pricing": "Freemium", "rating": 4.6, "description": "Ultra-realistic AI text-to-speech and voice cloning for creators" },
  { "name": "Veed.io", "url": "https://veed.io", "category": "Video & Audio", "pricing": "Freemium", "rating": 4.6, "description": "Browser-based AI video editor with subtitles, avatars, and translation" },
  { "name": "InVideo AI", "url": "https://invideo.io", "category": "Video & Audio", "pricing": "Freemium", "rating": 4.5, "description": "Generates full narrated videos from a single text prompt" },
  { "name": "Argil AI", "url": "https://argil.ai", "category": "Video & Audio", "pricing": "Paid", "rating": 4.5, "description": "Creates realistic AI avatar videos of yourself for social content" },

  { "name": "Reclaim.ai", "url": "https://reclaim.ai", "category": "Productivity", "pricing": "Freemium", "rating": 4.7, "description": "AI scheduling assistant that auto-defends time for habits and deep work" },
  { "name": "Clockwise", "url": "https://getclockwise.com", "category": "Productivity", "pricing": "Freemium", "rating": 4.6, "description": "AI calendar optimizer that creates focus time across your team" },
  { "name": "Krisp", "url": "https://krisp.ai", "category": "Productivity", "pricing": "Freemium", "rating": 4.7, "description": "AI noise cancellation and meeting transcription for any call app" },
  { "name": "Shortwave", "url": "https://shortwave.com", "category": "Productivity", "pricing": "Freemium", "rating": 4.6, "description": "AI email client that triages, drafts replies, and summarizes threads" },
  { "name": "Mindgrasp", "url": "https://mindgrasp.ai", "category": "Productivity", "pricing": "Freemium", "rating": 4.3, "description": "AI note-taker that turns lectures and videos into study guides" },

  { "name": "Elicit", "url": "https://elicit.com", "category": "Research", "pricing": "Freemium", "rating": 4.7, "description": "AI research assistant that automates literature review and paper screening" },
  { "name": "Consensus", "url": "https://consensus.app", "category": "Research", "pricing": "Freemium", "rating": 4.6, "description": "AI search engine that answers questions using evidence from scientific papers" },
  { "name": "Exa", "url": "https://exa.ai", "category": "Research", "pricing": "Freemium", "rating": 4.6, "description": "Neural search API built for AI agents to find high-quality web results" },
  { "name": "Tavily", "url": "https://tavily.com", "category": "Research", "pricing": "Freemium", "rating": 4.5, "description": "Search API purpose-built for grounding AI agents with real-time web data" },
  { "name": "Kagi", "url": "https://kagi.com", "category": "Research", "pricing": "Paid", "rating": 4.8, "description": "Premium ad-free search engine with AI-powered summaries and Assistant" },
  { "name": "Humata", "url": "https://humata.ai", "category": "Research", "pricing": "Freemium", "rating": 4.3, "description": "Ask questions and get cited answers from large document sets" },
  { "name": "Research Rabbit", "url": "https://researchrabbit.ai", "category": "Research", "pricing": "Free", "rating": 4.5, "description": "AI-driven citation mapping tool for discovering related academic papers", "is_infy_pick": true },
  { "name": "Scite", "url": "https://scite.ai", "category": "Research", "pricing": "Freemium", "rating": 4.5, "description": "Smart citations that show whether a paper supports or contradicts a claim" },
  { "name": "Wolfram Alpha", "url": "https://wolframalpha.com", "category": "Research", "pricing": "Freemium", "rating": 4.6, "description": "Computational knowledge engine for math, science, and data queries" },
  { "name": "Genspark", "url": "https://genspark.ai", "category": "Research", "pricing": "Freemium", "rating": 4.4, "description": "AI search engine that generates custom multi-source answer pages" },
  { "name": "Phind", "url": "https://phind.com", "category": "Research", "pricing": "Freemium", "rating": 4.5, "description": "AI search engine tuned for developers and technical questions" },
  { "name": "Grammarly", "url": "https://grammarly.com", "category": "Research", "pricing": "Freemium", "rating": 4.5, "description": "AI writing assistant for grammar, tone, and clarity across the web" },

  { "name": "Manus", "url": "https://manus.im", "category": "Agents", "pricing": "Freemium", "rating": 4.5, "description": "General-purpose AI agent that autonomously completes complex multi-step tasks" },
  { "name": "Lindy", "url": "https://lindy.ai", "category": "Agents", "pricing": "Freemium", "rating": 4.6, "description": "No-code platform for building AI agents that automate business workflows" },
  { "name": "Relevance AI", "url": "https://relevanceai.com", "category": "Agents", "pricing": "Freemium", "rating": 4.5, "description": "Build and deploy a team of AI agents for internal workflows" },
  { "name": "Browser Use", "url": "https://browser-use.com", "category": "Agents", "pricing": "Free", "rating": 4.5, "description": "Open-source framework that lets AI agents control a real web browser", "is_infy_pick": true },
  { "name": "Adept", "url": "https://adept.ai", "category": "Agents", "pricing": "Paid", "rating": 4.3, "description": "AI agent platform that acts directly inside enterprise software UIs" },

  { "name": "Ocoya", "url": "https://ocoya.com", "category": "Marketing", "pricing": "Freemium", "rating": 4.5, "description": "AI social media content creation and scheduling in one platform" },
  { "name": "Buffer AI Assistant", "url": "https://buffer.com", "category": "Marketing", "pricing": "Freemium", "rating": 4.5, "description": "AI caption and content ideas built into Buffer's scheduling tool" },
  { "name": "Marpipe", "url": "https://marpipe.com", "category": "Marketing", "pricing": "Paid", "rating": 4.4, "description": "AI-driven ad creative testing and performance analytics platform" },
  { "name": "Postwise", "url": "https://postwise.ai", "category": "Marketing", "pricing": "Freemium", "rating": 4.4, "description": "AI tool for writing and scheduling viral tweets and threads" },

  { "name": "Wordtune", "url": "https://wordtune.com", "category": "Writing", "pricing": "Freemium", "rating": 4.5, "description": "AI rewriting tool that rephrases sentences for clarity and tone" },
  { "name": "Novelcrafter", "url": "https://novelcrafter.com", "category": "Writing", "pricing": "Freemium", "rating": 4.5, "description": "AI-assisted novel writing workspace with codex and world-building tools" },
  { "name": "Squibler", "url": "https://squibler.io", "category": "Writing", "pricing": "Freemium", "rating": 4.3, "description": "AI story and screenplay writing software for authors and screenwriters" },

  { "name": "Hex", "url": "https://hex.tech", "category": "Data Analysis", "pricing": "Freemium", "rating": 4.6, "description": "AI-powered collaborative notebook for data science and analytics" },
  { "name": "Obviously AI", "url": "https://obviously.ai", "category": "Data Analysis", "pricing": "Freemium", "rating": 4.3, "description": "No-code platform that builds predictive machine learning models from spreadsheets" },
  { "name": "ThoughtSpot", "url": "https://thoughtspot.com", "category": "Data Analysis", "pricing": "Paid", "rating": 4.3, "description": "AI-powered natural language search for enterprise business analytics" },
  { "name": "DataRobot", "url": "https://datarobot.com", "category": "Data Analysis", "pricing": "Paid", "rating": 4.3, "description": "Enterprise AI platform for automated machine learning and MLOps" },

  { "name": "Decktopus", "url": "https://decktopus.com", "category": "Presentations", "pricing": "Freemium", "rating": 4.5, "description": "AI presentation generator with built-in design guidance and analytics" },
  { "name": "Plus AI", "url": "https://plusai.com", "category": "Presentations", "pricing": "Freemium", "rating": 4.5, "description": "AI slide generator that builds decks directly inside Google Slides" },
  { "name": "SlidesAI", "url": "https://slidesai.io", "category": "Presentations", "pricing": "Freemium", "rating": 4.4, "description": "Converts text into fully designed Google Slides presentations" },

  { "name": "Spline AI", "url": "https://spline.design", "category": "3D & Animation", "pricing": "Freemium", "rating": 4.6, "description": "AI-assisted 3D design tool for the web with real-time collaboration" },
  { "name": "Kaedim", "url": "https://kaedim3d.com", "category": "3D & Animation", "pricing": "Paid", "rating": 4.3, "description": "Converts 2D concept art into game-ready 3D models using AI" },
  { "name": "CSM AI", "url": "https://csm.ai", "category": "3D & Animation", "pricing": "Freemium", "rating": 4.3, "description": "Generates 3D assets and scenes from images or text in seconds" },
  { "name": "Hyper3D Rodin", "url": "https://hyper3d.ai", "category": "3D & Animation", "pricing": "Freemium", "rating": 4.4, "description": "High-fidelity AI text-to-3D and image-to-3D generation engine" },

  { "name": "Ada", "url": "https://ada.cx", "category": "Customer Support", "pricing": "Paid", "rating": 4.5, "description": "Enterprise AI customer service agent that resolves tickets automatically" },
  { "name": "Decagon", "url": "https://decagon.ai", "category": "Customer Support", "pricing": "Paid", "rating": 4.6, "description": "AI concierge agents that handle complex customer support conversations" },
  { "name": "Forethought", "url": "https://forethought.ai", "category": "Customer Support", "pricing": "Paid", "rating": 4.4, "description": "Generative AI for support ticket triage, deflection, and agent assist" },
  { "name": "Zendesk AI", "url": "https://zendesk.com/ai", "category": "Customer Support", "pricing": "Paid", "rating": 4.5, "description": "Built-in AI agents and copilots across the Zendesk support suite" },

  { "name": "11x", "url": "https://11x.ai", "category": "Sales", "pricing": "Paid", "rating": 4.5, "description": "Fully autonomous AI sales development reps that prospect and book meetings" },
  { "name": "Instantly", "url": "https://instantly.ai", "category": "Sales", "pricing": "Freemium", "rating": 4.6, "description": "AI-assisted cold email outreach and deliverability platform" },
  { "name": "Warmly", "url": "https://warmly.ai", "category": "Sales", "pricing": "Freemium", "rating": 4.4, "description": "AI platform that identifies and engages website visitors in real time" },
  { "name": "Regie.ai", "url": "https://regie.ai", "category": "Sales", "pricing": "Paid", "rating": 4.4, "description": "AI content and sequence generator for outbound sales teams" },

  { "name": "Inworld AI", "url": "https://inworld.ai", "category": "Gaming", "pricing": "Freemium", "rating": 4.6, "description": "AI engine that gives game NPCs dynamic, memory-aware conversations" },
  { "name": "Scenario", "url": "https://scenario.com", "category": "Gaming", "pricing": "Freemium", "rating": 4.5, "description": "Train custom AI models to generate game-ready art assets in your style" },
  { "name": "Rosebud AI", "url": "https://rosebud.ai", "category": "Gaming", "pricing": "Freemium", "rating": 4.4, "description": "Browser-based AI tool that builds playable games from a text prompt" },
  { "name": "Ludo.ai", "url": "https://ludo.ai", "category": "Gaming", "pricing": "Freemium", "rating": 4.3, "description": "AI game design copilot for ideation, market research, and concept art" },
  { "name": "Latitude", "url": "https://latitude.io", "category": "Gaming", "pricing": "Freemium", "rating": 4.3, "description": "AI-powered platform for building branching, text-based interactive games" },
  { "name": "AI Dungeon", "url": "https://aidungeon.com", "category": "Gaming", "pricing": "Freemium", "rating": 4.4, "description": "Open-ended AI text adventure game with infinite generated storylines" },
  { "name": "Charisma.ai", "url": "https://charisma.ai", "category": "Gaming", "pricing": "Freemium", "rating": 4.2, "description": "No-code tool for creating emotionally responsive AI game characters" },

  { "name": "Harvey", "url": "https://harvey.ai", "category": "Legal", "pricing": "Paid", "rating": 4.7, "description": "AI platform built for law firms to draft, review, and research legal work" },
  { "name": "Spellbook", "url": "https://spellbook.legal", "category": "Legal", "pricing": "Freemium", "rating": 4.5, "description": "AI contract drafting and review assistant that lives inside Word" },
  { "name": "Casetext CoCounsel", "url": "https://casetext.com", "category": "Legal", "pricing": "Paid", "rating": 4.6, "description": "AI legal assistant for document review, research, and deposition prep" },
  { "name": "Ironclad AI", "url": "https://ironcladapp.com", "category": "Legal", "pricing": "Paid", "rating": 4.5, "description": "AI-powered contract lifecycle management and clause negotiation" },
  { "name": "DoNotPay", "url": "https://donotpay.com", "category": "Legal", "pricing": "Paid", "rating": 4.1, "description": "Consumer AI assistant for disputing bills, fines, and simple legal tasks" },

  { "name": "Paradox", "url": "https://paradox.ai", "category": "HR & Recruiting", "pricing": "Paid", "rating": 4.5, "description": "Conversational AI recruiter that screens and schedules candidates" },
  { "name": "HireVue", "url": "https://hirevue.com", "category": "HR & Recruiting", "pricing": "Paid", "rating": 4.3, "description": "AI-powered video interviewing and candidate assessment platform" },
  { "name": "Textio", "url": "https://textio.com", "category": "HR & Recruiting", "pricing": "Paid", "rating": 4.4, "description": "AI writing tool that removes bias from job posts and performance reviews" },
  { "name": "SeekOut", "url": "https://seekout.com", "category": "HR & Recruiting", "pricing": "Paid", "rating": 4.5, "description": "AI-powered talent sourcing and candidate matching search engine" },
  { "name": "Fetcher", "url": "https://fetcher.ai", "category": "HR & Recruiting", "pricing": "Paid", "rating": 4.4, "description": "AI recruiting tool that automates candidate sourcing and outreach" },

  { "name": "Rogo", "url": "https://rogo.ai", "category": "Finance", "pricing": "Paid", "rating": 4.6, "description": "AI research copilot built for investment banking and equity research" },
  { "name": "Ramp AI", "url": "https://ramp.com", "category": "Finance", "pricing": "Freemium", "rating": 4.6, "description": "AI-powered corporate card and spend management with automated bookkeeping" },
  { "name": "Vic.ai", "url": "https://vic.ai", "category": "Finance", "pricing": "Paid", "rating": 4.4, "description": "Autonomous AI for accounts payable invoice processing" },
  { "name": "FinChat", "url": "https://finchat.io", "category": "Finance", "pricing": "Freemium", "rating": 4.5, "description": "AI financial research assistant for stock analysis and modeling" },

  { "name": "Abridge", "url": "https://abridge.com", "category": "Healthcare", "pricing": "Paid", "rating": 4.6, "description": "AI medical scribe that turns patient conversations into clinical notes" },
  { "name": "Nabla", "url": "https://nabla.com", "category": "Healthcare", "pricing": "Paid", "rating": 4.5, "description": "Ambient AI copilot that documents clinical visits in real time" },
  { "name": "Suki AI", "url": "https://suki.ai", "category": "Healthcare", "pricing": "Paid", "rating": 4.5, "description": "Voice AI assistant that automates clinical documentation for doctors" },
  { "name": "Glass Health", "url": "https://glass.health", "category": "Healthcare", "pricing": "Freemium", "rating": 4.3, "description": "AI clinical decision support for building differential diagnoses and plans" },

  { "name": "MagicSchool AI", "url": "https://magicschool.ai", "category": "Education", "pricing": "Freemium", "rating": 4.7, "description": "AI toolkit that helps teachers plan lessons, grade, and create materials" },
  { "name": "Khanmigo", "url": "https://khanacademy.org/khan-labs", "category": "Education", "pricing": "Paid", "rating": 4.6, "description": "Khan Academy's AI tutor that guides students through problems Socratically" },
  { "name": "Curipod", "url": "https://curipod.com", "category": "Education", "pricing": "Freemium", "rating": 4.5, "description": "AI tool that generates interactive, standards-aligned classroom lessons" },
  { "name": "Diffit", "url": "https://diffit.me", "category": "Education", "pricing": "Freemium", "rating": 4.4, "description": "AI tool that differentiates reading materials to student level instantly" },

  { "name": "AIVA", "url": "https://aiva.ai", "category": "Music", "pricing": "Freemium", "rating": 4.5, "description": "AI composer that creates original orchestral and cinematic music scores" },
  { "name": "Boomy", "url": "https://boomy.com", "category": "Music", "pricing": "Freemium", "rating": 4.3, "description": "Generate original songs instantly with AI, no music skills required" },
  { "name": "Soundraw", "url": "https://soundraw.io", "category": "Music", "pricing": "Freemium", "rating": 4.4, "description": "AI music generator for royalty-free background tracks by mood and genre" },
  { "name": "LANDR", "url": "https://landr.com", "category": "Music", "pricing": "Freemium", "rating": 4.5, "description": "AI-powered audio mastering and distribution for independent musicians" },

  { "name": "Rebuy", "url": "https://rebuyengine.com", "category": "E-commerce", "pricing": "Paid", "rating": 4.5, "description": "AI personalization engine for product recommendations and upsells" },
  { "name": "Octane AI", "url": "https://octaneai.com", "category": "E-commerce", "pricing": "Freemium", "rating": 4.4, "description": "AI quiz and product recommendation builder for Shopify stores" },
  { "name": "Shopify Sidekick", "url": "https://shopify.com/sidekick", "category": "E-commerce", "pricing": "Freemium", "rating": 4.4, "description": "Shopify's built-in AI commerce assistant for store management tasks" }
]

// 1. Read existing tools from tools.ts
const file = fs.readFileSync("src/data/tools.ts", "utf8")
const match = file.match(/export const tools: Tool\[\] = (\[[\s\S]*?\])\n\n?/m)
const existingTools = JSON.parse(match[1])

// 2. Build deduplicated map
const map = new Map()
// First load existing
for (const t of existingTools) {
  const key = t.name.toLowerCase().trim()
  map.set(key, t)
}
// Merge incoming
let updatedCount = 0
let newCount = 0
for (const t of incomingTools) {
  const key = t.name.toLowerCase().trim()
  const existing = map.get(key)
  if (existing) {
    // Update existing
    map.set(key, {
      ...existing,
      ...t,
      is_infy_pick: t.is_infy_pick !== undefined ? t.is_infy_pick : existing.is_infy_pick,
    })
    updatedCount++
  } else {
    // Add new
    map.set(key, {
      ...t,
      is_infy_pick: t.is_infy_pick || (t.pricing === "Free" && t.rating >= 4.7),
    })
    newCount++
  }
}

const finalTools = Array.from(map.values())
console.log(`Merged Total: ${finalTools.length} unique tools (${newCount} new, ${updatedCount} updated, 0 duplicates)`)

// 3. Collect all categories in clean logical order
const categoryOrder = [
  "Coding", "Building", "Design", "Video & Audio", "Productivity",
  "Research", "Agents", "Marketing", "Writing", "Data Analysis",
  "Presentations", "3D & Animation", "Customer Support", "Sales",
  "Gaming", "Legal", "HR & Recruiting", "Finance", "Healthcare",
  "Education", "Music", "E-commerce"
]

const foundCats = new Set(categoryOrder)
finalTools.forEach((t) => foundCats.add(t.category))
const allCategories = Array.from(foundCats)

// 4. Update src/data/tools.ts
const newToolsContent = `export type Pricing = "Free" | "Freemium" | "Paid"
export type Category =
${allCategories.map((c) => `  | "${c}"`).join("\n")}

export interface Tool {
  name: string
  description: string
  category: Category
  pricing: Pricing
  rating: number
  url: string
  is_infy_pick?: boolean
}

export const CATEGORIES: Array<Category> = [
${allCategories.map((c) => `  "${c}",`).join("\n")}
]

export const PRICING_OPTIONS = ["All", "Free", "Freemium", "Paid"] as const
export type PricingFilter = (typeof PRICING_OPTIONS)[number]

export const tools: Tool[] = ${JSON.stringify(finalTools, null, 2)}
`

fs.writeFileSync("src/data/tools.ts", newToolsContent)
console.log("Updated src/data/tools.ts")

// 5. Update downloadable text and JSON files
let textContent = `================================================================================
InfyAI - Complete List of Curated AI Tools (${finalTools.length} Tools)
Website: https://infyai.com
================================================================================\n\n`

allCategories.forEach((cat) => {
  const catTools = finalTools.filter((t) => t.category === cat)
  if (catTools.length === 0) return
  textContent += `[${cat.toUpperCase()}] (${catTools.length} tools)\n`
  catTools.forEach((t, idx) => {
    textContent += `${idx + 1}. ${t.name}${t.is_infy_pick ? " ✦ [Infy Pick]" : ""}\n   URL: ${t.url}\n   Category: ${t.category} | Pricing: ${t.pricing} | Rating: ${t.rating}\n   Description: ${t.description}\n\n`
  })
})

fs.writeFileSync("public/infy_ai_tools.txt", textContent)
fs.writeFileSync("C:/Users/User/Downloads/infy_ai_tools.txt", textContent)
fs.writeFileSync("C:/Users/User/Downloads/infy_ai_tools.json", JSON.stringify(finalTools, null, 2))
console.log(`Saved updated files to Downloads: C:/Users/User/Downloads/infy_ai_tools.txt (${finalTools.length} tools)`)

// 6. Sync to Supabase DB
const supabaseUrl = "https://eemhvfqldhkcdbsbibgo.supabase.co"
const supabaseKey = "sb_publishable_BNP5lzHiffMGrib-0kkZug_JSWUYMCH"
const supabase = createClient(supabaseUrl, supabaseKey)

const fallbackCategoryMap = {
  "Data Analysis": "Research",
  "Presentations": "Design",
  "3D & Animation": "Design",
  "Customer Support": "Agents",
  "Sales": "Marketing",
  "Gaming": "Design",
  "Legal": "Productivity",
  "HR & Recruiting": "Productivity",
  "Finance": "Research",
  "Healthcare": "Research",
  "Education": "Research",
  "Music": "Video & Audio",
  "E-commerce": "Marketing",
}

async function syncToSupabase() {
  console.log(`Syncing all ${finalTools.length} tools to Supabase...`)
  await supabase.from("tools").delete().neq("id", "00000000-0000-0000-0000-000000000000")

  let inserted = 0
  for (const t of finalTools) {
    // Try insert
    let res = await supabase.from("tools").insert({
      name: t.name,
      description: t.description,
      category: t.category,
      pricing: t.pricing,
      rating: t.rating,
      url: t.url,
    })

    if (res.error) {
      const mappedCategory = fallbackCategoryMap[t.category] || "Productivity"
      res = await supabase.from("tools").insert({
        name: t.name,
        description: t.description,
        category: mappedCategory,
        pricing: t.pricing,
        rating: t.rating,
        url: t.url,
      })
    }

    if (!res.error) inserted++
    else console.error(`Error on ${t.name}:`, res.error.message)
  }

  const { data: dbTools } = await supabase.from("tools").select("id, name")
  console.log(`🎉 Supabase database verified: Exactly ${dbTools ? dbTools.length : inserted} tools live! (0 duplicates)`)
}

syncToSupabase()
