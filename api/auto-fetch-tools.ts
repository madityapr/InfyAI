import { createClient } from "@supabase/supabase-js"

export const config = { runtime: "edge" }

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "https://eemhvfqldhkcdbsbibgo.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_BNP5lzHiffMGrib-0kkZug_JSWUYMCH"
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || ""
const groqApiKey = process.env.GROQ_API_KEY || ""

const supabase = createClient(supabaseUrl, supabaseKey)

const VALID_CATEGORIES = [
  "Chatbots", "Coding", "Building", "Design", "Video & Audio", "Productivity",
  "Research", "Agents", "Marketing", "Writing", "Data Analysis",
  "Presentations", "3D & Animation", "Customer Support", "Sales",
  "Gaming", "Legal", "HR & Recruiting", "Finance", "Healthcare",
  "Education", "Music", "E-commerce"
]

const fallbackCategoryMap: Record<string, string> = {
  "Chatbots": "Productivity",
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

interface DiscoveredTool {
  name: string
  description: string
  category: string
  pricing: "Free" | "Freemium" | "Paid"
  rating: number
  url: string
  is_infy_pick?: boolean
}

// Helper: Normalize name/URL for deduplication
function normalizeKey(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "").trim()
}

// Helper: Fetch raw text from RSS feeds
async function fetchRSSItems(): Promise<Array<{ title: string; link: string; description: string }>> {
  const feeds = [
    "https://www.producthunt.com/feed",
    "https://hnrss.org/newest?q=Show+HN+AI",
    "https://hnrss.org/newest?q=AI+OR+LLM+OR+GPT+OR+agent",
    "https://techcrunch.com/category/artificial-intelligence/feed/",
    "https://venturebeat.com/category/ai/feed/"
  ]

  const items: Array<{ title: string; link: string; description: string }> = []

  for (const feed of feeds) {
    try {
      const res = await fetch(feed, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) infyAI-Bot/2.0" },
        signal: AbortSignal.timeout(5000)
      })
      if (!res.ok) continue
      const xml = await res.text()

      // Basic regex parser for RSS <item> tags
      const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || []
      for (const itemXml of itemMatches.slice(0, 15)) {
        const titleMatch = itemXml.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i)
        const linkMatch = itemXml.match(/<link[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i) || itemXml.match(/href="([^"]+)"/i)
        const descMatch = itemXml.match(/<description[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i) || itemXml.match(/<summary[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/summary>/i)

        const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim() : ""
        const link = linkMatch ? linkMatch[1].trim() : ""
        const description = descMatch ? descMatch[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim().slice(0, 300) : ""

        if (title && link) {
          items.push({ title, link, description })
        }
      }
    } catch {
      // Continue to next feed on timeout/error
    }
  }

  return items
}

// Helper: Extract tools using Gemini LLM API
async function extractWithGemini(rawText: string): Promise<DiscoveredTool[]> {
  if (!geminiApiKey) return []

  const prompt = `You are an AI tools curator. From the following text, identify any specific new AI software, developer tools, agents, or apps mentioned.
Extract them strictly in JSON format as an array of objects matching this schema:
[
  {
    "name": "Tool Name",
    "description": "Crisp 1-sentence description (max 20 words)",
    "category": "One of: ${VALID_CATEGORIES.join(", ")}",
    "pricing": "Free | Freemium | Paid",
    "rating": 4.5,
    "url": "https://valid-url.com",
    "is_infy_pick": true or false (true only if popular/generous free tier)
  }
]

Do not include general news or opinion articles. Only extract actual tools/products.
Text to analyze:
${rawText}

Respond ONLY with valid JSON.`

  try {
    let res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
      })
    })

    if (!res.ok) {
      res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
        })
      })
    }

    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]"
    return JSON.parse(text)
  } catch (err) {
    console.error("Gemini extraction error:", err)
    return []
  }
}

// Helper: Extract tools using Groq API (fallback LLM)
async function extractWithGroq(rawText: string): Promise<DiscoveredTool[]> {
  if (!groqApiKey) return []

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqApiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `Extract AI tools into a JSON array with schema: [{"name":"","description":"","category":"${VALID_CATEGORIES[0]}","pricing":"Freemium","rating":4.5,"url":"https://...","is_infy_pick":false}]. Category must be one of: ${VALID_CATEGORIES.join(", ")}. Return only JSON.`
          },
          { role: "user", content: rawText }
        ],
        temperature: 0.1,
        response_format: { type: "json_object" }
      })
    })

    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content || "{}"
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed : parsed.tools || []
  } catch {
    return []
  }
}

// Helper: Heuristic extractor if no LLM key is present
function extractWithHeuristics(items: Array<{ title: string; link: string; description: string }>): DiscoveredTool[] {
  const tools: DiscoveredTool[] = []
  for (const item of items) {
    // Look for Show HN or Product launch patterns
    const cleanTitle = item.title.replace(/^Show HN:\s*/i, "").replace(/–.*$/, "").replace(/-.*$/, "").trim()
    
    // Skip questions, discussion threads, and error posts
    if (
      cleanTitle.includes("?") ||
      /^(help|issue|problem|broken|why|how|anyone|error|what|my|is it|can someone|local vram)/i.test(cleanTitle) ||
      cleanTitle.length < 3 ||
      cleanTitle.length > 35
    ) {
      continue
    }

    const words = cleanTitle.split(" ")
    if (words.length > 0 && words.length <= 4) {
      const name = words.join(" ")
      let category = "Productivity"
      const lower = (item.title + " " + item.description).toLowerCase()

      if (lower.includes("code") || lower.includes("dev") || lower.includes("github")) category = "Coding"
      else if (lower.includes("design") || lower.includes("image") || lower.includes("art")) category = "Design"
      else if (lower.includes("video") || lower.includes("audio") || lower.includes("voice")) category = "Video & Audio"
      else if (lower.includes("agent") || lower.includes("workflow") || lower.includes("automate")) category = "Agents"
      else if (lower.includes("research") || lower.includes("paper") || lower.includes("search")) category = "Research"
      else if (lower.includes("chat") || lower.includes("bot")) category = "Chatbots"
      else if (lower.includes("write") || lower.includes("copy")) category = "Writing"

      tools.push({
        name,
        description: item.description ? item.description.slice(0, 120) : `AI-powered tool for ${category.toLowerCase()}`,
        category,
        pricing: lower.includes("free") ? "Free" : "Freemium",
        rating: 4.5,
        url: item.link.startsWith("http") ? item.link : `https://${item.link}`,
        is_infy_pick: lower.includes("free")
      })
    }
  }
  return tools
}

export async function GET() {
  return handleDiscovery()
}

export async function POST() {
  return handleDiscovery()
}

export default async function handler() {
  return handleDiscovery()
}

async function handleDiscovery() {
  try {
    // 1. Fetch existing tools from Supabase for deduplication
    const { data: existingDbTools } = await supabase.from("tools").select("name, url")
    const existingNames = new Set((existingDbTools || []).map((t: any) => normalizeKey(t.name || "")))
    const existingUrls = new Set((existingDbTools || []).map((t: any) => normalizeKey(t.url || "")))

    // 2. Fetch raw feeds
    const rawItems = await fetchRSSItems()
    const rawCombinedText = rawItems.map((i) => `Title: ${i.title}\nLink: ${i.link}\nSummary: ${i.description}`).join("\n\n")

    // 3. Extract via LLM or fallback heuristics
    let candidates: DiscoveredTool[] = []
    if (geminiApiKey) {
      candidates = await extractWithGemini(rawCombinedText)
    } else if (groqApiKey) {
      candidates = await extractWithGroq(rawCombinedText)
    }

    if (!candidates || candidates.length === 0) {
      candidates = extractWithHeuristics(rawItems)
    }

    // 4. Deduplicate and validate candidates
    const newlyAdded: DiscoveredTool[] = []
    let skippedCount = 0

    for (const tool of candidates) {
      if (!tool.name || !tool.url) continue

      // Disallow social media, forum discussions, and meme links
      const blockedDomains = ["reddit.com", "twitter.com", "x.com", "facebook.com", "instagram.com", "tiktok.com", "youtube.com", "imgur.com", "threads.net"]
      if (blockedDomains.some((d) => tool.url.toLowerCase().includes(d))) {
        continue
      }

      const nameKey = normalizeKey(tool.name)
      const urlKey = normalizeKey(tool.url)

      if (existingNames.has(nameKey) || existingUrls.has(urlKey)) {
        skippedCount++
        continue
      }

      // Valid category check
      const validCat = VALID_CATEGORIES.includes(tool.category) ? tool.category : "Productivity"

      // Insert into Supabase
      let res = await supabase.from("tools").insert({
        name: tool.name.trim(),
        description: tool.description.trim(),
        category: validCat,
        pricing: tool.pricing || "Freemium",
        rating: tool.rating || 4.5,
        url: tool.url.trim(),
        is_infy_pick: Boolean(tool.is_infy_pick),
      })

      // Fallback for Postgres category constraints
      if (res.error) {
        const fallbackCat = fallbackCategoryMap[validCat] || "Productivity"
        res = await supabase.from("tools").insert({
          name: tool.name.trim(),
          description: tool.description.trim(),
          category: fallbackCat,
          pricing: tool.pricing || "Freemium",
          rating: tool.rating || 4.5,
          url: tool.url.trim(),
          is_infy_pick: Boolean(tool.is_infy_pick),
        })
      }

      if (!res.error) {
        existingNames.add(nameKey)
        existingUrls.add(urlKey)
        newlyAdded.push({ ...tool, category: validCat })
      } else {
        console.error("Insert error for", tool.name, res.error.message)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Auto-discovery completed. Added ${newlyAdded.length} new tools, skipped ${skippedCount} existing.`,
        newlyAdded,
        skippedCount,
        totalChecked: candidates.length,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Internal discovery error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    )
  }
}
