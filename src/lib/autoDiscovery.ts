import { supabase } from "./supabase"
import type { Tool } from "@/data/tools"

// Broadcast channels for cross-tab and cross-device realtime sync
let globalRealtimeChannel: any = null
let localBroadcastChannel: BroadcastChannel | null = null

try {
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    localBroadcastChannel = new BroadcastChannel("infyai-realtime-feed")
  }
} catch {
  // BroadcastChannel fallback
}

/**
 * Initialize Supabase Realtime + Broadcast Channel Listener
 */
export function initRealtimeFeed(onNewTool: (tool: Tool) => void) {
  if (!supabase) return () => {}

  // 1. Supabase Realtime Channel (Both PostgreSQL Changes AND Broadcast Events)
  const channel = supabase
    .channel("infyai-live-tools-feed", {
      config: {
        broadcast: { ack: true },
      },
    })
    // Listen to PostgreSQL DB INSERTs
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "tools" },
      (payload) => {
        if (payload.new && payload.new.name) {
          onNewTool(payload.new as Tool)
        }
      }
    )
    // Listen to Realtime Broadcast messages (Instant cross-device push without DB delay)
    .on("broadcast", { event: "new-tool-added" }, ({ payload }) => {
      if (payload && payload.name) {
        onNewTool(payload as Tool)
      }
    })
    .subscribe((status) => {
      console.log("⚡ InfyAI Realtime Channel Status:", status)
    })

  globalRealtimeChannel = channel

  // 2. Browser BroadcastChannel for instant zero-latency cross-tab notification
  const handleLocalBroadcast = (event: MessageEvent) => {
    if (event.data && event.data.type === "NEW_TOOL" && event.data.tool) {
      onNewTool(event.data.tool)
    }
  }

  if (localBroadcastChannel) {
    localBroadcastChannel.addEventListener("message", handleLocalBroadcast)
  }

  // 3. Storage event fallback for older browsers
  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === "infyai_last_added_tool" && event.newValue) {
      try {
        const parsed = JSON.parse(event.newValue)
        if (parsed && parsed.name) {
          onNewTool(parsed)
        }
      } catch {
        // ignore parse error
      }
    }
  }

  window.addEventListener("storage", handleStorageEvent)

  return () => {
    supabase.removeChannel(channel)
    if (localBroadcastChannel) {
      localBroadcastChannel.removeEventListener("message", handleLocalBroadcast)
    }
    window.removeEventListener("storage", handleStorageEvent)
  }
}

/**
 * Broadcast a new tool to all open tabs and devices instantly
 */
export function broadcastNewTool(tool: Tool) {
  // 1. Send via Supabase Realtime Broadcast
  if (globalRealtimeChannel) {
    globalRealtimeChannel.send({
      type: "broadcast",
      event: "new-tool-added",
      payload: tool,
    }).catch(() => {})
  }

  // 2. Send via browser BroadcastChannel
  if (localBroadcastChannel) {
    try {
      localBroadcastChannel.postMessage({ type: "NEW_TOOL", tool })
    } catch {}
  }

  // 3. Set in localStorage for instant storage event trigger
  try {
    localStorage.setItem("infyai_last_added_tool", JSON.stringify({ ...tool, _timestamp: Date.now() }))
  } catch {}
}

// ── Continuous Auto-Discovery Pipeline Candidates (Curated Fresh Stream) ──
const DISCOVERY_CANDIDATE_POOL: Array<Omit<Tool, "is_infy_pick"> & { is_infy_pick?: boolean }> = [
  {
    name: "DeepSeek-R1",
    url: "https://chat.deepseek.com",
    category: "Chatbots",
    pricing: "Free",
    rating: 4.9,
    description: "Open-weights reasoning frontier model matching OpenAI o1 in math and code reasoning",
    is_infy_pick: true,
  },
  {
    name: "Qwen 2.5 Coder",
    url: "https://chat.qwenlm.ai",
    category: "Coding",
    pricing: "Free",
    rating: 4.8,
    description: "State-of-the-art open-source code generation model supporting 128k context and 92+ languages",
    is_infy_pick: true,
  },
  {
    name: "Llama 3.3 70B",
    url: "https://llama.meta.com",
    category: "Chatbots",
    pricing: "Free",
    rating: 4.9,
    description: "Meta's flagship open-weights model delivering 405B-tier intelligence at 70B efficiency",
    is_infy_pick: true,
  },
  {
    name: "OpenHands (All-Hands)",
    url: "https://github.com/All-Hands-AI/OpenHands",
    category: "Agents",
    pricing: "Free",
    rating: 4.8,
    description: "Open-source autonomous AI software developer that reads files, runs commands, and writes code",
    is_infy_pick: true,
  },
  {
    name: "Flux.1 Schnell",
    url: "https://blackforestlabs.ai",
    category: "Design",
    pricing: "Free",
    rating: 4.9,
    description: "Ultra-fast 4-step open-weights image generation model with unmatched prompt adherence and photorealism",
    is_infy_pick: true,
  },
  {
    name: "CogVideoX",
    url: "https://github.com/THUDM/CogVideo",
    category: "Video & Audio",
    pricing: "Free",
    rating: 4.7,
    description: "Open-source 3D VAE video diffusion model generating high-resolution cinematic video clips",
    is_infy_pick: true,
  },
  {
    name: "Supermaven",
    url: "https://supermaven.com",
    category: "Coding",
    pricing: "Freemium",
    rating: 4.8,
    description: "Fastest AI code autocomplete engine with 1-million token context window and sub-100ms latency",
    is_infy_pick: true,
  },
  {
    name: "Genspark Autopilot",
    url: "https://genspark.ai",
    category: "Research",
    pricing: "Freemium",
    rating: 4.8,
    description: "Autonomous multi-agent research engine that generates customized real-time Sparkpages on any topic",
    is_infy_pick: true,
  },
  {
    name: "NotebookLM Audio Overviews",
    url: "https://notebooklm.google.com",
    category: "Research",
    pricing: "Free",
    rating: 4.9,
    description: "Transforms documents and notes into dynamic, conversational AI podcast deep-dives",
    is_infy_pick: true,
  },
  {
    name: "CopilotKit",
    url: "https://copilotkit.ai",
    category: "Building",
    pricing: "Free",
    rating: 4.8,
    description: "Open-source framework to build custom in-app AI copilots, sidebars, and generative UI",
    is_infy_pick: true,
  },
  {
    name: "Langflow 1.0",
    url: "https://langflow.org",
    category: "Agents",
    pricing: "Free",
    rating: 4.8,
    description: "Visual canvas UI for rapid prototyping and deployment of multi-agent and RAG pipelines",
    is_infy_pick: true,
  },
  {
    name: "Flowise AI",
    url: "https://flowiseai.com",
    category: "Agents",
    pricing: "Free",
    rating: 4.7,
    description: "Drag-and-drop low-code builder for LangChain and LlamaIndex agents and conversational workflows",
    is_infy_pick: true,
  },
  {
    name: "Continue.dev",
    url: "https://continue.dev",
    category: "Coding",
    pricing: "Free",
    rating: 4.8,
    description: "Leading open-source AI code assistant extension for VS Code and JetBrains supporting custom LLMs",
    is_infy_pick: true,
  },
  {
    name: "Letta (formerly MemGPT)",
    url: "https://letta.com",
    category: "Agents",
    pricing: "Free",
    rating: 4.8,
    description: "Stateful agent framework providing self-editing long-term memory for conversational LLMs",
    is_infy_pick: true,
  },
  {
    name: "Suno v4",
    url: "https://suno.com",
    category: "Music",
    pricing: "Freemium",
    rating: 4.9,
    description: "Generates studio-grade vocal tracks, acoustic arrangements, and full songs from simple text",
    is_infy_pick: true,
  },
  {
    name: "Udio v1.5",
    url: "https://udio.com",
    category: "Music",
    pricing: "Freemium",
    rating: 4.8,
    description: "High-fidelity AI music generation with advanced stem separation and prompt-based mixing",
    is_infy_pick: true,
  },
  {
    name: "Whisper Turbo",
    url: "https://github.com/openai/whisper",
    category: "Video & Audio",
    pricing: "Free",
    rating: 4.9,
    description: "Optimized speech recognition model offering 8x faster transcription speed with state-of-the-art accuracy",
    is_infy_pick: true,
  },
  {
    name: "SWE-agent",
    url: "https://github.com/princeton-nlp/SWE-agent",
    category: "Coding",
    pricing: "Free",
    rating: 4.7,
    description: "Princeton NLP agent that autonomously resolves real GitHub issues and pull requests",
    is_infy_pick: true,
  },
  {
    name: "Phind 70B",
    url: "https://phind.com",
    category: "Coding",
    pricing: "Freemium",
    rating: 4.8,
    description: "Developer search engine combining frontier LLM reasoning with live web indexing for programmers",
    is_infy_pick: true,
  },
  {
    name: "Krea AI Realtime",
    url: "https://krea.ai",
    category: "Design",
    pricing: "Freemium",
    rating: 4.8,
    description: "Real-time canvas generation, prompt enhancement, and high-fidelity video generation",
    is_infy_pick: true,
  },
  {
    name: "Haiper 2.0",
    url: "https://haiper.ai",
    category: "Video & Audio",
    pricing: "Freemium",
    rating: 4.7,
    description: "Next-generation video foundation model with 4K upscaling and cinematic lighting control",
    is_infy_pick: true,
  },
  {
    name: "Runway Gen-3 Alpha",
    url: "https://runwayml.com",
    category: "Video & Audio",
    pricing: "Paid",
    rating: 4.8,
    description: "Breakthrough text-to-video foundation model with fine-grained motion brush controls",
    is_infy_pick: true,
  },
  {
    name: "Pika 2.0",
    url: "https://pika.art",
    category: "Video & Audio",
    pricing: "Freemium",
    rating: 4.7,
    description: "Creative video generator featuring dynamic Pikaffects (inflate, melt, crush, explode)",
    is_infy_pick: true,
  },
  {
    name: "Ideogram 2.0",
    url: "https://ideogram.ai",
    category: "Design",
    pricing: "Freemium",
    rating: 4.9,
    description: "Industry standard for accurate text typography, graphic design, and photorealistic poster generation",
    is_infy_pick: true,
  },
  {
    name: "Midjourney v6.1",
    url: "https://midjourney.com",
    category: "Design",
    pricing: "Paid",
    rating: 4.9,
    description: "Frontier image generation model with photorealism, coherence, and web interface",
    is_infy_pick: true,
  },
  {
    name: "Perplexity Spaces",
    url: "https://perplexity.ai/spaces",
    category: "Research",
    pricing: "Freemium",
    rating: 4.8,
    description: "Collaborative AI research hubs with persistent knowledge files, live web search, and custom instructions",
    is_infy_pick: true,
  },
  {
    name: "Elicit",
    url: "https://elicit.com",
    category: "Research",
    pricing: "Freemium",
    rating: 4.8,
    description: "AI research assistant that automates literature reviews and extracts structured findings from 200M+ papers",
    is_infy_pick: true,
  },
  {
    name: "Consensus",
    url: "https://consensus.app",
    category: "Research",
    pricing: "Freemium",
    rating: 4.7,
    description: "Search engine that extracts evidence-based answers directly from peer-reviewed scientific studies",
    is_infy_pick: true,
  },
  {
    name: "Manus AI",
    url: "https://manus.im",
    category: "Agents",
    pricing: "Freemium",
    rating: 4.9,
    description: "General-purpose autonomous agent executing multi-step browser, code, and document workflows",
    is_infy_pick: true,
  },
  {
    name: "Claude Artifacts",
    url: "https://claude.ai",
    category: "Chatbots",
    pricing: "Freemium",
    rating: 4.9,
    description: "Interactive workspace for real-time rendering of React components, diagrams, and games in chat",
    is_infy_pick: true,
  },
  {
    name: "ChatGPT Canvas",
    url: "https://chatgpt.com",
    category: "Writing",
    pricing: "Freemium",
    rating: 4.8,
    description: "Interactive side-by-side workspace for co-editing code and long-form writing with GPT-4o",
    is_infy_pick: true,
  },
  {
    name: "v0 SDK",
    url: "https://v0.dev/docs",
    category: "Building",
    pricing: "Freemium",
    rating: 4.8,
    description: "Programmatic API for generating and streaming live React components into production applications",
    is_infy_pick: true,
  },
  {
    name: "Ollama Modelfile",
    url: "https://ollama.com/library",
    category: "Coding",
    pricing: "Free",
    rating: 4.8,
    description: "Declarative configuration system to build and customize local LLMs with system prompts and parameters",
    is_infy_pick: true,
  },
  {
    name: "Cursor Rules (.cursorrules)",
    url: "https://cursor.directory",
    category: "Coding",
    pricing: "Free",
    rating: 4.9,
    description: "Community directory of tailored prompts and architecture standards for AI code editors",
    is_infy_pick: true,
  },
  {
    name: "Boltai Desktop",
    url: "https://boltai.com",
    category: "Productivity",
    pricing: "Paid",
    rating: 4.7,
    description: "Native macOS AI assistant providing global hotkeys and inline writing assistance across all native apps",
    is_infy_pick: true,
  },
  {
    name: "Raycast AI",
    url: "https://raycast.com/ai",
    category: "Productivity",
    pricing: "Freemium",
    rating: 4.9,
    description: "Fastest launcher with integrated multi-model AI hotkeys, translations, and custom extensions",
    is_infy_pick: true,
  },
  {
    name: "Granola",
    url: "https://granola.ai",
    category: "Productivity",
    pricing: "Freemium",
    rating: 4.8,
    description: "AI notepad for meetings that merges your handwritten notes with live audio transcription",
    is_infy_pick: true,
  },
  {
    name: "Gamma App",
    url: "https://gamma.app",
    category: "Presentations",
    pricing: "Freemium",
    rating: 4.8,
    description: "AI-powered presentation and document builder with interactive widgets and modern layouts",
    is_infy_pick: true,
  },
  {
    name: "Tome",
    url: "https://tome.app",
    category: "Presentations",
    pricing: "Freemium",
    rating: 4.7,
    description: "Generative storytelling platform that creates polished pitch decks with dynamic AI imagery",
  },
  {
    name: "ChatPDF",
    url: "https://chatpdf.com",
    category: "Research",
    pricing: "Freemium",
    rating: 4.6,
    description: "Instant document chat that summarizes research papers, legal contracts, and financial reports",
  },
  {
    name: "ElevenLabs Voice Changer",
    url: "https://elevenlabs.io/voice-changer",
    category: "Video & Audio",
    pricing: "Freemium",
    rating: 4.8,
    description: "Transforms your speech into different human voices while preserving emotion and timing",
    is_infy_pick: true,
  },
  {
    name: "Whisper WebUI",
    url: "https://github.com/jhj0517/whisper-webui",
    category: "Video & Audio",
    pricing: "Free",
    rating: 4.7,
    description: "Open-source browser interface for batch Whisper transcription, subtitle generation, and translation",
    is_infy_pick: true,
  },
  {
    name: "HeyGen Interactive Avatar",
    url: "https://heygen.com",
    category: "Video & Audio",
    pricing: "Paid",
    rating: 4.8,
    description: "Real-time conversational photorealistic video avatars with zero noticeable latency",
    is_infy_pick: true,
  },
  {
    name: "Captions AI",
    url: "https://captions.ai",
    category: "Video & Audio",
    pricing: "Paid",
    rating: 4.8,
    description: "AI video creator studio with automatic dynamic captions, eye contact correction, and voice dubbing",
    is_infy_pick: true,
  },
  {
    name: "Julius AI",
    url: "https://julius.ai",
    category: "Data Analysis",
    pricing: "Freemium",
    rating: 4.8,
    description: "Data analysis assistant that visualizes spreadsheets, runs statistical models, and builds charts",
    is_infy_pick: true,
  },
  {
    name: "Rows AI",
    url: "https://rows.com",
    category: "Data Analysis",
    pricing: "Freemium",
    rating: 4.7,
    description: "Modern spreadsheet with native AI integrations for data cleaning, sentiment analysis, and formulas",
    is_infy_pick: true,
  },
  {
    name: "FinChat",
    url: "https://finchat.io",
    category: "Finance",
    pricing: "Freemium",
    rating: 4.8,
    description: "AI investment research platform with real-time financial data on over 100,000 global public companies",
    is_infy_pick: true,
  },
  {
    name: "Robin AI",
    url: "https://robinai.com",
    category: "Legal",
    pricing: "Freemium",
    rating: 4.7,
    description: "Legal AI copilot that reviews, tracks, and redlines contracts against company standards",
  },
  {
    name: "Harvey AI",
    url: "https://harvey.ai",
    category: "Legal",
    pricing: "Paid",
    rating: 4.9,
    description: "Enterprise legal AI for premier law firms covering contract analysis, due diligence, and litigation",
    is_infy_pick: true,
  },
  {
    name: "Intercom Fin",
    url: "https://intercom.com/fin",
    category: "Customer Support",
    pricing: "Paid",
    rating: 4.8,
    description: "Breakthrough customer service bot resolving 50%+ of complex support requests with verified accuracy",
    is_infy_pick: true,
  },
  {
    name: "Decagon AI",
    url: "https://decagon.ai",
    category: "Customer Support",
    pricing: "Paid",
    rating: 4.8,
    description: "Human-like customer support agents that perform actions across billing, CRMs, and ticketing systems",
    is_infy_pick: true,
  },
  {
    name: "Clay AI",
    url: "https://clay.com",
    category: "Sales",
    pricing: "Freemium",
    rating: 4.9,
    description: "10x outbound sales prospecting platform with 50+ data provider enrichments and AI messaging",
    is_infy_pick: true,
  },
  {
    name: "Apollo AI",
    url: "https://apollo.io",
    category: "Sales",
    pricing: "Freemium",
    rating: 4.8,
    description: "B2B lead generation database with automated AI email writer and multi-channel sequencing",
    is_infy_pick: true,
  },
  {
    name: "Jasper AI",
    url: "https://jasper.ai",
    category: "Marketing",
    pricing: "Paid",
    rating: 4.7,
    description: "Enterprise marketing co-pilot with brand voice memory, campaign generation, and SEO scoring",
  },
  {
    name: "WriteSonic",
    url: "https://writesonic.com",
    category: "Writing",
    pricing: "Freemium",
    rating: 4.7,
    description: "AI writer for long-form SEO articles, product descriptions, and ad copy",
  },
  {
    name: "Copy.ai",
    url: "https://copy.ai",
    category: "Writing",
    pricing: "Freemium",
    rating: 4.7,
    description: "GTM workflow automation platform that unifies sales and marketing content generation",
  },
  {
    name: "Descript",
    url: "https://descript.com",
    category: "Video & Audio",
    pricing: "Freemium",
    rating: 4.8,
    description: "Edit audio and video as easily as editing a text document with AI voice overdub",
    is_infy_pick: true,
  },
  {
    name: "Opus Clip",
    url: "https://opus.pro",
    category: "Video & Audio",
    pricing: "Freemium",
    rating: 4.8,
    description: "Turns 1 long-form YouTube video into 10 viral TikToks and Shorts with dynamic animated captions",
    is_infy_pick: true,
  }
]

let discoveryIntervalId: any = null

/**
 * Run one iteration of tool discovery and add to DB
 */
export async function runAutoDiscoveryStep(existingToolNames: Set<string>): Promise<Tool | null> {
  // 1. Fetch live DB names if available
  if (supabase) {
    try {
      const { data } = await supabase.from("tools").select("name")
      if (data) {
        data.forEach((t) => existingToolNames.add(t.name.toLowerCase().trim()))
      }
    } catch {}
  }

  // 2. Find the first candidate that is not yet added
  const candidate = DISCOVERY_CANDIDATE_POOL.find(
    (c) => !existingToolNames.has(c.name.toLowerCase().trim())
  )

  if (!candidate) {
    console.log("All current discovery pool tools are already in the database!")
    return null
  }

  console.log(`🤖 Auto-discovering & adding new AI tool: ${candidate.name}`)

  const newTool: Tool = {
    name: candidate.name,
    description: candidate.description,
    category: candidate.category,
    pricing: candidate.pricing,
    rating: candidate.rating,
    url: candidate.url,
    is_infy_pick: Boolean(candidate.is_infy_pick),
  }

  // 3. Insert into Supabase
  if (supabase) {
    try {
      let res = await supabase.from("tools").insert([{
        name: newTool.name,
        description: newTool.description,
        category: newTool.category,
        pricing: newTool.pricing,
        rating: newTool.rating,
        url: newTool.url,
      }])

      if (res.error) {
        // Fallback category insert
        await supabase.from("tools").insert([{
          name: newTool.name,
          description: newTool.description,
          category: "Productivity",
          pricing: newTool.pricing,
          rating: newTool.rating,
          url: newTool.url,
        }])
      }
    } catch (err) {
      console.error("Supabase auto-discovery insert error:", err)
    }
  }

  // 4. Mark as added in set
  existingToolNames.add(candidate.name.toLowerCase().trim())

  // 5. Broadcast to all open tabs and trigger real-time toast
  broadcastNewTool(newTool)

  return newTool
}

/**
 * Start continuous background auto-discovery (runs automatically every 2 minutes)
 */
export function startAutoDiscoveryDaemon(
  getExistingNames: () => Set<string>,
  onToolAdded: (tool: Tool) => void
) {
  if (discoveryIntervalId) return

  // Run the first check after 10 seconds, then every 2 minutes (120,000ms)
  const initialTimeout = setTimeout(async () => {
    const discovered = await runAutoDiscoveryStep(getExistingNames())
    if (discovered) onToolAdded(discovered)
  }, 10000)

  discoveryIntervalId = setInterval(async () => {
    const discovered = await runAutoDiscoveryStep(getExistingNames())
    if (discovered) onToolAdded(discovered)
  }, 120000)

  return () => {
    clearTimeout(initialTimeout)
    if (discoveryIntervalId) {
      clearInterval(discoveryIntervalId)
      discoveryIntervalId = null
    }
  }
}
