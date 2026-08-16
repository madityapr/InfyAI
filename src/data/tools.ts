export type Pricing = "Free" | "Freemium" | "Paid"
export type Category =
  | "Coding"
  | "Building"
  | "Design"
  | "Video & Audio"
  | "Productivity"
  | "Research"
  | "Agents"
  | "Marketing"
  | "Writing"
  | "Data Analysis"
  | "Presentations"
  | "3D & Animation"
  | "Customer Support"
  | "Sales"

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
  "Coding",
  "Building",
  "Design",
  "Video & Audio",
  "Productivity",
  "Research",
  "Agents",
  "Marketing",
  "Writing",
  "Data Analysis",
  "Presentations",
  "3D & Animation",
  "Customer Support",
  "Sales",
]

export const PRICING_OPTIONS = ["All", "Free", "Freemium", "Paid"] as const
export type PricingFilter = (typeof PRICING_OPTIONS)[number]

export const tools: Tool[] = [
  {
    "name": "Aider",
    "description": "AI pair programming directly in your terminal and git repository",
    "category": "Coding",
    "pricing": "Free",
    "rating": 4.9,
    "url": "https://aider.chat",
    "is_infy_pick": true
  },
  {
    "name": "Cursor",
    "description": "AI-first code editor built on VS Code for 10x developer productivity",
    "category": "Coding",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://cursor.com",
    "is_infy_pick": false
  },
  {
    "name": "Codeium",
    "description": "Free AI code acceleration and autocomplete for individual developers",
    "category": "Coding",
    "pricing": "Free",
    "rating": 4.7,
    "url": "https://codeium.com",
    "is_infy_pick": true
  },
  {
    "name": "Continue",
    "description": "Open-source AI coding assistant inside VS Code and JetBrains",
    "category": "Coding",
    "pricing": "Free",
    "rating": 4.8,
    "url": "https://continue.dev",
    "is_infy_pick": true
  },
  {
    "name": "Bolt.new",
    "description": "Prompt, build, and deploy full-stack web applications in the browser",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.9,
    "url": "https://bolt.new",
    "is_infy_pick": false
  },
  {
    "name": "Lovable",
    "description": "Full-stack AI app builder that turns natural language into production code",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://lovable.dev",
    "is_infy_pick": false
  },
  {
    "name": "v0",
    "description": "Vercel's generative UI tool that creates clean React and Tailwind components",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.9,
    "url": "https://v0.dev",
    "is_infy_pick": false
  },
  {
    "name": "Relume",
    "description": "Generate complete sitemaps and wireframes for websites in seconds",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://relume.io",
    "is_infy_pick": false
  },
  {
    "name": "Framer AI",
    "description": "Design and publish responsive, modern websites with AI layout assistance",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://framer.com",
    "is_infy_pick": false
  },
  {
    "name": "Dora",
    "description": "Design 3D and animated websites without writing code using AI",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.5,
    "url": "https://dora.run",
    "is_infy_pick": false
  },
  {
    "name": "Webflow AI",
    "description": "AI-powered web design, content generation, and styling in Webflow",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://webflow.com",
    "is_infy_pick": false
  },
  {
    "name": "Midjourney",
    "description": "State-of-the-art AI image generation and photorealistic visual art",
    "category": "Design",
    "pricing": "Paid",
    "rating": 4.9,
    "url": "https://midjourney.com",
    "is_infy_pick": false
  },
  {
    "name": "Leonardo.ai",
    "description": "Create production-ready game assets, concept art, and illustrations",
    "category": "Design",
    "pricing": "Freemium",
    "rating": 4.7,
    "url": "https://leonardo.ai",
    "is_infy_pick": false
  },
  {
    "name": "Krea",
    "description": "Real-time AI image generation, upscaling, and pattern generation",
    "category": "Design",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://krea.ai",
    "is_infy_pick": false
  },
  {
    "name": "Magnific",
    "description": "AI image upscaler and enhancer that hallucinates incredible high detail",
    "category": "Design",
    "pricing": "Paid",
    "rating": 4.7,
    "url": "https://magnific.ai",
    "is_infy_pick": false
  },
  {
    "name": "Recraft",
    "description": "AI vector graphic and 3D icon generator for professional designers",
    "category": "Design",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://recraft.ai",
    "is_infy_pick": false
  },
  {
    "name": "Photoroom",
    "description": "Automatic AI background removal, product photography, and object erasing",
    "category": "Design",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://photoroom.com",
    "is_infy_pick": false
  },
  {
    "name": "Canva Magic Studio",
    "description": "All-in-one AI design tools for social posts, slides, and branding",
    "category": "Design",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://canva.com",
    "is_infy_pick": false
  },
  {
    "name": "Runway",
    "description": "Next-gen AI video generation (Gen-3 Alpha) and multimodal VFX tools",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.7,
    "url": "https://runwayml.com",
    "is_infy_pick": false
  },
  {
    "name": "Pika",
    "description": "Idea-to-video platform that turns text and images into dynamic 3D scenes",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://pika.art",
    "is_infy_pick": false
  },
  {
    "name": "Luma Dream Machine",
    "description": "High-fidelity AI video model creating realistic motion and camera moves",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://lumalabs.ai/dream-machine",
    "is_infy_pick": false
  },
  {
    "name": "Kling AI",
    "description": "Advanced cinematic video generation model with physical simulation",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://klingai.com",
    "is_infy_pick": false
  },
  {
    "name": "ElevenLabs",
    "description": "Ultra-realistic voice synthesis, voice cloning, and AI dubbing in 30+ languages",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.9,
    "url": "https://elevenlabs.io",
    "is_infy_pick": false
  },
  {
    "name": "Suno",
    "description": "Generate full radio-ready songs with vocals and instruments from a prompt",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://suno.com",
    "is_infy_pick": false
  },
  {
    "name": "Udio",
    "description": "Create studio-quality music tracks with lyrics across any music genre",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://udio.com",
    "is_infy_pick": false
  },
  {
    "name": "HeyGen",
    "description": "AI video generator with photorealistic digital avatars and translation",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.7,
    "url": "https://heygen.com",
    "is_infy_pick": false
  },
  {
    "name": "Descript",
    "description": "All-in-one video and podcast editor as simple as editing a text doc",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://descript.com",
    "is_infy_pick": false
  },
  {
    "name": "Opus Clip",
    "description": "Turn long YouTube videos into viral short clips for TikTok and Reels",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.7,
    "url": "https://opus.pro",
    "is_infy_pick": false
  },
  {
    "name": "Notion AI",
    "description": "AI writing assistant, summarizer, and Q&A engine inside Notion",
    "category": "Productivity",
    "pricing": "Freemium",
    "rating": 4.7,
    "url": "https://notion.so",
    "is_infy_pick": false
  },
  {
    "name": "Taskade",
    "description": "AI agents, task management, and collaborative mind mapping",
    "category": "Productivity",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://taskade.com",
    "is_infy_pick": false
  },
  {
    "name": "Otter.ai",
    "description": "Real-time meeting notes, audio transcription, and AI summary insights",
    "category": "Productivity",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://otter.ai",
    "is_infy_pick": false
  },
  {
    "name": "Fireflies.ai",
    "description": "Automate meeting notes, transcribe voice calls, and search conversations",
    "category": "Productivity",
    "pricing": "Freemium",
    "rating": 4.7,
    "url": "https://fireflies.ai",
    "is_infy_pick": false
  },
  {
    "name": "Fathom",
    "description": "Free AI meeting assistant that records, transcribes, and summarizes Zoom calls",
    "category": "Productivity",
    "pricing": "Free",
    "rating": 4.8,
    "url": "https://fathom.video",
    "is_infy_pick": true
  },
  {
    "name": "Superhuman AI",
    "description": "AI-powered email client designed to help you hit Inbox Zero in half the time",
    "category": "Productivity",
    "pricing": "Paid",
    "rating": 4.7,
    "url": "https://superhuman.com",
    "is_infy_pick": false
  },
  {
    "name": "Raycast AI",
    "description": "Supercharged Mac launcher with ChatGPT and Claude built into your desktop",
    "category": "Productivity",
    "pricing": "Freemium",
    "rating": 4.9,
    "url": "https://raycast.com",
    "is_infy_pick": false
  },
  {
    "name": "Mem.ai",
    "description": "Self-organizing workspace that connects your thoughts and notes with AI",
    "category": "Productivity",
    "pricing": "Freemium",
    "rating": 4.4,
    "url": "https://mem.ai",
    "is_infy_pick": false
  },
  {
    "name": "SciSpace",
    "description": "AI research assistant to explain complex scientific papers and equations",
    "category": "Research",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://typeset.io",
    "is_infy_pick": false
  },
  {
    "name": "ChatPDF",
    "description": "Chat with any PDF document, research paper, or textbook using AI",
    "category": "Research",
    "pricing": "Free",
    "rating": 4.6,
    "url": "https://chatpdf.com",
    "is_infy_pick": true
  },
  {
    "name": "NotebookLM",
    "description": "Google's AI notebook that grounds analysis in your notes and audio discussions",
    "category": "Research",
    "pricing": "Free",
    "rating": 4.9,
    "url": "https://notebooklm.google.com",
    "is_infy_pick": true
  },
  {
    "name": "Arc Search",
    "description": "Browse for me AI search engine that reads webpages and creates summaries",
    "category": "Research",
    "pricing": "Free",
    "rating": 4.8,
    "url": "https://arc.net",
    "is_infy_pick": true
  },
  {
    "name": "AutoGPT",
    "description": "Open-source autonomous AI agent framework executing complex multi-step tasks",
    "category": "Agents",
    "pricing": "Free",
    "rating": 4.5,
    "url": "https://autogpt.net",
    "is_infy_pick": true
  },
  {
    "name": "CrewAI",
    "description": "Framework for orchestrating autonomous AI agent role-playing teams",
    "category": "Agents",
    "pricing": "Free",
    "rating": 4.8,
    "url": "https://crewai.com",
    "is_infy_pick": true
  },
  {
    "name": "Multion",
    "description": "Next-gen AI web browser agent that takes actions and navigates for you",
    "category": "Agents",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://multion.ai",
    "is_infy_pick": false
  },
  {
    "name": "AgentGPT",
    "description": "Assemble, configure, and deploy autonomous AI agents directly in the browser",
    "category": "Agents",
    "pricing": "Freemium",
    "rating": 4.5,
    "url": "https://agentgpt.reworkd.ai",
    "is_infy_pick": false
  },
  {
    "name": "Devin",
    "description": "The world's first fully autonomous AI software engineer by Cognition",
    "category": "Agents",
    "pricing": "Paid",
    "rating": 4.9,
    "url": "https://cognition.ai",
    "is_infy_pick": false
  },
  {
    "name": "Mutiny",
    "description": "No-code AI personalization platform to convert 2x more website visitors",
    "category": "Marketing",
    "pricing": "Paid",
    "rating": 4.6,
    "url": "https://mutinyhq.com",
    "is_infy_pick": false
  },
  {
    "name": "Surfer SEO",
    "description": "Data-driven SEO content editor that helps articles rank #1 on Google",
    "category": "Marketing",
    "pricing": "Paid",
    "rating": 4.7,
    "url": "https://surferseo.com",
    "is_infy_pick": false
  },
  {
    "name": "Anyword",
    "description": "Performance copywriting AI that predicts engagement scores before publishing",
    "category": "Marketing",
    "pricing": "Freemium",
    "rating": 4.5,
    "url": "https://anyword.com",
    "is_infy_pick": false
  },
  {
    "name": "Taplio",
    "description": "All-in-one AI tool to grow and monetize your personal brand on LinkedIn",
    "category": "Marketing",
    "pricing": "Paid",
    "rating": 4.6,
    "url": "https://taplio.com",
    "is_infy_pick": false
  },
  {
    "name": "Jasper",
    "description": "Enterprise AI writing platform with custom brand voice and style guides",
    "category": "Writing",
    "pricing": "Paid",
    "rating": 4.5,
    "url": "https://jasper.ai",
    "is_infy_pick": false
  },
  {
    "name": "Copy.ai",
    "description": "AI copywriter for blog posts, email campaigns, and marketing collateral",
    "category": "Writing",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://copy.ai",
    "is_infy_pick": false
  },
  {
    "name": "Writesonic",
    "description": "AI article writer and SEO content generation platform",
    "category": "Writing",
    "pricing": "Freemium",
    "rating": 4.5,
    "url": "https://writesonic.com",
    "is_infy_pick": false
  },
  {
    "name": "Sudowrite",
    "description": "AI fiction and creative writing companion for novel authors and screenwriters",
    "category": "Writing",
    "pricing": "Paid",
    "rating": 4.8,
    "url": "https://sudowrite.com",
    "is_infy_pick": false
  },
  {
    "name": "QuillBot",
    "description": "AI paraphraser, grammar checker, and text summarizer for clear writing",
    "category": "Writing",
    "pricing": "Freemium",
    "rating": 4.7,
    "url": "https://quillbot.com",
    "is_infy_pick": false
  },
  {
    "name": "Lex",
    "description": "Modern AI-native word processor with smart feedback and autocomplete",
    "category": "Writing",
    "pricing": "Freemium",
    "rating": 4.7,
    "url": "https://lex.page",
    "is_infy_pick": false
  },
  {
    "name": "Julius AI",
    "description": "Chat with your data, generate Python charts, and perform statistical analysis",
    "category": "Data Analysis",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://julius.ai",
    "is_infy_pick": false
  },
  {
    "name": "Rose AI",
    "description": "Cloud data platform for finding, cleaning, and visualizing financial data",
    "category": "Data Analysis",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://rose.ai",
    "is_infy_pick": false
  },
  {
    "name": "Akkio",
    "description": "Generative analytics and predictive machine learning platform for businesses",
    "category": "Data Analysis",
    "pricing": "Paid",
    "rating": 4.5,
    "url": "https://akkio.com",
    "is_infy_pick": false
  },
  {
    "name": "Polymer",
    "description": "No-code AI business intelligence tool that turns spreadsheets into dashboards",
    "category": "Data Analysis",
    "pricing": "Freemium",
    "rating": 4.5,
    "url": "https://polymersearch.com",
    "is_infy_pick": false
  },
  {
    "name": "Tome",
    "description": "Generative storytelling platform that turns ideas into interactive pitch decks",
    "category": "Presentations",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://tome.app",
    "is_infy_pick": false
  },
  {
    "name": "Gamma",
    "description": "Generate polished presentations, docs, and web pages from text prompts",
    "category": "Presentations",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://gamma.app",
    "is_infy_pick": false
  },
  {
    "name": "Beautiful.ai",
    "description": "Smart presentation software with AI slide layouts that adapt automatically",
    "category": "Presentations",
    "pricing": "Paid",
    "rating": 4.7,
    "url": "https://beautiful.ai",
    "is_infy_pick": false
  },
  {
    "name": "Pitch",
    "description": "Collaborative presentation software with AI-assisted slide creation",
    "category": "Presentations",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://pitch.com",
    "is_infy_pick": false
  },
  {
    "name": "Luma Genie",
    "description": "Generate detailed 3D models and textures from text prompts in seconds",
    "category": "3D & Animation",
    "pricing": "Free",
    "rating": 4.7,
    "url": "https://lumalabs.ai/genie",
    "is_infy_pick": true
  },
  {
    "name": "Meshy",
    "description": "3D generative AI tool for converting text and 2D images into 3D assets",
    "category": "3D & Animation",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://meshy.ai",
    "is_infy_pick": false
  },
  {
    "name": "Tripo3D",
    "description": "Fast AI 3D model generator for game developers and 3D printing",
    "category": "3D & Animation",
    "pricing": "Freemium",
    "rating": 4.5,
    "url": "https://tripo3d.ai",
    "is_infy_pick": false
  },
  {
    "name": "Chatbase",
    "description": "Custom ChatGPT bot trained on your website data and documents for support",
    "category": "Customer Support",
    "pricing": "Freemium",
    "rating": 4.7,
    "url": "https://chatbase.co",
    "is_infy_pick": false
  },
  {
    "name": "Dante AI",
    "description": "Zero-code custom AI chatbots trained on your business knowledge base",
    "category": "Customer Support",
    "pricing": "Freemium",
    "rating": 4.6,
    "url": "https://dante-ai.com",
    "is_infy_pick": false
  },
  {
    "name": "Clay",
    "description": "Automate outbound prospecting with 50+ data providers and AI research agents",
    "category": "Sales",
    "pricing": "Freemium",
    "rating": 4.9,
    "url": "https://clay.com",
    "is_infy_pick": false
  },
  {
    "name": "Lavender",
    "description": "AI sales email coach that scores emails and helps get more replies",
    "category": "Sales",
    "pricing": "Freemium",
    "rating": 4.8,
    "url": "https://lavender.ai",
    "is_infy_pick": false
  },
  {
    "name": "Reply.io",
    "description": "AI sales engagement platform that automates multichannel cold outreach",
    "category": "Sales",
    "pricing": "Freemium",
    "rating": 4.5,
    "url": "https://reply.io",
    "is_infy_pick": false
  },
  {
    "name": "OpenHands",
    "url": "https://github.com/All-Hands-AI/OpenHands",
    "category": "Coding",
    "pricing": "Free",
    "rating": 4.8,
    "description": "Open-source AI software engineer and coding agent",
    "is_infy_pick": true
  },
  {
    "name": "Tabnine",
    "url": "https://tabnine.com",
    "category": "Coding",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "AI assistant for software developers with strong privacy",
    "is_infy_pick": false
  },
  {
    "name": "GitHub Copilot",
    "url": "https://github.com/features/copilot",
    "category": "Coding",
    "pricing": "Paid",
    "rating": 4.9,
    "description": "Enterprise-grade AI pair programmer inside your IDE",
    "is_infy_pick": false
  },
  {
    "name": "Streamlit",
    "url": "https://streamlit.io",
    "category": "Building",
    "pricing": "Free",
    "rating": 4.7,
    "description": "Turn Python scripts into interactive web apps instantly",
    "is_infy_pick": true
  },
  {
    "name": "Softr",
    "url": "https://softr.io",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.8,
    "description": "Build client portals and internal tools without code",
    "is_infy_pick": false
  },
  {
    "name": "Draftbit",
    "url": "https://draftbit.com",
    "category": "Building",
    "pricing": "Paid",
    "rating": 4.6,
    "description": "Pro-code React Native app builder with AI assistance",
    "is_infy_pick": false
  },
  {
    "name": "Playground AI",
    "url": "https://playground.com",
    "category": "Design",
    "pricing": "Free",
    "rating": 4.7,
    "description": "Free online AI image creator and prompt-based editor",
    "is_infy_pick": true
  },
  {
    "name": "Adobe Firefly",
    "url": "https://firefly.adobe.com",
    "category": "Design",
    "pricing": "Freemium",
    "rating": 4.8,
    "description": "Generative AI seamlessly integrated for professional creatives",
    "is_infy_pick": false
  },
  {
    "name": "Looka",
    "url": "https://looka.com",
    "category": "Design",
    "pricing": "Paid",
    "rating": 4.6,
    "description": "AI-powered brand identity and beautiful logo maker",
    "is_infy_pick": false
  },
  {
    "name": "CapCut AI",
    "url": "https://capcut.com",
    "category": "Video & Audio",
    "pricing": "Free",
    "rating": 4.8,
    "description": "Free, highly accessible video editor with strong AI magic tools",
    "is_infy_pick": true
  },
  {
    "name": "Murf.ai",
    "url": "https://murf.ai",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.7,
    "description": "Versatile AI voice generator with realistic human voices",
    "is_infy_pick": false
  },
  {
    "name": "Synthesia",
    "url": "https://synthesia.io",
    "category": "Video & Audio",
    "pricing": "Paid",
    "rating": 4.8,
    "description": "Professional AI video generation using highly realistic avatars",
    "is_infy_pick": false
  },
  {
    "name": "Goblin.tools",
    "url": "https://goblin.tools",
    "category": "Productivity",
    "pricing": "Free",
    "rating": 4.9,
    "description": "A collection of simple AI tools designed for neurodivergent folks",
    "is_infy_pick": true
  },
  {
    "name": "Routine",
    "url": "https://routine.co",
    "category": "Productivity",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "Calendar and task management supercharged with AI",
    "is_infy_pick": false
  },
  {
    "name": "Motion",
    "url": "https://usemotion.com",
    "category": "Productivity",
    "pricing": "Paid",
    "rating": 4.7,
    "description": "AI executive assistant that automatically schedules your workload",
    "is_infy_pick": false
  },
  {
    "name": "Semantic Scholar",
    "url": "https://semanticscholar.org",
    "category": "Research",
    "pricing": "Free",
    "rating": 4.7,
    "description": "Free academic search engine powered by AI",
    "is_infy_pick": true
  },
  {
    "name": "Perplexity AI",
    "url": "https://perplexity.ai",
    "category": "Research",
    "pricing": "Freemium",
    "rating": 4.9,
    "description": "The ultimate conversational AI search engine for verified answers",
    "is_infy_pick": false
  },
  {
    "name": "AlphaSense",
    "url": "https://alpha-sense.com",
    "category": "Research",
    "pricing": "Paid",
    "rating": 4.8,
    "description": "Premium market intelligence and search platform for professionals",
    "is_infy_pick": false
  },
  {
    "name": "HubSpot Content Assistant",
    "url": "https://hubspot.com",
    "category": "Marketing",
    "pricing": "Free",
    "rating": 4.7,
    "description": "Free generative AI tools baked into the HubSpot ecosystem",
    "is_infy_pick": false
  },
  {
    "name": "Predis.ai",
    "url": "https://predis.ai",
    "category": "Marketing",
    "pricing": "Freemium",
    "rating": 4.7,
    "description": "AI social media post and short-form video generator",
    "is_infy_pick": false
  },
  {
    "name": "AdCreative.ai",
    "url": "https://adcreative.ai",
    "category": "Marketing",
    "pricing": "Paid",
    "rating": 4.6,
    "description": "Generate highly converting ad creatives and social media posts",
    "is_infy_pick": false
  },
  {
    "name": "DeepL Write",
    "url": "https://deepl.com/write",
    "category": "Writing",
    "pricing": "Free",
    "rating": 4.8,
    "description": "Incredibly accurate AI-powered writing and phrasing companion",
    "is_infy_pick": true
  },
  {
    "name": "Rytr",
    "url": "https://rytr.me",
    "category": "Writing",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "Lightning-fast AI writing assistant for content creators",
    "is_infy_pick": false
  },
  {
    "name": "ProWritingAid",
    "url": "https://prowritingaid.com",
    "category": "Writing",
    "pricing": "Paid",
    "rating": 4.7,
    "description": "Premium, in-depth grammar and style checker for serious writers",
    "is_infy_pick": false
  },
  {
    "name": "Tidio AI",
    "url": "https://tidio.com",
    "category": "Customer Support",
    "pricing": "Free",
    "rating": 4.6,
    "description": "Customer support chatbot with a robust, permanently free AI tier",
    "is_infy_pick": true
  },
  {
    "name": "Crisp MagicReply",
    "url": "https://crisp.chat",
    "category": "Customer Support",
    "pricing": "Freemium",
    "rating": 4.7,
    "description": "AI customer service inbox and automated ticketing system",
    "is_infy_pick": false
  },
  {
    "name": "Intercom Fin",
    "url": "https://intercom.com/fin",
    "category": "Customer Support",
    "pricing": "Paid",
    "rating": 4.8,
    "description": "Premium, highly accurate AI bot for professional support teams",
    "is_infy_pick": false
  },
  {
    "name": "Apollo.io",
    "url": "https://apollo.io",
    "category": "Sales",
    "pricing": "Free",
    "rating": 4.8,
    "description": "Massive B2B database with a free tier featuring AI email sequencing",
    "is_infy_pick": true
  },
  {
    "name": "Seamless.ai",
    "url": "https://seamless.ai",
    "category": "Sales",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "Real-time B2B sales lead search engine and prospect builder",
    "is_infy_pick": false
  },
  {
    "name": "Gong.io",
    "url": "https://gong.io",
    "category": "Sales",
    "pricing": "Paid",
    "rating": 4.9,
    "description": "Premium revenue intelligence and sales conversation analytics",
    "is_infy_pick": false
  }
]
