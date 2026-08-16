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
  | "Gaming"
  | "Legal"
  | "HR & Recruiting"
  | "Finance"
  | "Healthcare"
  | "Education"
  | "Music"
  | "E-commerce"

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
  "Gaming",
  "Legal",
  "HR & Recruiting",
  "Finance",
  "Healthcare",
  "Education",
  "Music",
  "E-commerce",
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
  },
  {
    "name": "Windsurf",
    "url": "https://windsurf.com",
    "category": "Coding",
    "pricing": "Freemium",
    "rating": 4.7,
    "description": "Agentic AI code editor (formerly Codeium) with deep multi-file context",
    "is_infy_pick": false
  },
  {
    "name": "Replit Agent",
    "url": "https://replit.com",
    "category": "Coding",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "Build and deploy full apps from a prompt inside Replit's cloud IDE",
    "is_infy_pick": false
  },
  {
    "name": "Cody",
    "url": "https://sourcegraph.com/cody",
    "category": "Coding",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "Sourcegraph's AI coding assistant with codebase-wide context search",
    "is_infy_pick": false
  },
  {
    "name": "Amazon Q Developer",
    "url": "https://aws.amazon.com/q/developer",
    "category": "Coding",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "AWS's AI assistant for coding, debugging, and cloud app development",
    "is_infy_pick": false
  },
  {
    "name": "Supermaven",
    "url": "https://supermaven.com",
    "category": "Coding",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "Extremely fast AI autocomplete with a 1M-token context window",
    "is_infy_pick": false
  },
  {
    "name": "Cline",
    "url": "https://cline.bot",
    "category": "Coding",
    "pricing": "Free",
    "rating": 4.7,
    "description": "Open-source autonomous coding agent that runs inside VS Code",
    "is_infy_pick": true
  },
  {
    "name": "CodeRabbit",
    "url": "https://coderabbit.ai",
    "category": "Coding",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "AI code review bot that leaves contextual PR comments automatically",
    "is_infy_pick": false
  },
  {
    "name": "Qodo",
    "url": "https://qodo.ai",
    "category": "Coding",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI agent for test generation, code review, and code integrity",
    "is_infy_pick": false
  },
  {
    "name": "Zed",
    "url": "https://zed.dev",
    "category": "Coding",
    "pricing": "Free",
    "rating": 4.6,
    "description": "High-performance collaborative code editor with built-in AI assistant",
    "is_infy_pick": true
  },
  {
    "name": "Warp",
    "url": "https://warp.dev",
    "category": "Coding",
    "pricing": "Freemium",
    "rating": 4.7,
    "description": "AI-powered terminal that turns natural language into shell commands",
    "is_infy_pick": false
  },
  {
    "name": "Create.xyz",
    "url": "https://create.xyz",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "Prompt-to-app builder for internal tools, dashboards, and web apps",
    "is_infy_pick": false
  },
  {
    "name": "Base44",
    "url": "https://base44.com",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "All-in-one AI app builder that generates full-stack apps with backend included",
    "is_infy_pick": false
  },
  {
    "name": "Same.new",
    "url": "https://same.new",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI agent that clones and rebuilds websites and web apps from a URL or prompt",
    "is_infy_pick": false
  },
  {
    "name": "Databutton",
    "url": "https://databutton.com",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "AI agent workspace for building internal tools and data apps",
    "is_infy_pick": false
  },
  {
    "name": "Firebase Studio",
    "url": "https://firebase.studio",
    "category": "Building",
    "pricing": "Free",
    "rating": 4.5,
    "description": "Google's cloud-based agentic workspace for full-stack AI app development",
    "is_infy_pick": true
  },
  {
    "name": "Wordware",
    "url": "https://wordware.ai",
    "category": "Building",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "Natural-language IDE for building and deploying AI agents and workflows",
    "is_infy_pick": false
  },
  {
    "name": "Ideogram",
    "url": "https://ideogram.ai",
    "category": "Design",
    "pricing": "Freemium",
    "rating": 4.8,
    "description": "AI image generator known for accurate text rendering and typography",
    "is_infy_pick": false
  },
  {
    "name": "Flux",
    "url": "https://blackforestlabs.ai",
    "category": "Design",
    "pricing": "Freemium",
    "rating": 4.7,
    "description": "State-of-the-art open image generation models from Black Forest Labs",
    "is_infy_pick": false
  },
  {
    "name": "Freepik AI Suite",
    "url": "https://freepik.com/ai",
    "category": "Design",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI image, icon, and mockup generation built into the Freepik library",
    "is_infy_pick": false
  },
  {
    "name": "Clipdrop",
    "url": "https://clipdrop.co",
    "category": "Design",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI toolkit for background removal, relighting, and image cleanup",
    "is_infy_pick": false
  },
  {
    "name": "Uizard",
    "url": "https://uizard.io",
    "category": "Design",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "Turns sketches and text prompts into editable UI mockups",
    "is_infy_pick": false
  },
  {
    "name": "Galileo AI",
    "url": "https://usegalileo.ai",
    "category": "Design",
    "pricing": "Paid",
    "rating": 4.5,
    "description": "AI copilot that generates polished, editable UI designs from text prompts",
    "is_infy_pick": false
  },
  {
    "name": "Vectorizer.ai",
    "url": "https://vectorizer.ai",
    "category": "Design",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "Converts raster images into clean, scalable vector graphics with AI",
    "is_infy_pick": false
  },
  {
    "name": "Hedra",
    "url": "https://hedra.com",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "AI character video generator that animates photos with speech and emotion",
    "is_infy_pick": false
  },
  {
    "name": "Viggle AI",
    "url": "https://viggle.ai",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "AI motion tool that maps realistic movement onto any character",
    "is_infy_pick": false
  },
  {
    "name": "Topaz Video AI",
    "url": "https://topazlabs.com/topaz-video-ai",
    "category": "Video & Audio",
    "pricing": "Paid",
    "rating": 4.6,
    "description": "AI video upscaling, frame interpolation, and stabilization for pros",
    "is_infy_pick": false
  },
  {
    "name": "Adobe Podcast",
    "url": "https://podcast.adobe.com",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.7,
    "description": "AI-powered audio enhancement that removes noise and studio-fies recordings",
    "is_infy_pick": false
  },
  {
    "name": "Play.ht",
    "url": "https://play.ht",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "Ultra-realistic AI text-to-speech and voice cloning for creators",
    "is_infy_pick": false
  },
  {
    "name": "Veed.io",
    "url": "https://veed.io",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "Browser-based AI video editor with subtitles, avatars, and translation",
    "is_infy_pick": false
  },
  {
    "name": "InVideo AI",
    "url": "https://invideo.io",
    "category": "Video & Audio",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "Generates full narrated videos from a single text prompt",
    "is_infy_pick": false
  },
  {
    "name": "Argil AI",
    "url": "https://argil.ai",
    "category": "Video & Audio",
    "pricing": "Paid",
    "rating": 4.5,
    "description": "Creates realistic AI avatar videos of yourself for social content",
    "is_infy_pick": false
  },
  {
    "name": "Reclaim.ai",
    "url": "https://reclaim.ai",
    "category": "Productivity",
    "pricing": "Freemium",
    "rating": 4.7,
    "description": "AI scheduling assistant that auto-defends time for habits and deep work",
    "is_infy_pick": false
  },
  {
    "name": "Clockwise",
    "url": "https://getclockwise.com",
    "category": "Productivity",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "AI calendar optimizer that creates focus time across your team",
    "is_infy_pick": false
  },
  {
    "name": "Krisp",
    "url": "https://krisp.ai",
    "category": "Productivity",
    "pricing": "Freemium",
    "rating": 4.7,
    "description": "AI noise cancellation and meeting transcription for any call app",
    "is_infy_pick": false
  },
  {
    "name": "Shortwave",
    "url": "https://shortwave.com",
    "category": "Productivity",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "AI email client that triages, drafts replies, and summarizes threads",
    "is_infy_pick": false
  },
  {
    "name": "Mindgrasp",
    "url": "https://mindgrasp.ai",
    "category": "Productivity",
    "pricing": "Freemium",
    "rating": 4.3,
    "description": "AI note-taker that turns lectures and videos into study guides",
    "is_infy_pick": false
  },
  {
    "name": "Elicit",
    "url": "https://elicit.com",
    "category": "Research",
    "pricing": "Freemium",
    "rating": 4.7,
    "description": "AI research assistant that automates literature review and paper screening",
    "is_infy_pick": false
  },
  {
    "name": "Consensus",
    "url": "https://consensus.app",
    "category": "Research",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "AI search engine that answers questions using evidence from scientific papers",
    "is_infy_pick": false
  },
  {
    "name": "Exa",
    "url": "https://exa.ai",
    "category": "Research",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "Neural search API built for AI agents to find high-quality web results",
    "is_infy_pick": false
  },
  {
    "name": "Tavily",
    "url": "https://tavily.com",
    "category": "Research",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "Search API purpose-built for grounding AI agents with real-time web data",
    "is_infy_pick": false
  },
  {
    "name": "Kagi",
    "url": "https://kagi.com",
    "category": "Research",
    "pricing": "Paid",
    "rating": 4.8,
    "description": "Premium ad-free search engine with AI-powered summaries and Assistant",
    "is_infy_pick": false
  },
  {
    "name": "Humata",
    "url": "https://humata.ai",
    "category": "Research",
    "pricing": "Freemium",
    "rating": 4.3,
    "description": "Ask questions and get cited answers from large document sets",
    "is_infy_pick": false
  },
  {
    "name": "Research Rabbit",
    "url": "https://researchrabbit.ai",
    "category": "Research",
    "pricing": "Free",
    "rating": 4.5,
    "description": "AI-driven citation mapping tool for discovering related academic papers",
    "is_infy_pick": true
  },
  {
    "name": "Scite",
    "url": "https://scite.ai",
    "category": "Research",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "Smart citations that show whether a paper supports or contradicts a claim",
    "is_infy_pick": false
  },
  {
    "name": "Wolfram Alpha",
    "url": "https://wolframalpha.com",
    "category": "Research",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "Computational knowledge engine for math, science, and data queries",
    "is_infy_pick": false
  },
  {
    "name": "Genspark",
    "url": "https://genspark.ai",
    "category": "Research",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "AI search engine that generates custom multi-source answer pages",
    "is_infy_pick": false
  },
  {
    "name": "Phind",
    "url": "https://phind.com",
    "category": "Research",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI search engine tuned for developers and technical questions",
    "is_infy_pick": false
  },
  {
    "name": "Grammarly",
    "url": "https://grammarly.com",
    "category": "Research",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI writing assistant for grammar, tone, and clarity across the web",
    "is_infy_pick": false
  },
  {
    "name": "Manus",
    "url": "https://manus.im",
    "category": "Agents",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "General-purpose AI agent that autonomously completes complex multi-step tasks",
    "is_infy_pick": false
  },
  {
    "name": "Lindy",
    "url": "https://lindy.ai",
    "category": "Agents",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "No-code platform for building AI agents that automate business workflows",
    "is_infy_pick": false
  },
  {
    "name": "Relevance AI",
    "url": "https://relevanceai.com",
    "category": "Agents",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "Build and deploy a team of AI agents for internal workflows",
    "is_infy_pick": false
  },
  {
    "name": "Browser Use",
    "url": "https://browser-use.com",
    "category": "Agents",
    "pricing": "Free",
    "rating": 4.5,
    "description": "Open-source framework that lets AI agents control a real web browser",
    "is_infy_pick": true
  },
  {
    "name": "Adept",
    "url": "https://adept.ai",
    "category": "Agents",
    "pricing": "Paid",
    "rating": 4.3,
    "description": "AI agent platform that acts directly inside enterprise software UIs",
    "is_infy_pick": false
  },
  {
    "name": "Ocoya",
    "url": "https://ocoya.com",
    "category": "Marketing",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI social media content creation and scheduling in one platform",
    "is_infy_pick": false
  },
  {
    "name": "Buffer AI Assistant",
    "url": "https://buffer.com",
    "category": "Marketing",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI caption and content ideas built into Buffer's scheduling tool",
    "is_infy_pick": false
  },
  {
    "name": "Marpipe",
    "url": "https://marpipe.com",
    "category": "Marketing",
    "pricing": "Paid",
    "rating": 4.4,
    "description": "AI-driven ad creative testing and performance analytics platform",
    "is_infy_pick": false
  },
  {
    "name": "Postwise",
    "url": "https://postwise.ai",
    "category": "Marketing",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "AI tool for writing and scheduling viral tweets and threads",
    "is_infy_pick": false
  },
  {
    "name": "Wordtune",
    "url": "https://wordtune.com",
    "category": "Writing",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI rewriting tool that rephrases sentences for clarity and tone",
    "is_infy_pick": false
  },
  {
    "name": "Novelcrafter",
    "url": "https://novelcrafter.com",
    "category": "Writing",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI-assisted novel writing workspace with codex and world-building tools",
    "is_infy_pick": false
  },
  {
    "name": "Squibler",
    "url": "https://squibler.io",
    "category": "Writing",
    "pricing": "Freemium",
    "rating": 4.3,
    "description": "AI story and screenplay writing software for authors and screenwriters",
    "is_infy_pick": false
  },
  {
    "name": "Hex",
    "url": "https://hex.tech",
    "category": "Data Analysis",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "AI-powered collaborative notebook for data science and analytics",
    "is_infy_pick": false
  },
  {
    "name": "Obviously AI",
    "url": "https://obviously.ai",
    "category": "Data Analysis",
    "pricing": "Freemium",
    "rating": 4.3,
    "description": "No-code platform that builds predictive machine learning models from spreadsheets",
    "is_infy_pick": false
  },
  {
    "name": "ThoughtSpot",
    "url": "https://thoughtspot.com",
    "category": "Data Analysis",
    "pricing": "Paid",
    "rating": 4.3,
    "description": "AI-powered natural language search for enterprise business analytics",
    "is_infy_pick": false
  },
  {
    "name": "DataRobot",
    "url": "https://datarobot.com",
    "category": "Data Analysis",
    "pricing": "Paid",
    "rating": 4.3,
    "description": "Enterprise AI platform for automated machine learning and MLOps",
    "is_infy_pick": false
  },
  {
    "name": "Decktopus",
    "url": "https://decktopus.com",
    "category": "Presentations",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI presentation generator with built-in design guidance and analytics",
    "is_infy_pick": false
  },
  {
    "name": "Plus AI",
    "url": "https://plusai.com",
    "category": "Presentations",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI slide generator that builds decks directly inside Google Slides",
    "is_infy_pick": false
  },
  {
    "name": "SlidesAI",
    "url": "https://slidesai.io",
    "category": "Presentations",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "Converts text into fully designed Google Slides presentations",
    "is_infy_pick": false
  },
  {
    "name": "Spline AI",
    "url": "https://spline.design",
    "category": "3D & Animation",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "AI-assisted 3D design tool for the web with real-time collaboration",
    "is_infy_pick": false
  },
  {
    "name": "Kaedim",
    "url": "https://kaedim3d.com",
    "category": "3D & Animation",
    "pricing": "Paid",
    "rating": 4.3,
    "description": "Converts 2D concept art into game-ready 3D models using AI",
    "is_infy_pick": false
  },
  {
    "name": "CSM AI",
    "url": "https://csm.ai",
    "category": "3D & Animation",
    "pricing": "Freemium",
    "rating": 4.3,
    "description": "Generates 3D assets and scenes from images or text in seconds",
    "is_infy_pick": false
  },
  {
    "name": "Hyper3D Rodin",
    "url": "https://hyper3d.ai",
    "category": "3D & Animation",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "High-fidelity AI text-to-3D and image-to-3D generation engine",
    "is_infy_pick": false
  },
  {
    "name": "Ada",
    "url": "https://ada.cx",
    "category": "Customer Support",
    "pricing": "Paid",
    "rating": 4.5,
    "description": "Enterprise AI customer service agent that resolves tickets automatically",
    "is_infy_pick": false
  },
  {
    "name": "Decagon",
    "url": "https://decagon.ai",
    "category": "Customer Support",
    "pricing": "Paid",
    "rating": 4.6,
    "description": "AI concierge agents that handle complex customer support conversations",
    "is_infy_pick": false
  },
  {
    "name": "Forethought",
    "url": "https://forethought.ai",
    "category": "Customer Support",
    "pricing": "Paid",
    "rating": 4.4,
    "description": "Generative AI for support ticket triage, deflection, and agent assist",
    "is_infy_pick": false
  },
  {
    "name": "Zendesk AI",
    "url": "https://zendesk.com/ai",
    "category": "Customer Support",
    "pricing": "Paid",
    "rating": 4.5,
    "description": "Built-in AI agents and copilots across the Zendesk support suite",
    "is_infy_pick": false
  },
  {
    "name": "11x",
    "url": "https://11x.ai",
    "category": "Sales",
    "pricing": "Paid",
    "rating": 4.5,
    "description": "Fully autonomous AI sales development reps that prospect and book meetings",
    "is_infy_pick": false
  },
  {
    "name": "Instantly",
    "url": "https://instantly.ai",
    "category": "Sales",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "AI-assisted cold email outreach and deliverability platform",
    "is_infy_pick": false
  },
  {
    "name": "Warmly",
    "url": "https://warmly.ai",
    "category": "Sales",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "AI platform that identifies and engages website visitors in real time",
    "is_infy_pick": false
  },
  {
    "name": "Regie.ai",
    "url": "https://regie.ai",
    "category": "Sales",
    "pricing": "Paid",
    "rating": 4.4,
    "description": "AI content and sequence generator for outbound sales teams",
    "is_infy_pick": false
  },
  {
    "name": "Inworld AI",
    "url": "https://inworld.ai",
    "category": "Gaming",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "AI engine that gives game NPCs dynamic, memory-aware conversations",
    "is_infy_pick": false
  },
  {
    "name": "Scenario",
    "url": "https://scenario.com",
    "category": "Gaming",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "Train custom AI models to generate game-ready art assets in your style",
    "is_infy_pick": false
  },
  {
    "name": "Rosebud AI",
    "url": "https://rosebud.ai",
    "category": "Gaming",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "Browser-based AI tool that builds playable games from a text prompt",
    "is_infy_pick": false
  },
  {
    "name": "Ludo.ai",
    "url": "https://ludo.ai",
    "category": "Gaming",
    "pricing": "Freemium",
    "rating": 4.3,
    "description": "AI game design copilot for ideation, market research, and concept art",
    "is_infy_pick": false
  },
  {
    "name": "Latitude",
    "url": "https://latitude.io",
    "category": "Gaming",
    "pricing": "Freemium",
    "rating": 4.3,
    "description": "AI-powered platform for building branching, text-based interactive games",
    "is_infy_pick": false
  },
  {
    "name": "AI Dungeon",
    "url": "https://aidungeon.com",
    "category": "Gaming",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "Open-ended AI text adventure game with infinite generated storylines",
    "is_infy_pick": false
  },
  {
    "name": "Charisma.ai",
    "url": "https://charisma.ai",
    "category": "Gaming",
    "pricing": "Freemium",
    "rating": 4.2,
    "description": "No-code tool for creating emotionally responsive AI game characters",
    "is_infy_pick": false
  },
  {
    "name": "Harvey",
    "url": "https://harvey.ai",
    "category": "Legal",
    "pricing": "Paid",
    "rating": 4.7,
    "description": "AI platform built for law firms to draft, review, and research legal work",
    "is_infy_pick": false
  },
  {
    "name": "Spellbook",
    "url": "https://spellbook.legal",
    "category": "Legal",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI contract drafting and review assistant that lives inside Word",
    "is_infy_pick": false
  },
  {
    "name": "Casetext CoCounsel",
    "url": "https://casetext.com",
    "category": "Legal",
    "pricing": "Paid",
    "rating": 4.6,
    "description": "AI legal assistant for document review, research, and deposition prep",
    "is_infy_pick": false
  },
  {
    "name": "Ironclad AI",
    "url": "https://ironcladapp.com",
    "category": "Legal",
    "pricing": "Paid",
    "rating": 4.5,
    "description": "AI-powered contract lifecycle management and clause negotiation",
    "is_infy_pick": false
  },
  {
    "name": "DoNotPay",
    "url": "https://donotpay.com",
    "category": "Legal",
    "pricing": "Paid",
    "rating": 4.1,
    "description": "Consumer AI assistant for disputing bills, fines, and simple legal tasks",
    "is_infy_pick": false
  },
  {
    "name": "Paradox",
    "url": "https://paradox.ai",
    "category": "HR & Recruiting",
    "pricing": "Paid",
    "rating": 4.5,
    "description": "Conversational AI recruiter that screens and schedules candidates",
    "is_infy_pick": false
  },
  {
    "name": "HireVue",
    "url": "https://hirevue.com",
    "category": "HR & Recruiting",
    "pricing": "Paid",
    "rating": 4.3,
    "description": "AI-powered video interviewing and candidate assessment platform",
    "is_infy_pick": false
  },
  {
    "name": "Textio",
    "url": "https://textio.com",
    "category": "HR & Recruiting",
    "pricing": "Paid",
    "rating": 4.4,
    "description": "AI writing tool that removes bias from job posts and performance reviews",
    "is_infy_pick": false
  },
  {
    "name": "SeekOut",
    "url": "https://seekout.com",
    "category": "HR & Recruiting",
    "pricing": "Paid",
    "rating": 4.5,
    "description": "AI-powered talent sourcing and candidate matching search engine",
    "is_infy_pick": false
  },
  {
    "name": "Fetcher",
    "url": "https://fetcher.ai",
    "category": "HR & Recruiting",
    "pricing": "Paid",
    "rating": 4.4,
    "description": "AI recruiting tool that automates candidate sourcing and outreach",
    "is_infy_pick": false
  },
  {
    "name": "Rogo",
    "url": "https://rogo.ai",
    "category": "Finance",
    "pricing": "Paid",
    "rating": 4.6,
    "description": "AI research copilot built for investment banking and equity research",
    "is_infy_pick": false
  },
  {
    "name": "Ramp AI",
    "url": "https://ramp.com",
    "category": "Finance",
    "pricing": "Freemium",
    "rating": 4.6,
    "description": "AI-powered corporate card and spend management with automated bookkeeping",
    "is_infy_pick": false
  },
  {
    "name": "Vic.ai",
    "url": "https://vic.ai",
    "category": "Finance",
    "pricing": "Paid",
    "rating": 4.4,
    "description": "Autonomous AI for accounts payable invoice processing",
    "is_infy_pick": false
  },
  {
    "name": "FinChat",
    "url": "https://finchat.io",
    "category": "Finance",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI financial research assistant for stock analysis and modeling",
    "is_infy_pick": false
  },
  {
    "name": "Abridge",
    "url": "https://abridge.com",
    "category": "Healthcare",
    "pricing": "Paid",
    "rating": 4.6,
    "description": "AI medical scribe that turns patient conversations into clinical notes",
    "is_infy_pick": false
  },
  {
    "name": "Nabla",
    "url": "https://nabla.com",
    "category": "Healthcare",
    "pricing": "Paid",
    "rating": 4.5,
    "description": "Ambient AI copilot that documents clinical visits in real time",
    "is_infy_pick": false
  },
  {
    "name": "Suki AI",
    "url": "https://suki.ai",
    "category": "Healthcare",
    "pricing": "Paid",
    "rating": 4.5,
    "description": "Voice AI assistant that automates clinical documentation for doctors",
    "is_infy_pick": false
  },
  {
    "name": "Glass Health",
    "url": "https://glass.health",
    "category": "Healthcare",
    "pricing": "Freemium",
    "rating": 4.3,
    "description": "AI clinical decision support for building differential diagnoses and plans",
    "is_infy_pick": false
  },
  {
    "name": "MagicSchool AI",
    "url": "https://magicschool.ai",
    "category": "Education",
    "pricing": "Freemium",
    "rating": 4.7,
    "description": "AI toolkit that helps teachers plan lessons, grade, and create materials",
    "is_infy_pick": false
  },
  {
    "name": "Khanmigo",
    "url": "https://khanacademy.org/khan-labs",
    "category": "Education",
    "pricing": "Paid",
    "rating": 4.6,
    "description": "Khan Academy's AI tutor that guides students through problems Socratically",
    "is_infy_pick": false
  },
  {
    "name": "Curipod",
    "url": "https://curipod.com",
    "category": "Education",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI tool that generates interactive, standards-aligned classroom lessons",
    "is_infy_pick": false
  },
  {
    "name": "Diffit",
    "url": "https://diffit.me",
    "category": "Education",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "AI tool that differentiates reading materials to student level instantly",
    "is_infy_pick": false
  },
  {
    "name": "AIVA",
    "url": "https://aiva.ai",
    "category": "Music",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI composer that creates original orchestral and cinematic music scores",
    "is_infy_pick": false
  },
  {
    "name": "Boomy",
    "url": "https://boomy.com",
    "category": "Music",
    "pricing": "Freemium",
    "rating": 4.3,
    "description": "Generate original songs instantly with AI, no music skills required",
    "is_infy_pick": false
  },
  {
    "name": "Soundraw",
    "url": "https://soundraw.io",
    "category": "Music",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "AI music generator for royalty-free background tracks by mood and genre",
    "is_infy_pick": false
  },
  {
    "name": "LANDR",
    "url": "https://landr.com",
    "category": "Music",
    "pricing": "Freemium",
    "rating": 4.5,
    "description": "AI-powered audio mastering and distribution for independent musicians",
    "is_infy_pick": false
  },
  {
    "name": "Rebuy",
    "url": "https://rebuyengine.com",
    "category": "E-commerce",
    "pricing": "Paid",
    "rating": 4.5,
    "description": "AI personalization engine for product recommendations and upsells",
    "is_infy_pick": false
  },
  {
    "name": "Octane AI",
    "url": "https://octaneai.com",
    "category": "E-commerce",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "AI quiz and product recommendation builder for Shopify stores",
    "is_infy_pick": false
  },
  {
    "name": "Shopify Sidekick",
    "url": "https://shopify.com/sidekick",
    "category": "E-commerce",
    "pricing": "Freemium",
    "rating": 4.4,
    "description": "Shopify's built-in AI commerce assistant for store management tasks",
    "is_infy_pick": false
  }
]
