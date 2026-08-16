import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://eemhvfqldhkcdbsbibgo.supabase.co"
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

const fallbackCategoryMap = {
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

function normalizeKey(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "").trim()
}

async function fetchRSSItems() {
  const feeds = [
    "https://hnrss.org/newest?q=AI+OR+LLM+OR+GPT+OR+agent",
    "https://www.producthunt.com/feed",
    "https://techcrunch.com/category/artificial-intelligence/feed/"
  ]

  const items = []
  for (const feed of feeds) {
    try {
      const res = await fetch(feed, {
        headers: { "User-Agent": "infyAI-Bot/1.0" },
        signal: AbortSignal.timeout(6000)
      })
      if (!res.ok) continue
      const xml = await res.text()
      const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || []

      for (const itemXml of itemMatches.slice(0, 8)) {
        const titleMatch = itemXml.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i)
        const linkMatch = itemXml.match(/<link[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i) || itemXml.match(/href="([^"]+)"/i)
        const descMatch = itemXml.match(/<description[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i) || itemXml.match(/<summary[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/summary>/i)

        const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : ""
        const link = linkMatch ? linkMatch[1].trim() : ""
        const description = descMatch ? descMatch[1].replace(/<[^>]+>/g, "").trim().slice(0, 300) : ""

        if (title && link) items.push({ title, link, description })
      }
    } catch {
      // Continue on timeout
    }
  }
  return items
}

function extractWithHeuristics(items) {
  const tools = []
  for (const item of items) {
    const cleanTitle = item.title.replace(/^Show HN:\s*/i, "").replace(/–.*$/, "").replace(/-.*$/, "").trim()
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

async function runDiscovery() {
  console.log("🔍 Starting AI Tools Auto-Discovery...")
  const { data: existingDbTools } = await supabase.from("tools").select("name, url")
  const existingNames = new Set((existingDbTools || []).map((t) => normalizeKey(t.name)))
  const existingUrls = new Set((existingDbTools || []).map((t) => normalizeKey(t.url || "")))

  console.log(`Current Supabase database count: ${existingDbTools ? existingDbTools.length : 0} tools`)

  const rawItems = await fetchRSSItems()
  console.log(`Fetched ${rawItems.length} candidate items from RSS feeds.`)

  const candidates = extractWithHeuristics(rawItems)
  console.log(`Parsed ${candidates.length} potential tools.`)

  let added = 0
  let skipped = 0

  for (const tool of candidates) {
    const nameKey = normalizeKey(tool.name)
    const urlKey = normalizeKey(tool.url)

    if (existingNames.has(nameKey) || existingUrls.has(urlKey)) {
      skipped++
      continue
    }

    const validCat = VALID_CATEGORIES.includes(tool.category) ? tool.category : "Productivity"
    let res = await supabase.from("tools").insert({
      name: tool.name.trim(),
      description: tool.description.trim(),
      category: validCat,
      pricing: tool.pricing || "Freemium",
      rating: tool.rating || 4.5,
      url: tool.url.trim(),
      is_infy_pick: Boolean(tool.is_infy_pick),
    })

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
      added++
      console.log(`✨ Added new tool: ${tool.name} (${validCat}) -> ${tool.url}`)
    }
  }

  console.log(`✅ Discovery completed! Added ${added} new tools, skipped ${skipped} duplicates.`)
}

runDiscovery()
