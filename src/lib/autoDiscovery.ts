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
    name: "Ollama",
    url: "https://ollama.com",
    category: "Coding",
    pricing: "Free",
    rating: 4.8,
    description: "Get up and running with Llama 3, DeepSeek, and Mistral locally in seconds",
    is_infy_pick: true,
  },
  {
    name: "Cursor Composer",
    url: "https://cursor.com",
    category: "Coding",
    pricing: "Freemium",
    rating: 4.9,
    description: "Multi-file AI architect that writes entire features across your codebase",
    is_infy_pick: true,
  },
  {
    name: "Jan AI",
    url: "https://jan.ai",
    category: "Chatbots",
    pricing: "Free",
    rating: 4.7,
    description: "Open-source 100% offline AI desktop assistant that runs private LLMs",
    is_infy_pick: true,
  },
  {
    name: "LM Studio",
    url: "https://lmstudio.ai",
    category: "Coding",
    pricing: "Free",
    rating: 4.8,
    description: "Discover, download, and run local LLMs with an OpenAI-compatible local server",
    is_infy_pick: true,
  },
  {
    name: "v0 by Vercel",
    url: "https://v0.dev",
    category: "Building",
    pricing: "Freemium",
    rating: 4.8,
    description: "Generative UI system that builds React and Tailwind components from prompts",
    is_infy_pick: true,
  },
  {
    name: "Bolt.diy",
    url: "https://github.com/stackblitz-labs/bolt.diy",
    category: "Building",
    pricing: "Free",
    rating: 4.7,
    description: "Open-source in-browser fullstack AI app builder running on custom LLM APIs",
    is_infy_pick: true,
  },
  {
    name: "AnythingLLM",
    url: "https://anythingllm.com",
    category: "Agents",
    pricing: "Free",
    rating: 4.7,
    description: "All-in-one AI document chat, agent workspace, and enterprise RAG engine",
    is_infy_pick: true,
  },
  {
    name: "Dify.AI",
    url: "https://dify.ai",
    category: "Agents",
    pricing: "Free",
    rating: 4.8,
    description: "Open-source LLM app development platform for orchestration, RAG, and multi-agents",
    is_infy_pick: true,
  },
  {
    name: "LibreChat",
    url: "https://librechat.ai",
    category: "Chatbots",
    pricing: "Free",
    rating: 4.7,
    description: "Open-source multi-model AI chat UI integrating OpenAI, Anthropic, Gemini, and Ollama",
    is_infy_pick: true,
  },
  {
    name: "Kling AI",
    url: "https://klingai.com",
    category: "Video & Audio",
    pricing: "Freemium",
    rating: 4.7,
    description: "High-definition AI video generation with realistic physics and camera motion",
    is_infy_pick: true,
  },
  {
    name: "Hailuo AI (MiniMax)",
    url: "https://hailuoai.video",
    category: "Video & Audio",
    pricing: "Freemium",
    rating: 4.7,
    description: "Ultra-fast text-to-video generator with photorealistic cinematography",
    is_infy_pick: true,
  },
  {
    name: "Tripo 3D",
    url: "https://tripo3d.ai",
    category: "3D & Animation",
    pricing: "Freemium",
    rating: 4.6,
    description: "Generates production-ready 3D meshes and textured models in under 10 seconds",
  },
  {
    name: "Rodin Gen-1",
    url: "https://hyper3d.ai",
    category: "3D & Animation",
    pricing: "Freemium",
    rating: 4.5,
    description: "Creates game-ready 3D digital avatars and assets from single image prompts",
  },
  {
    name: "Recraft V3",
    url: "https://recraft.ai",
    category: "Design",
    pricing: "Freemium",
    rating: 4.8,
    description: "Best-in-class vector and raster design generator with precise brand palette control",
    is_infy_pick: true,
  },
  {
    name: "Meshy AI",
    url: "https://meshy.ai",
    category: "3D & Animation",
    pricing: "Freemium",
    rating: 4.6,
    description: "Convert text and images to 3D assets with automatic rigging and textures",
  },
  {
    name: "OpenRouter",
    url: "https://openrouter.ai",
    category: "Coding",
    pricing: "Freemium",
    rating: 4.8,
    description: "A unified API and playground for every open-source and proprietary LLM",
    is_infy_pick: true,
  },
  {
    name: "Grok 2",
    url: "https://x.ai",
    category: "Chatbots",
    pricing: "Freemium",
    rating: 4.7,
    description: "xAI's frontier chatbot with real-time X knowledge and Flux image generation",
    is_infy_pick: true,
  },
  {
    name: "Lovable.dev",
    url: "https://lovable.dev",
    category: "Building",
    pricing: "Freemium",
    rating: 4.7,
    description: "AI full-stack engineer that generates complete apps with Supabase and GitHub sync",
    is_infy_pick: true,
  },
  {
    name: "ElevenLabs Reader",
    url: "https://elevenlabs.io/reader",
    category: "Video & Audio",
    pricing: "Free",
    rating: 4.8,
    description: "Free mobile app that reads articles, PDFs, and books with human-quality AI voices",
    is_infy_pick: true,
  },
  {
    name: "Perplexity Comet",
    url: "https://perplexity.ai",
    category: "Research",
    pricing: "Freemium",
    rating: 4.9,
    description: "Conversational answer engine with direct citations and real-time deep research",
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
