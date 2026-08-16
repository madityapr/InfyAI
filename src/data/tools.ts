export type Pricing = "Free" | "Freemium" | "Paid"
export type Category =
  | "Research"
  | "Writing"
  | "Design"
  | "Building"
  | "Productivity"
  | "Agents"
  | "Marketing"
  | "Video & Audio"
  | "Coding"

export interface Tool {
  name: string
  description: string
  category: Category
  pricing: Pricing
  rating: number
  url: string
}

export const CATEGORIES: Array<Category> = [
  "Research",
  "Writing",
  "Design",
  "Building",
  "Productivity",
  "Agents",
  "Marketing",
  "Video & Audio",
  "Coding",
]

export const PRICING_OPTIONS = ["All", "Free", "Freemium", "Paid"] as const
export type PricingFilter = (typeof PRICING_OPTIONS)[number]

export const tools: Tool[] = [
  {
    name: "IdeaHunter",
    description: "AI startup idea research for validating demand, buyer pain, MVP scope, and monetization paths",
    category: "Research",
    pricing: "Freemium",
    rating: 4.6,
    url: "https://ideahunter.today",
  },
  {
    name: "Perplexity AI",
    description: "AI-powered search with real-time web access and cited sources",
    category: "Research",
    pricing: "Freemium",
    rating: 4.8,
    url: "https://perplexity.ai",
  },
  {
    name: "Consensus",
    description: "Search and extract insights from 200M+ scientific papers",
    category: "Research",
    pricing: "Freemium",
    rating: 4.5,
    url: "https://consensus.app",
  },
  {
    name: "Semantic Scholar",
    description: "Free academic search engine powered by AI from the Allen Institute",
    category: "Research",
    pricing: "Free",
    rating: 4.6,
    url: "https://semanticscholar.org",
  },
  {
    name: "Elicit",
    description: "AI research assistant that automates literature review workflows",
    category: "Research",
    pricing: "Freemium",
    rating: 4.4,
    url: "https://elicit.com",
  },
  {
    name: "Claude",
    description: "Anthropic's AI assistant for analysis, writing, coding, and reasoning",
    category: "Writing",
    pricing: "Freemium",
    rating: 4.9,
    url: "https://claude.ai",
  },
  {
    name: "ChatGPT",
    description: "OpenAI's flagship conversational AI for any task you can imagine",
    category: "Writing",
    pricing: "Freemium",
    rating: 4.7,
    url: "https://chatgpt.com",
  },
  {
    name: "Gamma",
    description: "Generate polished presentations, documents, and webpages with AI",
    category: "Writing",
    pricing: "Freemium",
    rating: 4.6,
    url: "https://gamma.app",
  },
  {
    name: "Writesonic",
    description: "AI writer for long-form blogs, ads, and product descriptions at scale",
    category: "Writing",
    pricing: "Freemium",
    rating: 4.3,
    url: "https://writesonic.com",
  },
  {
    name: "Midjourney",
    description: "Generate cinematic, high-quality artwork from natural language prompts",
    category: "Design",
    pricing: "Paid",
    rating: 4.8,
    url: "https://midjourney.com",
  },
  {
    name: "Stable Diffusion",
    description: "Open-source AI image generation model you can run locally or in the cloud",
    category: "Design",
    pricing: "Free",
    rating: 4.6,
    url: "https://stability.ai",
  },
  {
    name: "Beautiful.ai",
    description: "AI-powered slide design that keeps presentations pixel-perfect automatically",
    category: "Design",
    pricing: "Freemium",
    rating: 4.4,
    url: "https://beautiful.ai",
  },
  {
    name: "Adobe Firefly",
    description: "Generative AI image tools built directly into the Adobe Creative Suite",
    category: "Design",
    pricing: "Freemium",
    rating: 4.5,
    url: "https://firefly.adobe.com",
  },
  {
    name: "v0 by Vercel",
    description: "Generate and iterate on production-ready UI components from a prompt",
    category: "Building",
    pricing: "Freemium",
    rating: 4.7,
    url: "https://v0.dev",
  },
  {
    name: "Framer AI",
    description: "Design and publish responsive websites with AI layout assistance",
    category: "Building",
    pricing: "Freemium",
    rating: 4.6,
    url: "https://framer.com",
  },
  {
    name: "Bolt",
    description: "Full-stack web apps generated from a prompt and deployed instantly",
    category: "Building",
    pricing: "Freemium",
    rating: 4.5,
    url: "https://bolt.new",
  },
  {
    name: "Notion AI",
    description: "AI writing, summarization, and Q&A built into your Notion workspace",
    category: "Productivity",
    pricing: "Freemium",
    rating: 4.5,
    url: "https://notion.so/product/ai",
  },
  {
    name: "Otter.ai",
    description: "Real-time meeting transcription, summaries, and action item extraction",
    category: "Productivity",
    pricing: "Freemium",
    rating: 4.5,
    url: "https://otter.ai",
  },
  {
    name: "Zapier AI",
    description: "Build AI-powered workflow automations across 7,000+ apps without code",
    category: "Productivity",
    pricing: "Freemium",
    rating: 4.4,
    url: "https://zapier.com/ai",
  },
  {
    name: "AutoGPT",
    description: "Open-source autonomous AI agent that self-directs to complete long tasks",
    category: "Agents",
    pricing: "Free",
    rating: 4.2,
    url: "https://agpt.co",
  },
  {
    name: "AgentGPT",
    description: "Deploy autonomous AI agents in your browser with no local setup required",
    category: "Agents",
    pricing: "Freemium",
    rating: 4.1,
    url: "https://agentgpt.reworkd.ai",
  },
  {
    name: "Copy.ai",
    description: "Generate marketing copy, product descriptions, and ad creative at scale",
    category: "Marketing",
    pricing: "Freemium",
    rating: 4.4,
    url: "https://copy.ai",
  },
  {
    name: "Jasper",
    description: "Enterprise AI content platform with brand voice controls for teams",
    category: "Marketing",
    pricing: "Paid",
    rating: 4.3,
    url: "https://jasper.ai",
  },
  {
    name: "AdCreative.ai",
    description: "Generate conversion-focused ad creatives and banners from your brand assets",
    category: "Marketing",
    pricing: "Freemium",
    rating: 4.2,
    url: "https://adcreative.ai",
  },
  {
    name: "Runway ML",
    description: "Professional AI video generation, editing, and visual effects for creators",
    category: "Video & Audio",
    pricing: "Freemium",
    rating: 4.6,
    url: "https://runwayml.com",
  },
  {
    name: "ElevenLabs",
    description: "Ultra-realistic AI voice synthesis, cloning, and dubbing in 30+ languages",
    category: "Video & Audio",
    pricing: "Freemium",
    rating: 4.8,
    url: "https://elevenlabs.io",
  },
  {
    name: "Suno AI",
    description: "Generate complete, high-quality songs with vocals from a text prompt",
    category: "Video & Audio",
    pricing: "Freemium",
    rating: 4.7,
    url: "https://suno.ai",
  },
  {
    name: "GitHub Copilot",
    description: "AI pair programmer that autocompletes code and suggests whole functions",
    category: "Coding",
    pricing: "Freemium",
    rating: 4.7,
    url: "https://github.com/features/copilot",
  },
  {
    name: "Cursor",
    description: "AI-first code editor built on VS Code for dramatically faster development",
    category: "Coding",
    pricing: "Freemium",
    rating: 4.8,
    url: "https://cursor.com",
  },
  {
    name: "Tabnine",
    description: "Privacy-first AI code completion that runs locally or in the cloud",
    category: "Coding",
    pricing: "Freemium",
    rating: 4.4,
    url: "https://tabnine.com",
  },
]
